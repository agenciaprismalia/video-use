// Whole-timeline QA for Les Roquetes (instructions §6).
//   node build/audit.mjs <work_dir> <instructions.md> [step=0.1]
// 1. Footer and subtitles: never overlap any visible scene element (text, icon, bar, card, drawing,
//    marker); footer bottom margin; subtitles never cover the Google Earth attribution.
// 2. Colours: every painted colour (text, background, border, stroke, fill) is in the real-estate range.
// 3. Text: every on-screen text (scenes + subtitles, counters at their final value) appears in the
//    instructions document; on-screen text never uses the voice-only phonetic spellings.
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const [B, DOC, stepS] = process.argv.slice(2); const step = +(stepS || 0.1); const PAD = 8;
const GE = {left: 1500, right: 1740, top: 890, bottom: 950};          // Google Earth logo + data line (fly frames)
const ALLOWED = ['#ffffff', '#101010', '#394251', '#b6bcc6', '#eef2f8', '#c3d3eb', '#7d9fd1', '#5a7fb4', '#3e5b85',
  '#2d3947' /* logo artwork */];
const br = await chromium.launch(); const pg = await br.newPage({viewport: {width: 1920, height: 1080}});
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file://' + B + '/build/video.html'); await pg.evaluate(() => document.fonts.ready);
const res = await pg.evaluate(async ({step, PAD, GE}) => {
  const out = {hits: {}, margin: {}, subsGE: [], colors: {}, texts: {}, flyOn: 0};
  const vis = el => { for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.02) return false; }
    return true; };
  const txtRect = d => { const r = document.createRange(); r.selectNodeContents(d); return r.getBoundingClientRect(); };
  const hex = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(Number);
    if (p.length === 4 && p[3] === 0) return null; const h = '#' + p.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('');
    return (p.length === 4 && p[3] < 1) ? `${h}@${p[3]}` : h; };
  for (let t = 0; t <= window.TOTAL; t += step) {
    await render(t);
    const key = t.toFixed(1);
    const lines = [...document.querySelectorAll('#foot > div')].filter(vis).map(txtRect);
    const sub = document.getElementById('sub'); const subR = vis(sub) && sub.textContent ? sub.getBoundingClientRect() : null;
    if (subR) out.texts['SUB: ' + sub.textContent] = 1;
    const fBot = Math.max(...lines.map(r => r.bottom)); out.margin[Math.round(1080 - fBot)] = (out.margin[Math.round(1080 - fBot)] || 0) + 1;
    const guards = lines.map(r => ['footer', r]); if (subR) guards.push(['subs', subR]);
    const fly = [...document.querySelectorAll('img[data-a="seq"]')].find(vis);
    if (fly && subR) { out.flyOn++; if (subR.right > GE.left && subR.left < GE.right && subR.bottom > GE.top && subR.top < GE.bottom) out.subsGE.push(key); }
    for (const sec of document.querySelectorAll('#stage > section')) {
      if (sec.style.display === 'none') continue;
      for (const el of sec.querySelectorAll('*')) {
        if (el.tagName === 'BR') continue;
        if (!vis(el)) continue;
        const cs = getComputedStyle(el);
        // colours
        const isSvg = el instanceof SVGElement; const inLogo = !!el.closest('.logo,.corner');
        if (!inLogo) for (const prop of (isSvg ? ['stroke', 'fill'] : ['color', 'backgroundColor', 'borderTopColor'])) {
          if (!isSvg && prop === 'color' && !(el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()))) continue;
          if (!isSvg && prop === 'borderTopColor' && cs.borderTopStyle === 'none') continue;
          if (isSvg && el.tagName !== 'path') continue;
          const v = cs[prop]; if (!v || v === 'none') continue; const h = hex(v); if (h) (out.colors[h] = out.colors[h] || new Set()).add(prop + ':' + (el.textContent || el.className.baseVal || el.className || el.tagName).toString().trim().slice(0, 30));
        }
        // texts
        if (!isSvg && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
          const own = el.textContent.replace(/\s+/g, ' ').trim(); if (own) out.texts[own] = 1; }
        // collisions
        if (el.tagName === 'path') continue;
        const leaf = !el.children.length || el.tagName === 'svg' || el.tagName === 'IMG' || el.classList.contains('disc');
        const painted = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderStyle !== 'none';
        if (!leaf && !painted) continue;
        const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
        if (r.width * r.height > 0.5 * 1920 * 1080) continue;     // full-bleed media layers
        if (r.right < 0 || r.left > 1920 || r.bottom < 0 || r.top > 1080) continue;
        for (const [g, L] of guards) {
          if (r.right > L.left - PAD && r.left < L.right + PAD && r.bottom > L.top - PAD && r.top < L.bottom + PAD) {
            const desc = g + ' x ' + el.tagName + ' "' + (el.textContent || '').trim().slice(0, 40) + '" y=' + Math.round(r.top) + '-' + Math.round(r.bottom);
            (out.hits[desc] = out.hits[desc] || []).push(key);
          }
        }
      }
    }
  }
  for (const k in out.colors) out.colors[k] = [...out.colors[k]].slice(0, 4);
  return out;
}, {step, PAD, GE});
if (errs.length) console.log('PAGE ERRORS', errs);
console.log('footer bottom margin px -> samples:', res.margin);
const hk = Object.keys(res.hits); console.log(hk.length ? 'COLLISIONS:' : 'collisions: none');
for (const k of hk) { const ts = res.hits[k]; console.log('  ', k, 't=', ts[0], '..', ts[ts.length - 1], `(${ts.length})`); }
console.log(`subtitles over Google Earth attribution: ${res.subsGE.length} of ${res.flyOn} flight samples with subtitles`);
const bad = Object.keys(res.colors).filter(c => !ALLOWED.includes(c.split('@')[0]) && !/^#101010@|^#000000@/.test(c));
console.log('colours used:', Object.keys(res.colors).sort().join(' '));
console.log(bad.length ? 'COLOURS OUTSIDE THE RANGE:' : 'colours outside the range: none'); for (const c of bad) console.log('  ', c, res.colors[c]);
// text vs document
const norm = s => s.replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim();
const doc = norm(fs.readFileSync(DOC, 'utf8'));
const voiceOnly = ['San Pere', 'Sítches', 'Yeltrú'];
const missing = [], phon = [];
for (const t0 of Object.keys(res.texts)) {
  const t = norm(t0.replace(/^SUB: /, ''));
  if (voiceOnly.some(v => t.includes(v))) phon.push(t);
  if (/^[\d.]+$/.test(t)) continue;                       // counters mid-animation
  if (!doc.includes(t)) missing.push(t0);
}
console.log(`texts on screen: ${Object.keys(res.texts).length}; not found verbatim in the document: ${missing.length}`);
for (const m of missing) console.log('   ?', m);
console.log('phonetic spellings on screen:', phon.length ? phon : 'none');
await br.close();
