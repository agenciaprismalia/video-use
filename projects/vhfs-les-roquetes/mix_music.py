# Background music for Les Roquetes (same track and criteria as Flamingo).
#   python mix_music.py <work_dir> <music.mp3> <video_no_audio.mp4> <out.mp4>
# Needs <work_dir>/vo_master.wav and timeline.json from build_vo.py.
# 1. Lengthen the track to cover the video by repeating part of its central body: the splice points are
#    searched on the bar grid (128 bpm, 4/4) where both sides sound most alike (24-band log spectrum,
#    3 s window) and joined with a one-bar equal-power crossfade. The jump(s) are chosen so the track's
#    own soft ending falls in the final shot and the track would end ~3 s after the video (fade-out at the end).
# 2. Ride the level: short-term loudness smoothed over 8 s, BED_DB under the voice, quiet passages lifted
#    at most 3 dB, +FINAL_LIFT in the voiceless final shot, FADE_IN at the start, FADE_OUT ending with the video.
import json, re, subprocess, sys, itertools
import numpy as np

D, MUSIC, VIDEO, OUT = sys.argv[1].rstrip('/') + '/', sys.argv[2], sys.argv[3], sys.argv[4]
SR = 48000
BAR, PHASE, XF = 1.875, 0.495, 1.875
BED_DB, FINAL_LIFT = -20.0, 5.0
FADE_IN, FADE_OUT, LIFT_RAMP = 1.5, 2.5, 2.0
SMOOTH = 8.0
OVERHANG = 3.0              # track would end this long after the video
VOICE_REF = -19.1           # short-term median of the client's female ElevenLabs voice (Flamingo); used until the take exists
BODY = (14.0, 121.0)        # central body of the track (intro and soft ending excluded)


def dec(path, sr=SR, ch=2):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(sr), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, ch).astype(np.float64)


def write(path, x):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', path],
                   input=x.astype(np.float32).tobytes(), check=True)


def short_term(path):
    log = subprocess.run(['ffmpeg', '-v', 'verbose', '-i', path, '-af', 'ebur128=framelog=verbose', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    pts = re.findall(r't:\s*([\d.]+)\s+TARGET.*?S:\s*(-?[\d.]+|-inf)', log)
    return np.array([float(a) for a, _ in pts]), np.array([float(b) if b != '-inf' else -120 for _, b in pts])


def splice_candidates(path):
    sr = 22050; x = dec(path, sr, 1)[:, 0]; hop = 1024; n = len(x) // hop
    S = np.abs(np.fft.rfft(x[:n * hop].reshape(n, hop) * np.hanning(hop), axis=1))
    f = np.fft.rfftfreq(hop, 1 / sr); e = np.geomspace(60, 10000, 25)
    F = np.log1p(np.stack([S[:, (f >= a) & (f < b)].mean(1) for a, b in zip(e, e[1:])], 1) * 50); fps = sr / hop
    bars = [PHASE + k * BAR for k in range(200) if BODY[0] <= PHASE + k * BAR <= BODY[1]]
    w = int(3 * fps); out = []
    for to, frm in itertools.combinations(bars, 2):          # play to `frm`, jump back to `to`
        if frm - to < 5: continue
        d = np.mean(np.abs(F[int(frm * fps) - w // 2:int(frm * fps) + w // 2] - F[int(to * fps) - w // 2:int(to * fps) + w // 2]))
        out.append((d, frm, to))
    return sorted(out)


tl = json.load(open(D + 'timeline.json'))
total, endcard = tl['total'], tl['endcard']
voiced = tl['segs']
m = dec(MUSIC); mlen = len(m) / SR
need = total + OVERHANG - mlen

# ---- 1. choose jump(s)
cands = [c for c in splice_candidates(MUSIC) if c[0] < 0.6]
best = None
for d, frm, to in cands:                                       # one jump
    sc = abs((frm - to) - need) + 2 * d
    if best is None or sc < best[0]: best = (sc, [(frm, to)])
if abs(sum(f - t for f, t in best[1]) - need) > BAR:          # two jumps if one cannot get within a bar
    for (d1, f1, t1), (d2, f2, t2) in itertools.product(cands[:60], repeat=2):
        if f2 <= t1 + 2: continue                              # after jumping back to t1 we must reach f2
        sc = abs((f1 - t1) + (f2 - t2) - need) + 2 * (d1 + d2)
        if sc < best[0]: best = (sc, [(f1, t1), (f2, t2)])
jumps = best[1]
segs, pos = [], 0.0
for frm, to in jumps:
    segs.append((pos, frm)); pos = to
segs.append((pos, mlen))
n = int(XF * SR); th = np.linspace(0, np.pi / 2, n)[:, None]
music = m[int(segs[0][0] * SR):int((segs[0][1] + XF / 2) * SR)]
for a, b in segs[1:]:
    nxt = m[int((a - XF / 2) * SR):int(min(mlen, b + XF / 2) * SR)]
    music = np.concatenate([music[:-n], music[-n:] * np.cos(th) + nxt[:n] * np.sin(th), nxt[n:]])
ending_at = 121.5 + sum(f - t for f, t in jumps)
print(f'music {mlen:.2f}s -> {len(music) / SR:.2f}s for a {total:.2f}s video; jumps (play to -> back to): '
      + ', '.join(f'{f:.3f}->{t:.3f}' for f, t in jumps) + f'; soft ending starts {ending_at:.1f}s, final shot {endcard:.1f}s')
music = music[:int(total * SR)]
write(D + 'music_loop.wav', music)

# ---- 2. level
vt, vs = short_term(D + 'vo_master.wav')
speech = np.array([any(s['start'] + 1.5 <= t <= s['end'] for s in voiced) for t in vt])
voice_lufs = np.median(vs[speech]) if speech.any() and np.median(vs[speech]) > -60 else VOICE_REF
mt, ms = short_term(D + 'music_loop.wav')
k = int(SMOOTH / 0.1); pad = np.pad(ms, (k // 2, k - k // 2 - 1), mode='edge')
ms_smooth = np.convolve(pad, np.ones(k) / k, mode='valid')
base = voice_lufs + BED_DB - ms_smooth
base = np.minimum(base, np.median(base) + 3.0)
gain_db = base + FINAL_LIFT * np.clip((mt - (voiced[-1]['end'] + 0.3)) / LIFT_RAMP, 0, 1)
ts = np.arange(len(music)) / SR
g = 10 ** (np.interp(ts, mt, gain_db) / 20)
g *= np.sin(np.pi / 2 * np.clip(ts / FADE_IN, 0, 1))
g *= np.cos(np.pi / 2 * np.clip((ts - (total - FADE_OUT)) / FADE_OUT, 0, 1))
write(D + 'music_bed.wav', music * g[:, None])
print(f'voice reference {voice_lufs:.1f} LUFS ({"measured" if voice_lufs != VOICE_REF else "Flamingo voice, take not delivered yet"}) '
      f'-> bed {voice_lufs + BED_DB:.1f} LUFS, final shot {voice_lufs + BED_DB + FINAL_LIFT:.1f}')

subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', VIDEO, '-i', D + 'vo_master.wav', '-i', D + 'music_bed.wav',
                '-filter_complex', '[1:a][2:a]amix=inputs=2:normalize=0[a]', '-map', '0:v', '-map', '[a]',
                '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart',
                '-t', str(total), OUT], check=True)
print('done', OUT)
