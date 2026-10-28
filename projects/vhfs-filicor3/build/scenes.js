// helpers (same system as the rama financiera video)
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const cnt=(from,to,at,d=0.9)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"`)}>${fmt(to)}</span>`;
const NB=' '; // espacio fino antes de € y %
const eyebrow=(x,y,txt,at)=>box(x,y,1200,T('eyebrow',txt,'left',at));

// 1 · Apertura — light
scene(0,'light',`
 <div class="abs row" style="left:0;width:1920px;top:200px;justify-content:center">
  <div class="pill eyebrow" style="border-color:var(--acc3);padding:12px 30px;letter-spacing:.28em" ${A('up',0.25)}>Operación cerrada</div></div>
 ${box(0,270,1920,T('h-xl','Filicor 3','up',W(0,'filicor')-0.2,'font-size:200px;text-align:center;color:var(--slate)'))}
 ${box(0,500,1920,T('body ink','Tercera operación de <b>financiación de circulante</b>','words',W(0,'tercera')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:620px;justify-content:center;gap:32px">
  <div class="card row" style="padding:22px 38px 22px 26px;gap:22px" ${A('up',W(0,'circulante')+0.2)}>${ico('nave',W(0,'circulante')+0.3,64,'color:var(--slate)')}<div class="lbl">Industria</div></div>
  <div class="card row" style="padding:22px 38px 22px 26px;gap:22px" ${A('up',W(0,'circulante')+0.5)}>${ico('euroDoc',W(0,'circulante')+0.6,64,'color:var(--slate)')}<div class="lbl">Deuda simple</div></div>
 </div>
 ${box(0,780,1920,T('body soft','Resumen de los datos clave del informe','words',W(0,'resumimos')-0.1,'text-align:center;font-size:30px'))}
`);

// 2 · La operación — dark
const opCard=(x,icon,at,label,value,sub='')=>`<div class="abs" style="left:${x}px;top:560px;width:500px;height:270px;background:var(--slate7);border-radius:6px;padding:40px 44px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:20px"><div style="width:58px;height:58px;color:var(--acc5)">${ico(icon,at,58)}</div>${T('eyebrow',label,'fade',at,'',)}</div>
  ${T('h-xl',value,'up',at+0.1,'font-size:88px;margin-top:30px;color:#fff')}${sub?T('body soft',sub,'up',at+0.3,'font-size:26px;margin-top:10px'):''}</div>`;
scene(PS(1)-0.35,'dark',`
 ${eyebrow(160,160,'La operación',PS(1)-0.1)}
 ${box(160,215,900,T('lbl soft','Préstamo de','up',W(1,'préstamo')-0.2))}
 ${box(150,262,1300,T('h-xl',cnt(0,250000,W(1,'250000')-0.1,0.9)+NB+'€','up',W(1,'250000')-0.2,'font-size:190px;color:#fff'))}
 ${opCard(160,'calendar',W(1,'doce')-0.1,'Plazo','12 meses')}
 ${opCard(710,'percent',W(1,'nominal')-0.1,'TIN','9,8'+NB+'%')}
 ${opCard(1260,'growth',W(1,'tae')-0.1,'TAE inversor','11,8'+NB+'%','Estimada, neta')}
`);

// 2b · Formalización — light
scene(PS(2)-0.35,'light',`
 ${eyebrow(160,160,'Condiciones',PS(2)-0.1)}
 ${box(160,205,1500,T('h1','Capital e intereses, <b>por trimestres</b>','words',W(2,'capital')-0.1))}
 <div class="abs col" style="left:160px;top:420px;width:480px;text-align:left;align-items:flex-start">${disc('calendar',W(2,'trimestres')-0.15,170)}${T('h3','Amortización trimestral','up',W(2,'trimestres'),'margin-top:30px')}${T('body soft','Sistema alemán','up',W(2,'alemán')-0.1,'font-size:30px;margin-top:8px')}</div>
 <div class="abs col" style="left:720px;top:420px;width:480px;text-align:left;align-items:flex-start">${disc('seal',W(2,'contrato')-0.15,170)}${T('h3','Contrato intervenido<br>ante notario','up',W(2,'contrato'),'margin-top:30px')}</div>
 <div class="abs col" style="left:1280px;top:420px;width:480px;text-align:left;align-items:flex-start">${disc('docPen',W(2,'intervenido')-0.1,170)}${T('h3','Firma','up',W(2,'intervenido')+0.05,'margin-top:30px')}${T('body soft','16/09/2026','up',W(2,'intervenido')+0.2,'font-size:30px;margin-top:8px')}</div>
`);

