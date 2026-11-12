// Flamingo v4 — según «Flamingo · Instrucciones gráficas para el vídeo»
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const cnt=(from,to,at,d=0.9,raw=false)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"${raw?' data-raw="1"':''}`)}>${raw?to:fmt(to)}</span>`;
const NB='<span style="display:inline-block;width:.24em"></span>'; // espacio antes de la unidad (visible también con interletrado negativo)
// rótulo de sección: versalitas espaciadas en #8492A8
const eyebrow=(x,y,txt,at,color='#8492A8')=>box(x,y,1300,T('eyebrow',txt,'left',at,`color:${color}`));
const chip=(icon,txt,at,style='')=>`<div class="row" style="background:#F4F6F9;border-radius:8px;padding:20px 32px 20px 22px;gap:20px;${style}" ${A('up',at)}>${ico(icon,at+0.1,52,'color:#394251')}<div class="lbl" style="color:#394251;font-size:30px">${txt}</div></div>`;
const photo=(src,at,pos='center',k=1.12)=>`<img src="img/${src}" data-k="${k}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos};transform-origin:center" ${A('kb',at,8)}>`;
const tag=(txt,at)=>`<div class="abs" style="left:16px;bottom:16px;background:#394251;border-radius:6px;padding:8px 16px" ${A('fade',at,0.5)}><span class="lbl" style="color:#fff;font-size:22px">${txt}</span></div>`;
const frame=(x,y,w,h,at,inner)=>`<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:8px;overflow:hidden;background:#F4F6F9;box-shadow:0 0 0 1px #D6DCE6" ${A('wipe',at,0.9)}>${inner}</div>`;

// 1 · Apertura — blanco (sin fotos ni track record): Vannilo Holding Financial Services presenta Flamingo
scene(0,'light',`
 <div class="abs" style="left:660px;top:150px;width:600px" ${A('wipe',W(0,'vannilo')-0.2,0.9)}>${LOGO}</div>
 ${box(0,305,1920,T('lbl','Vannilo Holding Financial Services presenta','words',W(0,'vannilo')+0.2,'color:#101010;font-weight:400;text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:375px;justify-content:center"><div class="pill eyebrow" style="border-color:#D6DCE6;padding:12px 28px;letter-spacing:.28em;color:#8492A8" ${A('up',W(0,'oportunidad')-0.2)}>Oportunidad de inversión</div></div>
 <div class="abs row" style="left:0;width:1920px;top:465px;justify-content:center;gap:20px">${chip('office','Hotelero',W(0,'hotelero')-0.2)}${chip('sun','Costa Blanca',W(0,'costa')-0.2)}</div>
 ${box(0,590,1920,T('h-xl','Flamingo','up',W(0,'flamingo')-0.15,'font-size:200px;color:#394251;text-align:center'))}
`,{noCorner:true});

// 2 · Estructura del grupo — organigrama; miniaturas 01 y 09 en las tarjetas cotitulares
const node=(x,y,w,h,title,sub,at,on,img='')=>`<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:8px;overflow:hidden;background:${on?'#8492A8':'#F4F6F9'};text-align:center" ${A(on?'pop':'up',at,on?0.5:0.6)}>
  ${img?`<div style="position:relative;height:170px;overflow:hidden">${photo(img,at,'center',1.08)}</div>`:''}
  <div style="padding:${img||h>200?'26px':'26px'} 22px"><div class="h3" style="font-size:34px;color:${on?'#fff':'#ADB9CC'}">${title}</div><div class="body" style="font-size:22px;margin-top:6px;color:${on?'#fff':'#ADB9CC'}">${sub}</div></div></div>`;
