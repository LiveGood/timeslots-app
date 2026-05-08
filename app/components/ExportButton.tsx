"use client";

import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { formatDate } from "../lib/date-helpers";

const STORAGE_KEY = "timeslots_v1";

export default function ExportButton() {
  const handleExport = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timeslots-${formatDate(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <IconButton size="small" onClick={handleExport} color="primary" title="Export data as JSON">
      <DownloadIcon fontSize="small" />
    </IconButton>
  );
}