// 3 · Calendario de pagos — accent
const PAY=[['Mes 3',68625],['Mes 6',67094],['Mes 9',65563],['Mes 12',66531]];
function payBars(at){let h='';const x0=200,bw=150,gap=80,base=820,maxH=380;
 PAY.forEach(([m,v],i)=>{const hgt=Math.round(v/70000*maxH),x=x0+i*(bw+gap),a=at+i*0.35;
  h+=`<div class="abs" style="left:${x}px;top:${base-hgt}px;width:${bw}px;height:${hgt}px;background:#fff;transform-origin:bottom" ${A('growY',a,0.6)}></div>`;
  h+=`<div class="abs" style="left:${x-40}px;top:${base-hgt-62}px;width:${bw+80}px;text-align:center" ${A('up',a+0.35)}><span class="h3" style="color:var(--slate7);font-size:36px;font-weight:700">${fmt(v)}${NB}€</span></div>`;
  h+=`<div class="abs lbl" style="left:${x}px;top:${base+18}px;width:${bw}px;text-align:center;color:var(--slate7);font-size:28px" ${A('fade',a,0.4)}>${m}</div>`;});
 return h}
const lastX=200+3*(150+80);
scene(PS(3)-0.35,'accent',`
 ${eyebrow(160,150,'Calendario de pagos',PS(3)-0.1)}
 ${box(160,195,900,T('h2','Cuatro pagos <b>trimestrales</b>','words',W(3,'cuatro')-0.2,'color:#fff'))}
 <div class="abs" style="left:170px;top:820px;width:900px;height:3px;background:#fff;transform-origin:left" ${A('grow',W(3,'cuatro')-0.3,0.7)}></div>
 ${payBars(W(3,'cuatro'))}
 <div class="abs row" style="left:${lastX+150-420}px;width:420px;top:330px;gap:10px;justify-content:flex-end" ${A('pop',W(3,'bonus')-0.1,0.5)}><div style="width:16px;height:16px;border-radius:50%;background:var(--slate7)"></div><span class="lbl" style="font-size:24px;color:var(--slate7)">Incluye bonus a éxito de 2.500${NB}€</span></div>
 <div class="abs" style="left:1230px;top:300px;width:540px;height:520px;background:#fff;border-radius:6px;padding:56px 54px" ${A('up',W(3,'total')-0.3,0.6)}>
  ${T('eyebrow','Total de la operación','fade',W(3,'total'))}
  ${T('h-xl',cnt(250000,267813,W(3,'total'),0.8)+NB+'€','up',W(3,'total'),'font-size:78px;margin-top:16px;color:var(--slate)')}
  <div style="height:2px;background:var(--acc3);margin:44px 0 36px" ${A('grow',W(3,'beneficio')-0.2,0.6)}></div>
  ${T('eyebrow','Beneficio estimado','fade',W(3,'beneficio'))}
  ${T('h-xl',cnt(0,17813,W(3,'17813')-0.1,0.9)+NB+'€','up',W(3,'beneficio'),'font-size:78px;margin-top:16px;color:var(--slate)')}
  ${T('body soft','Bonus a éxito de 2.500'+NB+'€ incluido','up',W(3,'bonus'),'font-size:26px;margin-top:12px')}
 </div>
`);

// 4 · La empresa — light
scene(PS(4)-0.35,'light',`
 ${eyebrow(160,170,'La empresa',PS(4)-0.1)}
 ${box(160,220,1150,T('h1','Hilos, cordeles <b>y cuerdas</b>','words',W(4,'hilos')-0.15))}
 ${box(160,420,1150,T('body ink','Bajo la marca <b>Casasol</b>','words',W(4,'marca')-0.1))}
 <div class="abs" style="left:1330px;top:170px">${disc('spool',W(4,'fabrica')-0.2,300)}</div>
 <div class="abs" style="left:160px;top:560px;width:1300px;height:2px;background:var(--acc3);transform-origin:left" ${A('grow',W(4,'familiar')-0.3,0.7)}></div>
 ${box(160,600,700,T('lbl soft','Actividad familiar desde','up',W(4,'familiar')-0.1))}
 ${box(150,650,900,T('h-xl','1803','pop',W(4,'1803')-0.3,'font-size:190px;color:var(--slate)'))}
`);

// 5 · La empresa en cifras — accent
const stat=(cx,icon,at,value,label,sub='')=>`<div class="abs col" style="left:${cx-210}px;top:240px;width:420px">${disc(icon,at-0.2,170)}
  ${T('h-xl',value,'up',at,'font-size:84px;margin-top:34px;color:#fff;white-space:nowrap')}${T('lbl',label,'up',at+0.15,'margin-top:12px;color:var(--slate7);font-size:30px')}${sub?T('body',sub,'up',at+0.3,'font-size:24px;margin-top:6px;color:var(--slate7)'):''}</div>`;
