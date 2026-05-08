"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTimeSlots } from "../store/timeslots-context";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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
  const today = new Date();
  const year = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    parseInt(selectedDate.slice(5, 7), 10) - 1
  );

  const { hasSlots } = useTimeSlots();

  const handleMonthChange = (_: React.SyntheticEvent, value: number) => {
    setSelectedMonth(value);
    // Move selected date to day 01 of the new month (avoids invalid dates)
    const newDay = pad(1);
    onDateChange(`${year}-${pad(value + 1)}-${newDay}`);
  };

  const handleDateChange = (_: React.SyntheticEvent, value: string) => {
    onDateChange(value);
  };

  const days = daysInMonth(year, selectedMonth);
  const dateKeys = Array.from({ length: days }, (_, i) =>
    `${year}-${pad(selectedMonth + 1)}-${pad(i + 1)}`
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
        margin: "0 50px"
      }}
    >
      {/* Month tabs */}
      <Tabs
        value={selectedMonth}
        onChange={handleMonthChange}
        variant="fullWidth"
        sx={{
          "& .MuiTab-root": {
            minWidth: 0,
            fontWeight: 600,
            fontSize: "0.75rem",
            color: "text.secondary",
          },
          "& .Mui-selected": {
            color: "primary.dark",
          },
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
          const active = hasSlots(dateKey);
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
