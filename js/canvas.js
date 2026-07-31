import {
  canvas,
  ctx,
  cx,
  cy,
  symmetryInput,
  brushInput,
  hueInput,
  mirrorInput,
  rainbowInput,
  glowInput,
} from "./dom.js";

let rainbowHue = 0;

export function canvasBg() {
  return getComputedStyle(document.documentElement).getPropertyValue("--canvas-bg").trim();
}

export function fillBackground() {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = canvasBg();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

export function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function rotatePoint(p, angle, flip) {
  let rx = p.x - cx;
  let ry = p.y - cy;
  if (flip) ry = -ry;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: cx + rx * cos - ry * sin,
    y: cy + rx * sin + ry * cos,
  };
}

export function currentColor() {
  const hue = rainbowInput.checked ? rainbowHue : Number(hueInput.value);
  return `hsl(${hue}, 85%, 62%)`;
}

export function drawSegment(p0, p1) {
  const n = Number(symmetryInput.value);
  const mirror = mirrorInput.checked;
  const glow = glowInput.checked;
  const brush = Number(brushInput.value);
  const color = currentColor();

  ctx.lineWidth = brush;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.shadowBlur = glow ? brush * 2.5 : 0;
  ctx.shadowColor = color;

  for (let k = 0; k < n; k++) {
    const angle = (k * 2 * Math.PI) / n;
    const a0 = rotatePoint(p0, angle, false);
    const a1 = rotatePoint(p1, angle, false);
    ctx.beginPath();
    ctx.moveTo(a0.x, a0.y);
    ctx.lineTo(a1.x, a1.y);
    ctx.stroke();

    if (mirror) {
      const b0 = rotatePoint(p0, angle, true);
      const b1 = rotatePoint(p1, angle, true);
      ctx.beginPath();
      ctx.moveTo(b0.x, b0.y);
      ctx.lineTo(b1.x, b1.y);
      ctx.stroke();
    }
  }

  if (rainbowInput.checked) {
    rainbowHue = (rainbowHue + 1.5) % 360;
  }
}
