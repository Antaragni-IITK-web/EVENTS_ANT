# Antaragni '26 — Events Website

Standalone deployable version of the Antaragni '26 events-registration website
(IIT Kanpur's cultural festival). Extracted from the shared `antaragni26`
monorepo into an independent repository for Vercel deployment.

This repo is a **minimal Turborepo**: one Next.js app plus the shared workspace
packages it depends on. It does not depend on the original monorepo.

## Structure

```
apps/
  events-registration/   → the Next.js 16 app (App Router)
packages/
  firebase/              → Firebase auth / firestore / storage wrappers (@repo/firebase)
  store/                 → Zustand global store (@repo/store)
  ui/                    → shared UI components, shipped prebuilt in dist/ (@repo/ui)
  model/                 → shared types (@repo/model)
  tailwind-config/       → shared Tailwind v4 + PostCSS config (@repo/tailwind-config)
  typescript-config/     → shared tsconfig bases (@repo/typescript-config)
  eslint-config/         → shared ESLint config (@repo/eslint-config)
  math/                  → tiny util package (dev dependency of @repo/ui)
```

## Local development

```bash
npm install
npm run dev          # runs the app on http://localhost:3010 (turbo)
# or, directly:
cd apps/events-registration && npm run dev
```

## Build

```bash
npm run build        # turbo run build (builds the app)
```

## Environment variables

The app needs Firebase web config. Locally these live in
`apps/events-registration/.env.local` (git-ignored). For Vercel, set the same
keys in the project's Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## Deploying to Vercel

This is an npm-workspaces monorepo, so point Vercel at the app:

1. **Import the repo** into Vercel.
2. **Root Directory** → `apps/events-registration`
   (Vercel auto-detects Next.js and installs from the workspace root.)
3. **Environment Variables** → add the six `NEXT_PUBLIC_FIREBASE_*` keys above.
4. Deploy. Framework preset = Next.js, Build = `next build` (auto).

`@repo/ui` is shipped prebuilt in `packages/ui/dist` and committed, so no extra
build step is required for the shared packages.
