import { hasFinePointer, prefersReducedMotion, select } from "./utils.js";

const EASING = 0.12;
const STOP_THRESHOLD = 0.4;

/** Soft glow that follows a mouse/trackpad pointer. Disabled on touch devices. */
export function initCursorGlow() {
  const dot = select("#cursor-glow-dot");
  if (!dot || prefersReducedMotion() || !hasFinePointer()) return;

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let queued = false;

  const loop = () => {
    currentX += (targetX - currentX) * EASING;
    currentY += (targetY - currentY) * EASING;
    dot.style.transform = `translate3d(${currentX.toFixed(1)}px,${currentY.toFixed(1)}px,0)`;
    dot.classList.add("on");

    if (
      Math.abs(targetX - currentX) > STOP_THRESHOLD ||
      Math.abs(targetY - currentY) > STOP_THRESHOLD
    ) {
      window.requestAnimationFrame(loop);
    } else {
      queued = false;
    }
  };

  window.addEventListener(
    "mousemove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(loop);
    },
    { passive: true },
  );
}
