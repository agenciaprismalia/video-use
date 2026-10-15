// helpers
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const colItem=(cx,y,icon,at,label,size=150,sub='',subAt=0)=>`<div class="abs col" style="left:${cx-200}px;top:${y}px;width:400px">${disc(icon,at,size)}${T('lbl',label,'up',at+0.15,'margin-top:26px')}${sub?T('body soft',sub,'up',subAt,'font-size:28px;margin-top:8px'):''}</div>`;

// S1 light
scene(0,'light',`
 <div class="abs col" style="left:300px;top:250px;width:600px">${disc('growth',W(0,'empresa')-0.25,250)}${T('h2','Diriges una empresa<br><b>en crecimiento</b>','words',W(0,'diriges')-0.1,'margin-top:40px;font-size:54px')}</div>
 <div class="abs line" style="left:959px;top:270px;width:3px;height:500px;background:var(--acc3);transform-origin:top" ${A('growY',W(0,'asesoras')-0.4,0.6)}></div>
 <div class="abs col" style="left:1020px;top:250px;width:600px">${disc('advisor',W(0,'asesoras')-0.25,250)}${T('h2','o asesoras<br><b>a una</b>','words',W(0,'asesoras')-0.15,'margin-top:40px;font-size:54px')}</div>
`);
// S2 dark
scene(W(0,'sabes')-0.3,'dark',`
 ${box(160,230,1150,T('h1','La financiación debe adaptarse <span class="hl">al ritmo del negocio</span>','words',W(0,'financiación')-0.1))}
 <div class="abs" style="left:1420px;top:190px;width:300px;height:300px;color:#fff" ${OUT(W(0,'cuando')-0.1)}>${ico('clock',W(0,'ritmo')-0.2,300)}</div>
 <div class="abs" style="left:1440px;top:520px;width:260px;height:260px;color:#fff">${ico('hourglass',W(0,'tarde')-0.1,260)}</div>
 <div class="abs line" style="left:160px;top:722px;width:520px;color:var(--acc5)" ${A('grow',W(0,'porque')-0.2,0.7)}></div>
 <div class="abs" style="left:664px;top:707px;width:34px;height:34px;color:var(--acc5)" ${A('fade',W(0,'porque')+0.4,0.2)}><svg class="ic" viewBox="0 0 64 64" style="stroke-width:6"><path d="M18 8l26 24-26 24"/></svg></div>
 ${box(740,660,640,T('body','Cuando llega tarde,<br><b>la oportunidad ya ha pasado</b>','words',W(0,'cuando')-0.05,'font-size:44px'))}
`);
// S3 light
scene(PS(1)-0.35,'light',`
 ${box(0,170,1920,T('lbl ink','Desde la rama financiera de','words',W(1,'desde'),'text-align:center;font-weight:400'))}
 <div class="abs" style="left:640px;top:250px;width:640px" ${A('wipe',W(1,'rama')-0.1,0.8)}>${LOGO}</div>
 ${box(0,450,1920,T('h1','Financiación privada <b>para empresas</b>','words',W(1,'financiación')-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:640px;justify-content:center;gap:40px">
  <div class="card row" style="padding:26px 40px 26px 30px;gap:24px" ${A('up',W(1,'territorio')-0.3)}>${ico('pin',W(1,'territorio')-0.15,76,'color:var(--slate)')}<div class="lbl">Todo el <b>territorio nacional</b></div></div>
  <div class="card row" style="padding:26px 40px 26px 30px;gap:24px" ${A('up',W(1,'proceso')-0.2)}>${ico('stopwatch',W(1,'proceso')-0.05,76,'color:var(--slate)')}<div class="lbl">Proceso de <b>estudio ágil</b></div></div>
 </div>
`);
// S4 accent
scene(PS(2)-0.35,'accent',`
 <div class="abs row" style="left:0;width:1920px;top:120px;justify-content:center;gap:44px">
  <div class="h-xl" style="font-size:330px;color:#fff" ${A('pop',W(2,'tres')-0.1,0.6)}>3</div>
  ${T('h1','Modalidades<br><b>de préstamo</b>','words',W(2,'modalidades')-0.1,'color:#fff;font-size:92px')}
 </div>
 ${box(0,475,1920,T('body','Según la <b>garantía</b> que respalda cada operación','words',W(2,'distinguen'),'text-align:center;color:var(--slate7)'))}
 ${colItem(560,580,'shPerson',W(2,'garantía')-0.2,'Personal',170)}
 ${colItem(960,580,'shHouse',W(2,'garantía')+0.25,'Hipotecaria',170)}
 ${colItem(1360,580,'shChart',W(2,'garantía')+0.7,'Pignoraticia',170)}
`);
// generic modality header
const modHead=(n,title,at,icon,iat)=>`
 ${box(160,190,1100,T('eyebrow','Modalidad '+n,'left',at-0.2))}
 ${box(160,240,1100,T('h1',title,'words',at))}
 <div class="abs" style="left:1330px;top:150px">${disc(icon,iat,300)}</div>`;
