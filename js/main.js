import { initTheme } from "./theme.js";
import { initContactLinks } from "./links.js";
import { initNavigation } from "./navigation.js";
import {
  initCounters,
  initPhotoReveal,
  initScrollReveal,
  initSkillBars,
} from "./animations.js";
import { initTypewriter } from "./typewriter.js";
import { initCursorGlow } from "./effects.js";
import { initCvDownload } from "./cv.js";
import { initContactForm } from "./contact.js";

/** Boot every feature. Each module is self-contained and no-ops if its DOM is missing. */
function bootstrap() {
  initTheme();
  initContactLinks();
  initNavigation();
  initPhotoReveal();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initTypewriter();
  initCursorGlow();
  initCvDownload();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
  bootstrap();
}
