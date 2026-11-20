// Les Roquetes — según «Les Roquetes · Instrucciones para el vídeo».
// Rama inmobiliaria: azul pizarra + azul acento (sin gris azulado). Solo textos y cifras del documento.
const C={ink:'#101010',slate:'#394251',slate3:'#B6BCC6',a1:'#EEF2F8',a3:'#C3D3EB',a5:'#7D9FD1',a7:'#5A7FB4',a9:'#3E5B85'};
const A=(a,at,d,extra='')=>`data-a="${a}" data-at="${at.toFixed(3)}"${d?` data-d="${d}"`:''} ${extra}`;
const OUT=t=>`data-out="${t.toFixed(3)}"`;
function disc(icon,at,size=150,cls='',style=''){return `<div class="disc ${cls}" style="width:${size}px;height:${size}px;${style}" ${A('pop',at,0.55)}><i class="icon" data-icon="${icon}" ${A('draw',at+0.12,1.0)}></i></div>`}
function ico(icon,at,size,style='',extra=''){return `<i class="icon" data-icon="${icon}" style="width:${size}px;height:${size}px;${style}" ${A('draw',at,1.0)} ${extra}></i>`}
const box=(x,y,w,inner,style='')=>`<div class="abs" style="left:${x}px;top:${y}px;${w?`width:${w}px;`:''}${style}">${inner}</div>`;
const T=(cls,html,a,at,style='',extra='')=>`<div class="${cls}" style="${style}" ${A(a,at,null,extra)}>${html}</div>`;
const cnt=(from,to,at,d=0.9,raw=false)=>`<span ${A('count',at,d,`data-from="${from}" data-to="${to}"${raw?' data-raw="1"':''}`)}>${raw?to:fmt(to)}</span>`;
const NB='<span style="display:inline-block;width:.24em"></span>';
const eyebrow=(x,y,txt,at,color=C.a5)=>box(x,y,1300,T('eyebrow',txt,'left',at,`color:${color}`));
const chip=(icon,txt,at,style='',extra='')=>`<div class="row" style="background:${C.a1};border-radius:8px;padding:20px 32px 20px 22px;gap:20px;${style}" ${A('up',at,null,extra)}>${ico(icon,at+0.1,52,`color:${C.slate}`)}<div class="lbl" style="color:${C.ink};font-size:30px">${txt}</div></div>`;
const wchip=(icon,txt,at,extra='')=>`<div class="row" style="background:#fff;border-radius:8px;padding:18px 30px 18px 20px;gap:18px;box-shadow:0 6px 24px rgba(16,16,16,.25)" ${A('up',at,null,extra)}>${ico(icon,at+0.1,48,`color:${C.slate}`)}<div class="lbl" style="color:${C.ink};font-size:29px">${txt}</div></div>`;
const frameD=(x,y,w,h,inner,extra='')=>`<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px ${C.a3}" ${extra}>${inner}</div>`;
const card=(x,y,w,h,inner,at,bg=C.a1,extra='')=>`<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:8px;background:${bg};padding:40px 46px" ${A('up',at,0.6,extra)}>${inner}</div>`;

// ---------------------------------------------------------------- 1 · Portada — blanco
scene(0,'light',`
 <div class="abs" style="left:660px;top:150px;width:600px" ${A('wipe',W(0,'vannilo')-0.2,0.9)}>${LOGO}</div>
 ${box(0,305,1920,T('lbl','Vannilo Holding Financial Services presenta','words',W(0,'vannilo')+0.2,`color:${C.ink};font-weight:400;text-align:center`))}
 <div class="abs row" style="left:0;width:1920px;top:375px;justify-content:center"><div class="pill eyebrow" style="border-color:${C.a3};padding:12px 28px;letter-spacing:.28em;color:${C.a5}" ${A('up',W(0,'oportunidad')-0.2)}>Oportunidad de inversión inmobiliaria</div></div>
 ${box(0,450,1920,T('h-xl','Les Roquetes','up',W(0,'les')-0.15,`font-size:200px;color:${C.slate};text-align:center`))}
 <div class="abs row" style="left:0;width:1920px;top:690px;justify-content:center;gap:20px">${chip('shHouse','Préstamo hipotecario',W(0,'préstamo')-0.2)}${chip('building','Obra nueva residencial',W(0,'obra')-0.2)}</div>
`,{noCorner:true});

