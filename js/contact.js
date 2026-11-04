import { select } from "./utils.js";

const FIELDS = ["name", "email", "subject", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  name: "Please enter your name.",
  emailRequired: "Please enter your email.",
  emailInvalid: "Please enter a valid email address.",
  subject: "Please enter a subject.",
  message: "Please enter a message.",
  invalid: "Please fix the highlighted fields and try again.",
  demo:
    "This is a demo form — no email service is connected yet, so your message was not actually sent. Please use WhatsApp or LinkedIn to reach out directly.",
};

/** Client-side validation for the demo contact form. */
export function initContactForm() {
  const form = select("#contact-form");
  const status = select("#form-status");
  if (!form) return;

  const setFieldError = (name, message = "") => {
    const error = select(`#err-${name}`);
    const input = select(`#cf-${name}`);
    if (error) error.textContent = message;
    if (!input) return;

    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  };

  const setStatus = (text, kind = "") => {
    if (!status) return;
    status.classList.remove("show", "success", "error");
    status.textContent = text;
    if (!text) return;
    void status.offsetWidth; // Replay the entrance animation.
    status.classList.add("show", kind);
  };

  FIELDS.forEach((name) => {
    const input = select(`#cf-${name}`);
    input?.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") {
        setFieldError(name);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = Object.fromEntries(
      FIELDS.map((name) => [
        name,
        /** @type {HTMLInputElement | HTMLTextAreaElement} */ (
          select(`#cf-${name}`)
        )?.value.trim() ?? "",
      ]),
    );

    let valid = true;
    FIELDS.forEach((name) => setFieldError(name));

    if (!values.name) {
      setFieldError("name", MESSAGES.name);
      valid = false;
    }
    if (!values.email) {
      setFieldError("email", MESSAGES.emailRequired);
      valid = false;
    } else if (!EMAIL_PATTERN.test(values.email)) {
      setFieldError("email", MESSAGES.emailInvalid);
      valid = false;
    }
    if (!values.subject) {
      setFieldError("subject", MESSAGES.subject);
      valid = false;
    }
    if (!values.message) {
      setFieldError("message", MESSAGES.message);
      valid = false;
    }

    if (!valid) {
      setStatus(MESSAGES.invalid, "error");
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus(MESSAGES.demo, "success");
    form.reset();
  });
}
