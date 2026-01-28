// Génère un QR code pour Google Authenticator à partir du secret TOTP
import speakeasy from "speakeasy";
import qrcode from "qrcode";

// Utilise le même secret que dans staff-login.js
const TOTP_SECRET = process.env.STAFF_TOTP_SECRET || "KZXW6YTBON2XEZLQ";
const SERVICE = "LeManuelStaff";
const ACCOUNT = "LeManuelStaff";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Méthode non autorisée" });
  // Génère l'URL otpauth
  const otpauth = speakeasy.otpauthURL({
    secret: TOTP_SECRET,
    label: `${ACCOUNT}`,
    issuer: SERVICE,
    encoding: "base32"
  });
  // Génère le QR code en data URL
  try {
    const qr = await qrcode.toDataURL(otpauth);
    return res.status(200).json({ qr });
  } catch (err) {
    return res.status(500).json({ error: "Erreur QR code" });
  }
}
