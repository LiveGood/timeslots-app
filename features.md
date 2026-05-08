# Features

Derived from [initial.md](initial.md). Unchecked = not yet implemented.

## Scaffolding
- [x] Next.js SPA scaffolded with required dependencies

## Main app at `/app`
- [x] Page renders with no header, footer, or side menu
- [x] Time-slots table as the main content

## Month/date navigation
- [x] Horizontal tab strip showing all months of the current year
- [x] All month tabs are clickable
- [x] Horizontal tab strip showing all dates of the selected month in `00` format
- [x] All date tabs are clickable
- [x] Date tabs render bright/dark depending on whether time slots exist for that day

## Time-slot row
- [x] Each time slot is a `<tr>`
- [x] START input accepts 4 digits in `HH:mm` format
- [x] Pressing Tab in START moves focus to END
- [x] Colon (`:`) between hours and minutes is inserted automatically
- [x] Total time in minutes is computed and shown to the left of the inputs after START and END are filled
- [x] Longer comment input on the right of the time inputs (optional)
- [x] Plus (`+`) button at the end of the row to add sub-comments
- [x] Sub-comments have a title and a description
- [x] Sub-comments render as horizontal rows similar in height to the slot row
- [x] Show/hide toggle button for sub-comments
- [x] Delete button with trashcan icon at the end of the row

## Total for the day

- [x] Total time row pinned to the bottom of the page regardless of slot count
- [x] Box showing total minutes for the day
- [x] Box showing total time in `HH:mm` format
- [x] Totals update automatically when a slot's START/END become complete
- [x] Must have a base comment field (like each slot row) and sub-comment adding for the day
- [x] Make sure total time is persisted on refreshes

## Persistence

- [x] Use browser DB (IndexedDB / localStorage) to persist slot data across refreshes
- [x] Implement full CRUD: create, read, update, delete for time slots

## Design

- [ ] Material-style design
- [ ] Palette restricted to white, black, and an appealing green
- [ ] Time-slot table rows alternate white / green-tinted backgrounds

## Extra

- [x] Page content has percentage-based left/right margins (5%) that scale with zoom
