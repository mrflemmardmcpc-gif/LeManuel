import React from "react";
import StaffPanelFuturist from "./components/StaffPanelFuturist";

export default function StaffPanelPage({ onClose }) {
  return (
    <div className="staff-panel-web-bg">
      <div className="staff-panel-web-center">
        <StaffPanelFuturist />
        <button onClick={onClose} className="staff-panel-web-quit">Quitter</button>
      </div>
      <style>{`
        .staff-panel-web-bg {
          min-height: 100vh;
          width: 100vw;
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: linear-gradient(135deg,#0ff 0%,#181828 100%);
          overflow: auto;
        }
        .staff-panel-web-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #00f0ff88 0%, #181828 80%);
          animation: staffBgPulse 8s infinite alternate cubic-bezier(.4,2,.6,1);
        }
        @keyframes staffBgPulse {
          0% { filter: blur(0px) brightness(1); }
          100% { filter: blur(8px) brightness(1.08); }
        }
        .staff-panel-web-center {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .staff-panel-web-quit {
          margin-top: 32px;
          padding: 16px 48px;
          border-radius: 16px;
          background: linear-gradient(90deg,#ff0055,#00f0ff);
          color: #fff;
          border: none;
          font-weight: 900;
          font-size: 22px;
          cursor: pointer;
          letter-spacing: 2px;
          box-shadow: 0 0 32px #00f0ff55, 0 0 8px #ff005555;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .staff-panel-web-quit:hover {
          background: linear-gradient(90deg,#00f0ff,#ff0055);
          color: #fff;
          box-shadow: 0 0 48px #00f0ffcc, 0 0 16px #ff0055cc;
          transform: scale(1.06) rotateY(2deg);
        }
      `}</style>
    </div>
  );
}
