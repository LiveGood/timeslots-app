"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { useTimeSlotsStore } from "./store/timeslots-store";
import { ReactNode } from "react";

function StoreHydrator() {
  useEffect(() => {
    useTimeSlotsStore.persist.rehydrate();
  }, []);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreHydrator />
      {children}
    </ThemeProvider>
  );
}
