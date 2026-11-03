// helpers (same system as the rama financiera video)
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const cnt=(from,to,at,d=0.9,raw=false)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"${raw?' data-raw="1"':''}`)}>${raw?to:fmt(to)}</span>`;
const NB=' '; // espacio fino antes de € y %
const eyebrow=(x,y,txt,at)=>box(x,y,1200,T('eyebrow',txt,'left',at));
const chip=(icon,txt,at)=>`<div class="card row" style="padding:22px 38px 22px 26px;gap:22px" ${A('up',at)}>${ico(icon,at+0.1,60,'color:var(--slate)')}<div class="lbl">${txt}</div></div>`;

// 1 · Apertura — light
scene(0,'light',`
 <div class="abs row" style="left:0;width:1920px;top:200px;justify-content:center">
  <div class="pill eyebrow" style="border-color:var(--acc3);padding:12px 30px;letter-spacing:.28em" ${A('up',0.25)}>Oportunidad de inversión</div></div>
 ${box(0,270,1920,T('h-xl','Filicor 3','up',W(0,'filicor')-0.2,'font-size:200px;text-align:center;color:var(--slate)'))}
 ${box(0,500,1920,T('body ink','Tercera operación de financiación <b>con Filicor</b>','words',W(0,'tercera')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:620px;justify-content:center;gap:32px">
  ${chip('nave','Industria',W(0,'industrial')-0.2)}${chip('euroDoc','Deuda simple',W(0,'industrial')+0.1)}
 </div>
 ${box(0,790,1920,T('body soft','Más de dos siglos de historia familiar','words',W(0,'siglos')-0.4,'text-align:center;font-size:30px'))}
`);

// 2 · Quién es Filicor — accent
const who=(y,icon,at,html)=>`<div class="abs row" style="left:1000px;top:${y}px;gap:34px">${disc(icon,at-0.15,130)}${T('h3',html,'up',at,'color:#fff')}</div>`;
scene(PS(1)-0.35,'accent',`
 ${eyebrow(160,160,'Quién es Filicor',PS(1)-0.1)}
 <div class="abs" style="left:160px;top:300px;width:760px" ${OUT(W(1,'1803')-0.35)}>${T('lbl','Empresa familiar','up',W(1,'constituida')-0.3,'color:var(--slate7)')}${T('h-xl','Constituida en 1992','up',W(1,'constituida')-0.1,'font-size:76px;color:#fff;margin-top:12px')}</div>
 <div class="abs" style="left:160px;top:250px;width:760px" ${OUT(W(1,'generación')-0.3)}>${T('lbl','Actividad familiar desde','fade',W(1,'1803')-0.2,'color:var(--slate7)')}</div>
 ${box(160,250,760,T('lbl','Empresa constituida en','fade',W(1,'generación'),'color:var(--slate7)'))}
 ${box(150,300,800,T('h-xl',cnt(1803,1992,W(1,'generación')-0.1,1.6,true),'pop',W(1,'1803')-0.2,'font-size:230px;color:#fff'))}
 ${box(160,580,760,T('body','La actividad se remonta a 1803 y pasa de generación en generación','words',W(1,'generación',1)+0.3,'color:var(--slate7);font-size:30px'))}
 <div class="abs" style="left:950px;top:250px;width:2px;height:520px;background:#fff;transform-origin:top;opacity:.6" ${A('growY',W(1,'hilos')-0.3,0.6)}></div>
 ${who(250,'spool',W(1,'hilos')-0.1,'Hilos, cordeles<br>y cuerdas')}
 ${who(440,'euroDoc',W(1,'marca')-0.1,'Marca <b>Casasol</b>')}
 ${who(630,'people',W(1,'42')-0.15,'<b>42</b> empleados')}
`);

// 3 · Propuesta de valor — dark (cifra grande)
scene(PS(2)-0.35,'dark',`
 ${eyebrow(160,170,'Propuesta de valor',PS(2)-0.1)}
 <div class="abs row" style="left:150px;top:290px;gap:60px">
  ${T('h-xl','80-85'+NB+'%','pop',W(2,'80')-0.2,'font-size:260px;color:var(--acc5);white-space:nowrap')}
  <div>${T('h2','de cuota','up',W(2,'cuota')-0.3,'color:#fff')}${T('body soft','en la industria cárnica<br>y charcutera','words',W(2,'cárnica')-0.1,'margin-top:10px')}</div>
 </div>
`);

