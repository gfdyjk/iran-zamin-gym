# Mahdi Babaei — Portfolio

Premium, motion-driven portfolio for **Mahdi Babaei — Software Engineer**, built as a single-page
experience: cinematic dark interface, layered 3D motion, glass surfaces and a real contact API.

> Brand: **Mahdi Babaei — Digital Experiences & Technology**

## Stack

| Layer | Technology |
| --- | --- |
| UI | React 18 + TypeScript + Vite |
| Styling | Hand-written CSS with design tokens (`src/styles/tokens.css`), no UI framework |
| Motion | CSS 3D transforms + `IntersectionObserver` + `requestAnimationFrame` — **no animation library** |
| API | Node.js + Express |
| Storage | PostgreSQL (`messages` table) |
| Fonts | Space Grotesk + Inter — self-hosted (SIL OFL) |

No WebGL, no GSAP/Framer Motion bundle: every effect is CSS-composited, which keeps the JS payload at
roughly React's own weight (~59 kB gzipped) and the first paint fast on mid-range phones.

## Project structure

```
index.html                  SEO metadata, Open Graph, JSON-LD (Person, ProfessionalService, WebSite)
src/
  App.tsx                   Page composition and section order
  data/site.ts              ALL content: nav, hero, overview, about, skills, projects, services, contact
  hooks/
    useInView.ts            Reveal-on-scroll observer
    useTilt.ts              3D pointer tilt + hero pointer field (writes CSS variables, no re-renders)
    useUiState.ts           Active section, scroll progress, local clock, body scroll lock
  components/
    layout/                 Header (sticky glass nav + mobile sheet), Footer (status bar)
    sections/               Hero, Overview, About, Skills, Projects, ProjectModal, Services, Contact
    ui/                     Icon set, LogoMark, Reveal, SectionHeading, TiltCard
  lib/api.ts                Contact form client
  styles/                   tokens.css, global.css, fonts.css
server/                     Contact API (Express + pg)
public/                     favicon, robots.txt, sitemap.xml, CV, fonts
```

## Editing content

Everything the visitor reads lives in **`src/data/site.ts`**. Components never hardcode copy:

- `site` — name, title, tagline, canonical URL, meta description
- `nav` — menu items and their section ids
- `hero` — badge, greeting, rotating roles, intro, CTAs, portrait
- `overview` / `about` / `skills` / `services` — section copy, cards, tags
- `projects` — add a project by appending an object to the array; the grid, card, and case-study
  modal all render from it (no component changes needed)
- `contact` — email, location, response time, form labels, socials (rendered when present)
- `footer` — status line and credit

## Portrait

The hero ships with an art-directed holographic bust so the page is complete without a photograph.
To use a real photo:

1. Add the file to `public/images/` (e.g. `portrait.webp`, ~900×1125, WebP/AVIF).
2. Set `hero.portrait` in `src/data/site.ts` to `'/images/portrait.webp'`.

The frame, rim lighting, scan line, HUD labels and 3D parallax all keep working with the photo.

## CV

`public/cv/mahdi-babaei-cv.pdf` is generated from the same content as the site. Replace the file to
update the download — the "Download CV" button needs no change.

## Contact form

`POST /api/contact` validates on the server and stores the message in PostgreSQL:

- `messages (id, name, email, message, source, created_at)` — created automatically on API start
- Per-IP throttle: 6 submissions per 10 minutes
- Read messages: `GET /api/messages` with header `x-admin-token: $ADMIN_TOKEN`
  (the route is disabled when `ADMIN_TOKEN` is unset)

The browser form validates inline (name, email, message length), shows a success panel on submit and
surfaces server errors without losing the user's input.

## SEO

- Semantic HTML5, one `h1`, ordered `h2`/`h3` hierarchy, descriptive alt text
- Unique title, meta description, canonical, Open Graph and Twitter Card metadata
- `public/robots.txt` and `public/sitemap.xml`
- JSON-LD graph for `Person`, `ProfessionalService` and `WebSite`

Replace `https://mahdibabaei.com` in `index.html`, `public/robots.txt` and `public/sitemap.xml` with
the production domain, and swap `public/og-image.png` for a branded social card.

## Performance & accessibility

- Single CSS bundle, no animation library, no WebGL, no blocking third-party scripts
- Fonts self-hosted with `font-display: swap` and only the two Latin files preloaded
- Animations use `transform`/`opacity` only; pointer handlers write CSS variables through `rAF`
- `prefers-reduced-motion` disables tilt, parallax, scan and reveal animations
- 44 px minimum hit areas, visible cyan focus rings, skip link, labelled form fields, focus-trapped
  project modal, `aria-live` form status
- No horizontal overflow from 320 px up; layout adapts (not shrinks) per breakpoint

## Local development

```bash
npm install
npm run dev            # http://localhost:3000

cd server && npm install && npm start   # API on :8000 (needs PostgreSQL)
```

`npm run build` type-checks and produces the static `dist/` bundle; deploy it to any static host and
run `server/` (or the same Express app) alongside it with `/api` proxied to it.