const NX=[160,580,1000,1340],NW=[400,400,320,420],NY=470;
scene(PS(1)-0.35,'light',`
 ${eyebrow(160,150,'Estructura del grupo',PS(1)-0.1)}
 <div class="abs" style="left:760px;top:190px;width:400px;height:110px;border-radius:8px;background:#394251;display:flex;align-items:center;justify-content:center" ${A('pop',W(1,'grupo')-0.1,0.5)}><span class="h3" style="color:#fff">Grupo Sun Confort</span></div>
 <div class="abs" style="left:959px;top:300px;width:2px;height:90px;background:#D6DCE6;transform-origin:top" ${A('growY',W(1,'reúne')-0.3,0.4)}></div>
 <div class="abs" style="left:360px;top:390px;width:1190px;height:2px;background:#D6DCE6;transform-origin:center" ${A('grow',W(1,'reúne')-0.1,0.6)}></div>
 ${NX.map((x,i)=>`<div class="abs" style="left:${x+NW[i]/2-1}px;top:390px;width:2px;height:${NY-390}px;background:#D6DCE6;transform-origin:top" ${A('growY',W(1,'reúne')+0.3,0.4)}></div>`).join('')}
 ${node(NX[0],NY,NW[0],310,'Flamingo Albir','Albir Garden Resort',W(1,'reúne')+0.5,false)}
 ${node(NX[1],NY,NW[1],310,'Sorito Albir','Camping La Media Legua · Taiga Benidorm',W(1,'reúne')+0.9,false)}
 ${node(NX[2],NY,NW[2],150,'Sant Chaume','Hotel Agua Azul',W(1,'reúne')+1.3,false)}
 ${node(NX[3],NY,NW[3],150,'Roseroba','Apartamentos San Jaime',W(1,'reúne')+1.7,false)}
 ${node(NX[0],NY,NW[0],310,'Flamingo Albir','Albir Garden Resort',W(1,'flamingo')-0.1,true,'01_albir-garden_vista-aerea.jpg')}
 ${node(NX[1],NY,NW[1],310,'Sorito Albir','Taiga Benidorm',W(1,'sorito')-0.1,true,'09_taiga-benidorm_piscina-principal.jpg')}
 <div class="abs" style="left:160px;top:810px;width:820px;height:2px;background:#8492A8;transform-origin:left" ${A('grow',W(1,'sorito')+0.4,0.6)}></div>
 ${box(160,830,820,T('eyebrow','Empresas cotitulares del préstamo','fade',W(1,'sorito')+0.6,'color:#8492A8;text-align:center'))}
`);

// 3 · Flamingo Albir — fotos y fichas
scene(PS(2)-0.35,'light',`
 ${eyebrow(160,150,'Empresa cotitular 01',PS(2)-0.1)}
 ${box(160,195,820,T('h1','Flamingo Albir','words',W(2,'flamingo')-0.1,'font-size:76px;color:#394251'))}
 ${box(160,285,820,T('h3','Albir Garden Resort','up',W(2,'flamingo')+0.3,'color:#8492A8'))}
 <div class="abs col" style="left:160px;top:400px;gap:20px;align-items:flex-start">
  ${chip('clock','Más de 30 años de trayectoria',W(2,'30')-0.2)}
  ${chip('pin',"L'Alfàs del Pi",W(2,'lalf')-0.2)}
  ${chip('pool','Resort familiar con parque acuático',W(2,'familias')-0.2)}
  ${chip('globe','Turismo del norte de Europa',W(2,'norte')-0.3)}
 </div>
 ${frame(1130,220,460,430,PS(2)-0.2,
   photo('05_albir-garden_vista-general.jpg',PS(2)-0.2,'center 40%',1.02)+photo('06_albir-garden_piscina-palmeras.jpg',PS(2)+3.2,'center',1.02)+photo('07_albir-garden_aquagarden-toboganes.jpg',W(2,'parque')-0.3,'center',1.02))}
 ${box(1130,672,460,T('eyebrow','Albir Garden Resort','fade',PS(2)+0.3,'color:#8492A8;text-align:center'))}
`);

