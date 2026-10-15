# Build vo_master.wav + timeline.json from the client's ElevenLabs take (word timings via Scribe).
# OVR replaces individual paragraphs with separately generated takes.
import json,subprocess,unicodedata,difflib,os
D='/tmp/claude-0/-home-user-video-use/75d14596-cf69-57f6-b09c-3e5adc4db6d4/scratchpad/vhfs/'
SRC=D+'vo/el/takeA.mp3'; STT=D+'vo/el/takeA.stt.json'
OVR={}
for f in ['p13.mp3','p13_tmp.wav']:
    if os.path.exists(D+'vo/el/'+f): OVR[13]=(D+'vo/el/'+f, D+'vo/el/'+f.rsplit('.',1)[0]+'.stt.json'); break
INTRO=0.7; TAIL=7.0
GAPS=[0.4,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.4,0.8,0.8,0.6,0]
paras=json.load(open(D+'vo/paras.json'))
def norm(w): return ''.join(c for c in unicodedata.normalize('NFD',w.lower()) if c.isalnum())
def align(tw,stt):
    sn=[norm(w['text']) for w in stt]; tn=[norm(w) for w in tw]; times=[None]*len(tw)
    for tag,a1,a2,b1,b2 in difflib.SequenceMatcher(None,tn,sn,autojunk=False).get_opcodes():
        if tag=='equal':
            for k in range(a2-a1): times[a1+k]=(stt[b1+k]['start'],stt[b1+k]['end'])
        elif tag=='replace':
            s,e=stt[b1]['start'],stt[b2-1]['end'];n=a2-a1
            for k in range(n): times[a1+k]=(s+(e-s)*k/n,s+(e-s)*(k+1)/n)
    for k in range(len(times)):
        if times[k] is None: times[k]=times[k-1] if k else (stt[0]['start'],stt[0]['start'])
    return times
W=lambda f:[w for w in json.load(open(f))['words'] if w['type']=='word']
main=W(STT)
ref=[(i,w) for i,p in enumerate(paras) if i not in OVR for w in p.split()]
mt=align([w for _,w in ref],main)
per={}
for k,(i,w) in enumerate(ref): per.setdefault(i,[]).append((w,mt[k]))
for i,(f,s) in OVR.items():
    tw=paras[i].split(); per[i]=list(zip(tw,align(tw,W(s))))
t=INTRO; words=[]; segs=[]; parts=[]
for i in range(len(paras)):
    src=OVR[i][0] if i in OVR else SRC
    ws=per[i]; s0=max(0,ws[0][1][0]-0.06); s1=ws[-1][1][1]+0.18
    natural=0
    if i not in OVR and i+1<len(paras) and i+1 not in OVR:
        nxt=per[i+1][0][1][0]; s1=min(s1,nxt-0.04); natural=nxt-0.04-s1
    for w,(a,b) in ws: words.append({'p':i,'w':w,'s':round(t+a-s0,3),'e':round(t+b-s0,3)})
    dur=s1-s0; segs.append({'p':i,'start':round(t,3),'end':round(t+dur,3)}); parts.append((src,s0,s1,t))
    t+=dur+max(GAPS[i],natural)
total=round(t+TAIL,3)
json.dump({'words':words,'segs':segs,'total':total},open(D+'timeline.json','w'),ensure_ascii=False)
os.makedirs(D+'vo/el/seg',exist_ok=True)
inputs=[];flt=[]
for j,(src,s0,s1,off) in enumerate(parts):
    f=D+f'vo/el/seg/p{j:02d}.wav'
    pre='' if src==SRC else 'loudnorm=I=-24:TP=-3,'   # match level of the main take
    subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-af',f'atrim={s0:.3f}:{s1:.3f},asetpts=PTS-STARTPTS,{pre}aresample=48000,afade=t=in:d=0.02,areverse,afade=t=in:d=0.05,areverse','-ac','1',f],check=True)
    inputs+=['-i',f]; flt.append(f'[{j}:a]adelay={int(off*1000)}:all=1[a{j}]')
flt.append(''.join(f'[a{j}]' for j in range(len(parts)))+f'amix=inputs={len(parts)}:normalize=0,apad=whole_dur={total},atrim=0:{total}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(flt),'-map','[out]','-ar','48000','-ac','2',D+'vo_master.wav'],check=True)
print('total',total,'overrides',{k:os.path.basename(v[0]) for k,v in OVR.items()})
