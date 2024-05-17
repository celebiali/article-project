
import React from "react";

export default function Title({ value, onChange }) {
  return (
    <div className="form-group">
      <input
        type="text"
        name="title"
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