// 3b · Diferenciación — light
const vcol=(x,icon,at,title,sub)=>`<div class="abs col" style="left:${x}px;top:330px;width:480px;text-align:left;align-items:flex-start">${disc(icon,at-0.15,170)}${T('h3',title,'up',at,'margin-top:30px')}${T('body soft',sub,'up',at+0.2,'font-size:28px;margin-top:8px')}</div>`;
scene(PS(3)-0.35,'light',`
 ${eyebrow(160,160,'Qué la hace sólida',PS(3)-0.1)}
 ${box(160,205,1500,T('h2','El sector trabaja <b>con Filicor</b>','words',W(3,'grandes')-0.2))}
 ${vcol(160,'seal',W(3,'certificaciones')-0.1,'Producto certificado','Las grandes empresas del sector exigen sus certificaciones')}
 ${vcol(720,'growth',W(3,'subidas')-0.2,'2 subidas de precio en 2026','Sin pérdida de clientes')}
 ${vcol(1280,'needle',W(3,'2019')-0.2,'Línea handmade','Hilos para manualidades desde 2019')}
`);

// 4 · Mercados — accent
const mkt=(icon,txt,at)=>`<div class="row" style="gap:20px;background:#fff;border-radius:6px;padding:22px 34px 22px 24px" ${A('up',at)}>${ico(icon,at+0.1,56,'color:var(--slate)')}<span class="lbl" style="color:var(--slate)">${txt}</span></div>`;
scene(PS(4)-0.35,'accent',`
 ${eyebrow(160,170,'Mercados',PS(4)-0.1)}
 <div class="abs row" style="left:150px;top:260px;gap:50px">
  ${T('h-xl','+20','pop',W(4,'20')-0.2,'font-size:240px;color:#fff')}
  <div>${T('h2','países','up',W(4,'países')-0.2,'color:#fff')}${T('body','Foco en <b>Latinoamérica</b>','words',W(4,'latinoamérica')-0.2,'color:var(--slate7);margin-top:8px')}</div>
 </div>
 <div class="abs row" style="left:160px;top:640px;gap:24px">
  ${mkt('pin','Oficina comercial en <b>Lima</b>',W(4,'lima')-0.2)}${mkt('globe','Perú',W(4,'perú')-0.15)}${mkt('globe','Colombia',W(4,'colombia')-0.15)}${mkt('globe','México',W(4,'méxico')-0.15)}
 </div>
`);

// 5 · Cifras — dark
const REV=[['2022',5.65,'5,65 M€'],['2023',6.23,'6,23 M€'],['2024',6.30,'6,30 M€'],['2025',7.2,'Más de 7,2 M€']];
function revBars(){let h='';const x0=170,bw=150,gap=70,base=830,scale=72;
 const at=[W(5,'2022')-0.2,W(5,'2022')+0.35,W(5,'2022')+0.7,W(5,'2025')-0.2];
 REV.forEach(([y,v,l],i)=>{const hgt=Math.round(v*scale),x=x0+i*(bw+gap),last=i===3;
  h+=`<div class="abs" style="left:${x}px;top:${base-hgt}px;width:${bw}px;height:${hgt}px;background:${last?'var(--acc5)':'var(--acc9)'};transform-origin:bottom" ${A('growY',at[i],0.7)}></div>`;
  h+=`<div class="abs" style="left:${x-50}px;top:${base-hgt-56}px;width:${bw+100}px;text-align:center" ${A('up',at[i]+0.4)}><span class="lbl" style="color:#fff;font-weight:600;font-size:${last?26:30}px;white-space:nowrap">${l.replace(' M€',NB+'M€')}</span></div>`;
  h+=`<div class="abs lbl" style="left:${x}px;top:${base+18}px;width:${bw}px;text-align:center;color:var(--acc5);font-size:28px" ${A('fade',at[i],0.4)}>${y}</div>`;});
 return h}
