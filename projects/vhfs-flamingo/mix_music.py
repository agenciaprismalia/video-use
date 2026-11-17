# Background music bed for Flamingo (v15).
#   python mix_music.py <project_dir> <music.mp3> <video_no_audio.mp4> <out.mp4>
# Needs <project_dir>/vo_master.wav and timeline.json from build_vo.py.
#
# 1. Lengthen the track (2:19.5) to cover the video: at LOOP_FROM it crossfades back to LOOP_TO,
#    so the calm central stretch (incl. the 62-75 s breakdown) plays twice; the splice is on the
#    128 bpm bar grid (20 beats) at the point where both sides sound most alike. The track's own
#    ending then lands in the final shot.
# 2. Level it: short-term loudness smoothed over 8 s -> slow gain riding, no jumps or peaks.
# 3. Target BED_DB below the voice while it speaks, +FINAL_LIFT in the voiceless final shot,
#    FADE_IN at the start and FADE_OUT ending with the video.
import json, re, subprocess, sys
import numpy as np

D, MUSIC, VIDEO, OUT = sys.argv[1].rstrip('/') + '/', sys.argv[2], sys.argv[3], sys.argv[4]
SR = 48000
LOOP_TO, LOOP_FROM, XF = 60.495, 79.245, 1.875     # jump back 20 beats; one-bar equal-power crossfade
BED_DB, FINAL_LIFT = -20.0, 5.0
FADE_IN, FADE_OUT, LIFT_RAMP = 1.5, 2.5, 2.0
SMOOTH = 8.0


def dec(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def write(path, x):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', path],
                   input=x.astype(np.float32).tobytes(), check=True)


def short_term(path):
    """EBU R128 short-term loudness (3 s window) every 0.1 s."""
    log = subprocess.run(['ffmpeg', '-v', 'verbose', '-i', path, '-af', 'ebur128=framelog=verbose', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    pts = re.findall(r't:\s*([\d.]+)\s+TARGET.*?S:\s*(-?[\d.]+|-inf)', log)
    t = np.array([float(a) for a, _ in pts]); s = np.array([float(b) if b != '-inf' else -70 for _, b in pts])
    return t, s


tl = json.load(open(D + 'timeline.json'))
total = tl['total']
muted = set(tl.get('muted', []))
voiced = [s for s in tl['segs'] if s['p'] not in muted]
voice_end = voiced[-1]['end']

# ---- 1. lengthen
m = dec(MUSIC)
a = m[:int((LOOP_FROM + XF / 2) * SR)]
b = m[int((LOOP_TO - XF / 2) * SR):]
n = int(XF * SR)
th = np.linspace(0, np.pi / 2, n)[:, None]
music = np.concatenate([a[:-n], a[-n:] * np.cos(th) + b[:n] * np.sin(th), b[n:]])
print(f'music {len(m) / SR:.2f}s -> {len(music) / SR:.2f}s (video {total:.2f}s); track end lands at {len(music) / SR:.2f}s')
music = music[:int(total * SR)]
write(D + 'music_loop.wav', music)

# ---- 2+3. level and envelope
vt, vs = short_term(D + 'vo_master.wav')
speech = np.array([any(s['start'] + 1.5 <= t <= s['end'] for s in voiced) for t in vt])
voice_lufs = np.median(vs[speech])
mt, ms = short_term(D + 'music_loop.wav')
k = int(SMOOTH / 0.1)
pad = np.pad(ms, (k // 2, k - k // 2 - 1), mode='edge')
ms_smooth = np.convolve(pad, np.ones(k) / k, mode='valid')
base = voice_lufs + BED_DB - ms_smooth
# pull loud passages down to the bed, but lift quiet ones by at most 3 dB, so the breakdown
# and the track's own ending keep their natural decay instead of being flattened
base = np.minimum(base, np.median(base) + 3.0)
gain_db = base + FINAL_LIFT * np.clip((mt - (voice_end + 0.3)) / LIFT_RAMP, 0, 1)
ts = np.arange(len(music)) / SR
g = 10 ** (np.interp(ts, mt, gain_db) / 20)
g *= np.sin(np.pi / 2 * np.clip(ts / FADE_IN, 0, 1))                        # soft entrance
g *= np.cos(np.pi / 2 * np.clip((ts - (total - FADE_OUT)) / FADE_OUT, 0, 1))  # fade out at the end
bed = music * g[:, None]
write(D + 'music_bed.wav', bed)
print(f'voice short-term median {voice_lufs:.1f} LUFS -> bed target {voice_lufs + BED_DB:.1f} LUFS '
      f'(final shot {voice_lufs + BED_DB + FINAL_LIFT:.1f}); gain range {gain_db.min():.1f}..{gain_db.max():.1f} dB')

# ---- mux: voice untouched + bed
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', VIDEO, '-i', D + 'vo_master.wav', '-i', D + 'music_bed.wav',
                '-filter_complex', '[1:a][2:a]amix=inputs=2:normalize=0[a]', '-map', '0:v', '-map', '[a]',
                '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart',
                '-t', str(total), OUT], check=True)
print('done', OUT)