// ---------------------------------------------------------------- 2 · Ubicación — imagen a sangre
// Sant Pere de Ribes (contexto) → Barcelona (3,6 s, con «45 minutos de Barcelona») → vuelo de Google Earth (10 s)
// → ortofoto del barrio (misma zona y orientación que el último fotograma del vuelo) → ortofoto de la parcela,
// acercamiento ≤1,3x, parcela seleccionada y marcada.
const S2=PS(1)-0.35, tB=W(1,'45')-0.4, tF=tB+3.6, tO=tF+10.04;
// Último fotograma del vuelo → ortofoto 04 (px): similitud medida por correlación de bordes (escala 1,325, giro 1°)
const FM=[[1.3248,-0.02312,-306.32],[0.02312,1.3248,-270.59]];
const FD=FM[0][0]*FM[1][1]-FM[0][1]*FM[1][0], FI=[[FM[1][1]/FD,-FM[0][1]/FD],[-FM[1][0]/FD,FM[0][0]/FD]];
const C0={tx:-(FI[0][0]*FM[0][2]+FI[0][1]*FM[1][2]),ty:-(FI[1][0]*FM[0][2]+FI[1][1]*FM[1][2]),s:Math.hypot(FI[0][0],FI[1][0]),r:Math.atan2(FI[1][0],FI[0][0])*180/Math.PI};
const ZOOM={tx:0,ty:-228,s:1.3,r:0};                       // parcela centrada en (1235,470), 1,3x
const PARC=[[899,479],[1000,475],[1001,597],[899,599]];    // límites del solar en la ortofoto 04
const parcPath='M'+PARC.map(p=>p.join(' ')).join('L')+'Z';
const camKeys=JSON.stringify([[tO,C0.tx,C0.ty,C0.s,C0.r],[tO+0.6,C0.tx,C0.ty,C0.s,C0.r],[tO+1.7,0,0,1,0],[tO+1.9,0,0,1,0],[tO+3.5,ZOOM.tx,ZOOM.ty,ZOOM.s,0]]);
const world=(extra,cam,parcelAt,static_)=>`<div class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;${cam?'':`transform:translate(${ZOOM.tx}px,${ZOOM.ty}px) scale(${ZOOM.s})`}" ${cam?`data-a="cam" data-at="0" data-k='${camKeys}'`:''}>
  <img src="img/03_orto.jpg" style="position:absolute;left:0;top:0;width:3840px;height:2160px;transform-origin:0 0;transform:matrix(2,0,0,2,-2880,-1620)">
  <img src="img/04_orto.jpg" style="position:absolute;left:0;top:0;width:1920px;height:1080px" ${static_?'':A('fade',tO+1.3,0.5)}>
  <svg style="position:absolute;left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="0 0 1920 1080">
   <path d="M-2000 -2000H4000V3000H-2000Z ${parcPath}" fill-rule="evenodd" fill="rgba(16,16,16,0.42)" ${static_?'':A('fade',parcelAt,0.8)}/></svg>
  <div style="position:absolute;left:0;top:0;width:1920px;height:1080px" ${static_?'':A('draw',parcelAt,1.1)}><svg style="position:absolute;left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="0 0 1920 1080"><path d="${parcPath}" pathLength="1" fill="none" stroke="${C.a5}" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg></div>
  ${extra||''}</div>`;
