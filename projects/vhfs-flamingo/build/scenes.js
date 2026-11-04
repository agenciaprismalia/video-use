// helpers (same system as the rama financiera video)
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const cnt=(from,to,at,d=0.9,raw=false)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"${raw?' data-raw="1"':''}`)}>${raw?to:fmt(to)}</span>`;
const NB=' ';
const eyebrow=(x,y,txt,at)=>box(x,y,1300,T('eyebrow',txt,'left',at));
const chip=(icon,txt,at)=>`<div class="card row" style="padding:22px 38px 22px 26px;gap:22px" ${A('up',at)}>${ico(icon,at+0.1,60,'color:var(--slate)')}<div class="lbl">${txt}</div></div>`;
const colItem=(cx,y,icon,at,label,size=150,sub='',subAt=0,lblColor='')=>`<div class="abs col" style="left:${cx-220}px;top:${y}px;width:440px">${disc(icon,at,size)}${T('lbl',label,'up',at+0.15,'margin-top:26px;'+lblColor)}${sub?T('body soft',sub,'up',subAt||at+0.3,'font-size:28px;margin-top:8px'):''}</div>`;

// 1 · Apertura — light
scene(0,'light',`
 <div class="abs row" style="left:0;width:1920px;top:200px;justify-content:center">
  <div class="pill eyebrow" style="border-color:var(--acc3);padding:12px 30px;letter-spacing:.28em" ${A('up',0.25)}>Oportunidad de inversión</div></div>
 ${box(0,270,1920,T('h-xl','Flamingo','up',W(0,'flamingo')-0.2,'font-size:200px;text-align:center;color:var(--slate)'))}
 <div class="abs row" style="left:0;width:1920px;top:540px;justify-content:center;gap:32px">
  ${chip('office','Sector hotelero',W(0,'sector')-0.2)}${chip('sun','Costa Blanca',W(0,'costa')-0.2)}
 </div>
 ${box(0,720,1920,T('body soft','Operación estructurada por <b>VHFS</b>','words',W(0,'estructurada')-0.1,'text-align:center;font-size:32px'))}
`);

// 2 · El grupo — accent
scene(PS(1)-0.35,'accent',`
 ${eyebrow(160,160,'Detrás de la operación',PS(1)-0.1)}
 ${box(160,210,1500,T('h1','Grupo <b>Sun Confort</b>','words',W(1,'grupo')-0.1,'color:#fff'))}
 <div class="abs row" style="left:150px;top:400px;gap:40px">
  ${T('h-xl','+30','pop',W(1,'treinta')-0.2,'font-size:220px;color:#fff')}
  <div>${T('h2','años','up',W(1,'años')-0.2,'color:#fff')}${T('body','de trayectoria en el alojamiento<br>turístico de <b>Alicante</b>','words',W(1,'alojamiento')-0.2,'color:var(--slate7);margin-top:8px')}</div>
 </div>
 <div class="abs" style="left:1200px;top:380px;width:2px;height:420px;background:#fff;opacity:.6;transform-origin:top" ${A('growY',W(1,'hoteles')-0.4,0.6)}></div>
 <div class="abs row" style="left:1270px;top:400px;gap:30px">${disc('office',W(1,'hoteles')-0.15,120)}${T('h3','Hoteles','up',W(1,'hoteles'),'color:#fff')}</div>
 <div class="abs row" style="left:1270px;top:550px;gap:30px">${disc('building',W(1,'apartamentos')-0.15,120)}${T('h3','Apartamentos','up',W(1,'apartamentos'),'color:#fff')}</div>
 <div class="abs row" style="left:1270px;top:700px;gap:30px">${disc('tent',W(1,'camping')-0.15,120)}${T('h3','Camping','up',W(1,'camping'),'color:#fff')}</div>
`);

// 3 · Activo principal — light
scene(PS(2)-0.35,'light',`
 ${eyebrow(160,170,'Activo principal',PS(2)-0.1)}
 ${box(160,215,1150,T('h1','Albir Garden <b>Resort</b>','words',W(2,'albir')-0.15))}
 <div class="abs row" style="left:160px;top:330px;gap:16px" ${A('up',W(2,'lalf')-0.2)}>${ico('pin',W(2,'lalf')-0.1,48,'color:var(--acc)')}<span class="lbl soft">L'Alfàs del Pi · Alicante</span></div>
 <div class="abs" style="left:1330px;top:150px">${disc('sun',W(2,'principal')-0.2,300)}</div>
 ${colItem(400,500,'people',W(2,'familias')-0.2,'Complejo vacacional<br>para familias',150)}
 ${colItem(960,500,'pool',W(2,'piscinas')-0.2,'Piscinas y parque<br>acuático propio',150)}
 ${colItem(1520,500,'globe',W(2,'norte')-0.3,'Turismo del<br>norte de Europa',150)}
`);