// S5 light
scene(PS(3)-0.35,'light',`
 ${modHead('01','Préstamo con<br><b>garantía personal</b>',W(3,'préstamo')-0.1,'shPerson',W(3,'garantía')-0.1)}
 <div class="abs" style="left:160px;top:530px;width:1200px;height:3px;background:var(--acc3);transform-origin:left" ${A('grow',W(3,'responde')-0.6,0.7)}></div>
 <div class="abs row" style="left:160px;top:575px;gap:30px" ${A('up',W(3,'responde')-0.2)}>${ico('building',W(3,'responde')-0.1,84,'color:var(--slate)')}<div class="body ink">Responde con su <b>patrimonio presente y futuro</b></div></div>
 <div class="abs row" style="left:160px;top:705px;gap:30px" ${A('up',W(3,'sin')-0.2)}>${ico('noAsset',W(3,'sin')-0.1,84,'color:var(--slate)')}<div class="body ink"><b>Sin aportar</b> un activo concreto</div></div>
`);
// S6 dark
scene(PS(4)-0.35,'dark',`
 <div class="abs" style="left:150px;top:150px;width:130px;height:130px;color:#fff">${ico('fastwatch',W(4,'más')-0.2,130)}</div>
 ${box(320,160,1300,T('h1','La modalidad <span class="hl">más ágil</span>','words',W(4,'modalidad')-0.1))}
 ${box(320,268,1300,T('body soft','Sin los trámites de una garantía real','words',W(4,'requiere')-0.1))}
 ${box(160,420,600,T('eyebrow','Financia','left',W(4,'financia')-0.2))}
 <div class="abs" style="left:160px;top:460px;width:1600px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',W(4,'financia')-0.2,0.8)}></div>
 ${colItem(480,500,'drop',W(4,'liquidez')-0.2,'Liquidez',170)}
 ${colItem(960,500,'gear',W(4,'inversión')-0.2,'Inversión en activos',170,'Maquinaria · Tecnología',W(4,'maquinaria'))}
 ${colItem(1440,500,'expand',W(4,'proyectos')-0.2,'Expansión',170)}
`);
// S7 light
scene(PS(5)-0.35,'light',`
 ${modHead('02','Préstamo con<br><b>garantía hipotecaria</b>',PS(5)+0.1,'shHouse',W(5,'patrimonio')-0.1)}
 ${box(160,445,1100,T('body ink','Respaldada con un <b>inmueble en propiedad</b>','words',W(5,'respaldar')-0.1))}
 ${colItem(420,560,'nave',W(5,'naves')-0.15,'Naves industriales',150)}
 ${colItem(780,560,'local',W(5,'locales')-0.15,'Locales comerciales',150)}
 ${colItem(1140,560,'office',W(5,'oficinas')-0.15,'Oficinas',150)}
 ${colItem(1500,560,'house',W(5,'viviendas')-0.15,'Viviendas',150)}
`);
// S8 accent
scene(PS(6)-0.35,'accent',`
 <div class="abs" style="left:160px;top:170px">${disc('percent',W(6,'condiciones')-0.3,220)}</div>
 ${box(440,180,1300,T('eyebrow','Garantía real','left',W(6,'garantía')-0.1))}
 ${box(440,228,1300,T('h1','Condiciones<br><b>más ventajosas</b>','words',W(6,'condiciones')-0.1,'color:#fff'))}
 <div class="abs" style="left:160px;top:520px;width:1600px;height:3px;background:#fff;transform-origin:left" ${A('grow',W(6,'posible')-0.4,0.8)}></div>
 <div class="abs row" style="left:160px;top:590px;gap:22px">
  ${disc('house',W(6,'aportar')-0.1,140)}${disc('house',W(6,'varios')-0.05,140)}${disc('house',W(6,'varios')+0.25,140)}
 </div>
 ${box(700,595,1100,T('h2','Uno o <b>varios inmuebles</b>','words',W(6,'aportar')-0.1,'color:#fff'))}
 ${box(700,672,1100,T('body','en una misma operación','words',W(6,'misma')-0.2,'color:var(--slate7)'))}
`);
// S9 light
scene(PS(7)-0.35,'light',`
 ${modHead('03','Préstamo con<br><b>garantía pignoraticia</b>',W(7,'tercera')-0.1,'shChart',W(7,'garantía')-0.1)}
 ${box(160,445,1100,T('body ink','<b>Activos financieros</b> como garantía','words',W(7,'activos')-0.1))}
 ${colItem(420,560,'candles',W(7,'acciones')-0.15,'Acciones',150)}
 ${colItem(780,560,'bond',W(7,'bonos')-0.15,'Bonos',150)}
 ${colItem(1140,560,'pie',W(7,'fondos')-0.15,'Fondos de inversión',150)}
 ${colItem(1500,560,'vault',W(7,'depósitos')-0.15,'Depósitos a plazo',150)}
`);
// S10 dark
scene(PS(8)-0.35,'dark',`
 <div class="abs" style="left:959px;top:230px;width:2px;height:560px;background:var(--acc9);transform-origin:top" ${A('growY',PS(8),0.8)}></div>
 <div class="abs col" style="left:120px;top:210px;width:800px">${disc('drop',W(8,'liquidez')-0.3,210)}
  ${T('h2','Liquidez <span class="hl">sin vender</span>','words',W(8,'liquidez')-0.05,'margin-top:44px')}
  ${T('body soft','sus inversiones','up',W(8,'inversiones')-0.1,'margin-top:10px')}</div>
 <div class="abs col" style="left:1000px;top:210px;width:800px">${disc('key',W(8,'mantiene')-0.2,210)}
  ${T('h2','Mantiene <span class="hl">la titularidad</span>','words',W(8,'mantiene')-0.05,'margin-top:44px')}
  ${T('body soft','del activo durante toda la operación','words',W(8,'activo')-0.1,'margin-top:10px')}</div>
`);
// S11 light — condiciones
const cnt=(from,to,at,d=0.9)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"`)}>${fmt(to)}</span>`;
scene(PS(9)-0.35,'light',`
 ${box(160,160,800,T('eyebrow','Condiciones','left',PS(9)-0.1))}
 <div class="abs card" style="left:160px;top:220px;width:780px;height:560px" ${A('up',W(9,'importes')-0.4,0.6)}>
  <div class="abs" style="left:60px;top:60px;color:var(--slate)">${ico('coin',W(9,'importes')-0.2,96)}</div>
  ${box(190,82,500,T('eyebrow','Importe','left',W(9,'importes')))}
  ${box(60,210,700,T('h3 soft','De','up',W(9,'cien')-0.2,'font-size:44px'))}
  ${box(60,262,700,T('h-xl','<b>'+cnt(0,100000,W(9,'cien')-0.1,0.7)+' €</b>','up',W(9,'cien')-0.2,'font-size:104px'))}
  ${box(60,392,700,T('h-xl','<span class="soft" style="font-size:44px;letter-spacing:-.01em;font-weight:600">a </span><b>'+cnt(100000,500000,W(9,'quinientos')-0.1,0.8)+' €</b>','up',W(9,'quinientos')-0.2,'font-size:104px'))}
 </div>
 <div class="abs card" style="left:980px;top:220px;width:780px;height:560px" ${A('up',W(9,'plazos')-0.4,0.6)}>
  <div class="abs" style="left:60px;top:60px;color:var(--slate)">${ico('calendar',W(9,'plazos')-0.2,96)}</div>
  ${box(190,82,500,T('eyebrow','Plazo','left',W(9,'plazos')))}
  ${box(60,210,700,T('h3 soft','De','up',W(9,'tres')-0.3,'font-size:44px'))}
  ${box(60,262,700,T('h-xl','<b>'+cnt(1,3,W(9,'tres')-0.2,0.4)+' meses</b>','up',W(9,'tres')-0.3,'font-size:104px'))}
  ${box(60,392,700,T('h-xl','<span class="soft" style="font-size:44px;letter-spacing:-.01em;font-weight:600">a </span><b>'+cnt(3,12,W(9,'doce')-0.15,0.6)+' meses</b>','up',W(9,'doce')-0.25,'font-size:104px'))}
 </div>
`);
// S12 dark — devolución
const X0=860,TW=880;
function track(y,at,kind){let h=`<div class="abs" style="left:${X0}px;top:${y+100}px;width:${TW}px;height:3px;background:var(--acc9);transform-origin:left" ${A('grow',at,0.7)}></div>`;
 for(let m=1;m<=12;m++){const x=X0+m*TW/12;h+=`<div class="abs" style="left:${x-1}px;top:${y+92}px;width:2px;height:18px;background:var(--acc9)" ${A('fade',at+0.04*m,0.2)}></div>`}
 if(kind==='bullet'){const x=X0+TW-58;h+=`<div class="abs" style="left:${x}px;top:${y}px;width:56px;height:100px;background:var(--acc5);transform-origin:bottom" ${A('growY',at+0.6,0.5)}></div>`}
 if(kind==='q'){for(let q=1;q<=4;q++){const x=X0+q*3*TW/12-58;h+=`<div class="abs" style="left:${x}px;top:${y+50}px;width:56px;height:50px;background:var(--acc5);transform-origin:bottom" ${A('growY',at+0.45+q*0.18,0.4)}></div>`}}
 if(kind==='m'){for(let m=1;m<=12;m++){const x=X0+m*TW/12-12;h+=`<div class="abs" style="left:${x}px;top:${y+64}px;width:24px;height:24px;border-radius:50%;background:#fff" ${A('pop',at+0.3+m*0.07,0.35)}></div>`}}
 return h}
