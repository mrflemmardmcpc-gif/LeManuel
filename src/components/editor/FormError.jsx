import React from "react";

export default function FormError({ message }) {
  if (!message) return null;
  return (
    <div style={{ color: "#e11d48", background: "#fff0f3", borderRadius: 8, padding: 10, marginBottom: 10, fontWeight: 600, fontSize: 14 }}>
      {message}
    </div>
  );
}
