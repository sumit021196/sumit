<!-- .github/copilot-instructions.md - guidance for AI coding agents working in this repo -->
# Repo-specific Copilot instructions

This file gives concise, actionable guidance for AI coding agents (Copilot-style) to be productive in this React + Vite portfolio project that uses Supabase for auth and a small stock-data service layer.

Keep changes small and idiomatic. Preserve project structure and MUI + Emotion styling patterns.

Key entry points
- `index.html` / `src/main.jsx` — app bootstrapping (React Router, MUI ThemeProvider, HelmetProvider).
- `src/App.jsx` — routing and high-level page composition (lazy-loaded pages inside `PageWrapper`).
- `src/supabaseClient.js` — Supabase client and auth helpers. Environment variables are read from Vite via import.meta.env (VITE_*).
- `src/services/*` — Stock services follow a simple interface: `StockService` base + `rapidApiStockService` implementation. Use these rather than adding duplicate network logic.
- `src/hooks/useStockData.js` — custom hook for pagination/infinite scroll. Reuse on components that show stock lists/tickers.

Big-picture architecture & conventions
- Single-page React app built with Vite. Dev server is `npm run dev` (uses port 3000 by default configured in `vite.config.js`).
- UI: MUI (v5) with Emotion for styling. Theme is exported from `src/theme.js` and applied globally in `main.jsx`/`App.jsx`.
- Routing: `react-router-dom@6` with lazy-loaded pages and `AnimatePresence` for route transitions in `App.jsx`.
- Auth: Supabase handles sign-up/sign-in and session persistence. `src/supabaseClient.js` exposes convenience helpers (`signUp`, `signIn`, `signOut`, `getCurrentUser`, `submitContactForm`). Do not hardcode keys — use Vite env variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Services: Stock data access uses a service abstraction (`src/services/stockService.js`) and a RapidAPI mock implementation (`rapidApiStockService.js`). Prefer using provided service singletons (`rapidAPIStockService`) and the `useStockData` hook for consistency and built-in caching/offset handling.
- Data flow: components call hooks (e.g., `useStockData`) which use services to fetch/format data. Avoid calling fetch directly in components unless implementing a new service.

Developer workflows (fast reference)
- Install: `npm install`
- Dev server: `npm run dev` (or `npm start` alias if present). Vite serves at `http://localhost:3000` by default.
- Build: `npm run build` → outputs to `dist/` with source maps.
- Preview production build locally: `npm run preview` or `npm run preview:build` (build + preview).
- Tests: `npm test` uses Vitest. Keep tests minimal and colocated where they exist (e.g., `src/App.test.js`).
- Lint: `npm run lint` (eslint configured for .js/.jsx files).

Environment & secrets
- Uses Vite import.meta.env variables. Expected names:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_RAPIDAPI_KEY` (optional; `rapidApiStockService` uses mock data if missing)
  - `VITE_RAPIDAPI_HOST`
- Never commit real keys. When running locally, create a `.env` in project root or set environment variables for the dev session.

Patterns and small examples
- Auth usage:
  - The Supabase client exports `signUp(email, password, userData)` and `signIn(email, password)`.
  - Auth state changes are subscribed in `src/supabaseClient.js` via `supabase.auth.onAuthStateChange` — use this for debug info only.
- Service & hook usage (stock list):
  - Import service + hook: `import { rapidAPIStockService } from 'src/services/rapidApiStockService';` then `const { stocks, loadMore } = useStockData(rapidAPIStockService);`
  - The hook handles offset, caching, and has `loadMore`, `refresh` and `hasMore` flags.
- Routing & page wrappers:
  - Pages are lazy-loaded in `src/App.jsx` and wrapped with `PageWrapper` which sets `<Helmet>` title/description — update `PageWrapper` if adding new meta fields.

When modifying or adding files
- Keep public assets under `public/` (service worker `sw.js`, manifest, redirects, sitemap, etc.).
- Follow MUI + Emotion styles already present; prefer `sx` or the project `styles` folder for shared styles. Avoid injecting global CSS unless necessary — `index.css` is minimal.
- For network calls, add a service in `src/services/` that extends `StockService` (if related to stock data) or create a new service module and export a singleton. Keep caching and error handling consistent with existing services.

What not to change without human review
- Major auth flow changes (Supabase config, storage keys, session flowType) — these affect production and session behavior.
- PWA/service worker logic in `public/sw.js` and `vite-plugin-pwa` settings.
- Vite `base` or `build.rollupOptions.input` without checking deployment needs (Netlify in `netlify.toml`).

Quick troubleshooting hints
- Missing Supabase vars: `src/supabaseClient.js` logs a clear error that shows which VITE_ keys are missing.
- RapidAPI: the RapidAPI service falls back to mock data if keys are absent — safe to develop without private keys.

Files worth reading for context
- `src/supabaseClient.js` — auth helpers + session handling
- `src/services/rapidApiStockService.js` and `src/services/stockService.js` — service abstraction and caching
- `src/hooks/useStockData.js` — hook for pagination/infinite scroll
- `src/App.jsx`, `src/main.jsx` and `vite.config.js` — routing, theme, and dev server config
- `package.json` — scripts and dependencies

If anything in this file is unclear or you need more examples (tests, refactors, or how to add CI), ask and I'll iterate.
