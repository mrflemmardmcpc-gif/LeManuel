// API route pour valider la connexion staff côté serveur
import speakeasy from "speakeasy";

// À stocker dans une variable d'environnement en prod !
const TOTP_SECRET = process.env.STAFF_TOTP_SECRET || "KZXW6YTBON2XEZLQ"; // exemple, à personnaliser !
const VALID_MDP = process.env.STAFF_MDP || 'DEV2026';

// Liste des pseudos autorisés à accéder au staff panel
const STAFF_ADMINS = ["1t3r0g4ti0n"];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const { prenom, code, mdp } = req.body || {};
  if (!prenom || !code || !mdp) return res.status(400).json({ error: 'Champs manquants' });
  if (!STAFF_ADMINS.includes(prenom)) return res.status(403).json({ error: 'Accès staff interdit' });
  if (mdp !== VALID_MDP) return res.status(401).json({ error: 'Mot de passe incorrect' });
  // Vérification du code TOTP (Google Authenticator)
  const verified = speakeasy.totp.verify({
    secret: TOTP_SECRET,
    encoding: 'base32',
    token: code,
    window: 1 // tolérance de 1 intervalle (30s)
  });
  if (!verified) return res.status(401).json({ error: 'Code Authenticator invalide' });
  return res.status(200).json({ success: true, prenom });
}