scene(PS(10)-0.35,'dark',`
 ${box(160,150,900,T('eyebrow','Devolución del capital','left',PS(10)-0.1))}
 ${box(160,262,640,T('h2','Bullet','up',W(10,'vencimiento')-0.2)+T('body soft','Capital a vencimiento','up',W(10,'vencimiento'),'font-size:30px;margin-top:4px'))}
 ${track(240,W(10,'vencimiento')-0.2,'bullet')}
 ${box(160,442,660,T('h2','Amortización<br>trimestral','up',W(10,'amortización')-0.2,'font-size:52px'))}
 ${track(420,W(10,'amortización')-0.2,'q')}
 ${box(160,622,640,T('h2','Intereses','up',W(10,'intereses')-0.2)+T('body soft','Cada mes','up',W(10,'intereses'),'font-size:30px;margin-top:4px'))}
 ${track(600,W(10,'intereses')-0.2,'m')}
 ${box(X0,800,TW,T('body soft','Según el flujo de caja de cada empresa','words',W(10,'según')-0.1,'font-size:30px;text-align:right'))}
`);
// S13 accent
scene(PS(11)-0.35,'accent',`
 <div class="abs" style="left:160px;top:160px">${disc('ruler',W(11,'estructura')-0.2,210)}</div>
 ${box(440,170,1300,T('h1','Cada operación,<br><b>a medida</b>','words',W(11,'cada')-0.05,'color:#fff'))}
 ${box(440,380,1300,T('body','Para financiar la actividad o el crecimiento de la empresa','words',W(11,'destina')-0.1,'color:var(--slate7)'))}
 <div class="abs row" style="left:160px;top:560px;width:1600px;height:210px;background:var(--slate);padding:0 60px;gap:44px" ${A('wipe',W(11,'nunca')-0.35,0.6)}>
   <div style="width:120px;height:120px;color:#fff">${ico('noRefi',W(11,'nunca')-0.05,120)}</div>
   ${T('h2','Sin refinanciación <span style="color:var(--acc5)">de deuda</span>','words',W(11,'nunca'),'color:#fff')}
 </div>
`);
// S14 light — proceso
function step(cx,n,icon,at,title,sub,subAt){return `<div class="abs col" style="left:${cx-260}px;top:390px;width:520px">
  <div style="position:relative">${disc(icon,at,200)}
   <div class="abs h3" style="left:-6px;top:-6px;width:64px;height:64px;border-radius:50%;background:var(--slate);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700" ${A('pop',at+0.2,0.45)}>${n}</div></div>
  ${T('h3',title,'up',at+0.15,'margin-top:34px')}${T('body soft',sub,'up',subAt,'font-size:28px;margin-top:10px')}</div>`}
