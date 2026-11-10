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

## Deploying
`dist/` is a static SPA. `vercel.json` rewrites all routes to `/index.html` so deep links work.
