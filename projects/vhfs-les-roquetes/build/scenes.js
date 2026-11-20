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

// v3 (comentarios del cliente, 20/11): fondos blancos en todas las escenas, rama azul acento para recuadros
// y datos destacados, medios en marco (la identidad de marca prima sobre la foto), más iconos.
const bcard=(x,y,w,h,inner,at,extra='')=>`<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:8px;background:${C.a7};padding:40px 46px;color:#fff" ${A('up',at,0.6,extra)}>${inner}</div>`;
const wdisc=(icon,at,size)=>disc(icon,at,size,'','background:#fff;box-shadow:none;color:'+C.a9);

// ---------------------------------------------------------------- 1 · Portada — blanco
scene(0,'light',`
 <div class="abs" style="left:660px;top:150px;width:600px" ${A('wipe',W(0,'vannilo')-0.2,0.9)}>${LOGO}</div>
 ${box(0,305,1920,T('lbl','Vannilo Holding Financial Services presenta','words',W(0,'vannilo')+0.2,`color:${C.ink};font-weight:400;text-align:center`))}
 <div class="abs row" style="left:0;width:1920px;top:375px;justify-content:center"><div class="pill eyebrow" style="border-color:${C.a3};padding:12px 28px;letter-spacing:.28em;color:${C.a5}" ${A('up',W(0,'oportunidad')-0.2)}>Oportunidad de inversión inmobiliaria</div></div>
 ${box(0,450,1920,T('h-xl','Les Roquetes','up',W(0,'les')-0.15,`font-size:200px;color:${C.slate};text-align:center`))}
 <div class="abs row" style="left:0;width:1920px;top:690px;justify-content:center;gap:20px">${chip('shHouse','Préstamo hipotecario',W(0,'préstamo')-0.2)}${chip('building','Obra nueva residencial',W(0,'financiar')-0.2)}</div>
`,{noCorner:true});

// ---------------------------------------------------------------- 2 · Ubicación — blanco, medios en marco a la derecha
// Sant Pere de Ribes → Barcelona (3,2 s, con «45 minutos de Barcelona») → vuelo de Google Earth completo, acelerado
// para que quepa en su párrafo → ortofoto del barrio (alineada con el último fotograma del vuelo) → ortofoto de la
// parcela, acercamiento ≤1,3x, parcela seleccionada y marcada.
const MF={x:900,y:200,w:860,h:484}, MK=860/1920;
const S2=PS(1)-0.35, tB=W(1,'45')-0.4, tF=tB+3.2;
const FLY=Math.max(5.5,Math.min(10.04,PS(2)-0.35-4.1-tF)), FLYFPS=251/FLY, tO=tF+FLY;
const FM=[[1.3248,-0.02312,-306.32],[0.02312,1.3248,-270.59]];   // último fotograma del vuelo → ortofoto 04
const FD=FM[0][0]*FM[1][1]-FM[0][1]*FM[1][0], FI=[[FM[1][1]/FD,-FM[0][1]/FD],[-FM[1][0]/FD,FM[0][0]/FD]];
const C0={tx:-(FI[0][0]*FM[0][2]+FI[0][1]*FM[1][2]),ty:-(FI[1][0]*FM[0][2]+FI[1][1]*FM[1][2]),s:Math.hypot(FI[0][0],FI[1][0]),r:Math.atan2(FI[1][0],FI[0][0])*180/Math.PI};
const ZOOM={tx:0,ty:-228,s:1.3};
const PARC=[[899,479],[1000,475],[1001,597],[899,599]];
const parcPath='M'+PARC.map(p=>p.join(' ')).join('L')+'Z';
const camKeys=JSON.stringify([[tO,C0.tx,C0.ty,C0.s,C0.r],[tO+0.3,C0.tx,C0.ty,C0.s,C0.r],[tO+1.2,0,0,1,0],[tO+1.3,0,0,1,0],[tO+2.5,ZOOM.tx,ZOOM.ty,ZOOM.s,0]]);
const tP=tO+2.1;
const world=(cam,static_)=>`<div class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;${cam?'':`transform:translate(${ZOOM.tx}px,${ZOOM.ty}px) scale(${ZOOM.s})`}" ${cam?`data-a="cam" data-at="0" data-k='${camKeys}'`:''}>
  <img src="img/03_orto.jpg" style="position:absolute;left:0;top:0;width:3840px;height:2160px;transform-origin:0 0;transform:matrix(2,0,0,2,-2880,-1620)">
  <img src="img/04_orto.jpg" style="position:absolute;left:0;top:0;width:1920px;height:1080px" ${static_?'':A('fade',tO+0.9,0.4)}>
  <svg style="position:absolute;left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="0 0 1920 1080"><path d="M-2000 -2000H4000V3000H-2000Z ${parcPath}" fill-rule="evenodd" fill="rgba(16,16,16,0.42)" ${static_?'':A('fade',tP,0.6)}/></svg>
  <div style="position:absolute;left:0;top:0;width:1920px;height:1080px" ${static_?'':A('draw',tP,0.9)}><svg style="position:absolute;left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="0 0 1920 1080"><path d="${parcPath}" pathLength="1" fill="none" stroke="${C.a5}" stroke-width="3" vector-effect="non-scaling-stroke"/></svg></div></div>`;