const tP=tO+3.0;   // parcela seleccionada
scene(S2,'media',`
 <img src="img/spdr.jpg" data-k="1.10" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 62%;transform-origin:center" ${A('kb',S2,9)}>
 <div class="abs" style="left:160px;top:200px;background:#fff;border-radius:8px;padding:30px 40px;box-shadow:0 6px 24px rgba(16,16,16,.3)" ${A('up',W(1,'les')-0.2,0.6)} ${OUT(tB+0.1)}>
  ${T('eyebrow','Les Roquetes','fade',W(1,'les'),`color:${C.a5}`)}
  ${T('h2','Sant Pere de Ribes','up',W(1,'sant')-0.2,`color:${C.slate};margin-top:10px`)}
  ${T('lbl','Entre Sitges y Vilanova i la Geltrú','up',W(1,'entre')-0.2,`color:${C.ink};font-size:30px;margin-top:12px`)}
 </div>
 <div class="abs" style="inset:0;overflow:hidden" ${A('fade',tB,0.5)}>
  <img src="img/barcelona.jpg" style="position:absolute;left:0;top:0;height:1080px;width:2513px;transform-origin:0 0" data-a="cam" data-at="0" data-k='${JSON.stringify([[tB,0,0,1,0],[tB+3.6,-593,0,1,0]])}'>
  <div class="abs row" style="left:120px;top:760px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 6px 24px rgba(16,16,16,.25)" ${A('left',tB+0.35,0.6)}><div style="width:10px;align-self:stretch;background:${C.a5}"></div><div class="row" style="padding:20px 32px 20px 26px;gap:22px"><span class="h3" style="font-size:38px;color:${C.ink}">Barcelona</span><span class="lbl" style="color:${C.slate};font-size:34px">·</span><span class="lbl" style="color:${C.slate};font-size:36px">A menos de 45 min</span></div></div>
 </div>
 <div class="abs" style="inset:0" ${A('fade',tF,0.4)}><img style="position:absolute;inset:0;width:100%;height:100%" src="img/fly/f000.jpg" data-a="seq" data-at="${tF.toFixed(3)}" data-n="251" data-pat="img/fly/f%03d.jpg"></div>
 <div class="abs" style="inset:0;overflow:hidden" ${A('fade',tO,0.8)}>${world(`<div></div>`,true,tP,false)}</div>
 <div class="abs" style="left:1233px;top:553px;width:2px;height:38px;background:${C.a5};transform-origin:top" ${A('growY',tP+0.6,0.4)}></div>
 <div class="abs row" style="left:935px;top:590px;width:600px;justify-content:center"><div class="row" style="background:#fff;border-radius:8px;padding:16px 28px 16px 18px;gap:16px;box-shadow:0 6px 24px rgba(16,16,16,.3)" ${A('up',tP+0.8)}>${ico('pin',tP+0.9,44,`color:${C.slate}`)}<span class="lbl" style="font-size:28px;color:${C.ink};white-space:nowrap">Parcela del proyecto · C/ Amadeo I, 15</span></div></div>
 <div class="abs col" style="left:160px;top:200px;gap:18px;align-items:flex-start">
  ${wchip('fastwatch','A menos de 45 min de Barcelona · Autopista o Cercanías',W(1,'autopista')-0.3)}
  ${wchip('people','Colegios · Salud · Comercio · Ocio',W(1,'colegios')-0.3)}
  ${wchip('growth','Mercado litoral al alza · Escasez de obra nueva',W(1,'mercado')-0.3)}
 </div>
`,{credits:[[S2,tB+0.3,'Foto: Mick Stephenson, CC BY-SA 3.0','onphoto'],[tO,1e9,'Institut Cartogràfic i Geològic de Catalunya','onphoto']]});

// ---------------------------------------------------------------- 3 · El proyecto — blanco
// Entrada: sobre la parcela seleccionada, el alzado se levanta desde el solar y pasa a su marco.
const S3=Math.max(PS(2)-0.35,tP+2.2);
const PR=[1169,390,132,161];                     // solar en pantalla (ortofoto 04 a 1,3x)
const FR=[1240,140,520,690];                      // marco de los planos
const SEC={w:467,h:455}, ALZ={w:492,h:700};
const fit=(o,W_,H_)=>{const k=Math.min(W_/o.w,H_/o.h);return {w:o.w*k,h:o.h*k,x:(W_-o.w*k)/2,y:(H_-o.h*k)/2,k}};
const fs=fit(SEC,FR[2]-48,FR[3]-48), fa=fit(ALZ,FR[2]-48,FR[3]-48);
const tSec=Math.max(S3+2.3,W(2,'planta',1)-0.9);
// cada planta se resalta cuando la voz la nombra (nunca antes de que esté la sección en pantalla)
const FLOORS=[['Planta baja','Garaje y acceso',236,372,Math.max(W(2,'planta',1)-0.2,tSec+0.5)],
              ['Primera planta','Salón comedor, cocina y terraza',124,234,Math.max(W(2,'primera')-0.2,tSec+1.5)],
              ['Segunda planta','2 dormitorios, baño completo y balcón',8,122,Math.max(W(2,'segunda')-0.2,tSec+2.5)]];
