# VHFS — Vídeo explicativo rama financiera (v1)

Vídeo animado 1920×1080 a 25 fps, de unos 2:22, generado a partir de HTML: cada escena se sincroniza con las palabras de la locución.

- `vo/paras.json` — guion de locución (sin «VHFS» pronunciado).
- Voz: Piper `es_ES-davefx-medium` (`--length-scale 1.07`). Las marcas de tiempo por palabra salen de ElevenLabs Scribe.
- `build_vo.py` — monta `vo_master.wav` y `timeline.json` (palabras, segmentos y duración total).
- `build/scenes.js` — las 16 escenas. Cada animación se ancla a una palabra con `W(párrafo, 'palabra')`.
- `build/engine.js` — motor de render determinista: `render(t)`, subtítulos y transiciones.
- `build/render.mjs` — renderiza los fotogramas con Playwright y los pasa a ffmpeg.
- Música: «Moon Walk», Mixkit (licencia gratuita de Mixkit), con ducking por sidechain bajo la voz.

Las rutas de los scripts apuntan al directorio de trabajo de la sesión. Las fuentes Inter / Inter Tight se descargan de Google Fonts.
