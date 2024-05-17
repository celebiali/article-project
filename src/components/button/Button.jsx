import * as React from "react";
import Button from "@mui/material/Button";

export default function Basicbutton({ onClick, formData, progress }) {
  const isFormDataValid =
    formData.title && formData.description && formData.image;
  return (
    <div className="button-container">
      <Button variant="outlined" onClick={onClick} disabled={!isFormDataValid}>
        {progress === 0 ? "" : `${progress}%`}
      </Button>
    </div>
  );
}
