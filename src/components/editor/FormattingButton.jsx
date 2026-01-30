import React from "react";

export default function FormattingButton({ label, onClick, active, style = {}, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 8px",
        borderRadius: 8,
        border: active ? "2px solid #10b981" : "1px solid #ccc",
        backgroundColor: active ? "#e0f7fa" : "#23202d",
        color: "#fff",
        fontWeight: 800,
        cursor: "pointer",
        fontSize: 12,
        ...style
      }}
      {...props}
    >
      {label}
    </button>
  );
}
