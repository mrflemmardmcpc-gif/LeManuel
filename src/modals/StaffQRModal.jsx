import React, { useEffect, useState } from "react";

export default function StaffQRModal({ open, onClose }) {
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    fetch("/api/staff-qr")
      .then((res) => res.json())
      .then((data) => {
        setQr(data.qr || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement du QR code");
        setLoading(false);
      });
  }, [open]);

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: 16, padding: 32, minWidth: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: "#3b82f6" }}>QR Code Google Authenticator</h2>
        {loading && <div>Chargement…</div>}
        {error && <div style={{ color: "#ef4444" }}>{error}</div>}
        {qr && <img src={qr} alt="QR code" style={{ width: 220, height: 220, margin: 12 }} />}
        <div style={{ fontSize: 14, color: "#334155", textAlign: "center" }}>
          Scanne ce QR code dans Google Authenticator.<br />
          <b>Ne partage pas ce code !</b>
        </div>
        <button onClick={onClose} style={{ marginTop: 10, padding: "10px 18px", borderRadius: 8, background: "#3b82f6", color: "white", border: "none", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Fermer</button>
      </div>
    </div>
  );
}
