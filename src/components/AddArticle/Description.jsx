import React from "react";
import TextField from "@mui/material/TextField";

export default function Description({ onChange }) {
  return (
    <TextField
      defaultValue="New Description"
      onChange={onChange}
      placeholder="New Description"
      name="description"
      rows={4}
      multiline
      className="description-input"
      variant="outlined"
    />
  );
}
