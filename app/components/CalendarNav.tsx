"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTimeSlotsStore } from "../store/timeslots-store";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FIRST_YEAR = 2020;
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: currentYear + 1 - FIRST_YEAR },
  (_, i) => FIRST_YEAR + i
).sort((a, b) => b - a); // descending sort

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Props = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export default function CalendarNav({ selectedDate, onDateChange }: Props) {
  const selectedYear = parseInt(selectedDate.slice(0, 4), 10);

  const [selectedMonth, setSelectedMonth] = useState<number>(
    parseInt(selectedDate.slice(5, 7), 10) - 1
  );

  const slots = useTimeSlotsStore((s) => s.slots);

  const handleYearChange = (newYear: number) => {
    onDateChange(`${newYear}-${pad(selectedMonth + 1)}-01`);
  };

  const handleMonthChange = (_: React.SyntheticEvent, value: number) => {
    setSelectedMonth(value);
    onDateChange(`${selectedYear}-${pad(value + 1)}-01`);
  };

  const handleDateChange = (_: React.SyntheticEvent, value: string) => {
    onDateChange(value);
  };

  const days = daysInMonth(selectedYear, selectedMonth);
  const dateKeys = Array.from({ length: days }, (_, i) =>
    `${selectedYear}-${pad(selectedMonth + 1)}-${pad(i + 1)}`
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "background.default",
        borderBottom: "2px solid",
        borderColor: "primary.light",
        margin: "0 50px",
      }}
    >
      {/* Month tabs + year selector on same row */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={selectedMonth}
          onChange={handleMonthChange}
          variant="fullWidth"
          sx={{
            flex: 1,
            "& .MuiTab-root": {
              minWidth: 0,
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "text.secondary",
            },
            "& .Mui-selected": { color: "primary.dark" },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: 3,
            },
          }}
        >
          {MONTHS.map((m, i) => (
            <Tab key={m} label={m} value={i} />
          ))}
        </Tabs>

        {/* Year selector */}
        <Select
          value={selectedYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          variant="standard"
          disableUnderline
          sx={{
            ml: 1,
            pr: 0.5,
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "primary.dark",
            "& .MuiSelect-select": { py: "6px", pr: "20px !important", pl: 0.5 },
            "& .MuiSelect-icon": { color: "primary.main", fontSize: "1.1rem" },
          }}
        >
          {YEAR_OPTIONS.map((year) => (
            <MenuItem key={year} value={year} sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Date tabs */}
      <Tabs
        value={selectedDate}
        onChange={handleDateChange}
        variant="fullWidth"
        sx={{
          minHeight: 32,
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.dark",
            height: 2,
          },
        }}
      >
        {dateKeys.map((dateKey) => {
          const active = (slots[dateKey]?.length ?? 0) > 0;
          const dayNum = dateKey.slice(8);
          return (
            <Tab
              key={dateKey}
              label={dayNum}
              value={dateKey}
              sx={{
                minWidth: 0,
                minHeight: 32,
                padding: "2px 0",
                fontSize: "0.7rem",
                fontWeight: active ? 700 : 400,
                color: active ? "primary.dark" : "text.disabled",
                "&.Mui-selected": {
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  borderRadius: 1,
                },
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