scene(PS(12)-0.35,'light',`
 ${box(160,150,900,T('eyebrow','Proceso','left',PS(12)-0.1))}
 ${box(160,195,1300,T('h1','Tres <b>pasos</b>','words',W(12,'tres')-0.15))}
 <div class="abs" style="left:540px;top:489px;width:300px;height:3px;background:var(--acc3);transform-origin:left" ${A('grow',W(12,'después')-0.5,0.5)}></div>
 <div class="abs" style="left:1080px;top:489px;width:300px;height:3px;background:var(--acc3);transform-origin:left" ${A('grow',W(12,'por')-0.5,0.5)}></div>
 ${step(420,1,'docSearch',W(12,'primero')-0.2,'Solicitud y evaluación','Análisis de la necesidad financiera',W(12,'análisis'))}
 ${step(960,2,'docPen',W(12,'después')-0.15,'Propuesta personalizada','Condiciones, plazos y estructura',W(12,'condiciones'))}
 ${step(1500,3,'docCheck',W(12,'por')-0.15,'Aprobación y formalización','Formalización del préstamo',W(12,'formalización'))}
`);
// S15 dark — requisitos
const req=(cx,top,at,label,sub)=>`<div class="abs col" style="left:${cx-260}px;top:380px;width:520px">${top}${T('h3',label,'up',at+0.15,'margin-top:30px')}${sub?T('body soft',sub,'up',at+0.3,'font-size:28px;margin-top:6px'):''}</div>`;
scene(PS(13)-0.35,'dark',`
 ${box(160,170,1200,T('eyebrow','Trabajamos con empresas con','left',PS(13)-0.1))}
 <div class="abs" style="left:160px;top:225px;width:1600px;height:2px;background:var(--acc9);transform-origin:left" ${A('grow',PS(13),0.8)}></div>
 ${req(420,`<div class="h-xl" style="font-size:150px;color:var(--acc5);height:200px;display:flex;align-items:center" ${A('pop',W(13,'más')-0.15,0.6)}>+3</div>`,W(13,'años')-0.1,'años de actividad')}
 <div class="abs" style="left:689px;top:390px;width:2px;height:400px;background:var(--acc9);transform-origin:top" ${A('growY',W(13,'facturación')-0.5,0.5)}></div>
 ${req(960,`<div class="h-xl" style="font-size:136px;letter-spacing:-0.02em;color:var(--acc5);height:200px;display:flex;align-items:center;white-space:nowrap" ${A('pop',W(13,'facturación')-0.1,0.6)}>+1 M€</div>`,W(13,'superior')-0.1,'de facturación')}
 <div class="abs" style="left:1229px;top:390px;width:2px;height:400px;background:var(--acc9);transform-origin:top" ${A('growY',W(13,'ausencia')-0.5,0.5)}></div>
 ${req(1500,`<div style="height:200px;display:flex;align-items:center">${disc('chartCheck',W(13,'ausencia')-0.2,190)}</div>`,W(13,'ausencia')-0.05,'Sin pérdidas contables')}
`);
// S15b accent — intermediarios
scene(W(13,'también')-0.35,'accent',`
 ${box(160,190,1200,T('eyebrow','Y también con','left',W(13,'también')-0.1))}
 <div class="abs row" style="left:160px;top:270px;gap:60px">${disc('people',W(13,'intermediarios')-0.25,240)}
  ${T('h1','Intermediarios y<br><b>consultores financieros</b>','words',W(13,'intermediarios')-0.1,'color:#fff')}</div>
 ${box(460,600,1300,T('body','que asesoran a las empresas','words',W(13,'asesoran')-0.2,'color:var(--slate7)'))}
`);
// S16 light end
const END=PE(14)+0.5, outA=END-0.35, inB=END-0.15;
const pillI=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:var(--slate);border-color:var(--acc3)" ${A('up',at)}>${ico(icon,at+0.05,40)}<span class="lbl" style="font-size:32px;color:var(--slate)">${txt}</span></div>`;
scene(PS(14)-0.35,'light',`
 <div ${OUT(outA)}>
  <div class="abs col" style="left:0;width:1920px;top:160px">${disc('globe',W(14,'tienes')-0.2,190)}
   ${T('h1','Solicita el estudio<br><b>de tu operación</b>','words',W(14,'operación')-0.2,'margin-top:50px;text-align:center')}
   <div style="margin-top:50px">${pillI('arrowR','www.vhfs.es',W(14,'web')-0.3)}</div></div>
 </div>
 <div class="abs" style="left:610px;top:330px;width:700px" ${A('wipe',inB,0.9)}>${LOGO}</div>
 ${box(0,515,1920,T('h2','Financiación privada <b>para empresas</b>','words',(END+0.6)-0.1,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:640px;justify-content:center;gap:28px">
   ${pillI('globe','www.vhfs.es',(END+0.6)+0.5)}${pillI('phone','914 516 306',(END+0.6)+0.75)}${pillI('mail','info@vhfs.es',(END+0.6)+1.0)}
 </div>
 <div class="abs" style="left:460px;top:868px;width:1000px;height:1px;background:var(--acc3);transform-origin:center" ${A('grow',(END+0.6)+1.1,0.8)}></div>
 <div class="abs row" style="left:0;width:1920px;top:886px;justify-content:center;gap:22px" ${A('fade',END+1.9,0.6)}>
   <img src="${GOB}" style="height:40px;width:auto;display:block">
   <div class="body" style="font-size:14px;line-height:1.5;color:var(--acc9);text-align:left;max-width:600px">Vannilo 4 Inversiones es una entidad supervisada y registrada por el Banco de España con Nº de Registro D517.<br>Nº 1015/2022 de la sección segunda.</div>
 </div>
 ${box(0,962,1920,T('body','VHFS no es entidad de crédito y no capta depósitos del público.','fade',END+2.1,'font-size:14px;color:var(--acc9);text-align:center'))}
`,{noCorner:true,noSubsAfter:outA});
