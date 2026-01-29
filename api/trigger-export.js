// /api/trigger-export.js
// Endpoint pour créer/mettre à jour le fichier .trigger-export et le pousser sur GitHub

import { exec } from 'child_process';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  // Auth simple (même clé que l'admin)
  const ADMIN_KEY = process.env.ADMIN_KEY || 'ITSTIEC2026';
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  try {
    // Écrit un timestamp dans .trigger-export pour forcer le workflow
    fs.writeFileSync('.trigger-export', String(Date.now()), 'utf8');
    exec('git add .trigger-export && git commit -m "[auto] Trigger export workflow" && git push', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: stderr || error.message });
      }
      res.status(200).json({ success: true, output: stdout });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