scene(PS(5)-0.35,'accent',`
 ${eyebrow(160,150,'Filicor en cifras',PS(5)-0.1)}
 ${stat(330,'pie',W(5,'80')-0.1,'80-85'+NB+'%','de cuota','Industria cárnica y charcutera')}
 ${stat(750,'people',W(5,'42')-0.1,'42','empleados')}
 ${stat(1170,'globe',W(5,'20')-0.1,'+20','países','Foco en Latinoamérica')}
 ${stat(1590,'needle',W(5,'latinoamérica')+0.3,'2019','línea handmade')}
`);

// 6 · Cifras — dark (facturación)
const REV=[['2022',5.65,'5,65 M€'],['2023',6.23,'6,23 M€'],['2024',6.30,'6,30 M€'],['2025',7.2,'Más de 7,2 M€']];
function revBars(){let h='';const x0=170,bw=150,gap=70,base=830,scale=72;
 const at=[W(6,'2022')-0.2,W(6,'2022')+0.35,W(6,'2022')+0.7,W(6,'2025')-0.2];
 REV.forEach(([y,v,l],i)=>{const hgt=Math.round(v*scale),x=x0+i*(bw+gap),last=i===3;
  h+=`<div class="abs" style="left:${x}px;top:${base-hgt}px;width:${bw}px;height:${hgt}px;background:${last?'var(--acc5)':'var(--acc9)'};transform-origin:bottom" ${A('growY',at[i],0.7)}></div>`;
  h+=`<div class="abs" style="left:${x-50}px;top:${base-hgt-56}px;width:${bw+100}px;text-align:center" ${A('up',at[i]+0.4)}><span class="lbl" style="color:#fff;font-weight:600;font-size:${last?26:30}px;white-space:nowrap">${l.replace(' M€',NB+'M€')}</span></div>`;
  h+=`<div class="abs lbl" style="left:${x}px;top:${base+18}px;width:${bw}px;text-align:center;color:var(--acc5);font-size:28px" ${A('fade',at[i],0.4)}>${y}</div>`;});
 return h}
scene(PS(6)-0.35,'dark',`
 ${eyebrow(160,150,'Facturación',PS(6)-0.1)}
 ${box(160,195,900,T('h2','De 5,6 a <span class="hl">más de 7,2'+NB+'M€</span>','words',W(6,'facturación')-0.1))}
 <div class="abs" style="left:160px;top:830px;width:880px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',W(6,'facturación'),0.7)}></div>
 ${revBars()}
 <div class="abs" style="left:1180px;top:300px;width:580px;height:530px;background:var(--slate7);border-radius:6px;padding:56px 54px" ${A('up',W(6,'ebitda')-0.3,0.6)}>
  ${T('eyebrow','EBITDA 2025','fade',W(6,'ebitda'))}
  ${T('h-xl',cnt(0,924899,W(6,'ebitda'),1.0)+NB+'€','up',W(6,'ebitda'),'font-size:80px;margin-top:16px;color:#fff')}
  <div style="height:2px;background:var(--acc9);margin:44px 0 36px" ${A('grow',W(6,'ejercicio')-0.2,0.6)}></div>
  ${T('eyebrow','Patrimonio neto a 31/05/2026','fade',W(6,'ejercicio'))}
  ${T('h-xl','2,6'+NB+'M€','up',W(6,'ejercicio')+0.1,'font-size:80px;margin-top:16px;color:#fff')}
 </div>
`);

// 7 · Garantía e historial — light
scene(PS(7)-0.35,'light',`
 ${eyebrow(160,160,'Garantía',PS(7)-0.1)}
 <div class="abs card" style="left:160px;top:220px;width:760px;height:600px;padding:56px 60px" ${A('up',W(7,'aval')-0.3,0.6)}>
  <div class="row" style="gap:34px">${disc('advisor',W(7,'aval')-0.15,150)}${T('h2','Aval<br><b>personal</b>','words',W(7,'aval'))}</div>
  <div class="row" style="gap:22px;margin-top:56px" ${A('up',W(7,'socio')-0.1)}><div style="width:12px;height:12px;border-radius:50%;background:var(--acc)"></div><div class="body ink">Socio con el <b>34${NB}% del capital</b></div></div>
  <div class="row" style="gap:22px;margin-top:26px" ${A('up',W(7,'2011')-0.2)}><div style="width:12px;height:12px;border-radius:50%;background:var(--acc)"></div><div class="body ink">En la dirección <b>desde 2011</b></div></div>
 </div>
 ${eyebrow(1000,160,'Financiaciones previas',W(7,'filicor')-0.1)}
 <div class="abs" style="left:1000px;top:220px;width:760px">
  ${['2024|100000','2025|200000'].map((r,i)=>{const [y,v]=r.split('|');const at=W(7,y)-0.2;return `<div class="row" style="justify-content:space-between;padding:40px 0;border-bottom:2px solid var(--acc3)" ${A('up',at)}><span class="h2" style="color:var(--acc)">${y}</span><span class="h2"><b>${fmt(+v)}${NB}€</b></span></div>`}).join('')}
  <div class="row" style="gap:24px;margin-top:50px" ${A('up',W(7,'corriente')-0.2)}><div style="width:84px;height:84px;color:var(--slate)">${ico('check',W(7,'corriente')-0.1,84)}</div><div class="h3">Al corriente de pago</div></div>
 </div>
`);