// 4 · Cifras — dark
const kv=(label,val,at,first=false)=>`${first?'':`<div style="height:2px;background:var(--acc9);margin:34px 0 28px" ${A('grow',at-0.2,0.6)}></div>`}${T('eyebrow',label,'fade',at)}${T('h-xl',val,'up',at+0.05,'font-size:76px;margin-top:12px;color:#fff')}`;
function rev(){const base=830,scale=28,bw=200;const rows=[['2022',9.4,'Más de 9,4'+NB+'M€',W(3,'nueve')-0.2,160+60],['2025',14.7,'Más de 14,7'+NB+'M€',W(3,'catorce')-0.2,160+380]];
 return rows.map(([y,v,l,at,x],i)=>{const h=Math.round(v*scale);return `<div class="abs" style="left:${x}px;top:${base-h}px;width:${bw}px;height:${h}px;background:${i?'var(--acc5)':'var(--acc9)'};transform-origin:bottom" ${A('growY',at,0.8)}></div>
  <div class="abs" style="left:${x-60}px;top:${base-h-58}px;width:${bw+120}px;text-align:center" ${A('up',at+0.5)}><span class="lbl" style="color:#fff;font-weight:600;white-space:nowrap">${l}</span></div>
  <div class="abs lbl" style="left:${x}px;top:${base+18}px;width:${bw}px;text-align:center;color:var(--acc5)" ${A('fade',at,0.4)}>${y}</div>`}).join('')+
  `<div class="abs" style="left:${160+60+bw+20}px;top:${base-260}px;width:100px;height:60px;color:var(--acc5)" ${A('fade',W(3,'catorce')-0.1,0.4)}><svg class="ic" viewBox="0 0 100 60" style="stroke-width:3"><path d="M6 50L90 12M76 10l14 2-4 14"/></svg></div>`}
scene(PS(3)-0.35,'dark',`
 ${eyebrow(160,150,'Facturación del grupo',PS(3)-0.1)}
 ${box(160,195,900,T('h2','Crecimiento <span class="hl">2022 – 2025</span>','words',W(3,'facturación')-0.1))}
 <div class="abs" style="left:160px;top:830px;width:820px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',W(3,'facturación'),0.7)}></div>
 ${rev()}
 <div class="abs" style="left:1140px;top:280px;width:620px;height:520px;background:var(--slate7);border-radius:6px;padding:56px 60px" ${A('up',W(3,'ebitda')-0.3,0.6)}>
  ${kv('EBITDA','Más de 3,9'+NB+'M€',W(3,'ebitda'),true)}
  ${kv('Patrimonio neto','Más de 10'+NB+'M€',W(3,'patrimonio'))}
 </div>
`);

// 5 · Segunda sociedad — accent
scene(PS(4)-0.35,'accent',`
 ${eyebrow(160,160,'La segunda sociedad',PS(4)-0.1)}
 <div class="abs row" style="left:160px;top:230px;gap:30px" ${A('up',W(4,'antiguo')-0.2)}>${ico('tent',W(4,'antiguo')-0.1,64,'color:var(--slate7)')}<span class="lbl" style="color:var(--slate7)">Antiguo Camping La Media Legua · Benidorm</span></div>
 <div class="abs" style="left:190px;top:310px;width:3px;height:70px;background:#fff;transform-origin:top" ${A('growY',W(4,'relanzado')-0.3,0.5)}></div>
 ${box(160,400,1100,T('lbl','Relanzado en 2026 como','up',W(4,'relanzado')-0.1,'color:var(--slate7)'))}
 ${box(150,450,1200,T('h-xl','Taiga Benidorm','up',W(4,'taiga')-0.2,'font-size:140px;color:#fff'))}
 <div class="abs row" style="left:160px;top:640px;gap:14px">${[0,1,2,3,4].map(i=>`<div style="width:62px;height:62px;color:#fff">${ico('star',W(4,'cinco')-0.1+i*0.12,62)}</div>`).join('')}<span class="h3" style="color:#fff;margin-left:16px" ${A('up',W(4,'estrellas')-0.1)}>Camping de cinco estrellas</span></div>
 <div class="abs" style="left:1260px;top:250px;width:500px;height:560px;background:#fff;border-radius:6px;padding:56px 50px" ${A('up',W(4,'seis')-0.3,0.6)}>
  ${T('eyebrow','En solo','fade',W(4,'seis')-0.1)}
  ${T('h-xl','6 meses','up',W(4,'seis'),'font-size:96px;margin-top:14px;color:var(--slate)')}
  <div style="height:2px;background:var(--acc3);margin:36px 0 30px" ${A('grow',W(4,'superado')-0.2,0.6)}></div>
  ${T('h3','ha superado la facturación <b>de todo 2025</b>','words',W(4,'superado')-0.1,'color:var(--slate)')}
 </div>
`);