// 3b · Flamingo Albir — facturación y EBITDA (azul pizarra)
const REV=[['2022',9.4],['2023',11.3],['2024',13.4],['2025',14.7]];
function revBars(){const x0=160,bw=130,gap=50,base=800,scale=30;const t0=W(3,'facturación')-0.2;
 return REV.map(([y,v],i)=>{const h=Math.round(v*scale),x=x0+i*(bw+gap),a0=W(3,'2022')-0.3,a3=W(3,'2025')-0.3,at=a0+(a3-a0)*i/3;
  return `<div class="abs" style="left:${x}px;top:${base-h}px;width:${bw}px;height:${h}px;background:${i==3?'#ADB9CC':'#8492A8'};transform-origin:bottom" ${A('growY',at,0.7)}></div>
  <div class="abs" style="left:${x-40}px;top:${base-h-52}px;width:${bw+80}px;text-align:center" ${A('up',at+0.4)}><span class="lbl" style="color:#fff;font-weight:600;font-size:28px;white-space:nowrap">${String(v).replace('.',',')}${NB}M€</span></div>
  <div class="abs lbl" style="left:${x}px;top:${base+16}px;width:${bw}px;text-align:center;color:#ADB9CC;font-size:26px" ${A('fade',at,0.4)}>${y}</div>`}).join('')}
const EB=[['2025','3,93',3.93,W(3,'ebitda')-0.1],['A 31/08/2026','3,88',3.88,W(3,'prácticamente')-0.2]];
scene(PS(3)-0.35,'dark',`
 ${eyebrow(160,150,'Flamingo Albir · Facturación',PS(3)-0.1)}
 <div class="abs row" style="left:160px;top:200px;gap:16px" ${A('up',W(3,'auditadas')-0.3)}><div class="row" style="background:#2A313C;border-radius:8px;padding:14px 26px 14px 18px;gap:16px">${ico('docCheck',W(3,'auditadas')-0.2,44,'color:#ADB9CC')}<span class="lbl" style="color:#fff;font-size:28px">Cuentas auditadas</span></div></div>
 <div class="abs" style="left:150px;top:800px;width:740px;height:2px;background:#5D6879;transform-origin:left" ${A('grow',W(3,'facturación')-0.3,0.7)}></div>
 ${revBars()}
 <div class="abs" style="left:1000px;top:200px;width:760px;height:690px;background:#2A313C;border-radius:8px;padding:50px 60px" ${A('up',W(3,'agosto')-0.4,0.6)}>
  ${T('eyebrow','EBITDA','fade',W(3,'agosto')-0.2,'color:#ADB9CC')}
  ${EB.map(([lab,val,v,at],i)=>{const w=Math.round(v/4*520);return `<div style="margin-top:${i?44:40}px">${T('lbl',lab,'fade',at,'color:#ADB9CC;font-size:26px')}
   <div class="row" style="gap:24px;margin-top:12px"><div style="width:${w}px;height:70px;background:${i?'#ADB9CC':'#8492A8'};transform-origin:left" ${A('grow',at,0.7)}></div>${T('h-xl',val+NB+'M€','up',at+0.4,'font-size:56px;color:#fff;white-space:nowrap')}</div></div>`}).join('')}
  ${T('body','Hasta agosto, prácticamente igual que todo 2025','up',W(3,'anterior')-0.3,'color:#ADB9CC;font-size:26px;margin-top:44px')}
 </div>
`);

// 4 · Sorito Albir — Taiga Benidorm (gris azulado)
scene(PS(4)-0.35,'accent',`
 ${eyebrow(160,150,'Empresa cotitular 02',PS(4)-0.1,'#fff')}
 ${box(160,195,1000,T('h1','Sorito Albir','words',W(4,'sorito')-0.1,'font-size:76px;color:#fff'))}
 ${box(160,285,1000,T('h3','Taiga Benidorm','up',W(4,'taiga',1)-0.2,'color:#394251'))}
 <div class="abs col" style="left:160px;top:390px;gap:18px;align-items:flex-start">
  ${chip('tent','Antes Camping La Media Legua',W(4,'antiguo')-0.2)}
  ${chip('calendar','Gestión de Taiga desde febrero de 2026',W(4,'febrero')-0.2)}
 </div>
 ${frame(160,630,820,360,W(4,'antiguo')-0.4,photo('13_taiga-benidorm_parcelas-caravanas.jpg',W(4,'antiguo')-0.4,'center 60%',1.08)+photo('10_taiga-benidorm_piscina-palmeras.jpg',W(4,'gestiona')-0.2,'center',1.08)+tag('Taiga Benidorm',W(4,'antiguo')))}
 <div class="abs" style="left:1000px;top:200px;width:760px;height:690px;background:#fff;border-radius:8px;padding:50px 60px" ${A('up',W(4,'seis')-0.5,0.6)}>
  ${T('eyebrow','Facturación de Sorito Albir','fade',W(4,'seis')-0.3,'color:#8492A8')}
  ${[['Todo 2025','1,44',1.44,W(4,'seis')-0.2],['1.er semestre 2026','1,56',1.56,W(4,'superado')-0.3]].map(([lab,val,v,at],i)=>{const w=Math.round(v/1.6*480);return `<div style="margin-top:${i?40:36}px">${T('lbl',lab,'fade',at,'color:#5D6879;font-size:26px')}
   <div class="row" style="gap:24px;margin-top:12px"><div style="width:${w}px;height:70px;background:${i?'#394251':'#ADB9CC'};transform-origin:left" ${A('grow',at,0.7)}></div>${T('h-xl',val+NB+'M€','up',at+0.4,'font-size:56px;color:#394251;white-space:nowrap')}</div></div>`}).join('')}
  <div style="height:2px;background:#D6DCE6;margin:40px 0 30px" ${A('grow',W(4,'superado')+0.3,0.6)}></div>
  ${T('h3','En seis meses supera todo 2025','up',W(4,'facturación')-0.1,'color:#394251')}
 </div>
`);

