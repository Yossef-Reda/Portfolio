import { HERO_ROLES } from "./config.js";
import { prefersReducedMotion, select } from "./utils.js";

const TYPE_SPEED = 70;
const DELETE_SPEED = 35;
const HOLD_MS = 1600;
const NEXT_MS = 400;

/** Rotating typewriter in the hero. Pauses while the tab is hidden. */
export function initTypewriter() {
  const role = select(".hero .role");
  const output = role?.querySelector(".role-typed");
  if (!role || !output) return;

  if (prefersReducedMotion()) {
    output.textContent = HERO_ROLES[0];
    return;
  }

  const state = { phrase: 0, char: 0, erasing: false, delay: 400 };
  let timer = null;

  const render = () => {
    output.textContent = HERO_ROLES[state.phrase].slice(0, state.char);
  };

  const nextStep = () => {
    const phrase = HERO_ROLES[state.phrase];

    if (state.erasing) {
      state.char -= 1;
      if (state.char <= 0) {
        state.char = 0;
        state.erasing = false;
        state.phrase = (state.phrase + 1) % HERO_ROLES.length;
        state.delay = NEXT_MS;
      } else {
        state.delay = DELETE_SPEED;
      }
      return;
    }

    state.char += 1;
    if (state.char >= phrase.length) {
      state.char = phrase.length;
      state.erasing = true;
      state.delay = HOLD_MS;
    } else {
      state.delay = TYPE_SPEED;
    }
  };

  const tick = () => {
    timer = null;
    if (document.hidden) return;
    timer = window.setTimeout(() => {
      nextStep();
      render();
      tick();
    }, state.delay);
  };

  render();
  tick();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(timer);
      timer = null;
    } else if (!timer) {
      tick();
    }
  });
}