const kv=(label,val,at,first=false)=>`${first?'':`<div style="height:2px;background:var(--acc9);margin:30px 0 26px" ${A('grow',at-0.2,0.6)}></div>`}${T('eyebrow',label,'fade',at)}${T('h-xl',val,'up',at+0.05,'font-size:66px;margin-top:12px;color:#fff')}`;
scene(PS(5)-0.35,'dark',`
 ${eyebrow(160,150,'Cifras',PS(5)-0.1)}
 ${box(160,195,900,T('h2','De 5,6 a <span class="hl">más de 7,2'+NB+'M€</span>','words',W(5,'facturación')-0.1))}
 <div class="abs" style="left:160px;top:830px;width:880px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',W(5,'facturación'),0.7)}></div>
 ${revBars()}
 <div class="abs" style="left:1180px;top:250px;width:580px;height:600px;background:var(--slate7);border-radius:6px;padding:46px 54px" ${A('up',W(5,'ebitda')-0.3,0.6)}>
  ${kv('EBITDA 2025',cnt(0,924899,W(5,'ebitda'),1.0)+NB+'€',W(5,'ebitda'),true)}
  ${kv('Margen EBITDA sobre ventas','≈ 13'+NB+'%',W(5,'margen')-0.2)}
  ${kv('Patrimonio neto a 31/05/2026','2,6'+NB+'M€',W(5,'margen')+0.8)}
 </div>
`);

// 6 · La operación — light (cambio de fondo claro: empieza la operación)
const opChip=(icon,label,val,at)=>`<div class="card" style="width:500px;padding:34px 40px" ${A('up',at-0.2,0.6)}><div class="row" style="gap:18px"><div style="width:52px;height:52px;color:var(--slate)">${ico(icon,at,52)}</div>${T('eyebrow',label,'fade',at)}</div>${T('h2',val,'up',at+0.1,'margin-top:18px')}</div>`;
scene(PS(6)-0.35,'light',`
 ${eyebrow(160,160,'La operación · Filicor 3',PS(6)-0.1)}
 ${box(160,215,900,T('lbl soft','Préstamo de','up',W(6,'préstamo')-0.2))}
 ${box(150,262,1300,T('h-xl',cnt(0,250000,W(6,'250000')-0.1,0.9)+NB+'€','up',W(6,'250000')-0.2,'font-size:180px;color:var(--slate)'))}
 <div class="abs row" style="left:160px;top:530px;gap:40px">
  ${opChip('calendar','Plazo','12 meses',W(6,'doce')-0.1)}${opChip('drop','Destino','Circulante',W(6,'circulante')-0.1)}
 </div>
 <div class="abs" style="left:1240px;top:520px;width:520px">
  ${T('eyebrow','Para','fade',W(6,'mejorar')-0.3)}
  <div class="row" style="gap:18px;margin-top:22px;align-items:flex-start" ${A('up',W(6,'mejorar')-0.1)}><div style="width:12px;height:12px;margin-top:16px;border-radius:50%;background:var(--acc);flex:none"></div><div class="body ink" style="font-size:32px">Mejorar las condiciones con proveedores</div></div>
  <div class="row" style="gap:18px;margin-top:22px;align-items:flex-start" ${A('up',W(6,'impulsar')-0.1)}><div style="width:12px;height:12px;margin-top:16px;border-radius:50%;background:var(--acc);flex:none"></div><div class="body ink" style="font-size:32px">Impulsar el desarrollo comercial en Latinoamérica</div></div>
 </div>
`);

// 6b · Rentabilidad y pagos — dark
const PAY=[['Mes 3',68625],['Mes 6',67094],['Mes 9',65563],['Mes 12',66531]];
function payBars(at){let h='';const x0=900,bw=120,gap=60,base=760,maxH=300;
 PAY.forEach(([m,v],i)=>{const hgt=Math.round(v/70000*maxH),x=x0+i*(bw+gap),a=at+i*0.25;
  h+=`<div class="abs" style="left:${x}px;top:${base-hgt}px;width:${bw}px;height:${hgt}px;background:var(--acc5);transform-origin:bottom" ${A('growY',a,0.6)}></div>`;
  h+=`<div class="abs" style="left:${x-40}px;top:${base-hgt-50}px;width:${bw+80}px;text-align:center" ${A('up',a+0.3)}><span class="lbl" style="color:#fff;font-size:26px;font-weight:600;white-space:nowrap">${fmt(v)}${NB}€</span></div>`;
  h+=`<div class="abs lbl" style="left:${x}px;top:${base+16}px;width:${bw}px;text-align:center;color:var(--acc5);font-size:24px" ${A('fade',a,0.4)}>${m}</div>`;});
 return h}
