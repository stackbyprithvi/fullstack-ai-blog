# AGENTS.md — MERN Blog App

Monorepo: `backend/` (CommonJS) + `frontend/` (ESM). No root workspace scripts — run all commands from the package directory. No TypeScript, no tests (`npm test` is a placeholder).

## Commands

| Package | Command | Action |
|---------|---------|--------|
| backend | `npm start` | `nodemon server.js` |
| frontend | `npm run dev` | Vite dev server |
| frontend | `npm run build` | Production build |
| frontend | `npm run lint` | ESLint flat config |
| frontend | `npm run preview` | Vite preview (production build) |

## Architecture

**Backend** — Express v5 + Mongoose v9
- `server.js` loads dotenv, connects DB, starts on `PORT` (default 5050)
- `app.js` mounts routes: `/api/auth`, `/api/posts` (posts + comments share this prefix), `/api/ai`, `/api/health`
- JWT auth via `authMiddleware.js` (30d token, Bearer header)

**Frontend** — React 19 + Vite + Tailwind v4 + react-router-dom v7
- `main.jsx`: `AuthProvider` → `ThemeProvider` → `BrowserRouter` → `App.jsx`
- Axios instance (`services/api.js`) auto-attaches JWT from localStorage; 401 → logout + redirect /login
- CSS custom properties with `.dark` class on `<html>` (NOT Tailwind `dark:` prefix); theme persisted to localStorage
- Routes: `/login`, `/register`, `/forgot-password`, `/reset-password/:token` (public); `/`, `/profile` (protected)
- SPA deployment via `vercel.json` rewrites all paths to `/index.html`

## Gotchas

- **Module systems differ**: backend uses `require()`/`module.exports`, frontend uses `import`/`export`
- **Frontend `.env` has duplicate `VITE_API_URL`** — Vite reads the last assignment. Comment out the unused value
- **Tailwind v4**: no `tailwind.config.js` — uses `@import "tailwindcss"` in CSS + `@tailwindcss/vite` plugin
- **ESLint flat config** (ESLint v9+, `eslint.config.js`)
- **Two post creation routes**: `POST /api/posts` and `POST /api/posts/:postId` both hit `createPosts` controller
- **Comments mounted at `/api/posts`**: paths are `/api/posts/:postId/comments` and `/api/posts/comments/:id`
- **likePost has corruption guard**: resets `likes` to `[]` if it detects a non-array value
- **Auth middleware bug**: both invalid and missing tokens return `"No token, authorization denied"`
- **`isAdmin` middleware commented out** — not usable
- **Password reset**: crypto token, 10-min expiry, Nodemailer with Gmail App Password
- **AI route** (`POST /api/ai/generate-blog`): uses OpenAI SDK pointed at OpenRouter API with `google/gemini-2.5-flash` model; SSE streaming response (`text/event-stream`)
- **Backend fix script**: `backend/scripts/fixlikes.js` — standalone DB migration for corrupted likes
