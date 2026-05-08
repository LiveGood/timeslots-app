"use client";

import { ChangeEvent, KeyboardEvent, RefObject } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  value: string;
  onChange: (val: string) => void;
  tabNextRef?: RefObject<HTMLInputElement | null>;
  inputRef?: RefObject<HTMLInputElement | null>;
  error?: boolean;
};

function format(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export default function TimeInput({ value, onChange, tabNextRef, inputRef, error }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(format(e.target.value));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && tabNextRef?.current) {
      e.preventDefault();
      tabNextRef.current.focus();
    }
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
      error={error}
      placeholder="HH:mm"
      size="small"
      variant="outlined"
      slotProps={{
        input: {
          style: {
            width: 70,
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "0.85rem",
          },
        },
        htmlInput: {
          style: { padding: "6px 8px" },
        },
      }}
    />
  );
}
