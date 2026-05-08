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

## Add years support

- [x] On the same tab level as the months, on the top right add dropdown of years
- [x] Tab should contain the current year and look the same as the months tab, but it must have a visible "clickable" property to change the year
- [x] If the select year is the current year make all months after the current one disabled and non-clickable

## Export button

- [x] On the same row as total daily timeslots, add export button which is just a download icon with the same green we already use
- [x] Make a separate component file
- [x] When clicked the button should open the OS download window and export the entire JSON saved in local storage
- [x] default name of the file should be timeslots-{curren timestamp}.json

## Add time validation

- [x] When a timeslot END time is less then the start time, make the input field red
- [x] Add a helpful message above the input, explaining the problem
- [x] Only remove the message when the times are valid or the user deletes the last character of the END input

## Design

- [ ] Material-style design
- [ ] Palette restricted to white, black, and an appealing green
- [ ] Time-slot table rows alternate white / green-tinted backgrounds

## Performance Upgrades / Zustand Migration

- [x] Migrate state management from React Context + useReducer to Zustand with per-component selectors
- [x] Each component subscribes only to the state slice it needs (no full-tree re-renders on keystroke)
- [x] `React.memo` on SlotRow so rows only re-render when their own slot prop changes
- [x] Persist middleware with `skipHydration` replaces manual HYDRATE action pattern

## Extra

- [x] Page content has percentage-based left/right margins (5%) that scale with zoom
