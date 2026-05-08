## Fixes

- [x] Move "Add slot" button above the time-slots list
- [x] Add bolder bottom border separation between time-slot rows
- [x] Fix the border between slots to be visualised properly on the bottom when new comments are added
- [] Fix: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:
