import React from "react";

export default function TextInput({ label, value, onChange, placeholder, style = {}, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 14, color: "#888", fontWeight: 600 }}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 10,
          border: "1.5px solid #ccc",
          background: "#23202d",
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          outline: "none",
          transition: "border 0.2s",
          ...style
        }}
        {...props}
      />
    </div>
  );
}
