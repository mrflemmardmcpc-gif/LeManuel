// /api/export-push.js
// Endpoint pour déclencher l'export Redis -> Git
// Sécurité minimale : à renforcer selon besoin

import { exec } from 'child_process';

export default async function handler(req, res) {
  // Méthode POST uniquement
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // Vérification admin simple (clé secrète en header)
  const ADMIN_KEY = process.env.ADMIN_KEY || 'ITSTIEC2026';
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  exec('node export-redis-to-git.cjs', { cwd: process.cwd() }, (error, stdout, stderr) => {
    // Si le script retourne "No change in data, nothing to commit." ou tout message sur stdout, on considère comme succès
    if (stdout && stdout.includes('No change in data, nothing to commit.')) {
      return res.status(200).json({ success: true, output: stdout });
    }
    if (error) {
      // Si le script a écrit sur stdout (succès partiel), on considère comme succès
      if (stdout && stdout.trim().length > 0) {
        return res.status(200).json({ success: true, output: stdout });
      }
      return res.status(500).json({ error: stderr || error.message });
    }
    res.status(200).json({ success: true, output: stdout });
  });
}