const tFich=Math.max(W(2,'terreno')-0.5,FLOORS[2][4]+1.5);
const band=(f,i)=>{const [,, y0,y1,at]=f,nx=i+1<FLOORS.length?FLOORS[i+1][4]:tFich;
  return `<div class="abs" style="left:${24+fs.x+18*fs.k}px;top:${24+fs.y+y0*fs.k}px;width:${445*fs.k}px;height:${(y1-y0)*fs.k}px;background:rgba(125,159,209,.30);box-shadow:inset 0 0 0 3px ${C.a5}" ${A('fade',at,0.4)} ${OUT(nx)}></div>`};
const floorRow=(f,i)=>{const [n,txt,,,at]=f;return `<div class="abs row" style="left:160px;top:${640-i*120}px;gap:22px" ${A('up',at)} ${OUT(tFich)}><div style="width:14px;height:64px;border-radius:3px;background:${C.a5}"></div><div>${T('eyebrow',n,'fade',at,`color:${C.a5};font-size:22px`)}${T('lbl',txt,'fade',at+0.1,`color:${C.ink};font-size:32px;margin-top:6px`)}</div></div>`};
scene(S3,'light',`
 <div class="abs" style="inset:0;overflow:hidden" ${OUT(S3+1.0)}>${world('',false,0,true)}</div>
 <div class="abs" style="left:${PR[0]}px;top:${PR[1]}px;width:${PR[2]}px;height:${PR[3]}px;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px ${C.a3}" data-a="rect" data-at="${(S3+1.0).toFixed(3)}" data-d="1.1" data-r0='${JSON.stringify(PR)}' data-r1='${JSON.stringify(FR)}'>
  <div style="position:absolute;inset:0" ${A('rise',S3+0.15,1.0)}>
   <img src="img/alzado.jpg" style="position:absolute;left:50%;top:50%;height:calc(100% - 48px);transform:translate(-50%,-50%)" ${OUT(tSec)}>
   <img src="img/seccion.jpg" style="position:absolute;left:${24+fs.x}px;top:${24+fs.y}px;width:${fs.w}px;height:${fs.h}px" ${A('fade',tSec,0.6)}>
   ${FLOORS.map(band).join('')}
  </div>
 </div>
 ${eyebrow(160,150,'El proyecto',S3+1.4)}
 ${card(160,200,980,180,T('h3','2 viviendas pareadas · 3 plantas · Unos 111 m² construidos cada una','words',Math.max(S3+1.6,W(2,'viviendas')-0.3),`color:${C.slate};font-size:42px;line-height:1.25`),Math.max(S3+1.5,W(2,'viviendas')-0.4))}
 ${FLOORS.map(floorRow).join('')}
 <div class="abs col" style="left:160px;top:410px;gap:12px;align-items:flex-start">
  ${chip('docCheck','Terreno en propiedad',Math.max(W(2,'terreno')-0.2,tFich+0.4+0*0.35),'padding:13px 30px 13px 20px')}
  ${chip('docPen','Proyecto técnico visado',Math.max(W(2,'proyecto',1)-0.2,tFich+0.4+1*0.35),'padding:13px 30px 13px 20px')}
  ${chip('seal','Licencia de obra mayor concedida (oct. 2025)',Math.max(W(2,'licencia')-0.2,tFich+0.4+2*0.35),'padding:13px 30px 13px 20px')}
  ${chip('calendar','Presupuesto de obra cerrado · 12 meses de ejecución',Math.max(W(2,'presupuesto')-0.2,tFich+0.4+3*0.35),'padding:13px 30px 13px 20px')}
 </div>
 ${box(160,800,1000,T('body','Promotora: Providence Estates S.L. · Construcción: Encofest','fade',W(2,'promotora')-0.2,`font-size:22px;color:${C.slate}`))}
`,{cut:true,credits:[[S3,S3+1.4,'Institut Cartogràfic i Geològic de Catalunya','onphoto']]});

