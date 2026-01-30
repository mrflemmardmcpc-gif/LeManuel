import React from "react";

export default function ActionButton({ children, onClick, color = "#10b981", style = {}, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 0",
        borderRadius: 10,
        backgroundColor: color,
        color: "white",
        border: "none",
        fontWeight: 700,
        fontSize: 16,
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
