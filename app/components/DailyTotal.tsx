"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTimeSlotsStore, SubComment, TimeSlot } from "../store/timeslots-store";

const EMPTY_SLOTS: TimeSlot[] = [];
const EMPTY_COMMENTS: SubComment[] = [];

function calcTotals(slots: TimeSlot[]): { minutes: number; formatted: string } {
  let total = 0;
  for (const slot of slots) {
    const parts = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return isNaN(h) || isNaN(m) ? null : h * 60 + m;
    };
    const s = parts(slot.start);
    const e = parts(slot.end);
    if (s !== null && e !== null && e > s) total += e - s;
  }
  const h = Math.floor(total / 60);
  const m = total % 60;
  return {
    minutes: total,
    formatted: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
  };
}

type Props = { date: string };

export default function DailyTotal({ date }: Props) {
  const daySlots = useTimeSlotsStore((s) => s.slots[date] ?? EMPTY_SLOTS);
  const comments = useTimeSlotsStore((s) => s.dayComments[date] ?? EMPTY_COMMENTS);
  const note = useTimeSlotsStore((s) => s.dayNotes[date] ?? "");
  const addDayComment = useTimeSlotsStore((s) => s.addDayComment);
  const updateDayComment = useTimeSlotsStore((s) => s.updateDayComment);
  const deleteDayComment = useTimeSlotsStore((s) => s.deleteDayComment);
  const updateDayNote = useTimeSlotsStore((s) => s.updateDayNote);

  const [showComments, setShowComments] = useState(true);

  const { minutes, formatted } = calcTotals(daySlots);
  const hasComments = comments.length > 0;

  const addComment = () => {
    const comment: SubComment = { id: crypto.randomUUID(), title: "", description: "" };
    addDayComment(date, comment);
    setShowComments(true);
  };

  const cellSx = { py: "4px", px: 1 };
  const boxSx = {
    border: "2px solid",
    borderColor: "primary.main",
    borderRadius: 1,
    px: 1.5,
    py: 0.5,
    minWidth: 80,
    textAlign: "center" as const,
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        px: "10%",
        bgcolor: "#F9FBE7",
        borderTop: "2px solid",
        borderColor: "primary.light",
        zIndex: 20,
      }}
    >
      {/* Day-comment rows — expand upward inside the fixed panel */}
      {hasComments && showComments && (
        <Box sx={{ pt: 0.5 }}>
          {comments.map((c, i) => (
            <Box
              key={c.id}
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
                py: "4px",
                borderBottom: i < comments.length - 1 ? "1px solid #e0e0e0" : "none",
              }}
            >
              <TextField
                value={c.title}
                onChange={(e) => updateDayComment(date, { ...c, title: e.target.value })}
                placeholder="Title"
                size="small"
                variant="outlined"
                sx={{ width: 172, flexShrink: 0 }}
              />
              <TextField
                value={c.description}
                onChange={(e) => updateDayComment(date, { ...c, description: e.target.value })}
                placeholder="Description"
                size="small"
                variant="outlined"
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                onClick={() => deleteDayComment(date, c.id)}
                sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Total bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.75 }}>
        <Box sx={boxSx}>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1 }}>
            min
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.dark", fontFamily: "monospace" }}>
            {minutes}
          </Typography>
        </Box>

        <Box sx={boxSx}>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1 }}>
            total
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.dark", fontFamily: "monospace" }}>
            {formatted}
          </Typography>
        </Box>

        <TextField
          value={note}
          onChange={(e) => updateDayNote(date, e.target.value)}
          placeholder="Day comment…"
          size="small"
          variant="outlined"
          sx={{ flex: 1 }}
        />

        <IconButton size="small" onClick={addComment} color="primary" title="Add day comment">
          <AddIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => setShowComments((v) => !v)} color="primary" disabled={!hasComments}>
          {showComments ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
  );
}