// ---------------------------------------------------------------- 4 · La operación, su valor y sus garantías
// 4a · Préstamo y cómo funciona — blanco
scene(PS(3)-0.35,'light',`
 ${eyebrow(160,150,'La operación',PS(3)-0.1)}
 ${box(160,200,900,T('lbl','Préstamo de','up',W(3,'préstamo')-0.2,`color:${C.slate}`))}
 ${box(150,245,1100,T('h-xl',cnt(0,215000,W(3,'215.000')-0.1,0.9)+NB+'€','up',W(3,'215.000')-0.2,`font-size:170px;color:${C.slate}`))}
 <div class="abs row" style="left:1100px;top:300px">${chip('calendar','12 meses',W(3,'215.000')+0.7)}</div>
 ${eyebrow(160,470,'Cómo funciona',W(3,'libera')-0.5)}
 ${card(160,520,760,230,`<div class="row" style="gap:28px">${disc('docCheck',W(3,'libera')-0.1,100)}${T('h3','Se libera según avanza la obra (certificaciones de obra)','up',W(3,'libera'),`color:${C.slate};font-size:36px`)}</div>`,W(3,'libera')-0.3)}
 <div class="abs" style="left:934px;top:610px;width:52px;height:52px;color:${C.a5}">${ico('arrowR',W(3,'devuelve')-0.4,52)}</div>
 ${card(1000,520,760,230,`<div class="row" style="gap:28px">${disc('key',W(3,'devuelve')-0.1,100)}${T('h3','Se devuelve al vencimiento con la venta de las viviendas','up',W(3,'devuelve'),`color:${C.slate};font-size:36px`)}</div>`,W(3,'devuelve')-0.3)}
`);
// 4b · Garantías — azul pizarra
const guar=(x,icon,txt,at)=>`<div class="abs" style="left:${x}px;top:300px;width:760px;height:340px;background:${C.a9};border-radius:8px;padding:56px 60px" ${A('up',at-0.2,0.6)}>${disc(icon,at,130)}${T('h2',txt,'up',at+0.15,'color:#fff;margin-top:40px')}</div>`;
scene(W(3,'respaldado')-0.6,'dark',`
 ${eyebrow(160,170,'Garantías',W(3,'respaldado')-0.35,C.a3)}
 ${guar(160,'shHouse','Hipoteca de 1.er rango',W(3,'hipoteca')-0.2)}
 ${guar(1000,'shPerson','Aval personal solidario',W(3,'aval')-0.2)}
`);
// 4c · Valor frente a préstamo — blanco (barras proporcionales)
const VMAX=1300, wV=VMAX, wP=Math.round(VMAX*215000/661705);
const tMarg=W(3,'tercio')+0.4, S4d=Math.max(W(3,'precio')-0.4,tMarg+3.0);   // la ficha de margen se ve al menos 3 s
scene(W(3,'además')-0.4,'light',`
 ${eyebrow(160,150,'Valor frente a préstamo',W(3,'además')-0.15)}
 ${box(160,215,1600,T('lbl','Valor de la promoción terminada (tasación HET): 661.705 €','fade',W(3,'tasada')-0.3,`color:${C.ink};font-size:32px`))}
 <div class="abs" style="left:160px;top:268px;width:${wV}px;height:84px;background:${C.a9};transform-origin:left" ${A('grow',W(3,'tasada')-0.2,0.9)}></div>
 ${box(160,385,1600,T('lbl','Préstamo: 215.000 €','fade',W(3,'préstamo',2)-0.3,`color:${C.ink};font-size:32px`))}
 <div class="abs" style="left:160px;top:438px;width:${wP}px;height:84px;background:${C.a5};transform-origin:left" ${A('grow',W(3,'préstamo',2)-0.2,0.7)}></div>
 ${box(160,565,1600,T('h2','LTV del 32,49 %: menos de un tercio del valor','up',W(3,'tercio')-0.4,`color:${C.a9}`))}
 <div class="abs row" style="left:160px;top:690px">${chip('growth','Margen bruto del 78,84 % sobre el coste del proyecto',tMarg)}</div>
`);
// 4d · Precio frente a la zona — azul acento 900 (fondo oscuro alternativo)
const PX=0.4, wA=Math.round(2928*PX), wZ0=Math.round(2952*PX), wZ1=Math.round(3167*PX);
scene(S4d,'accent',`
 ${eyebrow(160,150,'Precio frente a la zona',S4d+0.25,C.a3)}
 ${box(160,225,1600,T('lbl','Precio de venta previsto: 2.928 €/m²','fade',Math.max(W(3,'previsto')-0.3,S4d+0.4),'color:#fff;font-size:32px'))}
 <div class="abs" style="left:160px;top:278px;width:${wA}px;height:84px;background:${C.a3};transform-origin:left" ${A('grow',Math.max(W(3,'previsto')-0.2,S4d+0.5),0.8)}></div>
 ${box(160,405,1600,T('lbl','Obra nueva en la zona: 2.952 – 3.167 €/m²','fade',Math.max(W(3,'obra',1)-0.3,S4d+1.0),'color:#fff;font-size:32px'))}
 <div class="abs" style="left:160px;top:458px;width:${wZ1}px;height:84px;transform-origin:left" ${A('grow',Math.max(W(3,'obra',1)-0.2,S4d+1.1),0.8)}><div style="position:absolute;left:0;top:0;width:${wZ0}px;height:84px;background:${C.a5}"></div><div style="position:absolute;left:${wZ0}px;top:0;width:${wZ1-wZ0}px;height:84px;background:${C.a7};box-shadow:inset 0 0 0 2px ${C.a3}"></div></div>
 ${box(160,610,1600,T('h2','Precio competitivo, que facilita la venta','up',W(3,'facilita')-0.4,'color:#fff'))}
`);

