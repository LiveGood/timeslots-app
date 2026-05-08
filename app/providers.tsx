"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { TimeSlotsProvider } from "./store/timeslots-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TimeSlotsProvider>{children}</TimeSlotsProvider>
    </ThemeProvider>
  );
}
