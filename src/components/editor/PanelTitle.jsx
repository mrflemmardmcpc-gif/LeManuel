import React from "react";

export default function PanelTitle({ children, color = "#f59e42", style = {} }) {
  return (
    <h3 style={{ color, fontWeight: 700, fontSize: 20, marginBottom: 18, ...style }}>{children}</h3>
  );
}