// 6 · La operación — light (cambio de fondo claro)
const opCard=(x,y,icon,at,label,value,sub='')=>`<div class="abs card" style="left:${x}px;top:${y}px;width:500px;height:230px;padding:34px 40px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:18px"><div style="width:52px;height:52px;color:var(--slate)">${ico(icon,at,52)}</div>${T('eyebrow',label,'fade',at)}</div>
  ${T('h-xl',value,'up',at+0.1,'font-size:76px;margin-top:22px;color:var(--slate)')}${sub?T('body soft',sub,'up',at+0.3,'font-size:24px;margin-top:6px'):''}</div>`;
scene(PS(5)-0.35,'light',`
 ${eyebrow(160,160,'La operación · Flamingo',PS(5)-0.1)}
 ${box(160,215,900,T('lbl soft','Préstamo de','up',W(5,'préstamo')-0.2))}
 ${box(150,262,1100,T('h-xl',cnt(0,300000,W(5,'trescientos')-0.1,0.9)+NB+'€','up',W(5,'trescientos')-0.2,'font-size:180px;color:var(--slate)'))}
 <div class="abs row" style="left:160px;top:470px;gap:40px">
  <div class="row" style="gap:16px" ${A('up',W(5,'seis')-0.1)}>${ico('calendar',W(5,'seis'),50,'color:var(--acc)')}<span class="h3">6 meses</span></div>
  <div class="row" style="gap:16px" ${A('up',W(5,'proveedores')-0.4)}>${ico('docCheck',W(5,'proveedores')-0.3,50,'color:var(--acc)')}<span class="h3">Pago a proveedores</span></div>
 </div>
 ${opCard(160,600,'percent',W(5,'nominal')-0.1,'TIN','8,5'+NB+'%')}
 ${opCard(700,600,'growth',W(5,'tir')-0.1,'TIR inversor','10,88'+NB+'%','Estimada')}
`);

// 7 · Garantía — dark
scene(PS(6)-0.35,'dark',`
 ${eyebrow(160,160,'Garantía',PS(6)-0.1)}
 <div class="abs" style="left:160px;top:240px;width:760px;height:560px;background:var(--slate7);border-radius:6px;padding:60px" ${A('up',W(6,'aval')-0.3,0.6)}>
  <div class="row" style="gap:20px">${disc('building',W(6,'aval')-0.1,140)}${disc('tent',W(6,'ambas')-0.1,140)}</div>
  ${T('h1','Aval de <span class="hl">ambas sociedades</span>','words',W(6,'aval'),'margin-top:56px;font-size:72px')}
 </div>
 <div class="abs" style="left:1000px;top:240px;width:760px;height:560px;background:var(--slate7);border-radius:6px;padding:60px" ${A('up',W(6,'vencimiento')-0.3,0.6)}>
  <div style="width:140px;height:140px;color:var(--acc5)">${ico('calendar',W(6,'vencimiento')-0.1,140)}</div>
  ${T('h3','El vencimiento coincide con el cobro de un <span class="hl">préstamo ICO</span> ya preconcedido','words',W(6,'vencimiento'),'margin-top:56px;color:#fff;font-size:44px;line-height:1.25')}
 </div>
`);

// 8 · Capacidad de deuda — accent
scene(PS(7)-0.35,'accent',`
 ${eyebrow(160,170,'Capacidad de deuda',PS(7)-0.1)}
 <div class="abs row" style="left:150px;top:270px;gap:50px">
  ${T('h-xl','6'+NB+'%','pop',W(7,'seis')-0.2,'font-size:260px;color:#fff')}
  <div>${T('h2','del importe','up',W(7,'importe')+0.2,'color:#fff')}${T('body','sobre la capacidad de deuda<br>estimada de <b>Flamingo Albir</b>','words',W(7,'capacidad')-0.2,'color:var(--slate7);margin-top:10px')}</div>
 </div>
 <div class="abs" style="left:160px;top:640px;width:900px;height:150px;background:#fff;border-radius:6px;padding:0 50px;display:flex;align-items:center;gap:40px" ${A('up',W(7,'financiera')-0.4,0.6)}>
  ${T('eyebrow','Deuda financiera neta / EBITDA','fade',W(7,'financiera')-0.2)}${T('h-xl','1,3x','pop',W(7,'uno')-0.1,'font-size:84px;color:var(--slate)')}
 </div>
`);