const rate=(y,label,val,sub,at)=>`<div class="abs" style="left:160px;top:${y}px;width:620px" ${A('up',at-0.15,0.6)}>${T('eyebrow',label,'fade',at)}<div class="row" style="gap:22px;align-items:baseline;margin-top:10px">${T('h-xl',val,'up',at+0.05,'font-size:110px;color:#fff')}${sub?T('body soft',sub,'up',at+0.25,'font-size:26px'):''}</div></div>`;
scene(PS(7)-0.35,'dark',`
 ${eyebrow(160,150,'Rentabilidad y pagos',PS(7)-0.1)}
 ${rate(220,'TIN','9,8'+NB+'%','',W(7,'nominal')-0.1)}
 ${rate(450,'TAE inversor','11,8'+NB+'%','Estimada, neta',W(7,'tae')-0.1)}
 ${box(160,700,640,T('body soft','Amortización trimestral · sistema alemán<br>Contrato intervenido ante notario','up',W(7,'trimestrales')-0.1,'font-size:26px;line-height:1.6'))}
 ${box(900,190,880,T('eyebrow','Pagos trimestrales de capital e intereses','fade',W(7,'pagos')-0.2))}
 <div class="abs" style="left:890px;top:760px;width:720px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',W(7,'pagos')-0.2,0.6)}></div>
 ${payBars(W(7,'pagos'))}
 <div class="abs" style="left:900px;top:840px;width:860px" ${A('up',W(7,'intereses')+0.3,0.6)}><span class="lbl" style="color:#fff">Beneficio estimado <b>${fmt(17813)}${NB}€</b></span><span class="body soft" style="font-size:24px"> · bonus a éxito de 2.500${NB}€ incluido</span></div>
`);

// 6c · Garantía e historial — light
scene(PS(8)-0.35,'light',`
 ${eyebrow(160,160,'Garantía',PS(8)-0.1)}
 <div class="abs card" style="left:160px;top:220px;width:760px;height:600px;padding:56px 60px" ${A('up',W(8,'aval')-0.3,0.6)}>
  <div class="row" style="gap:34px">${disc('advisor',W(8,'aval')-0.15,150)}${T('h2','Aval<br><b>personal</b>','words',W(8,'aval'))}</div>
  <div class="row" style="gap:22px;margin-top:56px" ${A('up',W(8,'socio')-0.1)}><div style="width:12px;height:12px;border-radius:50%;background:var(--acc)"></div><div class="body ink">Socio con el <b>34${NB}% del capital</b></div></div>
  <div class="row" style="gap:22px;margin-top:26px" ${A('up',W(8,'dirige')-0.1)}><div style="width:12px;height:12px;border-radius:50%;background:var(--acc)"></div><div class="body ink">En la dirección <b>desde 2011</b></div></div>
 </div>
 ${eyebrow(1000,160,'Financiaciones anteriores con VHFS',W(8,'anteriores')-0.3)}
 <div class="abs" style="left:1000px;top:220px;width:760px">
  ${['2024|100000','2025|200000'].map((r,i)=>{const [y,v]=r.split('|');const at=W(8,'anteriores')+i*0.35;return `<div class="row" style="justify-content:space-between;padding:40px 0;border-bottom:2px solid var(--acc3)" ${A('up',at)}><span class="h2" style="color:var(--acc)">${y}</span><span class="h2"><b>${fmt(+v)}${NB}€</b></span></div>`}).join('')}
  <div class="row" style="gap:24px;margin-top:50px" ${A('up',W(8,'corriente')-0.2)}><div style="width:84px;height:84px;color:var(--slate)">${ico('check',W(8,'corriente')-0.1,84)}</div><div class="h3">Al corriente de pago</div></div>
 </div>
`);

// 7 · Riesgos y mitigantes — light
const RISKS=[['coin','Fondo de maniobra negativo','Working capital · desde 2023','fondo','Flujo de caja operativo positivo','genera'],
 ['advisor','Concentración de la gestión','Key person risk','concentración','Responsable de administración desde finales de 2024','incorporado'],
 ['globe','Suministro desde Asia','Geopolítico','dependencia','Mayor stock de seguridad y distribuidores locales','ampliado']];
