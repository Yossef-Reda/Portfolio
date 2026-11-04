import { select, selectAll } from "./utils.js";

const MOBILE_BREAKPOINT = 1024;
const SCROLLED_OFFSET = 50;

/** Mobile navigation: open/close, focus handling, Escape and resize. */
function initMobileMenu() {
  const toggle = select("#menu-toggle");
  const panel = select("#mobile-panel");
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu",
    );
  };

  toggle.addEventListener("click", () => {
    const open = !panel.classList.contains("open");
    setOpen(open);
    if (open) panel.querySelector("a")?.focus();
  });

  selectAll("a", panel).forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
  });
}

/**
 * Navbar background, top progress bar, and active-section highlighting.
 * Reads layout first, then writes, so the browser needs a single layout pass.
 */
function initScrollUi() {
  const navbar = select(".navbar");
  const progress = select("#scroll-progress");
  const sections = selectAll("main section[id]");
  const navAnchors = selectAll("a[data-nav]");
  let queued = false;

  const update = () => {
    queued = false;

    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const scrollPosition = y + navHeight + 24;

    let activeId = sections[0]?.id ?? null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top + y <= scrollPosition) {
        activeId = section.id;
      }
    }
    if (
      sections.length &&
      y + viewportHeight >= documentHeight - 2
    ) {
      activeId = sections[sections.length - 1].id;
    }

    navbar?.classList.toggle("scrolled", y > SCROLLED_OFFSET);

    if (progress) {
      const max = documentHeight - viewportHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }

    navAnchors.forEach((anchor) => {
      const isActive = anchor.getAttribute("href") === `#${activeId}`;
      anchor.classList.toggle("active", isActive);
      if (isActive) anchor.setAttribute("aria-current", "true");
      else anchor.removeAttribute("aria-current");
    });
  };

  const scheduleUpdate = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("load", scheduleUpdate);
  update();
}

export function initNavigation() {
  initMobileMenu();
  initScrollUi();
}
