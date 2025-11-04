
  # BoldFrame Studios — React + Vite Single‑Page Website

  Production‑grade single‑page site built with React 18 + Vite, TypeScript, Tailwind‑ready styling, and motion. The project emphasizes modern performance techniques (RAFs, passive listeners, memoization, lazy loading), robust SEO via `react-helmet-async`, and deploy‑friendly static assets.

  ## Table of Contents
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
  - [SEO & Metadata](#seo--metadata)
  - [Performance Guardrails](#performance-guardrails)
  - [Project Structure](#project-structure)
  - [Build & Deploy](#build--deploy)
  - [Lighthouse & QA](#lighthouse--qa)
  - [Troubleshooting](#troubleshooting)
  - [Docs & References](#docs--references)
  - [License](#license)

  ## Features
  - requestAnimationFrame‑based custom cursor with tuned damping/stiffness
  - Reduced backdrop blur and carefully controlled glassmorphism
  - Lazy‑loaded non‑critical sections via `React.lazy` + `Suspense`
  - Memoized components with `React.memo` and `useCallback`
  - Passive event listeners for scroll/mouse performance
  - `prefers-reduced-motion` support and graceful animation degradation
  - EmailJS integration via environment variables (public key, service, template)
  - No global smooth scrolling reintroductions (kept performance‑first)
  - Security and performance improvements per internal guidance
  - Complete SEO with `react-helmet-async`, robots.txt, sitemap.xml, and JSON‑LD

  ## Tech Stack
  - React 18, TypeScript, Vite 6
  - Motion (Framer Motion compatible API)
  - Radix UI primitives and shadcn‑style components
  - Helmet (`react-helmet-async`) for metadata
  - Tailwind‑compatible utility classes

  ## Requirements
  - Node.js 18+ recommended (LTS)
  - npm 9+ (or compatible package manager)

  ## Getting Started
  1. Clone the repository.
  2. Install dependencies:
     - `npm i`
  3. Create a `.env` file in the project root (see [Environment Variables](#environment-variables)).
  4. Start the dev server:
     - `npm run dev`
  5. Open the app at the URL Vite prints (usually `http://localhost:5173`).

  ## Available Scripts
  - `npm run dev` — Start Vite dev server.
  - `npm run build` — Build production assets to `dist/`.
  - (Optional) Preview a production build: `npx vite preview --port 4173`.

  ## Environment Variables
  Create a `.env` in the project root with:
  - `VITE_EMAILJS_PUBLIC_KEY=your_public_key`
  - `VITE_EMAILJS_SERVICE_ID=your_service_id`
  - `VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id`

  Notes:
  - Only variables prefixed with `VITE_` are exposed to the client at build time.
  - EmailJS and SweetAlert scripts are loaded via CDN with `defer` and `async` for non‑blocking behavior.

  ## SEO & Metadata
  Global metadata lives in `src/App.tsx` and is provided at runtime by `react-helmet-async`.
  - Provider: `HelmetProvider` is added in `src/main.tsx`.
  - Global `<Helmet>` includes:
    - Title, description, keywords, author, canonical
    - Open Graph tags (type, title, description, url, image, site_name)
    - Twitter Card (summary_large_image) tags
    - Viewport, `X-UA-Compatible`, and `robots` tags
    - JSON‑LD Organization schema
  - Per‑section SEO: commented examples are present in major components (`Hero`, `Services`, `About`, `Work`, `ContactModal`, `Footer`) for easy future overrides with `<Helmet>`.
  - Robots & Sitemap:
    - `public/robots.txt` allows all and points to the sitemap
    - `public/sitemap.xml` lists key anchors (home, services, contact)

  Quick references:
  - `src/main.tsx`: wraps `<App />` with `<HelmetProvider>`
  - `src/App.tsx`: global `<Helmet>` block and JSON‑LD
  - `public/robots.txt` and `public/sitemap.xml`: crawl directives

  ## Performance Guardrails
  The following optimizations are already implemented—do not remove or regress them:
  - RAF‑driven cursor logic; tuned physics values
  - Component memoization (`React.memo`) and stable callbacks (`useCallback`)
  - Lazy‑loading all non‑critical sections via `React.lazy`
  - Passive event listeners for scroll/mouse where applicable
  - Reduced backdrop blur (keep `blur(8px)` and `-webkit-backdrop-filter`)
  - Respect `prefers-reduced-motion`
  - Avoid render‑blocking work in effects; defer third‑party scripts
  - Avoid global smooth scrolling reintroduction

  For a deeper dive, see `PERFORMANCE_FIXES.md` and `SECURITY_AND_PERFORMANCE.md`.

  ## Project Structure
  - `src/`
    - `App.tsx` — root SPA layout, lazy routes/sections, global Helmet
    - `components/` — UI sections and primitives
    - `components/ui/` — shadcn/radix UI building blocks
    - `components/figma/` — image helper(s)
    - `index.css`, `styles/globals.css` — global styles
    - `main.tsx` — React root + `HelmetProvider`
  - `public/` — static assets, `robots.txt`, `sitemap.xml`, favicons/images
  - `vite.config.ts` — Vite configuration

  ## Build & Deploy
  1. Build: `npm run build` → outputs to `dist/`.
  2. Deploy options:
     - Vercel: import repository, set build command `npm run build`, output `dist`.
     - Netlify: build `npm run build`, publish directory `dist`.
     - Static hosting (NGINX/S3/CloudFront): upload the `dist/` directory.
  3. Domain & SEO:
     - Set canonical domain (e.g., `https://nikhilwebworks.com/`) in the global `<Helmet>` if changed.
     - Ensure `robots.txt` and `sitemap.xml` resolve at the root.
     - Consider adding a `preview.jpg` and `logo.png` matching the configured Open Graph/JSON‑LD URLs.
  4. Caching:
     - Serve immutable hashed assets with long cache TTL; HTML with short TTL or no‑cache.

  See `DEPLOYMENT_CHECKLIST.md` for a step‑by‑step list.

  ## Lighthouse & QA
  Target: SEO ≥ 95, Performance remains high, Accessibility best practices honored.
  - Run Lighthouse in Chrome (Incognito, throttling enabled).
  - Verify:
    - Head tags present and correct (title, description, OG/Twitter, canonical).
    - `robots.txt` and `sitemap.xml` accessible.
    - Animations remain smooth (60 FPS) and respect `prefers-reduced-motion`.
    - Cursor and animations behave as expected; no jank.

  ## Troubleshooting
  - EmailJS “not loaded” at submit:
    - Wait for CDN to load or refresh; ensure `.env` keys are correct and redeployed.
  - Helmet tags not updating:
    - Confirm `<HelmetProvider>` wraps `<App />` in `src/main.tsx`.
  - `sitemap.xml`/`robots.txt` 404 in production:
    - Ensure host serves `public/` root files without routing rewrites.
  - CSP or third‑party script blocks:
    - Update CSP headers to allow jsDelivr for EmailJS and SweetAlert if you enforce CSP.
  - TypeScript build errors:
    - Ensure Node and deps match the versions in `package.json`; reinstall `node_modules`.

  ## Docs & References
  - `IMPLEMENTATION_SUMMARY.md`
  - `FINAL_UPDATES_SUMMARY.md`
  - `PERFORMANCE_FIXES.md`
  - `SECURITY_AND_PERFORMANCE.md`
  - `EMAIL_SETUP_GUIDE.md`
  - `EMAILJS_TEMPLATE_SETUP.md`
  - `guidelines/Guidelines.md`
  - `Attributions.md`

  ## License
  Proprietary — All rights reserved by BoldFrame Studios (or the project owner). Do not redistribute without permission.
  