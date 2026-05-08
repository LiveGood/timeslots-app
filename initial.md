# Time slots with comments app

- You are building a SPA FrontEnd with next.js
- First install all the needed scafolling for the app
- You must implement a clear design which allows the user to add time-slots of productuvity.


## Main App on /app
- You are build a table with time slots and comments
- On the top of the time slots there must be tabulated horizontal design showing the months of current the year, All months are visible tabs
- Under those tabs there must be tabulated horizontal design showing dates of the month with just 00 format, All dates are visible clikable tabs
- All months must be clickable
- Dates must clickable and shown as bright/darker design for active/inactive depending on whether time slots were added in the given day

## Each time slot structure:
- Each time slot must is a <tr>. The time input is in format HH:mm and user must be able to write 4 numbers in START input box, then by pressing tab it goes to the END time slot and the colon(:) between the hours and minutes will be added automatically.
- On the left of time slot inputs, the total time in minutes, will be calculated and show automatically after START and END inputs have been added
- On the right of time slot inputs, there must be a longer input box for optional comments abut the curent time slot
- At the end of the input there must a PLUS  sign that makes possible to add extra comments about the time slot, as sub-rows to the current time slot. Each comment will have a title and descirptiong. They must appear as horizontal lines, similiard in height as the time slot row
- There must a button that shows/hides those extra comments
- At the end there must be a delete button with trashcan icon

# Design
- Use simple material desing with colors in the white, black and visually appealing green color range
- Make the table of time slots with alternating colors in the white/green background color range
- The apges has no side menus, no header, no footer, it's just a simple page with ability to add/remove time slots