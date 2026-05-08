# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Note: Next.js APIs may differ from training data. Check `node_modules/next/dist/docs/` before writing Next.js-specific code and heed deprecation notices.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run lint      # ESLint
```

## Stack

- **Next.js** (App Router, TypeScript)
- **MUI** (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- No backend / persistence yet — ask the user before adding API routes or a database

## Product spec (from initial.md)

A single-page app for tracking productivity time slots. The full app lives at `/app`. No header, footer, or side menu — just the time-slot table.

Key behaviors that aren't obvious from the file tree:

- **Three-level tab navigation at the top:** months of the current year (all visible), then dates of the selected month formatted as `00` (all visible). Date tabs render bright/dark depending on whether time slots exist for that date — the date-tab component depends on the slot store, not just the calendar.
- **Time-slot row input UX:** the START input accepts 4 raw digits; the `:` between hours and minutes is inserted automatically, and pressing Tab advances to END. Total minutes is computed and shown to the **left** of the inputs once both are filled. The auto-colon and tab-advance are the main interaction quirk.
- **Sub-comments:** each row has a `+` button that appends sub-rows (title + description) of similar height to the parent row, plus a show/hide toggle and a trashcan delete on the parent.
- **Design:** Material-style via MUI, palette restricted to white / black / an appealing green. Slot table rows alternate white and green-tinted backgrounds.

## Architecture notes

- Data model is hierarchical: `Date → TimeSlot[] → SubComment[]`. The state approach should make "does this date have slots?" cheap, since the date-tab strip queries it for every visible day.
- Persistence is unspecified — confirm with user (localStorage, API route, or in-memory) before adding it.
