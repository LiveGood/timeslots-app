"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTimeSlotsStore, TimeSlot } from "../store/timeslots-store";
import SlotRow from "./SlotRow";

const EMPTY_SLOTS: TimeSlot[] = [];

type Props = { date: string };

export default function SlotsTable({ date }: Props) {
  const daySlots = useTimeSlotsStore((s) => s.slots[date] ?? EMPTY_SLOTS);
  const addSlot = useTimeSlotsStore((s) => s.addSlot);

  const handleAddSlot = () => {
    const slot: TimeSlot = {
      id: crypto.randomUUID(),
      start: "",
      end: "",
      comment: "",
      subComments: [],
    };
    addSlot(date, slot);
  };

  return (
    <Box>
      <Box sx={{ mb: 1.5 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddSlot}
          variant="outlined"
          color="primary"
          size="small"
        >
          Add slot
        </Button>
      </Box>

      <Table
        size="small"
        sx={{
          borderCollapse: "collapse",
          "& .MuiTableCell-root": { borderBottom: "none" },
        }}
      >
        <TableBody>
          {daySlots.map((slot, i) => (
            <SlotRow key={slot.id} slot={slot} date={date} index={i} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