const credit=(txt,at,out)=>`<div class="abs" style="left:14px;bottom:10px;font-family:'Inter';font-size:14px;color:#fff;text-shadow:0 1px 3px rgba(16,16,16,.9)" ${A('fade',at,0.3)} ${out?OUT(out):''}>${txt}</div>`;
const mediaFrame=(inner,extra)=>`<div class="abs" style="left:${MF.x}px;top:${MF.y}px;width:${MF.w}px;height:${MF.h}px;border-radius:8px;overflow:hidden;background:${C.a1};box-shadow:0 0 0 1px ${C.a3}" ${extra}>${inner}</div>`;
const PSX=MF.x+1235*MK, PSY=MF.y+(551*1.3-228)*MK;      // parcela en pantalla (centro x, borde inferior)
scene(S2,'light',`
 ${eyebrow(160,150,'Ubicación',S2+0.2)}
 ${box(160,195,700,T('h1','Les Roquetes','words',W(1,'les')-0.2,`font-size:76px;color:${C.slate}`))}
 ${box(160,290,700,T('h3','Sant Pere de Ribes','up',W(1,'sant')-0.2,`color:${C.a9}`))}
 ${box(160,345,700,T('lbl','Entre Sitges y Vilanova i la Geltrú','up',W(1,'entre')-0.2,`color:${C.ink};font-size:29px`))}
 ${mediaFrame(`<div class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;transform:scale(${MK})">
   <img src="img/spdr.jpg" data-k="1.10" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 62%;transform-origin:center" ${A('kb',S2,9)}>
   <div class="abs" style="inset:0;overflow:hidden" ${A('fade',tB,0.5)}><img src="img/barcelona.jpg" style="position:absolute;left:0;top:0;height:1080px;width:2513px;transform-origin:0 0" data-a="cam" data-at="0" data-k='${JSON.stringify([[tB,0,0,1,0],[tF,-593,0,1,0]])}'></div>
   <div class="abs" style="inset:0" ${A('fade',tF,0.4)}><img style="position:absolute;inset:0;width:100%;height:100%" src="img/fly/f000.jpg" data-a="seq" data-at="${tF.toFixed(3)}" data-n="251" data-fps="${FLYFPS.toFixed(4)}" data-pat="img/fly/f%03d.jpg"></div>
   <div class="abs" style="inset:0;overflow:hidden" ${A('fade',tO,0.5)}>${world(true,false)}</div>
  </div>
  <div class="abs row" style="left:16px;top:${MF.h-74}px;background:#fff;border-radius:6px;overflow:hidden" ${A('left',tB+0.3,0.5)} ${OUT(tF)}><div style="width:7px;align-self:stretch;background:${C.a5}"></div><div class="row" style="padding:12px 20px 12px 16px;gap:14px"><span class="lbl" style="font-size:24px;font-weight:600;color:${C.ink}">Barcelona</span><span class="lbl" style="font-size:24px;color:${C.slate}">·</span><span class="lbl" style="font-size:24px;color:${C.slate}">A menos de 45 min</span></div></div>
  ${credit('Foto: Mick Stephenson, CC BY-SA 3.0',S2,tB+0.2)}
  ${credit('Institut Cartogràfic i Geològic de Catalunya',tO+0.2,null)}
 `,A('wipe',S2+0.1,0.9))}
 <div class="abs" style="left:${PSX-1}px;top:${PSY}px;width:2px;height:${MF.y+MF.h+20-PSY}px;background:${C.a5};transform-origin:top" ${A('growY',tP+0.4,0.4)}></div>
 <div class="abs row" style="left:${PSX-320}px;top:${MF.y+MF.h+20}px;width:640px;justify-content:center"><div class="row" style="background:${C.a1};border-radius:8px;padding:14px 26px 14px 16px;gap:14px" ${A('up',tP+0.6)}>${ico('pin',tP+0.7,40,`color:${C.slate}`)}<span class="lbl" style="font-size:26px;color:${C.ink};white-space:nowrap">Parcela del proyecto · C/ Amadeo I, 15</span></div></div>
 <div class="abs col" style="left:160px;top:430px;gap:14px;align-items:flex-start;width:700px;text-align:left">
  ${chip('fastwatch','A menos de 45 min de Barcelona · Autopista o Cercanías',W(1,'autopista')-0.3,'padding:14px 26px 14px 18px')}
  ${chip('people','Colegios · Salud · Comercio · Ocio',W(1,'colegios')-0.3,'padding:14px 26px 14px 18px')}
  ${chip('growth','Mercado litoral al alza · Escasez de obra nueva',W(1,'mercado')-0.3,'padding:14px 26px 14px 18px')}
 </div>
`);

