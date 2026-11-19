# Artistic Duck — Media & Tech

Marketing site built with React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Stack
- React 19, React Router 7 (routes lazy-loaded except Home)
- motion (animations, respects reduced-motion), Lenis (smooth scroll)
- Montserrat (headings) + Roboto (body) from Google Fonts

## Routes
`/`, `/about`, `/services`, `/services/:slug`, `/work`, `/work/:slug`, `/careers`, `/insights`, `/insights/:slug`, `/contact`.

## Editing content
- `src/data/site.js` — contact details, social links, the eight detailed services, careers roles.
- `src/data/content.js` — the four service disciplines, industries, goals, project types/budgets, work studies and Insights articles.
- `src/components/Art.jsx` — the illustrated scenes used instead of photography.

### Still needs real content before launch
- **Work**: entries in `work` are capability studies (clearly labelled on the site), not client case studies. Replace with real projects, screenshots and approved results.
- **Social links** in `site.js` point at platform home pages.
- **Photography**: team and studio photos can replace the illustrated panels on About and Careers.

## Enquiries
There is no server endpoint yet. The project brief wizard (`/contact`) and careers applications validate input, then open the visitor's email app with the brief addressed to the enquiry inbox. The UI says exactly that and never claims a message was delivered. To receive briefs directly, add a serverless endpoint with an email provider and swap the `submit` handlers in `BriefWizard.jsx` and `Careers.jsx`.

## /connect — company brand experience
QR destination: **https://www.artisticduckk.com/connect** (company-only; no individual profiles).

- Separate Vite entry (`connect/index.html` → `src/connect/main.jsx`) with its own static title, description, Open Graph and Organization JSON-LD, and a lightweight bundle (no router, Lenis or main-site chrome).
- Journey: cinematic 3D logo intro (skippable, once per session) → company hero → four-division service universe with detail panels → about → philosophy → work → why us → enquiry → contact.
- 3D: `src/connect/three/duckScene.js` (three.js, lazy-loaded). There is no modelled GLB of the duck; the original logo artwork is stacked in alpha-masked layers to give it real thickness. A CSS-3D layered version (`DuckLogoLayered`) is used when WebGL is unavailable, slow to load, or the visitor prefers reduced motion. Drop in a GLB later by replacing the logo group in `duckScene.js`.
- Content and config: `src/connect/data/connect.js` (company contact details, LinkedIn/Instagram URLs, divisions, portfolio entries).
- `npm run vcard` (also runs on `prebuild`) regenerates the company contact card `public/artistic-duckk.vcf` from that data file.
- Enquiry form: set `VITE_ENQUIRY_ENDPOINT` to enable direct submission — contract in `docs/connect-enquiry-api.md`. Without it the form opens the visitor's email app with the brief prefilled.
- `vercel.json` rewrites `/connect` to `connect/index.html` and serves `.vcf` as `text/vcard`.

## Deploying
`dist/` is a static SPA. `vercel.json` rewrites all routes to `/index.html` so deep links work.
