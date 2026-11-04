import { LINKS } from "./config.js";
import { selectAll } from "./utils.js";

/**
 * Hydrate every element carrying `data-link` from the LINKS config.
 * Keeps WhatsApp, email, GitHub, LinkedIn, and Facebook in one place.
 */
export function initContactLinks() {
  selectAll("[data-link]").forEach((anchor) => {
    const url = LINKS[anchor.getAttribute("data-link")];
    if (!url) return;

    anchor.setAttribute("href", url);

    if (url.startsWith("http")) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  });
}
