# Pattern Loom

A minimal, browser-based kaleidoscope drawing toy. No build step, no dependencies — just open it and start drawing.

## Features

- **Radial symmetry** — draw once, see it repeated 2–24 times around the center
- **Mirror mode** to reflect each stroke across the center as well
- **Adjustable brush size and hue**, with an optional rainbow mode that cycles color as you draw
- **Glow effect** for a softer, luminous line
- **Save PNG** to export your pattern
- **Clear** to reset the canvas to the theme background

## Usage

Just open `index.html` in a browser — no build tools or server required.

If you'd rather serve it locally:

```bash
npx serve .
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App markup and layout |
| `style.css` | Entry point that imports the files below |
| `styles/tokens.css` | Color/shadow/radius custom properties, incl. dark theme |
| `styles/base.css` | Reset, page layout, heading |
| `styles/stage.css` | The circular canvas stage |
| `styles/controls.css` | Sliders, toggles, and buttons |
| `script.js` | Entry point that imports the modules below |
| `js/dom.js` | Element references and canvas center point |
| `js/canvas.js` | Symmetry math and drawing logic |
| `js/interactions.js` | Pointer/input event wiring and Clear/Save handlers |
