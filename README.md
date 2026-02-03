# EczemaEase – Symptom Tracker

A mobile-friendly web app for tracking eczema symptoms, triggers, and photo documentation.

## Features

- **Home**: Daily symptom tracking with date selector, itch/pain severity (0–10), body map (front/back), and quick logs for sleep, stress, and weather.
- **Triggers**: Quick-add buttons for foods, products, and activities, plus a notes field.
- **History**: Calendar view of tracked days, tap a day for details, and a simple severity trend chart.
- **Photos**: Upload or take photos and link them to a selected date.

## Tech

- React 18 + Vite
- Tailwind CSS (blue & white theme)
- React Router
- Data stored in `localStorage` (no backend)

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`). Use browser dev tools device mode or a real phone for the best mobile experience.

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

The app is configured for Vercel with `vercel.json`:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework:** Vite (auto-detected)
- **SPA routing:** All routes rewrite to `index.html` so React Router works on refresh.

**Option 1 – Deploy with Vercel CLI**

```bash
npm i -g vercel
vercel
```

**Option 2 – Deploy from GitHub**

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. **Add New Project** → Import your repository.
4. Vercel will use the repo’s `vercel.json` and build settings (no extra config needed).
5. Deploy; your site will be live at `https://your-project.vercel.app`.

## Data

All data is stored in the browser’s `localStorage` under keys `eczemaease_entries` and `eczemaease_photos`. Clearing site data will reset the app.