// 5 · La operación — blanco
scene(PS(5)-0.35,'light',`
 ${eyebrow(160,150,'La operación',PS(5)-0.1)}
 ${box(160,200,900,T('lbl','Préstamo de','up',W(5,'préstamo')-0.2,'color:#5D6879'))}
 ${box(150,245,1100,T('h-xl',cnt(0,300000,W(5,'300000')-0.1,0.9)+NB+'€','up',W(5,'300000')-0.2,'font-size:170px;color:#394251'))}
 ${frame(1030,140,360,330,W(5,'firman')-0.3,photo('01_albir-garden_vista-aerea.jpg',W(5,'firman')-0.3,'center',1.06))}
 ${frame(1410,140,360,330,W(5,'firman')-0.1,photo('09_taiga-benidorm_piscina-principal.jpg',W(5,'firman')-0.1,'center',1.06))}
 ${box(1030,486,360,T('eyebrow','Flamingo Albir','fade',W(5,'firman'),'color:#8492A8;text-align:center')+T('lbl','Albir Garden Resort','fade',W(5,'firman')+0.1,'color:#394251;text-align:center;font-size:26px;margin-top:6px'))}
 ${box(1410,486,360,T('eyebrow','Sorito Albir','fade',W(5,'firman')+0.2,'color:#8492A8;text-align:center')+T('lbl','Taiga Benidorm','fade',W(5,'firman')+0.3,'color:#394251;text-align:center;font-size:26px;margin-top:6px'))}
 <div class="abs row" style="left:160px;top:470px;gap:20px">${chip('calendar','6 meses',W(5,'seis')-0.2)}${chip('docCheck','Circulante · pago a proveedores',W(5,'proveedores')-0.4)}</div>
 <div class="abs" style="left:160px;top:610px;width:760px;height:250px;border-radius:8px;background:#8492A8;padding:40px 46px" ${A('up',W(5,'firman')-0.3,0.6)}>
  ${T('eyebrow','Cotitularidad','fade',W(5,'firman')-0.2,'color:#fff')}
  <div class="row" style="gap:26px;margin-top:22px">${disc('building',W(5,'firman')-0.1,96)}${disc('tent',W(5,'firman')+0.1,96)}${T('h3','Firman las dos sociedades','up',W(5,'firman'),'color:#fff')}</div>
 </div>
 <div class="abs" style="left:980px;top:610px;width:780px;height:250px;border-radius:8px;background:#F4F6F9;padding:40px 46px" ${A('up',W(5,'flujo')-0.3,0.6)}>
  <div class="row" style="gap:26px">${disc('drop',W(5,'flujo')-0.1,96)}${T('h3','Devolución con el flujo de caja operativo de ambas sociedades','up',W(5,'flujo'),'color:#394251;font-size:38px')}</div>
 </div>
`);

