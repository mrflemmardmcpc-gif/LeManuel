import React, { useState, useEffect } from "react";
let QRCode;
try {
  QRCode = require("qrcode.react");
} catch (e) {
  QRCode = () => <div style={{color:'#ff0055',fontWeight:700}}>QR code indisponible</div>;
}

// Effets visuels et animations avancées (glassmorphisme, néons, 3D, etc.)
const glass = {
  background: "rgba(30, 30, 60, 0.85)",
  boxShadow: "0 8px 40px 0 #00f0ff55, 0 1.5px 16px 0 #fff2",
  border: "1.5px solid #00f0ff88",
  borderRadius: 24,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  padding: 36,
  minWidth: 380,
  maxWidth: 520,
  margin: "auto",
  position: "relative",
  overflow: "hidden"
};

const neon = {
  textShadow: "0 0 8px #00f0ff, 0 0 24px #00f0ff, 0 0 2px #fff",
  color: "#00f0ff",
  fontWeight: 900,
  fontSize: 32,
  letterSpacing: 2
};



export default function StaffPanelFuturist(props) {
  // Mode profil staff unique (pour 1t3r0g4ti0n)
  const profile = {
    name: "1t3r0g4ti0n",
    avatar: "https://media.discordapp.net/attachments/1447974664579317818/1466183951331623256/image-CDPyvyJe5jasdGIzxpnp0.webp?ex=697bd1b6&is=697a8036&hm=4a7a81b9066499b2ab15d73482a2c0a8bb8a9f7a136a7e1f08aa1be12acd3c4a&=&format=webp&width=640&height=640"
  };

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [addError, setAddError] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || !newPwd.trim()) {
      setAddError("Nom et mot de passe obligatoires");
      return;
    }
    onAdd(newName.trim(), newPwd.trim());
    setNewName("");
    setNewPwd("");
    setAddError("");
    setShowAdd(false);
  };

  return (
    <>
      <div className="jarvis-bg">
        <div className="jarvis-hud-overlay" />
        <div className="jarvis-panel">
          <div className="jarvis-header">
            <div className="jarvis-avatar-glow">
              <img src={profile.avatar} alt={profile.name} className="jarvis-avatar" />
              <div className="jarvis-avatar-reflect" />
            </div>
            <div className="jarvis-title-block">
              <div className="jarvis-title">{profile.name}</div>
              <div className="jarvis-subtitle">STAFF PANEL</div>
            </div>
          </div>
          <div className="jarvis-widgets-grid">
            {/* Modules/widgets dynamiques ici */}
            <div className="jarvis-widget jarvis-widget-empty">
              <span>Ajoute ici tes modules staff personnalisés !</span>
            </div>
          </div>
        </div>
        {showAdd ? (
          <div className="staff-add-form neon-fade-in">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nom du staff" className="neon-input" />
            <input value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Mot de passe" type="password" className="neon-input" />
            {addError && <div className="neon-error">{addError}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="neon-btn" onClick={handleAdd}>Créer</button>
              <button className="neon-btn ghost" onClick={() => setShowAdd(false)}>Annuler</button>
            </div>
          </div>
        ) : (
          <button className="neon-btn add-btn" onClick={() => setShowAdd(true)}>+ Ajouter un staff</button>
        )}
        <div className="futurist-mode-badge">Futurist Mode</div>
      </div>
      <style>{`
        .jarvis-bg {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg,#0ff 0%,#181828 100%);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jarvis-hud-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: repeating-radial-gradient(circle at 60% 40%, #00f0ff33 0, #00f0ff11 40px, transparent 200px), repeating-linear-gradient(120deg, #00f0ff11 0 2px, transparent 2px 40px);
          animation: jarvisBgPulse 8s infinite alternate cubic-bezier(.4,2,.6,1);
        }
        @keyframes jarvisBgPulse {
          0% { filter: blur(0px) brightness(1); }
          100% { filter: blur(8px) brightness(1.08); }
        }
        .jarvis-panel {
          position: relative;
          z-index: 1;
          background: rgba(30, 30, 60, 0.92);
          border-radius: 32px;
          box-shadow: 0 0 64px #00f0ff55, 0 2px 32px #fff2;
          padding: 48px 38px 38px 38px;
          min-width: 420px;
          max-width: 600px;
          margin: 48px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: jarvisPanelIn 1.1s cubic-bezier(.4,2,.6,1);
        }
        @keyframes jarvisPanelIn {
          0% { opacity: 0; transform: scale(0.92) translateY(60px) rotateY(-12deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateY(0); }
        }
        .jarvis-header {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 38px;
        }
        .jarvis-avatar-glow {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jarvis-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 48px #00f0ffcc, 0 0 12px #fff2;
          border: 4px solid #00f0ff;
          background: #181828;
          z-index: 1;
        }
        .jarvis-avatar-reflect {
          position: absolute;
          left: 0; right: 0; bottom: -10px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(180deg,rgba(0,240,255,0.22) 0%,rgba(0,0,0,0) 100%);
          filter: blur(3px);
          z-index: 2;
        }
        .jarvis-title-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .jarvis-title {
          font-size: 2.6rem;
          font-weight: 900;
          color: #00f0ff;
          letter-spacing: 2.5px;
          text-shadow: 0 0 18px #00f0ff, 0 0 2px #fff;
        }
        .jarvis-subtitle {
          font-size: 1.1rem;
          font-weight: 700;
          color: #00ffb3;
          letter-spacing: 1.5px;
          margin-top: 6px;
          text-shadow: 0 0 8px #00ffb3, 0 0 2px #fff;
        }
        .jarvis-widgets-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 12px;
        }
        .jarvis-widget {
          min-height: 120px;
          background: rgba(0,0,0,0.18);
          border-radius: 18px;
          box-shadow: 0 0 24px #00f0ff22, 0 0 2px #fff2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #00f0ff;
          font-weight: 700;
          opacity: 0.88;
          position: relative;
          overflow: hidden;
          animation: jarvisWidgetIn 0.9s cubic-bezier(.4,2,.6,1);
        }
        .jarvis-widget-empty {
          opacity: 0.7;
          color: #00f0ff;
          font-size: 1.1rem;
        }
        @keyframes jarvisWidgetIn {
          0% { opacity: 0; transform: scale(0.8) translateY(40px) rotateY(-10deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateY(0); }
        }
        .staff-glass-panel {
          animation: glassFadeIn 1.2s cubic-bezier(.4,2,.6,1);
          position: relative;
        }
        @keyframes glassFadeIn {
          0% { opacity: 0; transform: scale(0.92) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .neon-title {
          text-shadow: 0 0 8px #00f0ff, 0 0 24px #00f0ff, 0 0 2px #fff;
          color: #00f0ff;
          font-weight: 900;
          font-size: 32px;
          letter-spacing: 2px;
          margin-bottom: 18px;
        }
        .staff-profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .staff-profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 32px #00f0ff88, 0 0 8px #fff2;
          margin-bottom: 18px;
          border: 3.5px solid #00f0ff;
          background: #181828;
        }
        .staff-profile-name {
          font-size: 2.2rem;
          font-weight: 900;
          color: #00f0ff;
          letter-spacing: 2px;
          text-shadow: 0 0 12px #00f0ff, 0 0 2px #fff;
        }
        .staff-profile-modules {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .staff-profile-module {
          width: 100%;
          min-height: 120px;
          background: rgba(0,0,0,0.18);
          border-radius: 18px;
          box-shadow: 0 0 16px #00f0ff22;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .staff-profile-module-empty {
          min-height: 80px;
          font-size: 1.2rem;
          opacity: 0.8;
        }
        .staff-account-card {
          background: rgba(0,0,0,0.25);
          border-radius: 16px;
          padding: 18px;
          min-width: 180px;
          box-shadow: 0 0 16px #00f0ff44;
          position: relative;
          transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1), filter 0.18s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: neonCardIn 0.7s cubic-bezier(.4,2,.6,1) both;
          will-change: transform, box-shadow, filter;
          perspective: 600px;
        }
        .staff-3d-card:focus {
          outline: 2px solid #00f0ff;
          filter: brightness(1.08) drop-shadow(0 0 24px #00f0ffcc);
        }
        .staff-avatar-3d {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .staff-avatar-reflect {
          position: absolute;
          left: 0; right: 0; bottom: -8px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(180deg,rgba(0,240,255,0.18) 0%,rgba(0,0,0,0) 100%);
          filter: blur(2.5px);
          z-index: 2;
        }
        @keyframes neonCardIn {
          0% { opacity: 0; transform: scale(0.8) translateY(40px) rotateY(-10deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotateY(0); }
        }
        .staff-account-name {
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        .neon-btn {
          background: linear-gradient(90deg,#00f0ff,#00ffb3);
          color: #181828;
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          font-weight: 800;
          font-size: 16px;
          box-shadow: 0 0 8px #00f0ff99;
          cursor: pointer;
          margin: 4px 0;
          letter-spacing: 1px;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s, filter 0.18s;
          will-change: transform, box-shadow, filter;
        }
        .neon-btn:hover {
          background: linear-gradient(90deg,#00ffb3,#00f0ff);
          color: #fff;
          box-shadow: 0 0 24px #00f0ffcc;
          transform: scale(1.12) rotateY(2deg);
          filter: brightness(1.12) drop-shadow(0 0 12px #00f0ffcc);
        }
        .del-btn {
          background: linear-gradient(90deg,#ff0055,#ffb3c6);
          color: #fff;
          box-shadow: 0 0 8px #ff005599;
        }
        .del-btn:hover {
          background: linear-gradient(90deg,#ffb3c6,#ff0055);
          color: #fff;
          box-shadow: 0 0 24px #ff0055cc;
        }
        .qr-btn {
          background: linear-gradient(90deg,#00f0ff,#00ffb3);
          color: #181828;
        }
        .add-btn {
          font-size: 20px;
          font-weight: 900;
          padding: 14px 32px;
          border-radius: 12px;
          margin-top: 18px;
          box-shadow: 0 0 24px #00f0ff55;
        }
        .ghost {
          background: #181828;
          color: #fff;
          border: 1.5px solid #00f0ff88;
        }
        .neon-input {
          padding: 12px;
          border-radius: 8px;
          border: 1.5px solid #00f0ff88;
          background: #101020;
          color: #fff;
          font-size: 17px;
          width: 200px;
          margin-bottom: 4px;
          outline: none;
          box-shadow: 0 0 8px #00f0ff22 inset;
          transition: border 0.18s, box-shadow 0.18s;
        }
        .neon-input:focus {
          border: 1.5px solid #00ffb3;
          box-shadow: 0 0 16px #00f0ff55;
        }
        .neon-error {
          color: #ff0055;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .staff-add-form {
          margin-top: 18px;
          background: rgba(0,0,0,0.18);
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 0 8px #00f0ff33;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }
        .futurist-mode-badge {
          position: absolute;
          top: 18px;
          right: 24px;
          color: #00f0ff;
          font-weight: 700;
          font-size: 18px;
          opacity: 0.7;
          letter-spacing: 1px;
          text-shadow: 0 0 8px #00f0ff;
        }
        .staff-qr-modal {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: rgba(0,0,0,0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: staffQrFadeIn 0.35s cubic-bezier(.4,2,.6,1);
        }
        .staff-qr-content {
          background: #181828;
          border-radius: 24px;
          box-shadow: 0 0 48px #00f0ffcc, 0 0 24px #fff2;
          padding: 36px 32px 24px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: staffQrPop 0.45s cubic-bezier(.4,2,.6,1);
        }
        @keyframes staffQrFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes staffQrPop {
          0% { opacity: 0; transform: scale(0.7) rotateY(-18deg); }
          100% { opacity: 1; transform: scale(1) rotateY(0); }
        }
      `}</style>
    </>
  );
}
