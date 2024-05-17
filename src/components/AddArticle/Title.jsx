import React from "react";
import TextField from "@mui/material/TextField";

export default function Title({ onChange, value }) {
  return (
    <TextField
      onChange={onChange}
      name="title"
      defaultValue="New Title"
      placeholder="New Title"
      className="title-input"
      size="small"
    />
  );
}
