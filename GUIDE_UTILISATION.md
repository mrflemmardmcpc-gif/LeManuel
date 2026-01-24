# 📘 Manuel du Plombier - Guide d'Utilisation

## 🚀 Guide Rapide

### Interface Principale
- **Titre**: "📘 Manuel du Plombier" avec gradient bleu/cyan
- **Boutons en haut à droite**:
  - 📷 : Ouvrir la galerie d'images
  - 🔍 : Rechercher
  - ☀️/🌙 : Basculer mode sombre/clair
  - ✏️/🔒 : Activer/désactiver le mode édition

### Navigation
1. **Sélectionner une section** : Cliquez sur les boutons des Grandes Parties (Plomberie, Chauffage, etc.)
2. **Filtrer par catégorie** : Les catégories s'affichent après sélection d'une section
3. **Consulter les modules** : Cliquez sur une catégorie pour voir ses modules
4. **Voir les images** : Cliquez sur "👁️ Voir" dans la galerie pour naviguer au module

## 🎨 Thème & Personnalisation

### Changement de Thème
- Cliquez le bouton **☀️/🌙** pour basculer entre mode clair et sombre
- Les préférences sont sauvegardées automatiquement

### Couleurs Personnalisées
En mode édition (**✏️ Actif**), vous pouvez :
- Changer la couleur d'une section
- Changer la couleur d'une catégorie
- Changer la couleur d'un module
- Colorer des mots spécifiques dans le contenu

## 📝 Mode Édition

### Activer le Mode Édition
1. Cliquez sur le bouton **🔒** → devient **✏️** (vert)
2. Des boutons d'édition apparaissent sur tous les éléments

### Ajouter une Nouvelle Catégorie
1. Activez le mode édition
2. Cliquez sur **➕ Catégorie** en haut du contenu
3. Remplissez :
   - Titre de la catégorie
   - Emoji représatif
   - Grande partie (section)
   - Couleur

### Ajouter un Module
1. Mode édition actif
2. Cliquez **➕** à la fin d'une catégorie
3. Remplissez :
   - Titre du module
   - Description (texte)
   - Couleur du titre

### Colorer des Mots
1. En mode édition d'un module
2. Section **🎨 Colorer des mots**
3. Entrez le mot/phrase
4. Sélectionnez la couleur
5. Cliquez **➕ Ajouter**

### Éditer un Élément
- **Catégories** : Cliquez **✏️** sur la catégorie
- **Modules** : Cliquez **✏️** sur le titre du module
- **Sections** : Menu latéral → Cliquez ⚙️ puis ✏️

### Supprimer un Élément
1. Cliquez le bouton **🗑️** rouge
2. Confirmez la suppression

### Réorganiser les Catégories
1. Mode édition actif
2. Utilisez **⬆️** (monter) et **⬇️** (descendre) sur chaque catégorie

## 📷 Galerie d'Images

### Ajouter une Image
1. Cliquez **📷** en haut à droite
2. Cliquez **➕ Ajouter image**
3. Sélectionnez :
   - Catégorie *
   - Module *
   - Image (JPG, PNG, WebP)
4. L'image est automatiquement redimensionnée (600px max)
5. Cliquez **💾 Sauvegarder**

### Consulter les Images
1. **📷** → Ouvrir galerie
2. Filtrez par catégorie si désiré
3. Survolez une image pour voir ses détails
4. Cliquez **👁️ Voir** pour naviguer au module
5. En mode édition : **🗑️** pour supprimer

### Spécifications d'Image
- Format : JPG, PNG, WebP
- Taille max : 200 KB (compression automatique)
- Résolution : Redimensionnée à 600px de largeur
- Qualité : 50% (optimisé)

## 🔍 Recherche

### Utiliser la Recherche
1. Cliquez **🔍** en haut à droite
2. Tapez votre recherche
3. Résultats affichés en temps réel
4. Appuyez **Entrée** pour fermer

### Étendre la Recherche
Recherche dans :
- Titres des modules
- Descriptions
- Contenu texte
- Noms de catégories

## 💾 Sauvegarde

### Sauvegarde Automatique
- Les données se sauvegardent dans votre navigateur (localStorage)
- Pas besoin de cliquer "Sauvegarder" manuellement
- Les images sont compressées et stockées

### Exporter les Données
```javascript
// Dans la console du navigateur
const data = localStorage.getItem('memo_plomberie_full_v5');
console.log(JSON.parse(data)); // Voir les données
```

### Importer les Données
```javascript
// Créer un backup depuis le JSON
const backup = JSON.stringify({...data});
localStorage.setItem('memo_plomberie_full_v5', backup);
```

## 🎯 Bonnes Pratiques

### Organisation
1. Groupez les contenus par catégories logiques
2. Utilisez des emojis significatifs
3. Assignez les couleurs par domaine
4. Mettez à jour régulièrement

### Contenu
1. Utilisez **gras** pour l'important
2. Utilisez des listes à puces (- ou *)
3. Utilisez des titres (# ## ###)
4. Coloriez les termes clés

### Images
1. Préférez des images claires
2. Redimensionnez avant upload
3. Nommez les fichiers
4. Une image = un concept

### Maintenance
1. Sauvegardez régulièrement
2. Nettoyez les éléments non utilisés
3. Mettez à jour les informations obsolètes
4. Vérifiez les liens

## ⌨️ Raccourcis Clavier

| Touche | Action |
|--------|--------|
| Entrée (Recherche) | Fermer la recherche |
| Esc | Fermer les modals* |
| Tab | Naviguer entre les éléments |

*À implémenter

## 🐛 Dépannage

### Les données ne se sauvegardent pas
- Vérifiez que localStorage est activé
- Vérifiez l'espace disque du navigateur
- Essayez une autre navigation privée (non-privée)

### Images ne s'affichent pas
- Vérifiez le format (JPG, PNG, WebP)
- Vérifiez la taille (< 200 KB après compression)
- Rechargez la page

### Recherche ne fonctionne pas
- Vérifiez l'orthographe
- Essayez des termes partiels
- Rafraîchissez la page

### Mode édition bloqué
- Vérifiez que vous avez cliqué sur ✏️
- Le bouton doit être vert
- Actualisez la page si nécessaire

## 🎨 Personnalisation Avancée

### Modifier les Couleurs du Thème
Pour les développeurs (dans le code) :

```javascript
// Fichier App.jsx - Fonction getTheme()
const getTheme = (darkMode) => {
  if (darkMode) {
    return {
      accent1: '#3b82f6',  // Changer le bleu
      accent2: '#06b6d4',  // Changer le cyan
      // ... etc
    };
  }
};
```

### Ajouter des Formats Markdown
Dans la fonction `Markdown()` :

```javascript
html = html.replace(/~~(.+?)~~/g, '<del>$1</del>'); // Strikethrough
```

## 📞 Support

Pour toute question ou amélioration souhaitée :
1. Consultez la documentation de modernisation
2. Vérifiez la console du navigateur (F12) pour les erreurs
3. Testez en mode incognito
4. Rapportez les anomalies

---

**Version** : 5.0 (Modernisée)
**Dernière mise à jour** : 2024
**Statut** : Production ✅
