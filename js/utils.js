/**
 * Shared, side-effect-free helpers.
 */

/** @returns {boolean} True when the visitor asked for reduced motion. */
export function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** @returns {boolean} True for devices with a precise pointer (mouse/trackpad). */
export function hasFinePointer() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches
  );
}

/**
 * Query a single element.
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {T | null}
 */
export function select(selector, scope = document) {
  return /** @type {T | null} */ (scope.querySelector(selector));
}

/**
 * Query all matching elements as a real array.
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {T[]}
 */
export function selectAll(selector, scope = document) {
  return /** @type {T[]} */ (Array.from(scope.querySelectorAll(selector)));
}

/** Clamp a number between a minimum and a maximum. */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Safely read a value from localStorage. */
export function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Safely write a value to localStorage. */
export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Storage can be disabled (private mode, strict settings). */
  }
}
