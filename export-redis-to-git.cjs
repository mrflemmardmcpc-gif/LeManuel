// Script d’export de la clé Redis Upstash vers un fichier local et commit/push Git
// Usage : node export-redis-to-git.js

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Config Upstash
const UPSTASH_REDIS_REST_URL = "https://crack-glider-54274.upstash.io";
const UPSTASH_REDIS_REST_TOKEN = "AdQCAAIncDEzMDUxMDRlNjQ0YTQ0MjVmODdkNGM1ZjY1MGMxMDhkN3AxNTQyNzQ";
const REDIS_KEY = "carnet-data";

// Fichier local où sauvegarder la donnée (modifie si besoin)
const OUTPUT_FILE = path.join(__dirname, 'src', 'data.structure.js');

// Fonction pour récupérer la clé Redis via REST
function fetchRedisKey() {
  return new Promise((resolve, reject) => {
    const url = `${UPSTASH_REDIS_REST_URL}/get/${REDIS_KEY}`;
    const options = {
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      },
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json.result) {
            resolve(json.result);
          } else {
            reject(new Error('No result in response: ' + data));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Fonction principale
async function main() {
  try {
    console.log('Fetching Redis key...');
    const value = await fetchRedisKey();
    // On suppose que la valeur est déjà du JSON stringifié
    // On la sauvegarde telle quelle dans le fichier
    fs.writeFileSync(OUTPUT_FILE, value, 'utf8');
    console.log('Data saved to', OUTPUT_FILE);

    // Git add/commit/push
    execSync(`git add "${OUTPUT_FILE}"`);
    execSync(`git commit -m "Export carnet-data from Upstash Redis [auto]"`);
    execSync(`git push`);
    console.log('Git commit & push done.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
