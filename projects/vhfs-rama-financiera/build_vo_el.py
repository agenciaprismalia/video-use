# Build vo_master.wav + timeline.json from a single ElevenLabs take (word timings via Scribe)
import json,subprocess,unicodedata,difflib,sys
D='/tmp/claude-0/-home-user-video-use/75d14596-cf69-57f6-b09c-3e5adc4db6d4/scratchpad/vhfs/'
SRC=D+'vo/el/takeA.mp3'; STT=D+'vo/el/takeA.stt.json'
INTRO=0.7; TAIL=7.0
GAPS=[0.4,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.4,0.8,0.8,0.45,0]   # minimum pause after each paragraph
paras=json.load(open(D+'vo/paras.json'))
def norm(w): return ''.join(c for c in unicodedata.normalize('NFD',w.lower()) if c.isalnum())
stt=[w for w in json.load(open(STT))['words'] if w['type']=='word']
ref=[(i,w) for i,p in enumerate(paras) for w in p.split()]
tn=[norm(w) for _,w in ref]; sn=[norm(w['text']) for w in stt]
times=[None]*len(ref)
for tag,a1,a2,b1,b2 in difflib.SequenceMatcher(None,tn,sn,autojunk=False).get_opcodes():
    if tag=='equal':
        for k in range(a2-a1): times[a1+k]=(stt[b1+k]['start'],stt[b1+k]['end'])
    elif tag=='replace':
        s,e=stt[b1]['start'],stt[b2-1]['end'];n=a2-a1
        for k in range(n): times[a1+k]=(s+(e-s)*k/n,s+(e-s)*(k+1)/n)
for k in range(len(times)):
    if times[k] is None: times[k]=times[k-1]
t=INTRO; words=[]; segs=[]; parts=[]
for i in range(len(paras)):
    idx=[k for k,(p,_) in enumerate(ref) if p==i]
    s0=times[idx[0]][0]-0.06; s1=times[idx[-1]][1]+0.18
    nxt=times[idx[-1]+1][0] if idx[-1]+1<len(ref) else None
    if nxt: s1=min(s1,nxt-0.04)
    natural=(nxt-0.04-s1) if nxt else 0
    for k in idx: words.append({'p':i,'w':ref[k][1],'s':round(t+times[k][0]-s0,3),'e':round(t+times[k][1]-s0,3)})
    dur=s1-s0; segs.append({'p':i,'start':round(t,3),'end':round(t+dur,3)}); parts.append((s0,s1,t))
    t+=dur+max(GAPS[i],natural)
total=round(t+TAIL,3)
json.dump({'words':words,'segs':segs,'total':total},open(D+'timeline.json','w'),ensure_ascii=False)
import os
os.makedirs(D+'vo/el/seg',exist_ok=True)
inputs=[];flt=[]
for j,(s0,s1,off) in enumerate(parts):
    f=D+f'vo/el/seg/p{j:02d}.wav'
    subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-af',f'atrim={max(0,s0):.3f}:{s1:.3f},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.02,areverse,afade=t=in:d=0.05,areverse','-ac','1',f],check=True)
    inputs+=['-i',f]; flt.append(f'[{j}:a]adelay={int(off*1000)}:all=1[a{j}]')
flt.append(''.join(f'[a{j}]' for j in range(len(parts)))+f'amix=inputs={len(parts)}:normalize=0,apad=whole_dur={total},atrim=0:{total}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(flt),'-map','[out]','-ar','48000','-ac','2',D+'vo_master.wav'],check=True)
print('total',total); print('last seg',segs[-1])