function riskCol(i){const [icon,t,s,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(9,rw)-0.2,ma=W(10,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:230px;width:500px;height:300px;padding:34px 36px;background:#fff;box-shadow:inset 0 0 0 2px var(--acc3);border-radius:6px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,96)}<div class="eyebrow" style="font-size:20px">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,'margin-top:26px;font-size:36px')}${T('body soft',s,'up',ra+0.35,'font-size:24px;margin-top:8px')}</div>
  <div class="abs" style="left:${x+234}px;top:548px;width:32px;height:58px;color:var(--acc)" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:620px;width:500px;height:240px;padding:34px 36px;background:var(--slate);border-radius:6px" ${A('up',ma,0.6)}>
   <div class="eyebrow" style="font-size:20px;color:var(--acc5)">Mitigante</div>
   ${T('h3',m,'up',ma+0.15,'margin-top:20px;font-size:34px;color:#fff')}</div>`}
scene(PS(9)-0.35,'light',`
 ${eyebrow(160,160,'Riesgos y mitigantes',PS(9)-0.1)}
 <div class="abs row" style="left:1520px;top:140px;gap:16px;padding:10px 26px;border-radius:12px;background:var(--slate)" ${A('pop',W(9,'riesgos')+0.2,0.5)}><span class="eyebrow" style="color:var(--acc5);font-size:20px">Rating</span><span class="h3" style="color:#fff;font-weight:700">B</span></div>
 ${riskCol(0)}${riskCol(1)}${riskCol(2)}
`);

// 8 · Cómo participar — dark
const part=(x,icon,at,label,val)=>`<div class="abs" style="left:${x}px;top:340px;width:760px;height:340px;background:var(--slate7);border-radius:6px;padding:56px 60px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:24px"><div style="width:64px;height:64px;color:var(--acc5)">${ico(icon,at,64)}</div>${T('eyebrow',label,'fade',at)}</div>${T('h-xl',val,'up',at+0.1,'font-size:120px;margin-top:40px;color:#fff;white-space:nowrap')}</div>`;
scene(PS(11)-0.35,'dark',`
 ${eyebrow(160,170,'Cómo participar',PS(11)-0.1)}
 ${part(160,'coin',W(11,'inversión')-0.1,'Inversión mínima',cnt(0,10000,W(11,'10000')-0.1,0.7)+NB+'€')}
 ${part(1000,'calendar',W(11,'10000')+0.5,'Fecha límite','15/09/2026')}
`);

// 9 · Cierre — light
const END=PE(11)+0.4;
const pill=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:var(--slate);border-color:var(--acc3)" ${A('up',at)}>${ico(icon,at+0.05,38)}<span class="lbl" style="font-size:30px;color:var(--slate)">${txt}</span></div>`;
scene(W(11,'para')-0.35,'light',`
 <div class="abs" style="left:660px;top:170px;width:600px" ${A('wipe',W(11,'para')-0.1,0.9)}>${LOGO}</div>
 ${box(0,330,1920,T('h2','Financiación privada <b>para empresas</b>','words',W(11,'financiación')-0.1,'text-align:center'))}
 ${box(0,460,1920,T('eyebrow','Relación con Inversores','fade',W(11,'relación')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:515px;justify-content:center;gap:24px">${pill('mail','inversores@vanniloholding.com',W(11,'inversores')-0.1)}${pill('globe','www.vhfs.es',W(11,'inversores')+0.15)}</div>
 <div class="abs row" style="left:0;width:1920px;top:605px;justify-content:center;gap:24px">${pill('phone','(+34) 689 683 479',W(11,'disposición')-0.2)}${pill('phone','(+34) 911 632 094',W(11,'disposición'))}</div>
 <div class="abs" style="left:360px;top:770px;width:1200px;height:1px;background:var(--acc3);transform-origin:center" ${A('grow',END,0.8)}></div>
 ${box(310,795,1300,T('body','Documento interno con fines informativos. Las rentabilidades indicadas son estimaciones netas — ya descontadas todas las comisiones aplicables. No contempladas retenciones fiscales aplicables al inversor','fade',END+0.2,'font-size:24px;line-height:1.55;color:#8492A8;text-align:center'))}
`,{noCorner:true,noSubsAfter:END});
