# Time Slots

- A single-page productivity app for tracking daily time slots.
- Adds comment sections, for self-assesment of each time slot.
- It has localStorage persistence

## Tech Stack

- **Next.js 16** (App Router, TypeScript) — framework and routing
- **MUI v9** (`@mui/material`, `@mui/icons-material`) — component library and theming
- **Zustand v5** — client-side state with per-component selectors and `persist` middleware for localStorage
- **Emotion** (`@emotion/react`, `@emotion/styled`) — CSS-in-JS runtime required by MUI

## Getting Started

Install Dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Feature Plans
- Add backend persistence with simple "sync" which gets's all your data and saves it a file-storage
- Add import functionality
- Create Electron App to run in linux/mac environments as separate executable
- Add multi year support
- Add timer which automatically fills a productivity time slot