// 9 · Riesgos y mitigantes — light
const RISKS=[['building','Concentración de la deuda bancaria','concentración','Vencimientos escalonados a largo plazo','vencimientos'],
 ['sun','Exposición al ciclo turístico','exposición','Ingresos recurrentes','ingresos'],
 ['house','Patrimonio invertido sobre todo en inmuebles','patrimonio','Activos tangibles que respaldan el aval','activos']];
function riskCol(i){const [icon,t,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(8,rw)-0.2,ma=W(9,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:230px;width:500px;height:300px;padding:34px 36px;background:#fff;box-shadow:inset 0 0 0 2px var(--acc3);border-radius:6px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,96)}<div class="eyebrow" style="font-size:20px">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,'margin-top:26px;font-size:36px')}</div>
  <div class="abs" style="left:${x+234}px;top:548px;width:32px;height:58px;color:var(--acc)" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:620px;width:500px;height:240px;padding:34px 36px;background:var(--slate);border-radius:6px" ${A('up',ma,0.6)}>
   <div class="eyebrow" style="font-size:20px;color:var(--acc5)">Mitigante</div>
   ${T('h3',m,'up',ma+0.15,'margin-top:20px;font-size:34px;color:#fff')}</div>`}
scene(PS(8)-0.35,'light',`
 ${eyebrow(160,160,'Riesgos y mitigantes',PS(8)-0.1)}
 ${riskCol(0)}${riskCol(1)}${riskCol(2)}
`);

// 10 · Cómo participar — dark
const part=(x,icon,at,label,val)=>`<div class="abs" style="left:${x}px;top:340px;width:760px;height:340px;background:var(--slate7);border-radius:6px;padding:56px 60px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:24px"><div style="width:64px;height:64px;color:var(--acc5)">${ico(icon,at,64)}</div>${T('eyebrow',label,'fade',at)}</div>${T('h-xl',val,'up',at+0.1,'font-size:110px;margin-top:40px;color:#fff;white-space:nowrap')}</div>`;
scene(PS(10)-0.35,'dark',`
 ${eyebrow(160,170,'Cómo participar',PS(10)-0.1)}
 ${part(160,'coin',W(10,'inversión')-0.1,'Inversión mínima',cnt(0,10000,W(10,'diez')-0.1,0.7)+NB+'€')}
 ${part(1000,'calendar',W(10,'plazo')-0.1,'Plazo para participar','Hasta el 13/11')}
`);

// 11 · Cierre — light (plano final de la rama financiera)
const END=PE(11)+0.4;
const pill=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:var(--slate);border-color:var(--acc3)" ${A('up',at)}>${ico(icon,at+0.05,40)}<span class="lbl" style="font-size:32px;color:var(--slate)">${txt}</span></div>`;
scene(PS(11)-0.35,'light',`
 <div class="abs" style="left:610px;top:300px;width:700px" ${A('wipe',PS(11)-0.1,0.9)}>${LOGO}</div>
 ${box(0,485,1920,T('h2','Financiación privada <b>para empresas</b>','words',PS(11)+0.5,'text-align:center'))}
 ${box(0,600,1920,T('eyebrow','Relación con Inversores','fade',W(11,'relación')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:650px;justify-content:center;gap:28px">
   ${pill('globe','www.vhfs.es',W(11,'inversores')-0.1)}${pill('phone','914 516 306',W(11,'inversores')+0.15)}${pill('mail','inversores@vanniloholding.com',W(11,'inversores')+0.4)}
 </div>
 <div class="abs" style="left:460px;top:868px;width:1000px;height:1px;background:var(--acc3);transform-origin:center" ${A('grow',END,0.8)}></div>
 <div class="abs row" style="left:0;width:1920px;top:886px;justify-content:center;gap:22px" ${A('fade',END+0.4,0.6)}>
   <img src="${GOB}" style="height:40px;width:auto;display:block">
   <div class="body" style="font-size:14px;line-height:1.5;color:var(--acc9);text-align:left;max-width:600px">Vannilo 4 Inversiones es una entidad supervisada y registrada por el Banco de España con Nº de Registro D517.<br>Nº 1015/2022 de la sección segunda.</div>
 </div>
 ${box(0,962,1920,T('body','VHFS no es entidad de crédito y no capta depósitos del público.','fade',END+0.6,'font-size:14px;color:var(--acc9);text-align:center'))}
`,{noCorner:true,noSubsAfter:END});
