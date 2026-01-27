const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const dataFilePath = path.join(__dirname, 'src', 'data.structure.js');

function isMarkdownField(key) {
  // Adjust this function if you have other field names to convert
  return (
    key === 'text' || key === 'texte' || key === 'description' || key === 'content' || key === 'contenu'
  );
}

function convertMarkdownFields(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertMarkdownFields);
  } else if (obj && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (isMarkdownField(key) && typeof obj[key] === 'string') {
        newObj[key] = marked.parse(obj[key]);
      } else {
        newObj[key] = convertMarkdownFields(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

function main() {
  let data;
  try {
    data = require(dataFilePath);
  } catch (err) {
    console.error('Erreur lors du chargement de data.structure.js:', err);
    process.exit(1);
  }

  const converted = convertMarkdownFields(data);

  // Génère le code JS exportant la structure convertie
  const output = 'module.exports = ' + JSON.stringify(converted, null, 2) + ';\n';

  fs.writeFileSync(dataFilePath, output, 'utf-8');
  console.log('Conversion terminée. Les champs markdown sont maintenant en HTML.');
}

main();
