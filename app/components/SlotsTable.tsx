"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTimeSlots, TimeSlot } from "../store/timeslots-context";
import SlotRow from "./SlotRow";

type Props = { date: string };

export default function SlotsTable({ date }: Props) {
  const { slots, dispatch } = useTimeSlots();
  const daySlots = slots[date] ?? [];

  const addSlot = () => {
    const slot: TimeSlot = {
      id: crypto.randomUUID(),
      start: "",
      end: "",
      comment: "",
      subComments: [],
    };
    dispatch({ type: "ADD_SLOT", date, slot });
  };

  return (
    <Box>
      <Box sx={{ mb: 1.5 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={addSlot}
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
