import json,subprocess,re,unicodedata,difflib
D='/tmp/claude-0/-home-user-video-use/75d14596-cf69-57f6-b09c-3e5adc4db6d4/scratchpad/vhfs/'
TEMPO=1.0; INTRO=0.7; TAIL=4.4
GAPS=[0.4,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.8,0.4,0.4,0.8,0.8,0.45,0.6,0]
paras=json.load(open(D+'vo/paras.json')); paras[15]="VH Financial Services. Financiación privada para empresas."
def norm(w): return ''.join(c for c in unicodedata.normalize('NFD',w.lower()) if c.isalnum())
t=INTRO; words=[]; segs=[]; parts=[]
for i,txt in enumerate(paras):
    stt=[w for w in json.load(open(D+f'vo/piper/p{i:02d}.stt.json'))['words'] if w['type']=='word']
    s0=max(0,stt[0]['start']-0.05); s1=stt[-1]['end']+0.15
    sw=[norm(w['text']) for w in stt]; tw=txt.split(); tn=[norm(w) for w in tw]
    times=[None]*len(tw)
    for tag,a1,a2,b1,b2 in difflib.SequenceMatcher(None,tn,sw,autojunk=False).get_opcodes():
        if tag=='equal':
            for k in range(a2-a1): times[a1+k]=(stt[b1+k]['start'],stt[b1+k]['end'])
        elif b2>b1:  # replace: spread span
            st,en=stt[b1]['start'],stt[b2-1]['end']; n=a2-a1
            for k in range(n): times[a1+k]=(st+(en-st)*k/n, st+(en-st)*(k+1)/n)
    for k in range(len(tw)):
        if times[k] is None: times[k]=times[k-1] if k else (stt[0]['start'],stt[0]['start'])
    for w,(ws,we) in zip(tw,times):
        words.append({'p':i,'w':w,'s':round(t+(ws-s0)/TEMPO,3),'e':round(t+(we-s0)/TEMPO,3)})
    dur=(s1-s0)/TEMPO
    segs.append({'p':i,'start':round(t,3),'end':round(t+dur,3)}); parts.append((i,s0,s1,t)); t+=dur+GAPS[i]
total=t+TAIL
json.dump({'words':words,'segs':segs,'total':round(total,3)},open(D+'timeline.json','w'),ensure_ascii=False)
inputs=[];flt=[]
for j,(i,s0,s1,off) in enumerate(parts):
    inputs+=['-i',D+f'vo/piper/p{i:02d}.wav']
    flt.append(f'[{j}:a]aresample=48000,atrim={s0}:{s1},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,areverse,afade=t=in:d=0.05,areverse,adelay={int(off*1000)}:all=1[a{j}]')
flt.append(''.join(f'[a{j}]' for j in range(len(parts)))+f'amix=inputs={len(parts)}:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=1.5,equalizer=f=3500:t=q:w=1.2:g=2,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,apad=whole_dur={total},atrim=0:{total}[out]')
subprocess.run(['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(flt),'-map','[out]','-ar','48000','-ac','2',D+'vo_master.wav'],check=True)
print('total',round(total,2))
for s in segs: print(s)
