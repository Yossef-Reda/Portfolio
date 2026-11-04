import { CV_PATH } from "./config.js";
import { selectAll } from "./utils.js";

/** Open the CV PDF in a new tab from either CV button. */
export function initCvDownload() {
  const buttons = selectAll("#cv-download, #cv-download-nav");
  if (!buttons.length) return;

  const openCv = (event) => {
    event.preventDefault();
    window.open(CV_PATH, "_blank", "noopener");
  };

  buttons.forEach((button) => button.addEventListener("click", openCv));
}
