"use client";

import { useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function ExpandingTextField({ sx, onFocus, onBlur, ...rest }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextField
      {...rest}
      multiline={focused}
      minRows={focused ? 1 : undefined}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        !focused ? {
          "& .MuiInputBase-input": {
            textOverflow: "ellipsis",
            overflow: "hidden"
          }
        } : {},
        { "& textarea": { resize: "none" }, },
      ]}
    />
  );
}
