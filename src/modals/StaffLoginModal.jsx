import React, { useState } from "react";



export default function StaffLoginModal({ open, onClose, onSuccess }) {
  const [prenom, setPrenom] = useState("");
  const [code, setCode] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset all fields when modal opens
  React.useEffect(() => {
    if (open) {
      setPrenom("");
      setCode("");
      setMdp("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prenom.trim()) return setError("Prénom obligatoire");
    if (!code.trim()) return setError("Code secret obligatoire");
    if (!mdp.trim()) return setError("Mot de passe obligatoire");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/staff-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, code, mdp })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Erreur serveur");
        setLoading(false);
        return;
      }
      setError("");
      setLoading(false);
      onSuccess({ prenom, code });
    } catch (err) {
      setError("Erreur réseau");
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,30,0.92)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ background: "#23233b", borderRadius: 22, boxShadow: "0 8px 32px rgba(0,0,0,0.45)", padding: 38, minWidth: 320, maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <h2 style={{ color: "#FFB366", fontWeight: 800, fontSize: 28, marginBottom: 8, letterSpacing: 1 }}>Connexion Staff</h2>
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #FFB366", background: "#181828", color: "#fff", fontSize: 18, marginBottom: 4 }}
        />
        <input
          type="text"
          placeholder="Code Authenticator (6 chiffres)"
          value={code}
          onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0,6))}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #FFB366", background: "#181828", color: "#fff", fontSize: 18, marginBottom: 4, letterSpacing: 4, textAlign: 'center' }}
          inputMode="numeric"
          pattern="[0-9]{6}"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={e => setMdp(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #FFB366", background: "#181828", color: "#fff", fontSize: 18, marginBottom: 4 }}
        />
        {error && <div style={{ color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>{error}</div>}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: "10px 28px", borderRadius: 10, background: loading ? "#6b7280" : "#10b981", color: "white", border: "none", fontWeight: 700, fontSize: 18, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 1 }}>{loading ? "..." : "Valider"}</button>
          <button type="button" onClick={onClose} disabled={loading} style={{ padding: "10px 18px", borderRadius: 10, background: "#ef4444", color: "white", border: "none", fontWeight: 700, fontSize: 18, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 1, opacity: loading ? 0.7 : 1 }}>Annuler</button>
        </div>
      </form>
    </div>
  );
}
