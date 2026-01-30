import React from "react";

export default function ColorInput({ label, value, onChange, style = {}, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 14, color: "#888", fontWeight: 600 }}>{label}</label>}
      <input
        type="color"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          height: 44,
          borderRadius: 10,
          border: "1.5px solid #ccc",
          background: "transparent",
          cursor: "pointer",
          padding: 0,
          ...style
        }}
        {...props}
      />
    </div>
  );
}