// ---------------------------------------------------------------- 5 · Análisis de riesgos
const stepBox=(x,icon,title,at)=>`<div class="abs col" style="left:${x}px;top:330px;width:420px">${disc(icon,at-0.1,170)}${T('h3',title,'up',at+0.1,'margin-top:30px;color:#fff')}</div>`;
scene(PS(4)-0.35,'dark',`
 ${stepBox(160,'docSearch','Análisis de riesgos',W(4,'análisis')-0.2)}
 <div class="abs" style="left:455px;top:414px;width:430px;height:2px;background:${C.a5};transform-origin:left" ${A('grow',W(4,'comité')-0.6,0.5)}></div>
 ${stepBox(760,'people','Comité de inversión',W(4,'comité')-0.2)}
 <div class="abs" style="left:1055px;top:414px;width:365px;height:2px;background:${C.a5};transform-origin:left" ${A('grow',W(4,'validado')-0.6,0.5)}></div>
 <div class="abs row" style="left:1420px;top:355px;gap:20px;padding:24px 40px 24px 28px;border-radius:12px;background:#fff" ${A('pop',W(4,'validado')-0.1,0.5)}>${ico('check',W(4,'validado'),64,`color:${C.a5}`)}<span class="h2" style="color:${C.slate}">Aprobada</span></div>
 ${box(160,660,1600,T('h3','Proyecto y garantías validados','words',W(4,'proyecto')-0.2,'color:#fff;text-align:center'))}
`);
const RISKS=[['alert','Mercado','mercado','Amplio margen sobre el coste del proyecto','margen'],
 ['building','Ejecución de la obra','ejecución','Licencia concedida y proyecto listo para ejecutar','licencia'],
 ['shCheck','Impago','impago','Hipoteca, aval y liberación por certificaciones de obra','protección']];