// 5b · Análisis previo — azul pizarra: dos pasos que terminan en «Aprobada»
const stepBox=(x,icon,title,at)=>`<div class="abs col" style="left:${x}px;top:360px;width:420px">${disc(icon,at-0.1,170)}${T('h3',title,'up',at+0.1,'margin-top:30px;color:#fff')}</div>`;
scene(PS(6)-0.35,'dark',`
 ${eyebrow(160,150,'Antes de ofrecerla',PS(6)-0.1,'#ADB9CC')}
 ${stepBox(160,'docSearch','Análisis de riesgos',W(6,'análisis')-0.2)}
 <div class="abs" style="left:455px;top:444px;width:430px;height:2px;background:#8492A8;transform-origin:left" ${A('grow',W(6,'comité')-0.6,0.5)}></div>
 ${stepBox(760,'people','Comité de inversión',W(6,'comité')-0.2)}
 <div class="abs" style="left:1055px;top:444px;width:365px;height:2px;background:#8492A8;transform-origin:left" ${A('grow',W(6,'validado')-0.6,0.5)}></div>
 <div class="abs row" style="left:1420px;top:385px;gap:20px;padding:24px 40px 24px 28px;border-radius:12px;background:#8492A8" ${A('pop',W(6,'validado')-0.1,0.5)}>${ico('check',W(6,'validado'),64,'color:#fff')}<span class="h2" style="color:#fff">Aprobada</span></div>
 ${box(160,690,1600,T('body','Capacidad de repago de ambas sociedades validada','words',W(6,'capacidad')-0.2,'color:#ADB9CC;text-align:center;font-size:32px'))}
`);

// 6 · Riesgos y mitigantes — tres columnas
const RISKS=[['building','Concentración bancaria','concentración','Vencimientos a largo plazo y escalonados','vencimientos'],
 ['sun','Estacionalidad del turismo','estacionalidad','Patrón de ventas recurrente','patrón'],
 ['coin','Endeudamiento de Sorito Albir','endeudamiento','Renta que Taiga paga por gestionar el camping','renta']];