// ---------------------------------------------------------------- 3 · El proyecto — blanco
// Entrada: el alzado se levanta desde el solar seleccionado y pasa a su marco.
const S3=Math.max(PS(2)-0.35,tP+1.6);
const PR=[MF.x+1169*MK,MF.y+(390)*MK,132*MK,161*MK];
const FR=[1240,140,520,690];
const SEC={w:467,h:455};
const fit=(o,W_,H_)=>{const k=Math.min(W_/o.w,H_/o.h);return {w:o.w*k,h:o.h*k,x:(W_-o.w*k)/2,y:(H_-o.h*k)/2,k}};
const fs=fit(SEC,FR[2]-48,FR[3]-48);
const tSec=Math.max(S3+2.0,W(2,'planta',1)-0.9);
const FLOORS=[['Planta baja','Garaje y acceso',236,372,Math.max(W(2,'planta',1)-0.2,tSec+0.5)],
              ['Primera planta','Salón comedor, cocina y terraza',124,234,Math.max(W(2,'primera')-0.2,tSec+1.5)],
              ['Segunda planta','2 dormitorios, baño completo y balcón',8,122,Math.max(W(2,'segunda')-0.2,tSec+2.5)]];
const band=(f,i)=>{const [,, y0,y1,at]=f,nx=i+1<FLOORS.length?FLOORS[i+1][4]:1e9;
  return `<div class="abs" style="left:${24+fs.x+18*fs.k}px;top:${24+fs.y+y0*fs.k}px;width:${445*fs.k}px;height:${(y1-y0)*fs.k}px;background:rgba(125,159,209,.30);box-shadow:inset 0 0 0 3px ${C.a5}" ${A('fade',at,0.4)} ${i<2?OUT(nx):''}></div>`};