function riskCol(i){const [icon,t,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(4,rw)-0.2,ma=W(4,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:200px;width:500px;height:270px;padding:32px 36px;background:#fff;box-shadow:inset 0 0 0 2px ${C.a3};border-radius:8px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,90)}<div class="eyebrow" style="font-size:20px;color:${C.a5}">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,`margin-top:24px;font-size:38px;color:${C.slate}`)}</div>
  <div class="abs" style="left:${x+234}px;top:488px;width:32px;height:58px;color:${C.a5}" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:560px;width:500px;height:270px;padding:32px 36px;background:${C.slate};border-radius:8px" ${A('up',ma,0.6)}>
   <div class="row" style="gap:18px"><div style="width:56px;height:56px;color:${C.a3}">${ico('shCheck',ma+0.1,56)}</div><div class="eyebrow" style="font-size:20px;color:${C.a3}">Mitigante</div></div>
   ${T('h3',m,'up',ma+0.15,'margin-top:18px;font-size:34px;color:#fff')}</div>`}
scene(W(4,'principales')-0.6,'light',`${riskCol(0)}${riskCol(1)}${riskCol(2)}`);

// ---------------------------------------------------------------- 6 · Rentabilidad — blanco (asterisco solo aquí)
const MO=[[3,'Intereses',W(5,'trimestre')-0.2],[6,'Intereses',W(5,'trimestre')+0.2],[9,'Intereses',W(5,'trimestre')+0.6],[12,'Intereses + capital',W(5,'capital')-0.2]];
const LX0=980,LX1=1700,LY=470,mx=m=>LX0+(LX1-LX0)*m/12;
scene(PS(5)-0.35,'light',`
 <div class="abs" style="left:160px;top:200px;width:760px;height:440px;border-radius:8px;background:${C.a1};padding:44px 48px" ${A('up',W(5,'interés')-0.4,0.6)}>
  ${T('eyebrow','Interés anual simple*','fade',W(5,'interés')-0.2,`color:${C.a5}`)}
  ${T('h-xl','12'+NB+'%','up',W(5,'12')-0.2,`font-size:150px;margin-top:20px;color:${C.slate}`)}
  ${T('body','Intereses trimestrales · Capital al vencimiento','up',W(5,'trimestre')-0.4,`font-size:29px;color:${C.ink};margin-top:30px;white-space:nowrap`)}
 </div>
 ${eyebrow(980,200,'Calendario de cobros',W(5,'trimestre')-0.6)}
 <div class="abs" style="left:${LX0}px;top:${LY}px;width:${LX1-LX0}px;height:3px;background:${C.a3};transform-origin:left" ${A('grow',W(5,'trimestre')-0.6,0.8)}></div>
 ${Array.from({length:13},(_,m)=>`<div class="abs" style="left:${mx(m)-1}px;top:${LY-10}px;width:2px;height:23px;background:${C.a3}" ${A('fade',W(5,'trimestre')-0.5+m*0.04,0.3)}></div>`).join('')}
 ${MO.map(([m,txt,at])=>`<div class="abs" style="left:${mx(m)-17}px;top:${LY-17}px;width:36px;height:36px;border-radius:50%;background:${m===12?C.slate:C.a5};box-shadow:0 0 0 6px #fff" ${A('pop',at,0.5)}></div>
  <div class="abs" style="left:${mx(m)-130}px;top:${LY+40}px;width:260px;text-align:center" ${A('up',at+0.1)}><div class="lbl" style="font-size:26px;color:${C.slate};font-weight:600">Mes ${m}</div><div class="body" style="font-size:24px;color:${C.ink};margin-top:4px">${txt}</div></div>`).join('')}
`,{note:true});

// ---------------------------------------------------------------- 7 · Cómo participar — azul pizarra (componente de Flamingo)
const part=(x,icon,at,label,val)=>`<div class="abs" style="left:${x}px;top:300px;width:760px;height:320px;background:${C.a9};border-radius:8px;padding:50px 60px" ${A('up',at-0.2,0.6)}>
  <div class="row" style="gap:24px"><div style="width:60px;height:60px;color:${C.a3}">${ico(icon,at,60)}</div>${T('eyebrow',label,'fade',at,`color:${C.a3}`)}</div>${T('h-xl',val,'up',at+0.1,'font-size:110px;margin-top:36px;color:#fff;white-space:nowrap')}</div>`;
scene(PS(6)-0.35,'dark',`
 ${eyebrow(160,170,'Cómo participar',PS(6)-0.1,C.a3)}
 ${part(160,'coin',W(6,'inversión')-0.1,'Ticket mínimo',cnt(0,10000,W(6,'10.000')-0.1,0.7)+NB+'€')}
 ${part(1000,'calendar',W(6,'plazo')-0.1,'Fecha límite','11/12/2026')}
 <div class="abs row" style="left:160px;top:690px;gap:24px" ${A('up',W(6,'relación')-0.2)}>${disc('people',W(6,'relación')-0.1,100)}<span class="h3" style="color:#fff">Equipo de Relación con Inversores</span></div>
 <div class="abs row" style="left:1000px;top:690px;height:100px"><div class="row pill" style="gap:14px;border-color:${C.a3}" ${A('up',W(6,'relación')+0.3)}>${ico('mail',W(6,'relación')+0.35,36,`color:${C.a3}`)}<span class="lbl" style="font-size:28px;color:#fff">inversores@vanniloholding.com</span></div></div>
`);

// ---------------------------------------------------------------- 8 · Trayectoria — azul pizarra
const tBr=W(7,'financiados')+0.5;
scene(PS(7)-0.35,'dark',`
 ${eyebrow(160,150,'Vannilo Holding Financial Services',PS(7)-0.1,C.a3)}
 <div class="abs row" style="left:0;width:1920px;top:230px;justify-content:center;gap:160px">
  <div class="col">${T('h-xl',cnt(0,134,W(7,'134')-0.2,1.0,true),'up',W(7,'134')-0.3,'font-size:180px;color:#fff')}${T('lbl','operaciones firmadas','up',W(7,'operaciones')-0.2,`color:${C.a3};margin-top:30px`)}</div>
  <div style="width:2px;height:290px;background:${C.a7}" ${A('growY',W(7,'23,6')-0.4,0.5)}></div>
  <div class="col">${T('h-xl','23,66'+NB+'M€','up',W(7,'23,6')-0.2,'font-size:180px;color:#fff;white-space:nowrap')}${T('lbl','financiados','up',W(7,'financiados')-0.2,`color:${C.a3};margin-top:30px`)}</div>
 </div>
 <div class="abs row" style="left:0;width:1920px;top:640px;justify-content:center;gap:28px">
  <div style="background:${C.a9};border-radius:8px;padding:20px 32px" ${A('up',tBr)}><span class="lbl" style="color:${C.a3};font-size:28px">Rama financiera: <b style="color:#fff">120 operaciones · 18,1${NB}M€</b></span></div>
  <div style="background:${C.a9};border-radius:8px;padding:20px 32px" ${A('up',tBr+0.3)}><span class="lbl" style="color:${C.a3};font-size:28px">Rama inmobiliaria: <b style="color:#fff">14 operaciones · 5,56${NB}M€</b></span></div>
 </div>
 ${box(0,770,1920,T('h3','Toda la información, en el informe de la operación','words',W(7,'puede')-0.2,'color:#fff;text-align:center'))}
`);

// ---------------------------------------------------------------- 9 · Plano final — blanco, sin voz (5 s)
const END=TL.endcard;
const pill=(icon,txt,at)=>`<div class="row pill" style="gap:16px;color:${C.slate};border-color:${C.a3}" ${A('up',at)}>${ico(icon,at+0.05,40)}<span class="lbl" style="font-size:32px;color:${C.slate}">${txt}</span></div>`;
scene(END,'light',`
 <div class="abs" style="left:585px;top:170px;width:750px" ${A('wipe',END+0.2,0.9)}>${LOGO}</div>
 ${box(0,365,1920,T('h2','Financiación privada <b>para empresas</b>','words',END+0.7,'text-align:center'))}
 <div class="abs row" style="left:0;width:1920px;top:500px;justify-content:center;gap:28px">${pill('mail','inversores@vanniloholding.com',END+1.2)}${pill('phone','(+34) 911 632 094',END+1.5)}</div>
 <div class="abs" style="left:360px;top:650px;width:1200px;height:1px;background:${C.a3};transform-origin:center" ${A('grow',END+1.6,0.8)}></div>
 ${box(310,680,1300,T('body','Documento informativo dirigido a los socios e inversores de Vannilo Holding, de carácter confidencial. No constituye una oferta pública ni asesoramiento financiero. Las rentabilidades indicadas son estimaciones netas, ya descontadas las comisiones aplicables, sin incluir las retenciones fiscales del inversor, y no están garantizadas. Toda inversión conlleva riesgo, incluida la posible pérdida total o parcial del capital.','fade',END+1.8,`font-size:24px;line-height:1.6;color:${C.slate};text-align:center`))}
`,{noCorner:true,noSubsAfter:END});