function riskCol(i){const [icon,t,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(7,rw)-0.2,ma=W(8,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:220px;width:500px;height:280px;padding:32px 36px;background:#fff;box-shadow:inset 0 0 0 2px #D6DCE6;border-radius:8px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,90)}<div class="eyebrow" style="font-size:20px;color:#8492A8">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,'margin-top:24px;font-size:36px;color:#394251')}</div>
  <div class="abs" style="left:${x+234}px;top:518px;width:32px;height:58px;color:#8492A8" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:590px;width:500px;height:270px;padding:32px 36px;background:#394251;border-radius:8px" ${A('up',ma,0.6)}>
   <div class="row" style="gap:18px"><div style="width:56px;height:56px;color:#ADB9CC">${ico('shCheck',ma+0.1,56)}</div><div class="eyebrow" style="font-size:20px;color:#ADB9CC">Mitigante</div></div>
   ${T('h3',m,'up',ma+0.15,'margin-top:18px;font-size:34px;color:#fff')}</div>`}
scene(PS(7)-0.35,'light',`
 ${eyebrow(160,150,'Riesgos y mitigantes',PS(7)-0.1)}
 ${riskCol(0)}${riskCol(1)}${riskCol(2)}
`);

// 7a · Cifras para el inversor — azul pizarra
scene(PS(9)-0.35,'dark',`
 ${box(0,380,1920,T('h-xl','Hablemos de <span style="color:#ADB9CC">cifras</span><br>para el inversor','words',PS(9),'font-size:110px;color:#fff;text-align:center;line-height:1.05'))}
`);

// 7b · Rentabilidad y calendario de pagos — blanco (sin TIN; tres pagos de capital)
const PAYS=[{m:'Mes 4',at:W(11,'cuarto')-0.2,bonus:false},{m:'Mes 5',at:W(11,'quinto')-0.2,bonus:false},{m:'Mes 6',at:W(11,'sexto')-0.2,bonus:true}];
function stack(){const base=760,bw=150,capH=300,intH=26,bonH=40;return PAYS.map((p,i)=>{const x=960+i*270;let h='';
  h+=`<div class="abs" style="left:${x}px;top:${base-capH}px;width:${bw}px;height:${capH}px;background:#8492A8;transform-origin:bottom" ${A('growY',p.at,0.6)}></div>`;
  h+=`<div class="abs" style="left:${x}px;top:${base-capH-intH}px;width:${bw}px;height:${intH}px;background:#394251;transform-origin:bottom" ${A('growY',p.at+0.3,0.5)}></div>`;
  if(p.bonus)h+=`<div class="abs" style="left:${x}px;top:${base-capH-intH-bonH}px;width:${bw}px;height:${bonH}px;background:#ADB9CC;transform-origin:bottom" ${A('growY',W(11,'bonus')-0.2,0.5)}></div>`;
  h+=`<div class="abs lbl" style="left:${x-20}px;top:${base+14}px;width:${bw+40}px;text-align:center;color:#5D6879;font-size:26px" ${A('fade',p.at,0.4)}>${p.m}</div>`;
  h+=`<div class="abs" style="left:${x-25}px;top:${base+58}px;width:${bw+50}px;text-align:center" ${A('fade',p.at+0.4,0.5)}><span class="body" style="font-size:20px;color:#101010;line-height:1.45">${fmt(100000)}${NB}€ de capital<br>+ intereses${p.bonus?`<br><span ${A('fade',W(11,'bonus')-0.1,0.4)}>+ bonus a éxito de 2.250${NB}€</span>`:''}</span></div>`;
  return h}).join('')}
scene(PS(10)-0.35,'light',`
 ${eyebrow(160,150,'Cifras para el inversor',PS(10)-0.1)}
 <div class="abs" style="left:160px;top:220px;width:680px;height:440px;border-radius:8px;background:#F4F6F9;padding:36px 44px" ${A('up',W(10,'rentabilidad')-0.3,0.6)}>
  ${T('eyebrow','Rentabilidad estimada (TIR)*','fade',W(10,'rentabilidad')-0.1,'color:#8492A8')}
  ${T('h-xl','10,70'+NB+'%','up',W(10,'10,70')-0.2,'font-size:120px;margin-top:12px;color:#394251')}
  ${T('body','Incluye un interés fijo del 8,5'+NB+'% anual más un bonus condicionado de 2.250'+NB+'€','up',W(10,'incluye')-0.1,'font-size:30px;color:#101010;margin-top:22px;line-height:1.4')}
  ${T('body','*Rentabilidad no garantizada','fade',W(10,'incluye')+0.4,'font-size:20px;color:#5D6879;margin-top:22px')}
 </div>
 ${box(960,150,800,T('eyebrow','Calendario de pagos','fade',W(11,'capital')-0.2,'color:#8492A8'))}
 <div class="abs" style="left:940px;top:760px;width:820px;height:2px;background:#D6DCE6;transform-origin:left" ${A('grow',W(11,'capital')-0.2,0.6)}></div>
 ${stack()}
 <div class="abs" style="left:160px;top:700px;width:680px;height:110px;border-radius:8px;background:#394251;padding:0 44px;display:flex;align-items:center" ${A('up',W(11,'sexto')+0.2,0.6)}><span class="lbl" style="color:#fff;font-size:32px;white-space:nowrap">Beneficio total: <b style="color:#fff">${fmt(12875)}${NB}€</b></span></div>
 ${box(160,826,680,T('body','Simulacro sobre el total del importe a financiar, TIR a ajustar en función del ticket individual','fade',W(11,'sexto')+0.5,'font-size:20px;color:#5D6879;line-height:1.45'))}
`);

// 8 · Cómo participar — azul pizarra
const part=(x,icon,at,label,val)=>`<div class="abs" style="left:${x}px;top:300px;width:760px;height:320px;background:#2A313C;border-radius:8px;padding:50px 60px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:24px"><div style="width:60px;height:60px;color:#ADB9CC">${ico(icon,at,60)}</div>${T('eyebrow',label,'fade',at,'color:#ADB9CC')}</div>${T('h-xl',val,'up',at+0.1,'font-size:110px;margin-top:36px;color:#fff;white-space:nowrap')}</div>`;
scene(PS(12)-0.35,'dark',`
 ${eyebrow(160,170,'Cómo participar',PS(12)-0.1,'#ADB9CC')}
 ${part(160,'coin',W(12,'inversión')-0.1,'Ticket mínimo',cnt(0,10000,W(12,'10000')-0.1,0.7)+NB+'€')}
 ${part(1000,'calendar',W(12,'plazo')-0.1,'Fecha límite','25/11/2026')}
 <div class="abs row" style="left:160px;top:690px;gap:24px" ${A('up',W(12,'relación')-0.2)}>${disc('people',W(12,'relación')-0.1,100)}<span class="h3" style="color:#fff">Equipo de Relación con Inversores</span></div>
`);

// 9a · Track record — azul pizarra, antes del plano final
scene(PS(13)-0.35,'dark',`
 ${eyebrow(160,150,'Vannilo Holding Financial Services',PS(13)-0.1,'#ADB9CC')}
 <div class="abs row" style="left:0;width:1920px;top:250px;justify-content:center;gap:160px">
  <div class="col">${T('h-xl',cnt(0,134,W(13,'134')-0.2,1.0,true),'up',W(13,'134')-0.3,'font-size:190px;color:#fff')}${T('lbl','operaciones firmadas','up',W(13,'operaciones')-0.2,'color:#ADB9CC;margin-top:34px')}</div>
  <div style="width:2px;height:300px;background:#5D6879" ${A('growY',W(13,'financiado')-0.4,0.5)}></div>
  <div class="col">${T('h-xl','23,66'+NB+'M€','up',W(13,'financiado')-0.2,'font-size:190px;color:#fff;white-space:nowrap')}${T('lbl','financiados','up',W(13,'financiado')+0.25,'color:#ADB9CC;margin-top:34px')}</div>
 </div>
 <div class="abs row" style="left:0;width:1920px;top:690px;justify-content:center;gap:28px">
  <div style="background:#2A313C;border-radius:8px;padding:22px 34px" ${A('up',W(13,'ramas')-0.2)}><span class="lbl" style="color:#ADB9CC;font-size:28px">Rama financiera: <b style="color:#fff">120 operaciones · 18,1${NB}M€</b></span></div>
  <div style="background:#2A313C;border-radius:8px;padding:22px 34px" ${A('up',W(13,'inmobiliaria')-0.3)}><span class="lbl" style="color:#ADB9CC;font-size:28px">Rama inmobiliaria: <b style="color:#fff">14 operaciones · 5,56${NB}M€</b></span></div>
 </div>
`);

// 9 · Cierre — blanco, logo grande, contacto de inversores y aviso legal
const END=PE(14)+0.3;
const pill=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:#394251;border-color:#D6DCE6" ${A('up',at)}>${ico(icon,at+0.05,40)}<span class="lbl" style="font-size:32px;color:#394251">${txt}</span></div>`;
scene(PS(14)-0.35,'light',`
 <div class="abs" style="left:585px;top:170px;width:750px" ${A('wipe',PS(13)-0.1,0.9)}>${LOGO}</div>
 ${box(0,365,1920,T('h2','Financiación privada <b>para empresas</b>','words',W(14,'financiación')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:500px;justify-content:center;gap:28px">${pill('mail','inversores@vanniloholding.com',W(14,'financiación')+0.4)}${pill('phone','(+34) 911 632 094',W(14,'financiación')+0.7)}</div>
 <div class="abs" style="left:360px;top:650px;width:1200px;height:1px;background:#D6DCE6;transform-origin:center" ${A('grow',END-0.6,0.8)}></div>
 ${box(310,680,1300,T('body','Documento informativo dirigido a los socios e inversores de Vannilo Holding, de carácter confidencial. No constituye una oferta pública ni asesoramiento financiero. Las rentabilidades indicadas son estimaciones netas, ya descontadas las comisiones aplicables, sin incluir las retenciones fiscales del inversor, y no están garantizadas. Toda inversión conlleva riesgo, incluida la posible pérdida total o parcial del capital.','fade',END-0.4,'font-size:24px;line-height:1.6;color:#8492A8;text-align:center'))}
`,{noCorner:true,noSubsAfter:END});
