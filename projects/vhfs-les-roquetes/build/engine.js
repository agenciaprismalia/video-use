const stage=document.getElementById('stage');
const sceneEls=[];
let SUBS_OFF=1e9;
SC.forEach((s,i)=>{
  const el=document.createElement('section'); el.className='scene '+s.bg; el.style.zIndex=i+1;
  el.innerHTML=(s.opt&&s.opt.noCorner?'':`<div class="corner">${LOGO}</div>`)+`<div class="inner">${s.html}</div>`;
  stage.appendChild(el); sceneEls.push(el);
  if(s.opt&&s.opt.noSubsAfter) SUBS_OFF=s.opt.noSubsAfter;
});
SC.forEach((s,i)=>{s.t1=i+1<SC.length?SC[i+1].t0+0.7:1e9});
document.querySelectorAll('i[data-icon]').forEach(e=>{e.innerHTML=iconSVG(e.dataset.icon)});
// words splitting
function splitWords(node,list){for(const c of [...node.childNodes]){if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/);const frag=document.createDocumentFragment();for(const p of parts){if(!p)continue;if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(p));continue}const sp=document.createElement('span');sp.className='wd';sp.textContent=p;frag.appendChild(sp);list.push(sp)}c.replaceWith(frag)}else if(c.nodeType===1&&c.tagName!=='BR'){splitWords(c,list)}}}
document.querySelectorAll('[data-a]').forEach(el=>{
  const a={el,type:el.dataset.a,at:+el.dataset.at,d:el.dataset.d?+el.dataset.d:null};
  if(a.type==='words'){a.w=[];splitWords(el,a.w)}
  if(a.type==='draw'){a.paths=[...el.querySelectorAll('path')];a.paths.forEach(p=>{p.style.strokeDasharray='1 1'})}
  if(a.type==='count'){a.from=+el.dataset.from;a.to=+el.dataset.to;a.raw=!!el.dataset.raw}
  if(a.type==='seq'){a.n=+el.dataset.n;a.pat=el.dataset.pat;a.cur=-1;a.fps=+(el.dataset.fps||25)}
  if(a.type==='cam'){a.k=JSON.parse(el.dataset.k)}
  if(a.type==='rect'){a.r0=JSON.parse(el.dataset.r0);a.r1=JSON.parse(el.dataset.r1)}
  ANIMS.push(a);
});
const OUTS=[...document.querySelectorAll('[data-out]')].map(el=>({el,t:+el.dataset.out}));
const ANIMSET=new Set(ANIMS.filter(a=>['fade','up','left','pop','kb'].includes(a.type)).map(a=>a.el));
// subtitles
const CH=[];(function(){
 const MAX=44;const MUTED=TL.muted||[];const byP={};for(const w of TL.words)if(!MUTED.includes(w.p))(byP[w.p]=byP[w.p]||[]).push(w);
 const L=a=>a.map(x=>x.w).join(' ').length;
 function split(a){if(L(a)<=MAX||a.length<2)return [a];let best=1,bs=1e9;for(let i=1;i<a.length;i++){const l=L(a.slice(0,i)),r=L(a.slice(i));let sc=Math.abs(l-r);if(/[.,;:]$/.test(a[i-1].w))sc-=12;if(/^(y|o|de|a|en|con|la|el|del|que|los|las|un|una|su|sus)$/i.test(a[i-1].w))sc+=30;if(sc<bs){bs=sc;best=i}}return [...split(a.slice(0,best)),...split(a.slice(best))]}
 for(const p of Object.keys(byP)){let cl=[],cur=[];for(const w of byP[p]){cur.push(w);if(/[.;:]$/.test(w.w)||(/,$/.test(w.w)&&L(cur)>=18)){cl.push(cur);cur=[]}}if(cur.length)cl.push(cur);
  // merge tiny clauses
  const m=[];for(const c of cl){if(m.length&&(L(c)<14||L(m[m.length-1])<14)&&L(m[m.length-1])+L(c)<=MAX+4)m[m.length-1]=m[m.length-1].concat(c);else m.push(c)}
  for(const c of m)for(const s of split(c))CH.push({s:s[0].s,e:s[s.length-1].e,txt:s.map(w=>w.w).join(' ')})}
 for(let i=0;i<CH.length;i++){const nx=CH[i+1];CH[i].hide=nx&&nx.s-CH[i].e<0.9?nx.s-0.02:CH[i].e+0.5}
 window.CH=CH})();
