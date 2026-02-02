# Système Responsive - Guide d'utilisation

## 📱 Fichiers créés

### 1. `/src/utils/responsive.js`
**Utilitaires responsive centralisés**

### 2. `/src/components/ui/ResponsiveModal.jsx`
**Modal universelle auto-adaptative**

---

## 🎯 Utilisation

### Hook principal : `useResponsive()`

```jsx
import { useResponsive } from '../utils/responsive';

function MonComposant() {
  const screen = useResponsive();
  
  // Accès aux informations d'écran
  console.log(screen.width);        // 1920
  console.log(screen.isMobile);     // false
  console.log(screen.isTablet);     // false
  console.log(screen.isDesktop);    // true
  console.log(screen.isLargeScreen); // true
  
  return (
    <div style={{
      padding: screen.isMobile ? 16 : 32,
      fontSize: screen.isMobile ? 14 : 16,
    }}>
      Contenu adaptatif
    </div>
  );
}
```

---

## 📏 Fonctions utilitaires

### 1. **Tailles de texte adaptatives**
```jsx
import { getResponsiveTextSize } from '../utils/responsive';

const fontSize = getResponsiveTextSize(16, screen);
// Mobile: 13.6px | Tablet: 15.2px | Desktop: 16px | Large: 17.6px
```

### 2. **Dimensions de modales**
```jsx
import { getModalSize } from '../utils/responsive';

const modalSize = getModalSize('medium', screen);
// Retourne { width, maxWidth } adapté à l'écran
```

Tailles disponibles :
- `'small'` : petites modales (confirmation, login)
- `'medium'` : modales standard (formulaires)
- `'large'` : grandes modales (galleries)
- `'fullEditor'` : plein écran éditeur

### 3. **Espacement adaptatif**
```jsx
import { getResponsiveSpacing } from '../utils/responsive';

const padding = getResponsiveSpacing(32, screen);
// Mobile: 19.2px | Tablet: 25.6px | Desktop: 32px
```

### 4. **Styles de boutons**
```jsx
import { getResponsiveButtonStyle } from '../utils/responsive';

const btnStyle = getResponsiveButtonStyle(screen);
// Retourne { padding, fontSize, borderRadius }
```

### 5. **Grille de colonnes**
```jsx
import { getResponsiveColumns } from '../utils/responsive';

const columns = getResponsiveColumns(screen);
// Mobile: 1 | Tablet: 2 | Desktop: 3 | Large: 4
```

---

## 🪟 Utiliser ResponsiveModal

### Exemple basique
```jsx
import ResponsiveModal from './components/ui/ResponsiveModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <ResponsiveModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="Mon Titre"
      size="medium"
      theme={theme}
    >
      <p>Contenu de la modale</p>
    </ResponsiveModal>
  );
}
```

### Tailles disponibles
```jsx
// Petite modale
<ResponsiveModal size="small" title="Confirmation">
  Êtes-vous sûr ?
</ResponsiveModal>

// Modale moyenne (défaut)
<ResponsiveModal size="medium" title="Formulaire">
  <form>...</form>
</ResponsiveModal>

// Grande modale
<ResponsiveModal size="large" title="Galerie">
  <Gallery />
</ResponsiveModal>

// Plein écran éditeur
<ResponsiveModal size="fullEditor" title="Éditeur">
  <TiptapEditor />
</ResponsiveModal>
```

---

## 🎨 Breakpoints standards

```js
xs:   480px  (mobile small)
sm:   640px  (mobile)
md:   768px  (tablet)
lg:   1024px (desktop)
xl:   1280px (large desktop)
2xl:  1536px (extra large)
3xl:  1920px (full HD)
```

---

## 🔧 Exemple complet : Convertir une modale existante

### Avant
```jsx
<div style={{
  position: 'fixed',
  width: 600,
  padding: 24,
  fontSize: 16,
}}>
  Contenu fixe
</div>
```

### Après
```jsx
import { useResponsive, getResponsiveSpacing } from '../utils/responsive';

function MaModale() {
  const screen = useResponsive();
  const padding = getResponsiveSpacing(24, screen);
  
  return (
    <ResponsiveModal
      isOpen={true}
      size="medium"
      title="Ma Modale"
    >
      <div style={{
        fontSize: screen.isMobile ? 14 : 16,
        padding,
      }}>
        Contenu adaptatif automatique
      </div>
    </ResponsiveModal>
  );
}
```

---

## 💡 Migration des modales existantes

Pour migrer vos modales actuelles :

1. **Importer ResponsiveModal**
```jsx
import ResponsiveModal from './components/ui/ResponsiveModal';
```

2. **Remplacer votre div modale par ResponsiveModal**
```jsx
<ResponsiveModal
  isOpen={isOpen}
  onClose={handleClose}
  size="medium" // ou small/large/fullEditor
  title="Titre"
  theme={theme}
>
  {/* Votre contenu actuel */}
</ResponsiveModal>
```

3. **Utiliser le hook dans le contenu si besoin**
```jsx
const screen = useResponsive();
// Adaptez vos styles internes
```

---

## 📱 Tests recommandés

Testez avec les largeurs suivantes :
- 375px (iPhone)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1920px (Desktop Full HD)

Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)

---

## 🚀 Avantages

✅ **Centralisé** : Une seule source de vérité pour le responsive  
✅ **Automatique** : S'adapte en temps réel au resize  
✅ **Réutilisable** : Hook utilisable partout  
✅ **Cohérent** : Breakpoints standards partout  
✅ **Maintenable** : Modifications dans 1 fichier = tout le site s'adapte
