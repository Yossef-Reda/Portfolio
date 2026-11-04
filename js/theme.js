import { select, readStorage, writeStorage } from "./utils.js";

const STORAGE_KEY = "yr-theme";
const DARK = "dark";
const LIGHT = "light";
const root = document.documentElement;

/**
 * Apply a theme and keep the toggle and browser chrome in sync.
 * @param {"dark" | "light"} theme
 */
function applyTheme(theme) {
  const isLight = theme === LIGHT;
  const toggle = select("#theme-toggle");
  const iconDark = select("#theme-icon-dark");
  const iconLight = select("#theme-icon-light");
  const themeColor = select("#meta-theme-color");

  root.setAttribute("data-theme", isLight ? LIGHT : DARK);

  if (iconDark) iconDark.style.display = isLight ? "none" : "";
  if (iconLight) iconLight.style.display = isLight ? "" : "none";

  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode",
    );
    toggle.setAttribute("aria-pressed", String(isLight));
  }

  if (themeColor) {
    themeColor.setAttribute("content", isLight ? "#F6F6FB" : "#0B0E14");
  }
}

/** Restore the saved theme or follow the operating system preference. */
export function initTheme() {
  const toggle = select("#theme-toggle");
  const saved = readStorage(STORAGE_KEY);

  if (saved === DARK || saved === LIGHT) {
    applyTheme(saved);
  } else {
    const prefersLight =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? LIGHT : DARK);
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === LIGHT ? LIGHT : DARK;
    const next = current === LIGHT ? DARK : LIGHT;
    applyTheme(next);
    writeStorage(STORAGE_KEY, next);
  });
}
