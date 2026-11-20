# Build timeline.json (+ vo_master.wav when the real take exists) for Les Roquetes.
#   python build_vo.py <work_dir>            TAKE=prov (default until the VO arrives) or TAKE=<folder in vo/>
# vo/paras.json   = on-screen/subtitle text, official spelling (instructions §2.2)
# vo/guion_voz.txt = what the voice says (phonetic spellings, numbers in words)
# TAKE=prov: no audio yet. Word times are synthesised from guion_voz.txt with the speaking rate of
#   the client's female ElevenLabs voice in Flamingo, and each paragraph is fitted to the orientative
#   scene times of the instructions (§4). Scenes key off words (W(p,'word')), so when the real take
#   arrives (vo/<take>/take.mp3 + take.stt.json from Scribe) re-running with TAKE=<take> resyncs
#   every animation and subtitle to the voice.
import json, os, subprocess, sys, unicodedata, difflib
D = sys.argv[1].rstrip('/') + '/'
P = os.path.dirname(os.path.abspath(__file__)) + '/'
TAKE = os.environ.get('TAKE', 'prov')
paras = json.load(open(P + 'vo/paras.json'))
voz = [p.strip() for p in open(P + 'vo/guion_voz.txt').read().split('\n\n') if p.strip()]
assert len(voz) == len(paras) == 8
END_HOLD = 1.6      # after the last word: trajectory breakdown stays on screen
END_CARD = 5.0      # final shot, no voice (§4 escena 9)
TAIL_FADE = 0.0

def norm(w): return ''.join(c for c in unicodedata.normalize('NFD', w.lower()) if c.isalnum())

def synth_stt():
    """Synthetic word timings: Flamingo el5 rate (dur = 0.058*chars - 0.03, gaps . 0.56 , 0.35 : 0.52 else 0.04),
    then each paragraph stretched to its §4 slot (start+0.5 .. end-0.6)."""
    slots = [(0, 17), (17, 40), (40, 74), (74, 120), (120, 148), (148, 163), (163, 176), (176, 190)]
    words = []
    for (a, b), para in zip(slots, voz):
        t, ws = 0.0, []
        for w in para.split():
            d = max(0.12, 0.058 * len(w.strip('.,:;')) - 0.03)
            ws.append([w, t, t + d]); t += d
            t += 0.56 if w[-1] in '.' else 0.52 if w[-1] == ':' else 0.35 if w[-1] in ',;' else 0.04
        span = ws[-1][2]; s0, s1 = a + 0.5, b - 0.6; k = (s1 - s0) / span
        words += [{'text': w, 'start': round(s0 + x * k, 3), 'end': round(s0 + y * k, 3), 'type': 'word'} for w, x, y in ws]
    return words

def align(tw, stt):
    sn = [norm(w['text']) for w in stt]; tn = [norm(w) for w in tw]; times = [None] * len(tw)
    for tag, a1, a2, b1, b2 in difflib.SequenceMatcher(None, tn, sn, autojunk=False).get_opcodes():
        if tag == 'equal':
            for k in range(a2 - a1): times[a1 + k] = (stt[b1 + k]['start'], stt[b1 + k]['end'])
        elif tag == 'replace':
            s, e = stt[b1]['start'], stt[b2 - 1]['end']; n = a2 - a1
            for k in range(n): times[a1 + k] = (s + (e - s) * k / n, s + (e - s) * (k + 1) / n)
    for k in range(len(times)):
        if times[k] is None: times[k] = times[k - 1] if k else (stt[0]['start'], stt[0]['start'])
    return times

if TAKE == 'prov':
    stt = synth_stt(); offset = 0.0
else:
    stt = [w for w in json.load(open(P + f'vo/{TAKE}/take.stt.json'))['words'] if w['type'] == 'word']
    offset = 0.7 - stt[0]['start']          # first word at 0.7 s, like Flamingo
# split the voice words back into paragraphs (by aligning the voice script), then map official words onto them
vw = [(i, w) for i, p in enumerate(voz) for w in p.split()]
vt = align([w for _, w in vw], stt)
words, segs = [], []
for i, para in enumerate(paras):
    idx = [k for k, (j, _) in enumerate(vw) if j == i]
    pv = [{'text': vw[k][1], 'start': vt[k][0], 'end': vt[k][1]} for k in idx]
    ot = align(para.split(), pv)
    for w, (s, e) in zip(para.split(), ot):
        words.append({'p': i, 'w': w, 's': round(s + offset, 3), 'e': round(e + offset, 3)})
    segs.append({'p': i, 'start': round(pv[0]['start'] + offset - 0.06, 3), 'end': round(pv[-1]['end'] + offset + 0.18, 3)})
endcard = round(segs[-1]['end'] + END_HOLD, 3)
total = round(endcard + END_CARD, 3)
json.dump({'words': words, 'segs': segs, 'endcard': endcard, 'total': total, 'take': TAKE},
          open(D + 'timeline.json', 'w'), ensure_ascii=False)
if TAKE != 'prov':
    src = P + f'vo/{TAKE}/take.mp3'
    s0 = stt[0]['start'] - 0.06
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{s0:.3f}', '-i', src, '-af',
                    f'adelay={int((0.7 - 0.06) * 1000)}:all=1,apad=whole_dur={total},atrim=0:{total},aresample=48000',
                    '-ac', '2', D + 'vo_master.wav'], check=True)
else:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', f'anullsrc=r=48000:cl=stereo', '-t', str(total),
                    D + 'vo_master.wav'], check=True)
print('take', TAKE, 'total', total, 'endcard', endcard, [(s['p'], s['start'], s['end']) for s in segs])
