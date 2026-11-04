# Youssef Reda — Portfolio

A fast, dependency-free personal portfolio for a full-stack .NET developer. Built with semantic HTML, modern CSS, and vanilla JavaScript ES modules — no build step, no framework.

## Features

- Dark/light theme with system preference detection and persistence
- Responsive navigation with scroll-spy and reading-progress bar
- Animated hero, scroll reveals, and skill bars (respects `prefers-reduced-motion`)
- Project cards with custom cover artwork and repository links
- CV opens from a real PDF asset (no base64 payload in the bundle)
- Client-side contact form validation
- Accessible markup: skip link, focus states, ARIA labels, semantic landmarks

## Project structure

```text
portfolio/
├── index.html                  # Page markup and content
├── css/
│   └── styles.css              # Tokens, layout, components, utilities
├── js/
│   ├── main.js                 # Application entry point
│   ├── config.js               # Links, CV path, hero phrases
│   ├── theme.js                # Light/dark theme
│   ├── navigation.js           # Mobile menu, scroll-spy, progress bar
│   ├── animations.js           # Reveal, skill bars, counters
│   ├── typewriter.js           # Hero role rotation
│   ├── effects.js              # Cursor-follow glow
│   ├── links.js                # Hydrates [data-link] anchors
│   ├── cv.js                   # CV download/open
│   ├── contact.js              # Contact form validation
│   └── utils.js                # Shared helpers
├── assets/
│   ├── cv/
│   │   └── Youssef-Reda-CV.pdf
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── project-student-platform.svg
│   │   └── project-inventory.svg
│   └── favicon.svg
├── .gitattributes
├── .gitignore
├── .nojekyll
└── README.md
```

## Run locally

The JavaScript uses native ES modules, so the site must be served over HTTP. Opening `index.html` directly with `file://` makes the browser block module imports (the page will look partly empty and the buttons will not work).

### Windows: one click

Double-click **`start-local.bat`**. It starts a local server and opens <http://localhost:8080> in your browser. Close the minimized "Portfolio local server" window to stop it.

### Any platform: terminal

```bash
# Python 3
python -m http.server 8080

# or Node.js
npx serve .
```

Then open <http://localhost:8080>.

## Customization

| What | Where |
| --- | --- |
| Text, sections, projects | `index.html` |
| Social/contact URLs, hero roles | `js/config.js` |
| Colors, spacing, typography | `:root` tokens at the top of `css/styles.css` |
| CV file | `assets/cv/Youssef-Reda-CV.pdf` |
| Project covers | `assets/images/` |

## Deploy

The site is fully static. Any static host works:

- **GitHub Pages** — push the repository, then go to _Settings → Pages_ and deploy from `main` / root.
- **Netlify / Vercel / Cloudflare Pages** — connect the repository, leave the build command empty, and set the publish directory to the project root.
