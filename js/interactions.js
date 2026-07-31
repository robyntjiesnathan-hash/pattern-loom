import {
  canvas,
  symmetryInput,
  brushInput,
  hueInput,
  symmetryVal,
  brushVal,
  hueVal,
  clearBtn,
  saveBtn,
} from "./dom.js";
import { fillBackground, getPos, drawSegment } from "./canvas.js";

let drawing = false;
let lastPoint = null;

function pointerDown(e) {
  drawing = true;
  lastPoint = getPos(e);
  canvas.setPointerCapture(e.pointerId);
}

function pointerMove(e) {
  if (!drawing) return;
  const point = getPos(e);
  drawSegment(lastPoint, point);
  lastPoint = point;
}

function pointerUp() {
  drawing = false;
  lastPoint = null;
}

canvas.addEventListener("pointerdown", pointerDown);
canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerup", pointerUp);
canvas.addEventListener("pointercancel", pointerUp);
canvas.addEventListener("pointerleave", pointerUp);

symmetryInput.addEventListener("input", () => {
  symmetryVal.textContent = symmetryInput.value;
});
brushInput.addEventListener("input", () => {
  brushVal.textContent = brushInput.value;
});
hueInput.addEventListener("input", () => {
  hueVal.textContent = hueInput.value;
});

clearBtn.addEventListener("click", fillBackground);

saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pattern-loom.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

fillBackground();
