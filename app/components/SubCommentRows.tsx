"use client";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandingTextField from "./ExpandingTextField";
import { SubComment } from "../store/timeslots-store";

const SUB_BG = "#FAFAFA";
const separator = "2px solid #a5d6a7";
const cellSx = { py: "6px", px: 1, verticalAlign: "top" };

type Props = {
  subComments: SubComment[];
  onUpdate: (sub: SubComment) => void;
  onDelete: (subId: string) => void;
};

export default function SubCommentRows({ subComments, onUpdate, onDelete }: Props) {
  const inputSx = {
    "& .MuiInputBase-input": { padding: "4px 8px" }
  };
  return (
    <>
      {subComments.map((sub, si) => (
        <TableRow
          key={sub.id}
          sx={{
            bgcolor: SUB_BG,
            "& .MuiTableCell-root": {
              borderBottom: si === subComments.length - 1 ? separator : "none",
            },
          }}
        >
          <TableCell colSpan={2} />
          <TableCell sx={cellSx}>
            <TextField
              value={sub.title}
              onChange={(e) => onUpdate({ ...sub, title: e.target.value })}
              placeholder="Title"
              size="small"
              fullWidth
              variant="outlined"
              sx={inputSx}
            />
          </TableCell>
          <TableCell sx={cellSx}>
            <ExpandingTextField
              value={sub.description}
              onChange={(e) => onUpdate({ ...sub, description: e.target.value })}
              placeholder="Description"
              size="small"
              fullWidth
              variant="outlined"
              sx={inputSx}
            />
          </TableCell>
          <TableCell sx={{ ...cellSx, textAlign: "right" }}>
            <IconButton
              size="small"
              onClick={() => onDelete(sub.id)}
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
