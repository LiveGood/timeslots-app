"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import CalendarNav from "./components/CalendarNav";
import SlotsTable from "./components/SlotsTable";
import DailyTotal from "./components/DailyTotal";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(todayKey);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <CalendarNav selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Box sx={{ px: "10%", py: 2, pb: "80px" }}>
        <SlotsTable date={selectedDate} />
      </Box>
      <DailyTotal date={selectedDate} />
    </Box>
  );
}
