# Artistic Duck — Media & Tech

Marketing site built with React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Stack
- React 19, React Router 7
- three.js via @react-three/fiber + drei (3D duck hero, `src/three/DuckScene.jsx`)
- motion (animations), Lenis (smooth scroll)

## Editing content
All copy lives in `src/data/site.js`: contact details, services, careers roles, blog topics.
Items marked `PLACEHOLDER` / `TODO` (showcase slides, client names, social links, blog posts, work tiles in `src/pages/Work.jsx`) need real content before launch.

The contact form has no backend yet; it opens the visitor's mail app with the enquiry pre-filled to the enquiry address.

## Deploying
`dist/` is a static SPA. On Vercel/Netlify, add a rewrite of all routes to `/index.html` so deep links like `/services` work.
# ArtisticDuck
