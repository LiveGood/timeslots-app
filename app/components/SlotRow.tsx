"use client";

import { useRef, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TimeInput from "./TimeInput";
import { TimeSlot, SubComment, useTimeSlots } from "../store/timeslots-context";

const ROW_COLORS = ["#ffffff", "#F1F8E9"];
const SUB_BG = "#FAFAFA";

function calcMinutes(start: string, end: string): number | null {
  const parse = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return isNaN(h) || isNaN(m) ? null : h * 60 + m;
  };
  const s = parse(start);
  const e = parse(end);
  if (s === null || e === null) return null;
  const diff = e - s;
  return diff > 0 ? diff : null;
}

type Props = { slot: TimeSlot; date: string; index: number };

export default function SlotRow({ slot, date, index }: Props) {
  const { dispatch } = useTimeSlots();
  const endInputRef = useRef<HTMLInputElement>(null);
  const [showSubs, setShowSubs] = useState(true);

  const update = (patch: Partial<TimeSlot>) =>
    dispatch({ type: "UPDATE_SLOT", date, slot: { ...slot, ...patch } });

  const updateSub = (sub: SubComment) =>
    dispatch({
      type: "UPDATE_SLOT",
      date,
      slot: {
        ...slot,
        subComments: slot.subComments.map((s) => (s.id === sub.id ? sub : s)),
      },
    });

  const addSub = () => {
    const sub: SubComment = { id: crypto.randomUUID(), title: "", description: "" };
    dispatch({ type: "ADD_SUBCOMMENT", date, slotId: slot.id, sub });
    setShowSubs(true);
  };

  const deleteSub = (subId: string) =>
    dispatch({ type: "DELETE_SUBCOMMENT", date, slotId: slot.id, subId });

  const deleteSlot = () =>
    dispatch({ type: "DELETE_SLOT", date, slotId: slot.id });

  const minutes = calcMinutes(slot.start, slot.end);
  const hasSubs = slot.subComments.length > 0;
  const bg = ROW_COLORS[index % 2];

  const cellSx = { py: "6px", px: 1 };
  const separator = "2px solid #a5d6a7";
  // Bold border belongs on the last visible row of this slot group
  const mainRowIsLast = !hasSubs || !showSubs;

  return (
    <>
      <TableRow sx={{ bgcolor: bg, "& .MuiTableCell-root": { borderBottom: mainRowIsLast ? separator : "none" } }}>
        {/* Minutes */}
        <TableCell sx={{ ...cellSx, width: 52, textAlign: "center", color: "primary.dark", fontWeight: 700, fontSize: "0.8rem" }}>
          {minutes !== null ? `${minutes}m` : ""}
        </TableCell>

        {/* START */}
        <TableCell sx={{ ...cellSx, width: 90 }}>
          <TimeInput
            value={slot.start}
            onChange={(v) => update({ start: v })}
            tabNextRef={endInputRef}
          />
        </TableCell>

        {/* END */}
        <TableCell sx={{ ...cellSx, width: 90 }}>
          <TimeInput
            value={slot.end}
            onChange={(v) => update({ end: v })}
            inputRef={endInputRef}
          />
        </TableCell>

        {/* Comment */}
        <TableCell sx={cellSx}>
          <TextField
            value={slot.comment}
            onChange={(e) => update({ comment: e.target.value })}
            placeholder="Comment…"
            size="small"
            fullWidth
            variant="outlined"
          />
        </TableCell>

        {/* Actions */}
        <TableCell sx={{ ...cellSx, width: 75, whiteSpace: "nowrap" }}>
          <IconButton size="small" onClick={addSub} color="primary" title="Add sub-comment">
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setShowSubs((v) => !v)} color="primary" disabled={!hasSubs}>
            {showSubs ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
          <IconButton
            size="small"
            onClick={deleteSlot}
            sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
            title="Delete slot"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Sub-comment rows */}
      {showSubs &&
        slot.subComments.map((sub, si) => (
          <TableRow
            key={sub.id}
            sx={{
              bgcolor: SUB_BG,
              "& .MuiTableCell-root": {
                borderBottom: si === slot.subComments.length - 1 ? separator : "none",
              },
            }}
          >
            <TableCell colSpan={2} />
            <TableCell sx={cellSx}>
              <TextField
                value={sub.title}
                onChange={(e) => updateSub({ ...sub, title: e.target.value })}
                placeholder="Title"
                size="small"
                fullWidth
                variant="outlined"
              />
            </TableCell>
            <TableCell sx={cellSx}>
              <TextField
                value={sub.description}
                onChange={(e) => updateSub({ ...sub, description: e.target.value })}
                placeholder="Description"
                size="small"
                fullWidth
                variant="outlined"
              />
            </TableCell>
            <TableCell sx={{ ...cellSx, textAlign: "right" }}>
              <IconButton
                size="small"
                onClick={() => deleteSub(sub.id)}
                sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
