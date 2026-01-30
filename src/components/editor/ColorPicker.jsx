import React from "react";

export default function ColorPicker({ value, onChange, style, ...props }) {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
      style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #ccc", cursor: "pointer", ...style }}
      {...props}
    />
  );
}
