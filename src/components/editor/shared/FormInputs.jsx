import React from "react";

export function PanelTitle({ children, color = "#f59e42", style = {} }) {
  return (
    <h3 style={{ color, fontWeight: 700, fontSize: 20, marginBottom: 18, ...style }}>{children}</h3>
  );
}

export function TextInput({ label, value, onChange, placeholder, style = {}, ...props }) {
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

export function ColorInput({ label, value, onChange, style = {}, ...props }) {
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

export function SelectInput({ label, value, onChange, options, style = {}, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 14, color: "#888", fontWeight: 600 }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
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
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