const floorRow=(f,i)=>{const [n,txt,,,at]=f;return `<div class="abs row" style="left:160px;top:${650-i*120}px;gap:22px" ${A('up',at)}>${disc(['house','house','house'][i],at,72)}<div>${T('eyebrow',n,'fade',at,`color:${C.a5};font-size:22px`)}${T('lbl',txt,'fade',at+0.1,`color:${C.ink};font-size:32px;margin-top:6px`)}</div></div>`};
scene(S3,'light',`
 ${mediaFrame(`<div class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;transform:scale(${MK})">${world(false,true)}</div>${credit('Institut Cartogràfic i Geològic de Catalunya',S3,S3+0.6)}`,OUT(S3+0.9))}
 <div class="abs" style="left:${PR[0]}px;top:${PR[1]}px;width:${PR[2]}px;height:${PR[3]}px;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px ${C.a3}" data-a="rect" data-at="${(S3+0.8).toFixed(3)}" data-d="1.0" data-r0='${JSON.stringify(PR)}' data-r1='${JSON.stringify(FR)}'>
  <div style="position:absolute;inset:0" ${A('rise',S3+0.05,0.8)}>
   <img src="img/alzado.jpg" style="position:absolute;left:50%;top:50%;height:calc(100% - 48px);transform:translate(-50%,-50%)" ${OUT(tSec)}>
   <img src="img/seccion.jpg" style="position:absolute;left:${24+fs.x}px;top:${24+fs.y}px;width:${fs.w}px;height:${fs.h}px" ${A('fade',tSec,0.6)}>
   ${FLOORS.map(band).join('')}
  </div>
 </div>
 ${eyebrow(160,150,'El proyecto',S3+0.4)}
 ${card(160,200,980,190,`<div class="row" style="gap:30px">${disc('building',Math.max(S3+0.5,W(2,'viviendas')-0.4),104)}${T('h3','2 viviendas pareadas · 3 plantas · Unos 111 m² construidos cada una','words',Math.max(S3+0.6,W(2,'viviendas')-0.3),`color:${C.slate};font-size:37px;line-height:1.25`)}</div>`,Math.max(S3+0.4,W(2,'viviendas')-0.5))}
 ${FLOORS.map(floorRow).join('')}
`,{cut:true});

// 3b · Situación del proyecto — pantalla completa, sin el esquema
const S3b=W(2,'promotora')-0.5;
const SIT=[['docCheck','Terreno en propiedad',W(2,'terreno')],['docPen','Proyecto técnico visado',W(2,'proyecto',1)],
  ['seal','Licencia de obra mayor concedida (oct. 2025)',W(2,'licencia')],['calendar','Presupuesto de obra cerrado · 12 meses de ejecución',W(2,'presupuesto')]];
scene(S3b,'light',`
 ${eyebrow(160,150,'El proyecto',S3b+0.2)}
 ${SIT.map(([ic,txt,w],i)=>{const at=Math.max(w-0.3,S3b+0.3+i*0.3),x=i%2?990:160,y=i<2?220:470;
   return `<div class="abs row" style="left:${x}px;top:${y}px;width:770px;height:210px;border-radius:8px;background:${C.a1};padding:0 44px;gap:34px" ${A('up',at,0.6)}>${disc(ic,at+0.1,120)}${T('h3',txt,'up',at+0.2,`color:${C.slate};font-size:38px`)}</div>`}).join('')}
 <div class="abs row" style="left:160px;top:730px;gap:14px" ${A('fade',W(2,'promotora')-0.2,0.5)}>${ico('people',W(2,'promotora')-0.1,30,`color:${C.slate}`)}<span class="body" style="font-size:22px;color:${C.slate}">Promotora: Providence Estates S.L. · Construcción: Encofest</span></div>
`);

// ---------------------------------------------------------------- 4 · La operación, su valor y sus garantías
scene(PS(3)-0.35,'light',`
 ${eyebrow(160,150,'La operación',PS(3)-0.1)}
 <div class="abs row" style="left:160px;top:200px;gap:34px">${disc('euroDoc',W(3,'préstamo')-0.2,140)}<div>${T('lbl','Préstamo de','up',W(3,'préstamo')-0.2,`color:${C.slate}`)}${T('h-xl',cnt(0,215000,W(3,'215.000')-0.1,0.9)+NB+'€','up',W(3,'215.000')-0.2,`font-size:150px;color:${C.a9}`)}</div></div>
 <div class="abs row" style="left:1180px;top:290px">${chip('calendar','12 meses',W(3,'215.000')+0.7)}</div>
 ${eyebrow(160,470,'Cómo funciona',W(3,'libera')-0.5)}
 ${card(160,520,760,230,`<div class="row" style="gap:28px">${disc('docCheck',W(3,'libera')-0.1,100)}${T('h3','Se libera según avanza la obra (certificaciones de obra)','up',W(3,'libera'),`color:${C.slate};font-size:36px`)}</div>`,W(3,'libera')-0.3)}
 <div class="abs" style="left:934px;top:610px;width:52px;height:52px;color:${C.a5}">${ico('arrowR',W(3,'devuelve')-0.4,52)}</div>
 ${card(1000,520,760,230,`<div class="row" style="gap:28px">${disc('key',W(3,'devuelve')-0.1,100)}${T('h3','Se devuelve al vencimiento con la venta de las viviendas','up',W(3,'devuelve'),`color:${C.slate};font-size:36px`)}</div>`,W(3,'devuelve')-0.3)}
`);
// 4b · Garantías — blanco, recuadros en azul acento
const guar=(x,icon,txt,at)=>bcard(x,280,760,360,`${wdisc(icon,at,130)}${T('h2',txt,'up',at+0.15,'color:#fff;margin-top:40px')}`,at-0.2);
scene(W(3,'respaldado')-0.6,'light',`
 ${eyebrow(160,170,'Garantías',W(3,'respaldado')-0.35)}
 ${guar(160,'shHouse','Hipoteca de 1.er rango',W(3,'hipoteca')-0.2)}
 ${guar(1000,'shPerson','Aval personal solidario',W(3,'aval')-0.2)}
`);
// 4c · Valor frente a préstamo — barras verticales a la izquierda, texto a la derecha
const BASE=790, HV=520, HP=Math.round(HV*215000/661705), tMarg=W(3,'tercio')+0.4, S4d=Math.max(W(3,'precio')-0.4,tMarg+3.0);
const tV=W(3,'tasada')-0.2, tL=W(3,'préstamo',2)-0.2;
const legend=(y,color,txt,at)=>`<div class="abs row" style="left:1000px;top:${y}px;width:760px;gap:20px;align-items:flex-start" ${A('up',at)}><div style="flex:none;width:26px;height:26px;border-radius:4px;background:${color};margin-top:6px"></div><div class="lbl" style="color:${C.ink};font-size:30px">${txt}</div></div>`;
scene(W(3,'además')-0.4,'light',`
 ${eyebrow(160,150,'Valor frente a préstamo',W(3,'además')-0.15)}
 <div class="abs" style="left:160px;top:${BASE}px;width:720px;height:3px;background:${C.a3};transform-origin:left" ${A('grow',W(3,'además'),0.6)}></div>
 <div class="abs" style="left:230px;top:${BASE-HV}px;width:240px;height:${HV}px;background:${C.a9};transform-origin:bottom" ${A('growY',tV,0.9)}></div>
 ${box(170,BASE-HV-62,360,T('h3','661.705'+NB+'€','up',tV+0.6,`color:${C.a9};text-align:center`))}
 <div class="abs" style="left:570px;top:${BASE-HP}px;width:240px;height:${HP}px;background:${C.a5};transform-origin:bottom" ${A('growY',tL,0.7)}></div>
 ${box(510,BASE-HP-62,360,T('h3','215.000'+NB+'€','up',tL+0.5,`color:${C.a7};text-align:center`))}
 ${legend(240,C.a9,'Valor de la promoción terminada (tasación HET): 661.705 €',tV)}
 ${legend(345,C.a5,'Préstamo: 215.000 €',tL)}
 <div class="abs row" style="left:1000px;top:440px;width:760px;gap:28px;border-radius:8px;background:${C.a1};padding:30px 36px" ${A('up',W(3,'tercio')-0.5,0.6)}>${disc('pie',W(3,'tercio')-0.4,96)}${T('h3','LTV del 32,49 %: menos de un tercio del valor','up',W(3,'tercio')-0.3,`color:${C.a9};font-size:38px`)}</div>
 <div class="abs row" style="left:1000px;top:640px;width:760px;gap:28px;border-radius:8px;background:${C.a7};padding:26px 36px" ${A('up',tMarg,0.6)}>${wdisc('growth',tMarg+0.1,80)}${T('h3','Margen bruto del 78,84 % sobre el coste del proyecto','up',tMarg+0.2,'color:#fff;font-size:32px')}</div>
`);
// 4d · Precio frente a la zona — misma composición: gráfico a la izquierda, texto a la derecha
const PXS=720/3167, wA=Math.round(2928*PXS), wZ0=Math.round(2952*PXS), wZ1=720;
const tA=Math.max(W(3,'previsto')-0.2,S4d+0.5), tZ=Math.max(W(3,'obra',1)-0.2,S4d+1.1);
scene(S4d,'light',`
 ${eyebrow(160,150,'Precio frente a la zona',S4d+0.25)}
 <div class="abs" style="left:160px;top:250px;width:3px;height:420px;background:${C.a3};transform-origin:top" ${A('growY',S4d+0.3,0.5)}></div>
 <div class="abs" style="left:163px;top:300px;width:${wA}px;height:110px;background:${C.a5};transform-origin:left" ${A('grow',tA,0.8)}></div>
 <div class="abs" style="left:163px;top:500px;width:${wZ1}px;height:110px;transform-origin:left" ${A('grow',tZ,0.8)}><div style="position:absolute;left:0;top:0;width:${wZ0}px;height:110px;background:${C.a9}"></div><div style="position:absolute;left:${wZ0}px;top:0;width:${wZ1-wZ0}px;height:110px;background:${C.a7}"></div></div>
 ${legend(260,C.a5,'Precio de venta previsto: 2.928 €/m²',tA)}
 ${legend(365,C.a9,'Obra nueva en la zona: 2.952 – 3.167 €/m²',tZ)}
 <div class="abs row" style="left:1000px;top:470px;width:760px;gap:28px;border-radius:8px;background:${C.a7};padding:30px 36px" ${A('up',W(3,'facilita')-0.5,0.6)}>${wdisc('chartCheck',W(3,'facilita')-0.4,96)}${T('h3','Precio competitivo, que facilita la venta','up',W(3,'facilita')-0.3,'color:#fff;font-size:38px')}</div>
`);

// ---------------------------------------------------------------- 5 · Análisis de riesgos — blanco
const stepBox=(x,icon,title,at)=>`<div class="abs col" style="left:${x}px;top:300px;width:420px">${disc(icon,at-0.1,170)}${T('h3',title,'up',at+0.1,`margin-top:30px;color:${C.slate}`)}</div>`;
scene(PS(4)-0.35,'light',`
 ${stepBox(160,'docSearch','Análisis de riesgos',W(4,'análisis')-0.2)}
 <div class="abs" style="left:455px;top:384px;width:430px;height:3px;background:${C.a5};transform-origin:left" ${A('grow',W(4,'comité')-0.6,0.5)}></div>
 ${stepBox(760,'people','Comité de inversión',W(4,'comité')-0.2)}
 <div class="abs" style="left:1055px;top:384px;width:365px;height:3px;background:${C.a5};transform-origin:left" ${A('grow',W(4,'validado')-0.6,0.5)}></div>
 <div class="abs row" style="left:1420px;top:325px;gap:20px;padding:24px 40px 24px 28px;border-radius:12px;background:${C.a7}" ${A('pop',W(4,'validado')-0.1,0.5)}>${ico('check',W(4,'validado'),64,'color:#fff')}<span class="h2" style="color:#fff">Aprobada</span></div>
 <div class="abs row" style="left:0;width:1920px;top:650px;justify-content:center"><div class="row" style="gap:20px;border-radius:8px;background:${C.a1};padding:22px 36px" ${A('up',W(4,'proyecto')-0.3)}>${ico('shCheck',W(4,'proyecto')-0.2,52,`color:${C.slate}`)}${T('h3','Proyecto y garantías validados','words',W(4,'proyecto')-0.2,`color:${C.slate}`)}</div></div>
`);
const RISKS=[['alert','Mercado','mercado','Amplio margen sobre el coste del proyecto','margen'],
 ['building','Ejecución de la obra','ejecución','Licencia concedida y proyecto listo para ejecutar','licencia'],
 ['shCheck','Impago','impago','Hipoteca, aval y liberación por certificaciones de obra','protección']];
function riskCol(i){const [icon,t,rw,m,mw]=RISKS[i];const x=160+i*540,ra=W(4,rw)-0.2,ma=W(4,mw)-0.2;
 return `<div class="abs" style="left:${x}px;top:200px;width:500px;height:270px;padding:32px 36px;background:#fff;box-shadow:inset 0 0 0 2px ${C.a3};border-radius:8px" ${A('up',ra,0.6)}>
   <div class="row" style="gap:22px">${disc(icon,ra+0.1,90)}<div class="eyebrow" style="font-size:20px;color:${C.a5}">Riesgo</div></div>
   ${T('h3',t,'up',ra+0.2,`margin-top:24px;font-size:38px;color:${C.slate}`)}</div>
  <div class="abs" style="left:${x+234}px;top:488px;width:32px;height:58px;color:${C.a5}" ${A('fade',ma-0.1,0.3)}><svg class="ic" viewBox="0 0 32 58" style="stroke-width:3"><path d="M16 2v50M5 41l11 12 11-12"/></svg></div>
  <div class="abs" style="left:${x}px;top:560px;width:500px;height:270px;padding:32px 36px;background:${C.a7};border-radius:8px" ${A('up',ma,0.6)}>
   <div class="row" style="gap:18px"><div style="width:56px;height:56px;color:#fff">${ico('shCheck',ma+0.1,56)}</div><div class="eyebrow" style="font-size:20px;color:#fff">Mitigante</div></div>
   ${T('h3',m,'up',ma+0.15,'margin-top:18px;font-size:34px;color:#fff')}</div>`}
scene(W(4,'principales')-0.6,'light',`${riskCol(0)}${riskCol(1)}${riskCol(2)}`);

// ---------------------------------------------------------------- 6 · Rentabilidad — blanco (asterisco solo aquí)
const S6=PS(5)-0.35;
const MO=[[3,'Intereses',W(5,'trimestre')-0.2],[6,'Intereses',W(5,'trimestre')+0.2],[9,'Intereses',W(5,'trimestre')+0.6],[12,'Intereses + capital',W(5,'capital')-0.2]];
const LX0=980,LX1=1700,LY=470,mx=m=>LX0+(LX1-LX0)*m/12;
scene(S6,'light',`
 ${eyebrow(160,150,'Rentabilidad',S6+0.2)}
 <div class="abs" style="left:160px;top:200px;width:760px;height:440px;border-radius:8px;background:${C.a1};padding:44px 48px" ${A('up',S6+0.3,0.6)}>
  <div class="abs" style="right:44px;top:40px">${disc('percent',S6+0.5,110,'','background:#fff')}</div>
  ${T('eyebrow','Interés anual simple*','fade',W(5,'interés')-0.2,`color:${C.a5}`)}
  ${T('h-xl','12'+NB+'%','up',W(5,'12')-0.2,`font-size:150px;margin-top:20px;color:${C.a9}`)}
  ${T('body','Intereses trimestrales · Capital al vencimiento','up',W(5,'trimestre')-0.4,`font-size:29px;color:${C.ink};margin-top:30px;white-space:nowrap`)}
 </div>
 <div class="abs row" style="left:980px;top:190px;gap:16px" ${A('left',S6+0.8)}>${ico('calendar',S6+0.9,40,`color:${C.slate}`)}<span class="eyebrow" style="color:${C.a5}">Calendario de cobros</span></div>
 <div class="abs" style="left:${LX0}px;top:${LY}px;width:${LX1-LX0}px;height:3px;background:${C.a3};transform-origin:left" ${A('grow',S6+1.0,0.9)}></div>
 ${Array.from({length:13},(_,m)=>`<div class="abs" style="left:${mx(m)-1}px;top:${LY-10}px;width:2px;height:23px;background:${C.a3}" ${A('fade',S6+1.0+m*0.05,0.3)}></div>`).join('')}
 ${MO.map(([m,txt,at])=>`<div class="abs" style="left:${mx(m)-17}px;top:${LY-17}px;width:36px;height:36px;border-radius:50%;background:${m===12?C.a9:C.a5};box-shadow:0 0 0 6px #fff" ${A('pop',at,0.5)}></div>
  <div class="abs" style="left:${mx(m)-130}px;top:${LY+40}px;width:260px;text-align:center" ${A('up',at+0.1)}><div class="lbl" style="font-size:26px;color:${C.slate};font-weight:600">Mes ${m}</div><div class="body" style="font-size:24px;color:${C.ink};margin-top:4px">${txt}</div></div>`).join('')}
`,{note:true});

// ---------------------------------------------------------------- 7 · Cómo participar — blanco, recuadros en azul acento
const part=(x,icon,at,label,val)=>bcard(x,300,760,320,`<div class="row" style="gap:24px"><div style="width:60px;height:60px;color:#fff">${ico(icon,at,60)}</div>${T('eyebrow',label,'fade',at,'color:#fff')}</div>${T('h-xl',val,'up',at+0.1,'font-size:110px;margin-top:36px;color:#fff;white-space:nowrap')}`,at-0.2);
scene(PS(6)-0.35,'light',`
 ${eyebrow(160,170,'Cómo participar',PS(6)-0.1)}
 ${part(160,'coin',W(6,'inversión')-0.1,'Ticket mínimo',cnt(0,10000,W(6,'10.000')-0.1,0.7)+NB+'€')}
 ${part(1000,'calendar',W(6,'plazo')-0.1,'Fecha límite','11/12/2026')}
 <div class="abs row" style="left:160px;top:690px;gap:24px" ${A('up',W(6,'relación')-0.2)}>${disc('people',W(6,'relación')-0.1,100)}<span class="h3" style="color:${C.slate}">Equipo de Relación con Inversores</span></div>
 <div class="abs row" style="left:1000px;top:690px;height:100px"><div class="row pill" style="gap:14px;border-color:${C.a3};color:${C.slate}" ${A('up',W(6,'relación')+0.3)}>${ico('mail',W(6,'relación')+0.35,36,`color:${C.slate}`)}<span class="lbl" style="font-size:28px;color:${C.slate}">inversores@vanniloholding.com</span></div></div>
`);

// ---------------------------------------------------------------- 8 · Trayectoria — blanco, datos en azul acento
const tBr=W(7,'financiados')+0.5;
scene(PS(7)-0.35,'light',`
 ${eyebrow(160,150,'Vannilo Holding Financial Services',PS(7)-0.1)}
 <div class="abs row" style="left:0;width:1920px;top:210px;justify-content:center;gap:160px">
  <div class="col">${disc('docCheck',W(7,'134')-0.4,100)}${T('h-xl',cnt(0,134,W(7,'134')-0.2,1.0,true),'up',W(7,'134')-0.3,`font-size:170px;color:${C.a9};margin-top:24px`)}${T('lbl','operaciones firmadas','up',W(7,'operaciones')-0.2,`color:${C.slate};margin-top:26px`)}</div>
  <div style="width:3px;height:360px;background:${C.a3}" ${A('growY',W(7,'23,6')-0.4,0.5)}></div>
  <div class="col">${disc('coin',W(7,'23,6')-0.4,100)}${T('h-xl','23,66'+NB+'M€','up',W(7,'23,6')-0.2,`font-size:170px;color:${C.a9};white-space:nowrap;margin-top:24px`)}${T('lbl','financiados','up',W(7,'financiados')-0.2,`color:${C.slate};margin-top:26px`)}</div>
 </div>
 <div class="abs row" style="left:0;width:1920px;top:665px;justify-content:center;gap:28px">
  <div class="row" style="gap:14px;background:${C.a1};border-radius:8px;padding:18px 30px" ${A('up',tBr)}>${ico('growth',tBr+0.1,36,`color:${C.slate}`)}<span class="lbl" style="color:${C.slate};font-size:28px">Rama financiera: <b style="color:${C.a9}">120 operaciones · 18,1${NB}M€</b></span></div>
  <div class="row" style="gap:14px;background:${C.a1};border-radius:8px;padding:18px 30px" ${A('up',tBr+0.3)}>${ico('building',tBr+0.4,36,`color:${C.slate}`)}<span class="lbl" style="color:${C.slate};font-size:28px">Rama inmobiliaria: <b style="color:${C.a9}">14 operaciones · 5,56${NB}M€</b></span></div>
 </div>
 <div class="abs row" style="left:0;width:1920px;top:790px;justify-content:center;gap:18px" ${A('up',W(7,'puede')-0.3)}>${ico('docSearch',W(7,'puede')-0.2,44,`color:${C.slate}`)}${T('h3','Toda la información, en el informe de la operación','words',W(7,'puede')-0.2,`color:${C.slate}`)}</div>
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