const subEl=document.getElementById('sub');
function render(t){
  let top=0;const pend=[];
  SC.forEach((s,i)=>{const el=sceneEls[i];const vis=t>=s.t0-0.001&&t<s.t1;el.style.display=vis?'block':'none';if(!vis)return;top=i;
    const p=(i===0||(s.opt&&s.opt.cut))?1:eio(clamp((t-s.t0)/0.65));el.style.clipPath=p>=1?'none':`inset(0 0 0 ${((1-p)*100).toFixed(3)}%)`;
    el.querySelector('.inner').style.transform=`translateX(${((1-p)*140).toFixed(2)}px)`});
  for(const a of ANIMS){const e=a.el;const d=a.d||0.5;const x=clamp((t-a.at)/d);const k=eo(x);
    switch(a.type){
     case 'fade':e.style.opacity=x;break;
     case 'up':e.style.opacity=clamp(x*1.6);e.style.transform=`translateY(${(1-k)*34}px)`;break;
     case 'left':e.style.opacity=clamp(x*1.6);e.style.transform=`translateX(${(1-k)*-40}px)`;break;
     case 'pop':{const b=x<=0?0:back(x);e.style.opacity=clamp(x*3);e.style.transform=`scale(${(0.4+0.6*b).toFixed(4)})`;break}
     case 'draw':{const dd=a.d||1;a.paths.forEach((pth,j)=>{const off=j*0.06;const xx=eio(clamp((t-a.at-off)/(dd*0.8)));pth.style.strokeDashoffset=(1-xx).toFixed(4);pth.style.opacity=xx>0?1:0});break}
     case 'grow':e.style.transform=`scaleX(${eio(x)})`;break;
     case 'growY':e.style.transform=`scaleY(${eio(x)})`;break;
     case 'kb':{const xx=clamp((t-a.at)/(a.d||7)),k0=+(e.dataset.k||1.12);e.style.opacity=clamp((t-a.at)/0.7);e.style.transform=`scale(${(k0-(k0-1)*xx).toFixed(4)})`;break}
     case 'wipe':e.style.clipPath=`inset(0 ${((1-eio(x))*100).toFixed(3)}% 0 0)`;e.style.opacity=x>0?1:0;break;
     case 'seq':{const k=Math.max(0,Math.min(a.n-1,Math.floor((t-a.at)*a.fps+1e-6)));if(k!==a.cur){a.cur=k;e.src=a.pat.replace('%03d',String(k).padStart(3,'0'));pend.push(e.decode().catch(()=>{}))}break}
     case 'cam':{// keyframes [[t,tx,ty,s],...] in absolute time; ease in-out between keys
       const K=a.k;let tx=K[0][1],ty=K[0][2],sc=K[0][3];for(let j=0;j+1<K.length;j++){const[t0,x0,y0,s0]=K[j],[t1,x1,y1,s1]=K[j+1];if(t>=t0){const q=eio(clamp((t-t0)/Math.max(1e-3,t1-t0)));tx=x0+(x1-x0)*q;ty=y0+(y1-y0)*q;sc=s0+(s1-s0)*q}}
       e.style.transform=`translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) scale(${sc.toFixed(5)})`;break}
     case 'rect':{const q=eio(x),r=a.r0.map((v,j)=>v+(a.r1[j]-v)*q);e.style.left=r[0]+'px';e.style.top=r[1]+'px';e.style.width=r[2]+'px';e.style.height=r[3]+'px';break}
     case 'rise':e.style.clipPath=`inset(${((1-eio(x))*100).toFixed(3)}% 0 0 0)`;e.style.opacity=x>0?1:0;break;
     case 'count':{const v=a.from+(a.to-a.from)*eo(x);e.textContent=a.raw?String(Math.round(v)):fmt(v);break}
     case 'words':{const st=0.075;a.w.forEach((w,j)=>{const xx=clamp((t-a.at-j*st)/0.45);const kk=eo(xx);w.style.opacity=clamp(xx*1.8);w.style.transform=`translateY(${(1-kk)*26}px)`});break}
    }}
  for(const o of OUTS){const x=clamp((t-o.t)/0.35);if(!ANIMSET.has(o.el)){o.el.style.opacity=1-x}else if(t>=o.t){o.el.style.opacity=(+(o.el.style.opacity||1))*(1-x)}}
  // subs
  let txt='';if(SUBS_ENABLED&&t<SUBS_OFF)for(const c of CH){if(t>=c.s-0.05&&t<c.hide){txt=c.txt;break}}
  if(subEl.textContent!==txt)subEl.textContent=txt;
  document.getElementById('subs').className=txt?'on':'';
  {const sc=SC[top],f=document.getElementById('foot');f.style.color=sc.bg==='light'?'#B6BCC6':'#C3D3EB';document.getElementById('footnote').style.display=(sc.opt&&sc.opt.note)?'block':'none';
   document.getElementById('shade').style.display=sc.bg==='media'?'block':'none';
   const cr=document.getElementById('credit');let ct='';let ccls=sc.bg==='light'?'onlight':'';if(sc.opt&&sc.opt.credits)for(const[c0,c1,txt,cl]of sc.opt.credits){if(t>=c0&&t<c1){ct=txt;if(cl!==undefined)ccls=cl}}
   if(cr.textContent!==ct)cr.textContent=ct;cr.className=ccls;}
  subEl.style.display=txt?'inline-block':'none';
  return Promise.all(pend);
}
window.render=render;window.TOTAL=TL.total;
