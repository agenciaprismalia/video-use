// Export the subtitles of the built video as SRT (official spelling from vo/paras.json,
// muted paragraphs excluded, word-synced via timeline.json).
//   node build/export_srt.mjs <project_dir> <out.srt>     (after assemble.py has written build/video.html)
// Each cue enters LEAD s early (never overlapping the previous one), because every VO segment
// starts 60 ms before its first word: the text must never trail the voice.
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const [B, out] = process.argv.slice(2); const LEAD = 0.10;
const br = await chromium.launch(); const pg = await br.newPage();
await pg.goto('file://' + B + '/build/video.html');
const ch = await pg.evaluate(() => window.CH.map(c => ({s: c.s, e: Math.min(c.hide, c.e + 0.5), t: c.txt})));
ch.forEach((c, i) => { c.s = Math.max(i ? ch[i - 1].e + 0.02 : 0, c.s - LEAD); });
const ts = x => { const ms = Math.round(x * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
fs.writeFileSync(out, ch.map((c, i) => `${i + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.t}\n`).join('\n'));
console.log(ch.length, 'cues ->', out); await br.close();