// 8 · Riesgos y mitigantes — light-dark split
const RISKS=[['coin','Fondo de maniobra negativo','Working capital · desde 2023','fondo','Flujo de caja operativo positivo','genera'],
 ['advisor','Concentración de la gestión','Key person risk','concentración','Responsable de administración desde finales de 2024','incorporado'],
 ['globe','Suministro desde Asia','Geopolítico','dependencia','Mayor stock de seguridad y distribuidores locales','ampliado']];
function riskCol(i){const [icon,t,s,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(8,rw)-0.2,ma=W(9,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:230px;width:500px;height:300px;padding:34px 36px;background:#fff;box-shadow:inset 0 0 0 2px var(--acc3);border-radius:6px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,96)}<div class="eyebrow" style="font-size:20px">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,'margin-top:26px;font-size:36px')}${T('body soft',s,'up',ra+0.35,'font-size:24px;margin-top:8px')}</div>
  <div class="abs" style="left:${x+234}px;top:548px;width:32px;height:58px;color:var(--acc)" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:620px;width:500px;height:240px;padding:34px 36px;background:var(--slate);border-radius:6px" ${A('up',ma,0.6)}>
   <div class="eyebrow" style="font-size:20px;color:var(--acc5)">Mitigante</div>
   ${T('h3',m,'up',ma+0.15,'margin-top:20px;font-size:34px;color:#fff')}</div>`}
scene(PS(8)-0.35,'light',`
 ${eyebrow(160,160,'Riesgos y mitigantes',PS(8)-0.1)}
 <div class="abs row" style="left:1520px;top:140px;gap:16px;padding:10px 26px;border-radius:12px;background:var(--slate)" ${A('pop',W(8,'riesgos')+0.2,0.5)}><span class="eyebrow" style="color:var(--acc5);font-size:20px">Rating</span><span class="h3" style="color:#fff;font-weight:700">B</span></div>
 ${riskCol(0)}${riskCol(1)}${riskCol(2)}
`);

// 9 · Cierre — light
const END=PE(10)+0.4;
const pill=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:var(--slate);border-color:var(--acc3)" ${A('up',at)}>${ico(icon,at+0.05,38)}<span class="lbl" style="font-size:30px;color:var(--slate)">${txt}</span></div>`;
scene(PS(10)-0.35,'light',`
 <div class="abs" style="left:660px;top:190px;width:600px" ${A('wipe',PS(10)-0.1,0.9)}>${LOGO}</div>
 ${box(0,350,1920,T('h2','Financiación privada <b>para empresas</b>','words',PS(10)+0.4,'text-align:center'))}
 ${box(0,480,1920,T('eyebrow','Relación con Inversores','fade',W(10,'relación')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:535px;justify-content:center;gap:24px">${pill('mail','inversores@vanniloholding.com',W(10,'inversores'))}${pill('globe','www.vhfs.es',W(10,'inversores')+0.25)}</div>
 <div class="abs row" style="left:0;width:1920px;top:625px;justify-content:center;gap:24px">${pill('phone','(+34) 689 683 479',W(10,'disposición')-0.2)}${pill('phone','(+34) 911 632 094',W(10,'disposición'))}</div>
 <div class="abs" style="left:360px;top:780px;width:1200px;height:1px;background:var(--acc3);transform-origin:center" ${A('grow',END,0.8)}></div>
 ${box(310,805,1300,T('body','Documento interno con fines informativos. Las rentabilidades indicadas son estimaciones netas — ya descontadas todas las comisiones aplicables. No contempladas retenciones fiscales aplicables al inversor','fade',END+0.2,'font-size:24px;line-height:1.55;color:#8492A8;text-align:center'))}
`,{noCorner:true,noSubsAfter:END});
