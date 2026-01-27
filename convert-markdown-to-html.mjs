import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
// Comportement markdown standard : deux retours à la ligne = nouveau paragraphe
marked.setOptions({ breaks: false });
import { fileURLToPath } from 'url';

// Pour compatibilité __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'src', 'data.structure.js');

function isMarkdownField(key) {
  return (
    key === 'text' || key === 'texte' || key === 'description' || key === 'content' || key === 'contenu'
  );
}

function forceParagraphs(markdown) {
  // Sépare en lignes
  const lines = markdown.split('\n');
  let result = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Si la ligne est une liste, un titre, ou vide, on ne touche pas
    if (/^\s*([*-+]|\d+\.)\s/.test(line) || /^\s*#/.test(line) || line.trim() === '') {
      result += line + '\n';
    } else {
      // Si la ligne suivante n'est pas une liste, un titre ou vide, on ajoute un saut de paragraphe
      result += line + '\n\n';
    }
  }
  return result;
}

function convertMarkdownFields(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertMarkdownFields);
  } else if (obj && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (isMarkdownField(key) && typeof obj[key] === 'string') {
        const forcedParagraphs = forceParagraphs(obj[key]);
        newObj[key] = marked.parse(forcedParagraphs);
      } else {
        newObj[key] = convertMarkdownFields(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}


function extractExportedArray(jsCode, exportName) {
  // Extrait le bloc entre [ ... ] du export const ... = [ ... ];
  const exportRegex = new RegExp(`export const\\s+${exportName}\\s*=\\s*\\[`, 'm');
  const startMatch = jsCode.match(exportRegex);
  if (!startMatch) throw new Error(`Impossible de trouver l'export ${exportName}`);
  const startIdx = startMatch.index + startMatch[0].length - 1;
  let bracketCount = 1;
  let endIdx = startIdx + 1;
  while (endIdx < jsCode.length && bracketCount > 0) {
    if (jsCode[endIdx] === '[') bracketCount++;
    else if (jsCode[endIdx] === ']') bracketCount--;
    endIdx++;
  }
  if (bracketCount !== 0) throw new Error(`Crochets non appariés dans l'export ${exportName}`);
  const arrayContent = jsCode.slice(startIdx, endIdx);
  return eval('(' + arrayContent + ')');
}

function main() {
  let jsCode;
  try {
    jsCode = fs.readFileSync(dataFilePath, 'utf-8');
  } catch (err) {
    console.error('Erreur lors de la lecture de data.structure.js:', err);
    process.exit(1);
  }

  let categories, sections;
  try {
    categories = extractExportedArray(jsCode, 'categories');
    sections = extractExportedArray(jsCode, 'sections');
  } catch (err) {
    console.error('Erreur lors de l\'extraction des données:', err);
    process.exit(1);
  }

  const convertedCategories = convertMarkdownFields(categories);

  // Reconstruit le fichier JS avec les données converties
  const output = `export const categories = ${JSON.stringify(convertedCategories, null, 2)};\n\nexport const sections = ${JSON.stringify(sections, null, 2)};\n`;

  fs.writeFileSync(dataFilePath, output, 'utf-8');
  console.log('Conversion terminée. Les champs markdown sont maintenant en HTML.');
}

main();
