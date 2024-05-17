import React from "react";

export default function Description({ value, onChange }) {
  return (
    <>
      <textarea
        name="description"
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
