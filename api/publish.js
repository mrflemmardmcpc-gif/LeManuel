// /api/publish.js
// Endpoint pour déclencher le workflow GitHub Actions via l'API GitHub
// Utilise le token stocké dans process.env.GITHUB_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // Pas de vérification ADMIN_SECRET : la sécurité est gérée côté interface admin

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Token GitHub manquant' });
  }

  // Paramètres GitHub corrects
  const owner = 'mrflemmardmcpc-gif'; // Ton nom d’utilisateur GitHub
  const repo = 'LeManuel'; // Nom du repo
  const workflow_id = 'export-redis-to-git.yml'; // Nom exact du fichier workflow
  const ref = 'main'; // Branche principale

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;

  try {
    const ghRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref }),
    });

    if (!ghRes.ok) {
      const error = await ghRes.text();
      return res.status(ghRes.status).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
