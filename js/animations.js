import { prefersReducedMotion, select, selectAll } from "./utils.js";

/** Fade the hero photo in shortly after load. */
export function initPhotoReveal() {
  const photo = select(".reveal-photo");
  if (!photo) return;

  if (prefersReducedMotion()) {
    photo.classList.add("in");
    return;
  }

  window.setTimeout(() => photo.classList.add("in"), 200);
}

/** Reveal sections on scroll and stagger their grid/list children. */
export function initScrollReveal() {
  const elements = selectAll(".reveal");
  if (!elements.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        observer.unobserve(element);
        const children = Array.from(element.children);

        if (children.length > 1) {
          element.classList.add("staggered");
          children.forEach((child, index) => {
            child.classList.add("stagger-item");
            child.style.setProperty(
              "--reveal-delay",
              `${Math.min(index * 70, 420)}ms`,
            );
          });
          // Commit the start state before animating.
          void element.offsetWidth;
          children.forEach((child) => child.classList.add("in"));
        } else {
          element.classList.add("in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((element) => observer.observe(element));
}

/** Fill the skill bars the first time the Skills section is visible. */
export function initSkillBars() {
  const bars = selectAll(".skill-bar");
  if (!bars.length) return;

  const fill = () => bars.forEach((bar) => bar.classList.add("in"));

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    fill();
    return;
  }

  const section = select("#skills");
  if (!section) {
    fill();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      fill();
      observer.disconnect();
    },
    { threshold: 0.15 },
  );

  observer.observe(section);
}

/** Animate any element carrying `data-count` when it enters the viewport. */
export function initCounters() {
  const counters = selectAll("[data-count]");
  if (!counters.length) return;

  const render = (element, value) => {
    const suffix = element.getAttribute("data-suffix") || "";
    element.textContent = `${Math.round(value)}${suffix}`;
  };

  const animate = (element) => {
    const target = Number.parseFloat(element.getAttribute("data-count")) || 0;
    const duration = 1400;
    let start = null;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      render(element, target * (1 - (1 - progress) ** 3));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    counters.forEach((element) => {
      render(element, Number.parseFloat(element.getAttribute("data-count")) || 0);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((element) => observer.observe(element));
}
