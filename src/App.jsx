import React, { useState, useEffect, useMemo, useRef } from "react";
// --- Prise de note personnelle ---
function NoteModal({ open, onClose, sections, categories, onSave }) {
  const [note, setNote] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,22,34,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#23202d", borderRadius: 16, padding: 20, minWidth: 280, maxWidth: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", display: "flex", flexDirection: "column", gap: 14, border: `1px solid #444` }}>
        <h2 style={{ margin: 0, fontSize: 17, color: "#10b981", fontWeight: 700 }}>📝 Nouvelle note</h2>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Votre note..." style={{ width: "100%", minHeight: 60, borderRadius: 8, border: "1px solid #444", background: "#181622", color: "#f3f3f3", padding: 8, fontSize: 14, resize: "vertical" }} />
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <select value={sectionId} onChange={e => setSectionId(e.target.value)} style={{ flex: 1, borderRadius: 8, padding: 6, background: "#181622", color: "#f3f3f3", border: "1px solid #444", maxWidth: "50%", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            <option value="">Grande partie...</option>
            {sections.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
          </select>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ flex: 1, borderRadius: 8, padding: 6, background: "#181622", color: "#f3f3f3", border: "1px solid #444", maxWidth: "50%", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            <option value="">Catégorie...</option>
            {categories.filter(c => !sectionId || c.sectionId == sectionId).map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "7px 14px", borderRadius: 8, background: "#35324a", color: "#eee", border: "none", fontWeight: 600, cursor: "pointer" }}>Annuler</button>
          <button onClick={() => onSave({ note, sectionId, categoryId })} style={{ padding: "7px 14px", borderRadius: 8, background: "#10b981", color: "white", border: "none", fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
// --- State pour la modale de note ---
// (À placer dans le composant App)
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Utility to read file as Data URL
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const Emoji = ({ symbol, label, size = 18 }) => (
  <span role="img" aria-label={label} style={{ fontSize: size, lineHeight: 1, fontFamily: "'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif", display: "inline-block" }}>
    {symbol}
  </span>
);

const DEFAULT_DATA = {
  sections: [
    { id: 1, name: "Technologie ECS", color: "#0ea5e9", emoji: "🚿" },
    { id: 2, name: "Différents Systèmes ECS", color: "#22d3ee", emoji: "⚡" },
    { id: 3, name: "Fixation & Pose Apparent", color: "#3b82f6", emoji: "🔧" },
    { id: 4, name: "Appareils Sanitaires", color: "#10b981", emoji: "🚰" },
    { id: 5, name: "Poste SOA", color: "#f97316", emoji: "🧯" },
  ],
  categories: [

    {
      id: 2,
      name: "Fixations - Pattes à vis",
      icon: "🔩",
      sectionId: 3,
      color: "#3b82f6",
      subs: [
        {
          id: 206,
          title: "Pattes à vis - Types et dimensioning",
          text: `**Pattes à vis bois**
Vis mâle 7×150
Vis bois Ø6 incorporée
Longueurs : 30 à 80 mm
Support : Murs pleins

**Pattes à vis métal**
Adaptées aux chevilles métalliques
Ø5 ou Ø6
Longueurs jusqu'à 70 mm
Support : Cloisons, placos

**Règles de vissage minimum**
🔹 Cheville plastique : 30 mm minimum
🔹 Bois tendre : 20 mm minimum
🔹 Bois dur : 10 mm minimum

⚠️ **À respecter impérativement**
Insuffisant = arrachement garanti`,
          color: "#d1d5db",
          image: null,
        },
      ],
    },
    {
      id: 3,
      name: "ECS / Sanitaire",
      icon: "🚰",
      sectionId: 1,
      color: "#06b6d4",
      subs: [
        {
          id: 301,
          title: "Sécurité électrique - Appareils électroportatifs",
          text: `⚠️ **Plus de 1 000 accidents électriques par an en France**, dont ~20 mortels.

💡 Vérifier l'état général des appareils et rallonges en 230V.
⚡ 50V en milieu sec peut être létal, 25V en milieu humide.

**Prévention essentielle** : Utiliser disjoncteur différentiel et équipement personnel.`,
          color: "#cffafe",
          image: null,
        },
        {
          id: 302,
          title: "Solution batterie",
          text: `**Utiliser des appareils sur batterie** (≤24V) pour le travail en milieu humide.

🔋 Plus sûr, idéal pour chantier extérieur ou vide sanitaire avec eau.

Recommandation : Préférer batterie à 230V pour prévention des risques.`,
          color: "#cffafe",
          image: null,
        },
        {
          id: 303,
          title: "NiMH (Nickel-Métal-Hydrure)",
          text: `**Commercialisées vers 1990**, plus performantes que NiCd, pas de cadmium ni plomb.

💡 Faible effet mémoire, écologique
Durée de vie : 500-1000 cycles`,
          color: "#cffafe",
          image: null,
        },
        {
          id: 304,
          title: "Li-ion / Li-Po",
          text: `**Plus grande densité énergétique que NiMH**, usage courant sur outils modernes.

Avantages : Meilleure puissance, recharge plus rapide
Durée de vie : 1000+ cycles`,
          color: "#cffafe",
          image: null,
        },
      ],
    },
    {
      id: 3.5,
      name: "SOA - Soudure Oxy-Acétylénique",
      icon: "🔥",
      sectionId: 4,
      color: "#f97316",
      subs: [
        {
          id: 351,
          title: "Gaz utilisés - Oxygène & Acétylène",
          text: `**Oxygène**
🔹 Gaz comburant
🔹 Entretient la combustion
🔹 Pression haute 200 bar
🔹 Stockage en bouteille robuste

**Acétylène**
🔹 Gaz carburant
🔹 Très inflammable
🔹 Dissous dans acétone
🔹 Stockage TOUJOURS debout
🔹 Pression max 1 bar

⚠️ **DANGER**
Ne JAMAIS pencher bouteille acétylène
Risque d'expulsion d'acétone`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 352,
          title: "Bouteilles - Stockage & manipulation",
          text: `**Acétylène**
✔️ Dissous dans acétone
✔️ Toujours stockée debout
✔️ Très inflammable
✔️ Distance min 10m source feu
✔️ Ventilation obligatoire

**Oxygène**
✔️ Gaz comburant
✔️ Favorise violemment la combustion
✔️ Peut être stockée horizontalement
✔️ Distance min murs

**Règles communes**
⚠️ Chaînes d'attache obligatoires
⚠️ Pas de secousses / chocs
⚠️ Capuchons de protection
⚠️ Fiches de sécurité consultées`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 353,
          title: "Mano-détendeurs & Débitmètres",
          text: `**Fonction des mano-détendeurs**
🔹 Réduction pression
🔹 Réglage précis du débit
🔹 Protection équipement aval

**Caractéristiques**
📊 Manomètre HP (haute pression)
📊 Manomètre BP (basse pression)
🔧 Robinet de réglage fin

**Oxygène**
- Pression sortie : 1-8 bar selon travail
- Débit : Réglé par débitmètre

**Acétylène**
- Pression sortie : MAX 1 bar
- Débit : Réglé par débitmètre
- JAMAIS dépasser 1 bar

⚠️ **SÉCURITÉ PRIMORDIALE**
Vérifier pression avant chaque utilisation`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 354,
          title: "Chalumeau - Types et utilisation",
          text: `**Chalumeau soudeur**
✔️ Soudure de tubes en cuivre
✔️ Température flamme : 3200°C
✔️ Joint métal d'apport
✔️ Technique : Chauffer + fondre apport

**Chalumeau réchauffeur**
✔️ Déglaçage
✔️ Dilatation contrôlée
✔️ Température plus basse
✔️ Plus gros débit O2

**Buses adaptées au travail**
🔹 N°1, 2 : Tubes fins (6-10 mm)
🔹 N°3, 4 : Tubes courants (13-20 mm)
🔹 N°5+ : Gros tubes (25+ mm)

**Technique soudure**
1️⃣ Chauffer tube 2-3 secondes
2️⃣ Fondre apport progressivement
3️⃣ Laisser refroidir naturellement
⚠️ Pas de trempage!`,
          color: "#fed7aa",
          image: null,
        },
      ],
    },
    {
      name: "Évacuation",
      icon: "🚽",
      sectionId: 4,
      color: "#8b5cf6",
      subs: [
        {
          id: 401,
          title: "PVC, PP, Cuivre",
          text: `**Choisir le matériau selon type d'eau, pression et norme**.

🔹 **PVC** : Économique, usage courant
🔹 **PP** : Meilleure résistance chimique
🔹 **Cuivre** : Durabilité maximale, haut de gamme`,
          color: "#ddd6fe",
          image: null,
        },
        {
          id: 402,
          title: "Pentes et diamètres",
          text: `💡 **Maintenir pente correcte pour écoulement naturel et éviter bouchons**.

Pentes recommandées :
- Eaux usées : 2-3% minimum
- Eaux pluviales : 0,5-1%
- Collecteurs : 1-2%

Diamètres courants :
- Lavabo : 32 mm
- Douche/Baignoire : 40 mm
- WC : 100 mm`,
          color: "#ddd6fe",
          image: null,
        },
      ],
    },
    {
      id: 5,
      name: "Appareils et Outils - Perforateurs",
      icon: "⚙️",
      sectionId: 3,
      color: "#f59e0b",
      subs: [
        {
          id: 501,
          title: "Sécurité électrique - Appareils électroportatifs",
          text: `⚠️ **DANGER ÉLECTRIQUE MAJEUR**

**Risques mortels en milieu humide :**
⚡ 50V en milieu sec = peut être létal
⚡ 25V en milieu humide = LÉTAL
⚡ Plus de 1 000 accidents électriques/an en France (~20 mortels)

**Solutions de sécurité :**
✔️ Disjoncteur différentiel 30mA obligatoire
✔️ Rallonges équipées GFCI
✔️ Appareils sur batterie ≤ 24V recommandé
✔️ Gants/bottes isolants en milieu humide

**En vide sanitaire ou extérieur :**
👉 Utiliser obligatoirement batterie ≤ 24V
👉 Jamais d'appareil 230V en milieu humide`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 502,
          title: "Perforateur SDS+ 2 modes 18V - Complet",
          text: `🔧 **Perçages bois, métal, céramique, béton.**

**Fiche technique complète :**

| Caractéristique | Valeur |
|-----------------|--------|
| Voltage | 18 V |
| Batterie | 3.0 Ah NiMH |
| Puissance utile | 300 W |
| Vitesse à vide | 0-1100 tr/min |
| Coups/min | 0-4200 cps/min |
| Capacité perçage Bois | 30 mm |
| Capacité perçage Métal | 13 mm |
| Capacité perçage Béton | 20 mm |
| Poids | 3,1 kg |
| Longueur | 295 mm |
| Hauteur | 195 mm |

**Équipements de confort :**
✔️ Poignée caoutchoutée limite vibrations
✔️ Moteur avec frein électronique
✔️ Anti-vibration active
✔️ Équilibrage arrière
✔️ Changement rapide outil SDS+

**Avant utilisation :**
⚠️ Vérifier batterie chargée
⚠️ Vérifier foret bien fixé
⚠️ Porter EPI (lunettes, gants)
⚠️ Utiliser poignée latérale en percussion`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 503,
          title: "Forets Béton - Carbure de Tungstène",
          text: `**Composition : Pointe carbure tungstène**

**Caractéristiques :**
✔️ Dureté maximale
✔️ Résiste aux vibrations percussion
✔️ Usure réduite
✔️ Longue durée de vie

**Fixations disponibles :**
🔹 Queue SDS : Ø6-8 mm
🔹 Queue SDS+ : Ø6-20 mm
🔹 Queue SDS Max : Ø18-32 mm

**Utilisation :**
- Béton armé / non armé
- Brique / Pierre
- Carrelage
- Rotation lente obligatoire
- Mode percussion actif

**Règle vitesse :**
🧠 Plus le Ø est grand → plus la vitesse doit être lente
🧠 Ø20mm = vitesse 1 (min)
🧠 Ø8mm = vitesse 3 (moyen)`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 504,
          title: "Forets Métal - Acier & Alliages",
          text: `**Composition : Acier ordinaire ou haute vitesse**

**Diamètres disponibles :**
Ø 1 à 13 mm : Queue cylindrique
Ø 14 à 16 mm : Queue réduite
Ø 20+ mm : Queue réduite spéciale

**Applications :**
✔️ Acier / Inox
✔️ Aluminium
✔️ Alliages légers
✔️ Fonte (attention cassant)

**Technique :**
- Vitesse élevée (1200+ tr/min)
- Lubrification recommandée (WD40)
- Pression progressive
- Pas de percussion

**Mandrin :**
🔧 Mandrin auto-serrant 1-13mm
🔧 Pour forets cylindriques`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 505,
          title: "Forets Bois - Vrille & Hélice",
          text: `**Types courants :**
🔹 Foret hélicoïdal : Usage général bois
🔹 Foret vrille : Trous nets sans éclat
🔹 Foret plat : Gros diamètres rapide

**Utilisation :**
✔️ Bois tendre (pin, sapin)
✔️ Bois dur (chêne, hêtre)
✔️ Panneaux contreplaqué
✔️ Aggloméré

**Vitesse selon diamètre :**
Ø 3-8 mm : 1200-1500 tr/min
Ø 10-16 mm : 600-900 tr/min
Ø 18+ mm : 300-600 tr/min

**Technique :**
- Pas de percussion
- Appui régulier
- Enlever régulièrement foret`,
          color: "#fed7aa",
          image: null,
        },
        {
          id: 506,
          title: "Scie cloche & accessoires",
          text: `**Scie cloche (trépan)**
✔️ Trous nets et précis
✔️ Diamètres : 20-150 mm
✔️ Passage de tuyaux
✔️ Trous d'évacuation

**Vitesse adaptée :**
- Ø 30mm : 400 tr/min
- Ø 50mm : 250 tr/min
- Ø 100mm : 100 tr/min

**Foret pilote :**
💡 Guide pour perçage exact
💡 Évite déviation scie
💡 Sécurité en perçage

**Utilisations courantes :**
✔️ Passage tuyaux plomberie
✔️ Trous robinetterie
✔️ Saignées gaines électriques
✔️ Trous d'évacuation sanitaire`,
          color: "#fed7aa",
          image: null,
        },
      ],
    },
    {
      id: 6,
      name: "Outillage manuel",
      icon: "🔧",
      sectionId: 3,
      color: "#ec4899",
      subs: [
        {
          id: 601,
          title: "Modes perçage simple",
          text: `**Stop de frappe pour perçage bois, métal, céramique.**

Utilisation : Fixations légères, travail précis
Sécurité : Bien positionner la mèche avant de percer`,
          color: "#fbcfe8",
          image: null,
        },
        {
          id: 602,
          title: "Modes perçage béton",
          text: `**Utilisation du marteau et SDS-Plus**, coups par minute élevés pour efficacité.

Technique : Appliquer pression progressive
Protection : EPI obligatoire (lunettes, masque)`,
          color: "#fbcfe8",
          image: null,
        },
        {
          id: 603,
          title: "Batteries NiMH 2.6Ah",
          text: `**Livrée avec chargeur rapide 1h**, poignée latérale réglable.

Avantages : Rapidité, autonomie, faible effet mémoire
Entretien : Stocker en lieu frais et sec`,
          color: "#fbcfe8",
          image: null,
        },
      ],
    },
    {
      id: 7,
      name: "Lecture de Plans/Schémas",
      icon: "📐",
      sectionId: 2,
      color: "#10b981",
      subs: [
        {
          id: 701,
          title: "Types de plans - Classifications",
          text: `**Plan d'implantation**
🗺️ Vue générale bâtiment
🗺️ Localisation réseaux
🗺️ Échelle : 1:100 à 1:200
🗺️ Usage : Positionnement global

**Plan d'exécution**
🗺️ Détails constructifs
🗺️ Cotes précises
🗺️ Échelle : 1:50
🗺️ Usage : Chantier terrain

**Schéma isométrique**
🗺️ Représentation 3D
🗺️ Vue perspective
🗺️ Cheminement réseaux
🗺️ Usage : Clarification trajets

**Schéma de principe**
🗺️ Fonctionnement circuit
🗺️ Symboles simplifiés
🗺️ Pas à l'échelle
🗺️ Usage : Comprendre système`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 702,
          title: "Symboles essentiels - Tuyauteries",
          text: `**Représentation tuyaux :**

**Lignes pleines** = Eau froide (EF)
**Lignes pointillées** = Eaux usées (EU)

**Codes couleur standards :**
- 🔵 Bleu : Eau froide
- 🔴 Rouge : Eau chaude sanitaire (ECS)
- 🟤 Marron : Eaux usées / Eaux vannes (EU)
- ⚫ Noir : Eaux de pluie (EP)
- 🟢 Vert : Gaz

💡 **Important :** Vérifier légende chaque plan
Certains plans peuvent avoir codes différents`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 703,
          title: "Symboles essentiels - Appareils & Robinetterie",
          text: `**Appareils sanitaires :**

🚽 **WC** : Cuvette vue de dessus
🚰 **Lavabo** : Rectangle avec robinet
🚿 **Douche** : Carré avec pommeau/tête
🛁 **Baignoire** : Rectangle allongé
🪣 **Évier** : Rectangle avec rebord
🚲 **Bidet** : Forme spécifique

**Robinetterie :**

🔧 **Robinet 1/4 tour** : Boule avec levier
🔧 **Robinet thermostatique** : Cercle T
🔧 **Clapet anti-retour** : Triangle direction
🔧 **Soupape sécurité** : Carré avec S

**Appareils chauffage :**
🔥 **Radiateur** : Série rectangles parallèles
🔥 **Ballon ECS** : Cercle + flèches UP/DOWN`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 704,
          title: "Raccords et Coudes - Symboles",
          text: `**Raccords courants :**

**Té (T)** = Trois raccordements 90°
✔️ Alimentation distributeur
✔️ Création branche circuit

**Coude 90°** = Changement direction
✔️ Contournement obstacle
✔️ Descente/montée

**Croix (X)** = Quatre raccordements
✔️ Distribution double
✔️ Croisement réseaux

**Raccord (R)** = Jonction deux tubes
✔️ Même diamètre
✔️ Continuation ligne

**Raccord réduction** = Changement diamètre
✔️ De gros à fin
✔️ De fin à gros

⚠️ **Toujours respecter orientation plan**
Rotation/inversion peut changer sens écoulement`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 705,
          title: "Lecture Cotes & Mesures",
          text: `**Types de cotes :**

📏 **Cotes de niveau (hauteur finie)**
✔️ Sol fini = 0,00m
✔️ Éviers : +0,90m
✔️ Robinets douche : +2,00m
✔️ Radiateurs : +0,15m min

📏 **Cotes d'axes**
✔️ Entre colonnes
✔️ Positionnement raccords
✔️ Axe détermination

📏 **Cotes pentes (évacuation)**
✔️ Eaux usées : 2-3 cm/m (2-3%)
✔️ Eaux pluviales : 0,5-1 cm/m (0,5-1%)
✔️ Collecteurs : 1-2 cm/m (1-2%)

🧠 **Astuce lecture rapide**
➡️ Toujours lire plan de gauche à droite
➡️ Du sol vers le haut
➡️ Vérifier légende d'abord
➡️ Noter toutes cotes d'eau`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 706,
          title: "Orientation & Repérage - Entrée/Sortie",
          text: `**Points essentiels repérage :**

🧭 **Nord indiqué**
✔️ Orientation plan
✔️ Aide positionnement géographique

💧 **Entrée eau**
✔️ Généralement gauche plan
✔️ Source d'alimentation générale
✔️ Vérifier diamètre arrivée

🚱 **Sortie eaux usées**
✔️ Clairement indiquée
✔️ Vers réseau collectif
✔️ Vérifier pente vers sortie

🔗 **Zones de raccordement**
✔️ Repères appar eil par appareil
✔️ Entrée/ sortie distinctes
✔️ Pas d'erreur sens circulation

⚠️ **À ne JAMAIS confondre**
❌ Entrée EF avec sortie EU
❌ ECS avec gaz
❌ Sens écoulement`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 707,
          title: "Notes complémentaires & Détails constructifs",
          text: `**Informations à relever systématiquement :**

📝 **Dimension tuyauterie**
🔹 EF : Généralement 12-16 mm
🔹 ECS : 12-16 mm
🔹 EU : 32-40 mm (lavabos)
🔹 EU : 100 mm (WC)

📝 **Isolation tuyaux**
🔹 ECS : Toujours isolée
🔹 EF : Rarement isolée
🔹 Épaisseur isolation : 25-50 mm

📝 **Matériaux**
🔹 Cuivre : Traditionnel, cher
🔹 PER : Flexible, rapide
🔹 Multicouche : Polyvalent
🔹 PVC/PP : Évacuation

📝 **Protection / Passage**
🔹 Gaines de protection
🔹 Traversée plancher
🔹 Distance murs (cm)
🔹 Accessibilité robinets

💡 **Astuces professionnelles**
✔️ Relever toutes mesures
✔️ Vérifier compatibilité matériel
✔️ Prévoir points de puisage
✔️ Marquer cheminement réel vs plan
✔️ Photos chantier avant fermeture`,
          color: "#d1fae5",
          image: null,
        },
      ],
    },
    {
      id: 8,
      name: "Alimentation en Eau (EF / ECS)",
      icon: "🔵",
      sectionId: 1,
      color: "#3b82f6",
      subs: [
        {
          id: 801,
          title: "Définitions et principes",
          text: `**EF (Eau Froide):** Eau potable du réseau public, 2,5-4 bars, 10-15°C
**ECS (Eau Chaude):** Eau chauffée, distribution 50-60°C, stockage 55-60°C

Installation conforme aux normes NF pour sécurité et qualité.`,
          color: "#dbeafe",
          image: null,
        },
      ],
    },

    {
      id: 900,
      name: "Les différents systèmes de production",
      icon: "🧭",
      sectionId: 2,
      color: "#0ea5e9",
      subs: [
        {
          id: 90001,
          title: "Panorama",
          text: `🔥 Instantané • ⚡ Micro-accumulation • 🛢️ Accumulation • 🌀 Semi (tampon)
[color=#00c853]Clé terrain :[/color] choisir selon simultanéité des puisages, énergie dispo, pertes acceptables.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 901,
      name: "ECS instantanée ou micro accumulation",
      icon: "⚡",
      sectionId: 2,
      color: "#38bdf8",
      subs: [
        {
          id: 90101,
          title: "Indépendants élec/gaz",
          text: `Instantané élec <2 L : 1,5-7 kW, 1 point proche
Micro-accum 5-30 L : 1,5-2 kW, 1-2 points
Instantané gaz : échangeur plaques/tubulaire, débit = f(puissance)
[color=#ef4444]Vigilance :[/color] câble/abonnement élec, longueur tirage, ΔT = (kW×860)/L/h.`,
          color: "#e0f2fe",
          image: null,
        },
        {
          id: 90102,
          title: "Principe de fonctionnement",
          text: `Eau traverse échangeur → chauffe directe → zéro stockage.
✔️ Pas de pertes statiques
✔️ Démarrage rapide
⚠️ Débit/T° dépend de la puissance instantanée.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 902,
      name: "Instantané + chaudière",
      icon: "🔥",
      sectionId: 2,
      color: "#f97316",
      subs: [
        {
          id: 90201,
          title: "Chaudière murale + échangeur",
          text: `Priorité ECS : vanne 3 voies ou aquastat détourne la puissance chauffage.
Échangeur à plaques (compact) ou serpentin cuivre.
[color=#00c853]Avantage :[/color] compacité, pas de ballon.
[color=#ef4444]Limite :[/color] douche simultanée + évier = chute débit/ΔT.`,
          color: "#ffe4d5",
          image: null,
        },
      ],
    },

    {
      id: 903,
      name: "Accumulation",
      icon: "🛢️",
      sectionId: 2,
      color: "#0284c7",
      subs: [
        {
          id: 90301,
          title: "Principe de fonctionnement",
          text: `Ballon stocke l'énergie, chauffe décorrélée du puisage.
[color=#ef4444]Pertes statiques[/color] à surveiller (isolation, volume).`,
          color: "#dbeafe",
          image: null,
        },
        {
          id: 90302,
          title: "Le phénomène de stratification",
          text: `Chaud en haut, froid en bas → confort + anti-légionelles si 60°C.
Éviter brassage inutile, placer départ ECS haut du ballon.`,
          color: "#dbeafe",
          image: null,
        },
        {
          id: 90303,
          title: "Accumulation électricité",
          text: `Résistance stéatite/blindée, volume 50-300 L.
Pilotage HC/HP, anode à contrôler.
[color=#00c853]Astuce :[/color] stéatite = moins de calcaire sur la résistance.`,
          color: "#dbeafe",
          image: null,
        },
        {
          id: 90304,
          title: "Accumulation gaz",
          text: `Brûleur atmos. + ballon intégré.
Ventilation/évac conformes.
[color=#ef4444]Rappel :[/color] contrôle CO, tirage naturel.`,
          color: "#dbeafe",
          image: null,
        },
        {
          id: 90305,
          title: "Accumulation solaire",
          text: `CESI thermosiphon ou forcé.
Ballon bi-échangeur/combiné, appoint élec/gaz.
[color=#00c853]Gain :[/color] kWh gratuits, vérifier antigel, vase, soupapes.`,
          color: "#dbeafe",
          image: null,
        },
        {
          id: 90306,
          title: "Accumulation thermodynamique",
          text: `PAC air extrait/ambiant + ballon.
COP élevé, bruit et refroidissement du local à considérer.
[color=#ef4444]Éviter[/color] les petits volumes d'air fermés.`,
          color: "#dbeafe",
          image: null,
        },
      ],
    },

    {
      id: 904,
      name: "Accumulation combinée chauffage",
      icon: "♨️",
      sectionId: 2,
      color: "#0ea5e9",
      subs: [
        {
          id: 90401,
          title: "Ballon combiné",
          text: `Un ballon pour ECS + chauffage via serpentin.
Priorité ECS à paramétrer pour éviter douches tièdes.
[color=#00c853]Réglage :[/color] limiter cycles brûleur, conserver stratification.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 905,
      name: "Semi instantanée",
      icon: "⏱️",
      sectionId: 2,
      color: "#38bdf8",
      subs: [
        {
          id: 90501,
          title: "Principe",
          text: `Petit tampon + échangeur dimensionné pour lisser les variations.
Ne couvre pas toute pointe 10 min mais réduit les chutes.
[color=#ef4444]Entretien :[/color] détartrage échangeur.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 906,
      name: "Semi accumulation",
      icon: "🌀",
      sectionId: 2,
      color: "#38bdf8",
      subs: [
        {
          id: 90601,
          title: "Principe",
          text: `Instantané + ballon tampon dimensionné pour pointe 10 min (Om).
✔️ Débit soutenu court terme
✔️ Ballon plus compact qu'accumulation totale
⚠️ Pertes statiques existantes.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 907,
      name: "Champs d'application",
      icon: "🧭",
      sectionId: 2,
      color: "#0ea5e9",
      subs: [
        {
          id: 90701,
          title: "Guides rapides",
          text: `Instantané gaz : 1-2 points isolés
Micro-accum élec : points proches, faible simultanéité
Accum élec : pavillonnaire HC
Accum gaz : usage continu, débit soutenu
Solaire/thermo : conso régulière, économies énergie
Semi-accum : petits ERP, pointes 10 min assurées`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },

    {
      id: 950,
      name: "Poste mobile SOA",
      icon: "🧯",
      sectionId: 5,
      color: "#fb923c",
      subs: [
        {
          id: 95001,
          title: "Composition & raccordement",
          text: `### Poste mobile complet
🧯 Bouteille O₂ + bouteille C₂H₂ (dissous) sur chariot [color=#3b82f6]stable[/color]
📈 Mano-détendeurs double mano (HP/BP) sur chaque bouteille
🧵 Flexibles caoutchouc toilé (O₂ bleu, C₂H₂ rouge) Ø adaptés
🔗 Raccords rapides LOR : femelle en attente, mâle côté chalumeau

| Élément | Détail | Emoji |
| --- | --- | --- |
| O₂ | Comburant, ogive blanche | 🟦 |
| C₂H₂ | Carburant, ogive havane | 🟥 |
| Clapets | Anti-retour + pare-flamme | 🛡️ |
| Flexibles | 6x11 (petit), 9x16 (n°1) | 🧵 |

[color=#00c853]Important :[/color] clapets anti-retour [color=#00c853]OBLIGATOIRES[/color]. Si >20 m de flexibles : un au détendeur + un au chalumeau.
[color=#ef4444]Attention :[/color] toujours chaîner les bouteilles et garder les capuchons en transport ; pas de chocs.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95002,
          title: "Sécurité & clapets",
          text: `### Règles terrain
🛡️ Chaîner systématiquement les bouteilles (debout, stable)
🧢 Capuchon en place au transport, robinets fermés dès arrêt
🌬️ Ventilation obligatoire (haute/basse) dans les zones fermées
🔥 Distance : C₂H₂ >10 m de flamme/source chaleur

[color=#00c853]Bon réflexe :[/color] tester les clapets (soufflage) avant allumage ; vérifier date d'épreuve flexible.
[color=#ef4444]Interdit :[/color] toute graisse/huile sur O₂ ; pas de chiffon gras ni gants souillés à proximité.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 951,
      name: "Gaz utilisés en SOA",
      icon: "🧪",
      sectionId: 5,
      color: "#f97316",
      subs: [
        {
          id: 95101,
          title: "Mix O₂ + C₂H₂",
          text: `🟦 **Oxygène** (comburant) : 200 bar, ogive blanche, raccord femelle droite
🟥 **Acétylène** (carburant) : 15 bar dissous dans acétone, ogive havane, raccord femelle gauche

[color=#00c853]Rôle :[/color] O₂ nourrit la flamme, C₂H₂ apporte le carburant.
[color=#ef4444]Jamais[/color] d'huile/graisse sur O₂, pas de C₂H₂ libre >1 bar.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95102,
          title: "Compatibilités & interdits",
          text: `❌ C₂H₂ interdit avec Ag, Hg, Cu >70% (risque explosion)
❌ Pas de ventilation à l'O₂ pur (combustion violente)
✔️ Transport : cabine séparée du compartiment bouteilles, capuchons en place
[color=#ef4444]Rappel :[/color] ne jamais transvaser de gaz d'une bouteille à l'autre.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95103,
          title: "Signalétique & odorants",
          text: `👃 Odeur ail = fuite C₂H₂
🎨 Code couleurs ogives : blanc (O₂) / havane (C₂H₂)
[color=#00c853]Contrôle terrain :[/color] pression résiduelle, date d'épreuve, état filetage.
[color=#ef4444]Action immédiate :[/color] fuite = fermer, ventiler, baliser.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 952,
      name: "Bouteilles de gaz SOA",
      icon: "🛢️",
      sectionId: 5,
      color: "#f97316",
      subs: [
        {
          id: 95201,
          title: "Signalétique & marquages",
          text: `| Gaz | Ogive | Volumes | Pression | Position | Raccord |
| --- | --- | --- | --- | --- | --- |
| O₂ | Blanche | 1-10 m³ | ~200 bar | Debout ou couché | Femelle droite |
| C₂H₂ | Havane | 0,8-7 m³ | 15 bar | Debout / >30° | Femelle gauche |

[color=#00c853]Check terrain :[/color] date d'épreuve, poinçon Mines, pression service.
[color=#ef4444]Jamais[/color] de choc/soleil direct >50°C.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95202,
          title: "Transport & stockage",
          text: `✔️ Capuchon vissé, chaînes serrées, chariot stable
✔️ Pas de transvasement de gaz (interdit)
✔️ Fermer bouteille vide (limite évaporation acétone C₂H₂)
[color=#ef4444]Ne pas[/color] coucher l'acétylène en service ; en transport couché : laisser reposer debout avant usage.
[color=#00c853]Ventilation :[/color] local aéré, détecter les odeurs (ail) signe de fuite C₂H₂.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 953,
      name: "Bouteille d'acétylène",
      icon: "🟥",
      sectionId: 5,
      color: "#f97316",
      subs: [
        {
          id: 95301,
          title: "Usage & limites",
          text: `🟥 Gaz carburant, odeur ail, plus léger que l'air
✔️ Dissous dans acétone/DMF, pression 15 bar max
✔️ Raccord femelle à gauche
[color=#ef4444]Instable >1 bar libre[/color] → garder bouteille verticale (>30° mini) et ne jamais purger à vide.
[color=#00c853]Bon usage :[/color] fermer même vide pour limiter évaporation acétone.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95302,
          title: "Transport & repos",
          text: `🚚 Transport possible couché mais [color=#00c853]repos debout[/color] avant service.
🧊 Protéger du soleil >50°C, éviter chocs.
🛡️ Chaîner systématiquement ; pas d'hydrocarbures à proximité.
[color=#ef4444]Si échauffement :[/color] fermer, arroser, évacuer.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 954,
      name: "Bouteille d'oxygène",
      icon: "🟦",
      sectionId: 5,
      color: "#f97316",
      subs: [
        {
          id: 95401,
          title: "Caractéristiques",
          text: `🟦 Comburant pur, 200 bar, ogive blanche
✔️ Raccord femelle à droite
[color=#ef4444]Interdit[/color] : graisse/huile → risque combustion/explosion.
[color=#00c853]Astuce :[/color] tolère stockage couché mais service idéal debout, vanne protégée.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95402,
          title: "Mise en œuvre",
          text: `✅ Ouvrir très progressivement (évite coup de bélier)
✅ Souffler la sortie avant montage détendeur
✅ Ventiler la zone, éloigner solvants/huiles
[color=#ef4444]Pas de flamme nue[/color] lors des essais de fuite (bombe/eau savonneuse uniquement).`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 955,
      name: "Manomètres & détendeurs",
      icon: "📊",
      sectionId: 5,
      color: "#f97316",
      subs: [
        {
          id: 95501,
          title: "Rôle & réglages",
          text: `**Fonction :** abaisser, régler, stabiliser le débit.
📊 Mano HP (bouteille) + BP (sortie) + molette réglage fin
🔵 O₂ : sortie 1-8 bar selon buse
🔴 C₂H₂ : sortie max 1 bar (jamais dépasser)
[color=#00c853]Procédure montage :[/color] purger la sortie, visser à la clé, tester à la bombe à fuite.
[color=#ef4444]Risque :[/color] fuite = arrêt immédiat, ventilation, contrôle eau savonneuse/bombe.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95502,
          title: "Bonnes pratiques",
          text: `✔️ Positionner mano lisible depuis la zone de travail
✔️ Resserrer sans excès (joints écrasés = fuite)
✔️ Déverrouiller la vis de détente en fermeture complète après usage
[color=#ef4444]Surpression :[/color] fermer, purger, vérifier clapets.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 956,
      name: "Tuyaux gaz & raccords",
      icon: "🧵",
      sectionId: 5,
      color: "#fb923c",
      subs: [
        {
          id: 95601,
          title: "Couleurs & diamètres",
          text: `**Tuyaux caoutchouc armé** (norme gaz).
🔵 O₂ : bleu, petit Ø (12 mm env.)
🟥 C₂H₂ : rouge, gros Ø (14 mm env.)
📏 Diamètres courants : 6×11 (mini/étoile), 9×16 (n°1)
[color=#00c853]Test fuite :[/color] eau savonneuse ou bombe détection (jamais flamme).`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95602,
          title: "Raccordements & LOR",
          text: `🔗 Raccords rapides LOR : femelle en attente, mâle côté chalumeau
🛑 Versions STOP-GAZ (coupure auto + clapet) complémentaires aux clapets anti-retour
👉 Ø différents évitent inversion O₂/C₂H₂
[color=#ef4444]Rappel :[/color] clapet anti-retour indispensable au détendeur et au chalumeau si >20 m de flexible.`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 957,
      name: "Chalumeau soudeur & réchauffeur",
      icon: "🔥",
      sectionId: 5,
      color: "#fb923c",
      subs: [
        {
          id: 95701,
          title: "Choix & réglages",
          text: `**Basse pression** : P C₂H₂ ≈0,5 bar, P O₂ ≈1 bar (selon buse).
🔘 Buses étoile par débit (100-200 l/h lances malléables accès réduit).
✅ Adapter buse au Ø tube (fin/moyen/gros).
✅ Vérifier stabilité flamme (cône interne bleu net).
[color=#ef4444]Flamme longue jaune[/color] = manque O₂ ; [color=#ef4444]retours de flamme[/color] = fermer, purger, contrôler clapets/buses.`,
          color: "#ffedd5",
          image: null,
        },
        {
          id: 95702,
          title: "Soudeur vs réchauffeur",
          text: `**Chalumeau soudeur** : flamme neutre 3200°C, métal d'apport, cordon fin.
**Chalumeau réchauffeur** : flamme plus large, gros débit O₂, pour dilatation/déglaçage.
[color=#00c853]Routine :[/color] purge O₂ puis C₂H₂ avant allumage, fermer C₂H₂ puis O₂ à l'arrêt.
[color=#ef4444]Toujours</color> porter EPI (lunettes teintées, gants anti-chaleur).`,
          color: "#ffedd5",
          image: null,
        },
      ],
    },

    {
      id: 980,
      name: "Mitigeurs thermostatiques",
      icon: "🌡️",
      sectionId: 4,
      color: "#10b981",
      subs: [
        {
          id: 98001,
          title: "Principe & sécurité",
          text: `**Élément cire + vanne 3 voies** : ajuste ouverture EF/ECS.
✔️ Sécurité 40°C, précision ±0,5°C, réaction ~0,5 s
✔️ Maintien T° même en cas de perturbation pression
👉 Versions murales, encastrées, colonnettes pour gorge`,
          color: "#d1fae5",
          image: null,
        },
      ],
    },

    {
      id: 981,
      name: "Robinetterie douche/baignoire",
      icon: "🚿",
      sectionId: 4,
      color: "#14b8a6",
      subs: [
        {
          id: 98101,
          title: "Gabarits & entraxes",
          text: `Entraxe standard 150 mm.
Alim douche cuivre 14×1 (hors jets hydro).
Gabarits ou douilles excentrées 90/270 GCU pour réglage.
Percements gorge : mono Ø35 mm ; bi/tri Ø25 mm.
Orientation sortie douche vers bas pour ne pas pincer flexible.`,
          color: "#d1fae5",
          image: null,
        },
        {
          id: 98102,
          title: "Saignées & protections",
          text: `Tracer axes (robinetterie ~1,10 m du receveur), saignée en Y.
Mettre fourreau sur tubes, recuit sur longueur.
Scellement plâtre/ciment prompt, prévoir trappe de visite si encastré.
Fixations adaptées support (voir bâti-support ou chevilles adéquates).`,
          color: "#d1fae5",
          image: null,
        },
      ],
    },

    {
      id: 982,
      name: "Éviers & Vidages",
      icon: "🍽️",
      sectionId: 4,
      color: "#22c55e",
      subs: [
        {
          id: 98201,
          title: "Matériaux & poses",
          text: `Grès/porcelaine, inox, composites.
Poses : sur meuble, encastré dessus/dessous.
Hauteur 0,85-0,90 m.
Trop-plein intégré (céramique) ou externe.`,
          color: "#dcfce7",
          image: null,
        },
        {
          id: 98202,
          title: "Percements & robinetterie",
          text: `Pas de sens de pose → perçage selon côté souhaité.
Mono Ø35 mm ; bi/tri Ø25 mm.
Perçage : marteau (grès), emporte-pièce Ø32 (inox), scie cloche (résine).
Raccordement cuivre 14×1, joint sous robinetterie.`,
          color: "#dcfce7",
          image: null,
        },
        {
          id: 98203,
          title: "Vidages & siphons",
          text: `Bonde + siphon (filetage 1"1/2 40×49).
Garde d'eau 5 cm, culot démontable.
Bibac : 2 bondes + accouplement + siphon, prise LV/LL possible.
Vidage auto (câble/ressort) courant.`,
          color: "#dcfce7",
          image: null,
        },
      ],
    },

    {
      id: 983,
      name: "Baignoires & Vidages",
      icon: "🛁",
      sectionId: 4,
      color: "#16a34a",
      subs: [
        {
          id: 98301,
          title: "Types & dimensions",
          text: `Formes : sabot, rectang., angle, ovale, ronde, bain-douche, balnéo.
Matériaux : tôle émaillée, fonte vitrifiée, composites.
Hauteur 0,42-0,63 m selon pieds/modèle.`,
          color: "#dcfce7",
          image: null,
        },
        {
          id: 98302,
          title: "Pose & DTU 60.1",
          text: `Supporter fond + périphérie (profilés imputrescibles ou maçonnerie hydrofuge).
Pas de contact direct parois (joint mastic sanitaire continu, fond de joint mousse).
Trappes de visite pour robinetterie/vidage.
Balnéo : conserver plots anti-vibratiles, essai eau avant habillage.`,
          color: "#dcfce7",
          image: null,
        },
        {
          id: 98303,
          title: "Vidage baignoire",
          text: `Bonde 49 ou 90 mm + siphon 1"1/2 (40×49), sortie horizontale orientable.
Commandes : câble sur trop-plein ou clapet ressort.
Options : grand débit, siphon ultra-plat, remplissage par trop-plein.`,
          color: "#dcfce7",
          image: null,
        },
      ],
    },

    {
      id: 984,
      name: "Fixations sanitaires & bâtis",
      icon: "🧱",
      sectionId: 4,
      color: "#0ea5e9",
      subs: [
        {
          id: 98401,
          title: "Choix fixations par support",
          text: `Mur béton/brique/plâtre/bois : choisir chevilles adaptées (plein/creux) et charges (lavabo, ballon ECS).
Charges lourdes : chevilles métal/longues isolant ou scellement taquet bois.
Toujours respecter diamètres vis/cheville/foret.`,
          color: "#e0f2fe",
          image: null,
        },
        {
          id: 98402,
          title: "Bâti-supports",
          text: `Adossé ou autoportant pour lavabos, bidets, WC suspendus.
Fixation sur murs pleins ou cloisons selon modèles (plaque plâtre ossature métal : privilégier autoportant).
Permet pose propre sans solliciter cloison légère.`,
          color: "#e0f2fe",
          image: null,
        },
      ],
    },
  ],
};

function Markdown({ content }) {
  // Amélioration du parsing Markdown pour gérer tous les cas imbriqués
  let html = content;

  // D'abord, traiter les balises imbriquées (color, size, underline)
  html = html.replace(/\[color=(#[0-9a-fA-F]{3,6})\]([\s\S]+?)\[\/color\]/g, '<span style="color:$1;font-weight:bold;">$2</span>');
  html = html.replace(/\[size=(\d{1,3})\]([\s\S]+?)\[\/size\]/g, (_m, sz, txt) => `<span style="font-size:${sz}px;">${txt}</span>`);
  html = html.replace(/\[u\]([\s\S]+?)\[\/u\]/g, '<span style="text-decoration:underline;">$1</span>');

  // Titres
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg md:text-xl font-semibold mt-3 mb-1 text-blue-400">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl md:text-2xl font-semibold mt-4 mb-2 text-blue-500">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl md:text-3xl font-bold mt-4 mb-2 text-blue-700">$1</h1>');

  // Important
  html = html.replace(/^(IMPORTANT:.*)$/gim, '<p class="text-red-500 font-bold">$1</p>');

  // Gras, italique
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Listes
  html = html.replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/gms, '<ul class="ml-5 list-disc">$1<\/ul>');

  // Tableaux Markdown
  html = html.replace(/((?:^\|.+\|$\n?)+)/gm, (tableBlock) => {
    const lines = tableBlock.trim().split('\n').filter(l => l.trim().startsWith('|') && l.trim().endsWith('|'));
    if (lines.length < 2) return tableBlock;
    const headers = lines[0].split('|').filter(Boolean).map(h => h.trim());
    const headerHtml = headers.map(h => `<th class=\"p-2 text-[clamp(14px,4vw,18px)] align-top border border-slate-700 bg-slate-800 text-blue-400\" style=\"word-break:break-word;white-space:pre-line;overflow-wrap:anywhere;\">${h}</th>`).join('');
    const bodyHtml = lines.slice(2).map(row => {
      const cols = row.split('|').filter(Boolean).map(c => c.trim());
      return `<tr>${cols.map(c => `<td class=\"p-2 text-[clamp(14px,4vw,18px)] align-top border border-slate-700\" style=\"word-break:break-word;white-space:pre-line;overflow-wrap:anywhere;\">${c}</td>`).join('')}</tr>`;
    }).join('');
    // Bloc scrollable, largeur forcée, espace réduit
    return `
      <div class=\"relative w-full\" style=\"overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:thin; margin:10px 0 6px 0;\">
        <table class=\"border-collapse w-full min-w-full text-[clamp(14px,4vw,18px)]\" style=\"margin:0;\"><colgroup>${headers.map(() => '<col style=\'width:auto;min-width:80px;max-width:1fr;\'>').join('')}</colgroup><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>
        <div class=\"pointer-events-none absolute top-0 right-0 h-full w-8 hidden sm:block\" style=\"background:linear-gradient(to left,rgba(30,41,59,0.7),transparent);\"></div>
        <div class=\"pointer-events-none absolute top-0 left-0 h-full w-8 hidden sm:block\" style=\"background:linear-gradient(to right,rgba(30,41,59,0.7),transparent);\"></div>
      </div>
    `;
  });

  // Paragraphe et liste stylée
  html = html.replace(/<p(.*?)>/g, '<p$1 class="text-[clamp(16px,4vw,20px)] leading-relaxed" style="white-space:pre-wrap;">');
  html = html.replace(/<li(.*?)>/g, '<li$1 class="text-[clamp(16px,4vw,20px)] leading-relaxed" style="white-space:pre-wrap;">');

  // Forcer le retour à la ligne partout
  return <div style={{ wordBreak: "break-word", whiteSpace: "pre-line", overflowWrap: "anywhere" }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function App() {
    // --- State pour la modale de note ---
    const [showNoteModal, setShowNoteModal] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);
  const ydocRef = useRef(null);
  const yMapRef = useRef(null);
  const isApplyingRemoteRef = useRef(false);
  const [syncStatus, setSyncStatus] = useState("connecting");
  const kvReadyRef = useRef(false);
  const [kvStatus, setKvStatus] = useState("idle");
  const [kvLastSaved, setKvLastSaved] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [kvErrorMsg, setKvErrorMsg] = useState("");
  const [tableMenuOpen, setTableMenuOpen] = useState(null); // "editSub" | "newSub" | null
  const tableTemplates = useMemo(() => ([
    {
      key: "simple",
      label: "Table simple",
      preview: "2 x 2",
      text: `| Colonne 1 | Colonne 2 |\n|---|---|\n| Valeur A | Valeur B |\n| Valeur C | Valeur D |`,
    },
    {
      key: "specs",
      label: "Specs produit",
      preview: "Caract. / Valeur",
      text: `| Caractéristique | Valeur |\n|---|---|\n| Modèle | \n| Puissance | \n| Débit | \n| Notes | `,
    },
    {
      key: "checklist",
      label: "Checklist",
      preview: "OK / A faire",
      text: `| Étape | Statut |\n|---|---|\n| Vérifier alimentation | ✅ |\n| Purge circuit | ⏳ |\n| Contrôle étanchéité | ⏳ |`,
    },
  ]), []);

  // Branch data on a shared Y.js document so edits are synchronized in real time across devices.
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("wss://demos.yjs.dev", "carnet-plomberie-data", ydoc);
    const ymap = ydoc.getMap("app");

    ydocRef.current = ydoc;
    yMapRef.current = ymap;

    const applyRemote = () => {
      const incoming = ymap.get("data");
      if (!incoming) return;
      isApplyingRemoteRef.current = true;
      setData((prev) => (prev === incoming ? prev : incoming));
      // Release the guard after React has applied the state to avoid echoing the same change back to Y.js.
      setTimeout(() => { isApplyingRemoteRef.current = false; }, 0);
    };

    const observeData = () => applyRemote();
    ymap.observe(observeData);

    const statusHandler = ({ status }) => setSyncStatus(status);
    provider.on("status", statusHandler);

    const syncHandler = (isSynced) => {
      if (isSynced) {
        // Only initialize defaults if the room is truly empty after first sync.
        if (!ymap.has("data")) {
          ymap.set("data", DEFAULT_DATA);
        }
        applyRemote();
      }
    };
    provider.on("sync", syncHandler);

    return () => {
      ymap.unobserve(observeData);
      provider.off("status", statusHandler);
      provider.off("sync", syncHandler);
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  // Push local changes to the shared Y.js map when they originate locally.
  useEffect(() => {
    // Désactive la sauvegarde automatique sur modification locale
    // La sauvegarde se fait uniquement via le bouton principal
    // (ne rien faire ici)
  }, [data]);
  // Bouton principal Sauvegarder
  const handleMainSave = async () => {
    setKvStatus("saving");
    try {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde");
      setKvStatus("saved");
      setKvLastSaved(Date.now());
      setIsDirty(false);
      showToast("Sauvegardé");
    } catch (err) {
      setKvStatus("error");
      setKvErrorMsg(err?.message || "Échec sauvegarde");
      showToast("Échec sauvegarde");
    }
  };

  // Hydrate from KV persistence (single snapshot) so fresh deployments reuse saved content.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setKvStatus("loading");
      setKvErrorMsg("");
      try {
        const res = await fetch("/api/state");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        if (!cancelled) {
          if (body?.data && typeof body.data === "object") {
            setData(body.data);
          } else {
            // Seed KV with defaults if empty
            setData(DEFAULT_DATA);
          }
          setKvStatus("loaded");
          kvReadyRef.current = true;
          setIsDirty(false);
          setKvLastSaved(Date.now());
          setKvErrorMsg("");
        }
      } catch (err) {
        if (!cancelled) {
          kvReadyRef.current = true;
          setKvStatus("error");
          setKvErrorMsg(err?.message || "Chargement KV échoué");
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // Marque les changements locaux comme non sauvegardés une fois la KV chargée.
  useEffect(() => {
    if (!kvReadyRef.current) return;
    setIsDirty(true);
  }, [data]);

  const [search, setSearch] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingSubId, setEditingSubId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState("#e6eef8");
  const [selectionInfo, setSelectionInfo] = useState({ text: "", start: 0, end: 0, target: null });
  const [selectionCustomColor, setSelectionCustomColor] = useState("#3b82f6");
  const quickColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#0ea5e9"];
  const sectionSwatches = ["#0ea5e9", "#22d3ee", "#3b82f6", "#10b981", "#f97316", "#e11d48", "#a855f7", "#f59e0b", "#14b8a6", "#ef4444"];
  const [newCatTitle, setNewCatTitle] = useState("");
  const [newCatEmoji, setNewCatEmoji] = useState("📌");
  const [newCatSection, setNewCatSection] = useState(null);
  const [newSubTitle, setNewSubTitle] = useState("");
  const [newSubText, setNewSubText] = useState("");
  const [newSubColor, setNewSubColor] = useState("#e6eef8");
  const [addingSubToCatId, setAddingSubToCatId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryFilterCatId, setGalleryFilterCatId] = useState(null);
  const [galleryFilterSectionId, setGalleryFilterSectionId] = useState(null);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [galleryUploadBusy, setGalleryUploadBusy] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCatId, setNewImageCatId] = useState(null);
  const [newImageSubId, setNewImageSubId] = useState(null);
  const [newImageDesc, setNewImageDesc] = useState("");
  const [imageDrawerOpen, setImageDrawerOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [drawerSectionId, setDrawerSectionId] = useState(null);
  const [drawerCategoryId, setDrawerCategoryId] = useState(null);
  const [inlineImageTarget, setInlineImageTarget] = useState(null);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [inlineImageDesc, setInlineImageDesc] = useState("");
  const [inlineImageLoading, setInlineImageLoading] = useState(false);
  const [inlineUploadBusy, setInlineUploadBusy] = useState(false);
  const [showSectionPanel, setShowSectionPanel] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showEditSectionsPanel, setShowEditSectionsPanel] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [editSectionEmoji, setEditSectionEmoji] = useState("");
  const [editSectionColor, setEditSectionColor] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionEmoji, setNewSectionEmoji] = useState("📌");
  const [newSectionColor, setNewSectionColor] = useState("#3b82f6");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatEmoji, setEditCatEmoji] = useState("");
  const [editCatSection, setEditCatSection] = useState(null);
  const [editCatColor, setEditCatColor] = useState("#ffffff");
  const [newCatColor, setNewCatColor] = useState("#ffffff");
  const [accessMode, setAccessMode] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [confirmModal, setConfirmModal] = useState({ open: false, message: "", onConfirm: null });
  const [toast, setToast] = useState({ message: "" });
  const [isMobile, setIsMobile] = useState(false);
  const sectionScrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const inlineFileInputRef = useRef(null);
  const subRefs = useRef({});
  const toastTimeoutRef = useRef(null);


    // Ajoute une nouvelle grande partie (section)
    const addSection = () => {
      if (!newSectionName.trim()) {
        setToast({ message: "Le nom de la grande partie est requis." });
        return;
      }
      const newSection = {
        id: Date.now(),
        name: newSectionName,
        emoji: newSectionEmoji || "📌",
        color: newSectionColor || "#3b82f6",
      };
      setData((d) => ({
        ...d,
        sections: [...d.sections, newSection],
      }));
      setNewSectionName("");
      setNewSectionEmoji("📌");
      setNewSectionColor("#3b82f6");
      setToast({ message: "Grande partie ajoutée !" });
    };

    // Ajoute une nouvelle catégorie
    const addCategory = () => {
      if (!newCatTitle.trim()) {
        setToast({ message: "Le titre de la catégorie est requis." });
        return;
      }
      if (!newCatSection) {
        setToast({ message: "Sélectionne une grande partie." });
        return;
      }
      const newCat = {
        id: Date.now(),
        name: newCatTitle,
        icon: newCatEmoji || "📦",
        sectionId: newCatSection,
        color: newCatColor,
        subs: [],
      };
      setData((d) => ({
        ...d,
        categories: [...d.categories, newCat],
      }));
      setNewCatTitle("");
      setNewCatEmoji("📌");
      setNewCatSection(null);
      setNewCatColor("#ffffff");
      setToast({ message: "Catégorie ajoutée !" });
    };

    // Edition d'une catégorie
    const startEditCategory = (cat) => {
      setEditingCategoryId(cat.id);
      setEditCatName(cat.name);
      setEditCatEmoji(cat.icon);
      setEditCatSection(cat.sectionId);
      setEditCatColor(cat.color || "#ffffff");
    };

    const saveEditCategory = () => {
      if (!editCatName.trim()) {
        setToast({ message: "Le nom de la catégorie est requis." });
        return;
      }
      setData((d) => ({
        ...d,
        categories: d.categories.map((cat) =>
          cat.id === editingCategoryId
            ? { ...cat, name: editCatName, icon: editCatEmoji, sectionId: editCatSection, color: editCatColor }
            : cat
        ),
      }));
      setEditingCategoryId(null);
      setEditCatName("");
      setEditCatEmoji("");
      setEditCatSection(null);
      setEditCatColor("#ffffff");
      setToast({ message: "Catégorie modifiée !" });
    };

    const cancelEditCategory = () => {
      setEditingCategoryId(null);
      setEditCatName("");
      setEditCatEmoji("");
      setEditCatSection(null);
      setEditCatColor("#ffffff");
    };

    const deleteCategory = (catId) => {
      askConfirm("Supprimer cette catégorie ?", () => {
        setData((d) => ({
          ...d,
          categories: d.categories.filter((cat) => cat.id !== catId),
        }));
        if (editingCategoryId === catId) cancelEditCategory();
      });
    };

    // Ajout d'un module (sous-catégorie)
    const startAddingSub = (catId) => {
      setAddingSubToCatId(catId);
      setNewSubTitle("");
      setNewSubText("");
      setNewSubColor("#e6eef8");
    };

    const saveNewSub = () => {
      if (!newSubTitle.trim()) {
        setToast({ message: "Le titre du module est requis." });
        return;
      }
      setData((d) => ({
        ...d,
        categories: d.categories.map((cat) =>
          cat.id === addingSubToCatId
            ? { ...cat, subs: [...cat.subs, { id: Date.now(), title: newSubTitle, text: newSubText, color: newSubColor }] }
            : cat
        ),
      }));
      setAddingSubToCatId(null);
      setNewSubTitle("");
      setNewSubText("");
      setNewSubColor("#e6eef8");
      setToast({ message: "Module ajouté !" });
    };

    const cancelAddingSub = () => {
      setAddingSubToCatId(null);
      setNewSubTitle("");
      setNewSubText("");
      setNewSubColor("#e6eef8");
    };

    // Handler for gallery image file input
    const onFileChange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setToast({ message: "Le fichier doit être une image." });
        return;
      }
      if (file.size > 500 * 1024) {
        setToast({ message: "Image trop lourde (>500KB)" });
        return;
      }
      try {
        setGalleryUploadBusy(true);
        const dataUrl = await readFileAsDataURL(file);
        setNewImageUrl(dataUrl);
      } catch (err) {
        setToast({ message: "Erreur lors de la lecture du fichier." });
      } finally {
        setGalleryUploadBusy(false);
      }
    };

    // Handler for inline image file input
    const onInlineFileChange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setToast({ message: "Le fichier doit être une image." });
        return;
      }
      if (file.size > 500 * 1024) {
        setToast({ message: "Image trop lourde (>500KB)" });
        return;
      }
      try {
        setInlineImageLoading(true);
        const dataUrl = await readFileAsDataURL(file);
        setInlineImageUrl(dataUrl);
      } catch (err) {
        setToast({ message: "Erreur lors de la lecture du fichier." });
      } finally {
        setInlineImageLoading(false);
      }
    };

  // Affiche un avertissement de fermeture uniquement pour l'admin avec des changements non sauvegardés.
  useEffect(() => {
    if (!isAuthenticated || !isDirty) return undefined;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setEditMode(false);
      setShowEditSectionsPanel(false);
      setAddingSubToCatId(null);
      setEditingSectionId(null);
      setEditingCategoryId(null);
      setEditingSubId(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filteredCategories = useMemo(() => {
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const keywords = search.split(/\s+/).map(normalize).filter(Boolean);
    // Si aucune recherche, on respecte les filtres section/catégorie
    if (!keywords.length) {
      let filtered = data.categories;
      if (selectedSectionId !== null) filtered = filtered.filter(cat => cat.sectionId === selectedSectionId);
      if (selectedCategoryId !== null) filtered = filtered.filter(cat => cat.id === selectedCategoryId);
      return filtered;
    }

    // En mode recherche, on ignore le filtre catégorie pour montrer tous les résultats possibles (on garde la section si sélectionnée)
    let filtered = data.categories;
    if (selectedSectionId !== null) filtered = filtered.filter(cat => cat.sectionId === selectedSectionId);

    const scoreText = (text) => {
      const txt = normalize(text);
      return keywords.reduce((score, kw) => score + (txt.includes(kw) ? 1 : 0), 0);
    };

    return filtered.map((cat) => {
      const catScore = scoreText(cat.name);
      const subsWithScore = cat.subs
        .map((sub) => {
          // on pondère le titre mais on garde la description (sub.text) pour élargir les résultats
          const score = scoreText(sub.title) * 2 + scoreText(sub.text || "");
          return { sub, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      if (catScore > 0 || subsWithScore.length) {
        const subs = subsWithScore.map((item) => item.sub);
        if (catScore > 0 && subs.length === 0) return cat;
        return { ...cat, subs };
      }
      return null;
    }).filter(Boolean);
  }, [data.categories, search, selectedSectionId, selectedCategoryId]);

  const normalizeImage = (img) => {
    if (!img) return null;
    if (typeof img === "string") return { url: img, desc: "" };
    if (typeof img === "object") return { url: img.url || "", desc: img.desc || "" };
    return null;
  };

  const getSubImages = (sub) => {
    const rawList = Array.isArray(sub.images) ? sub.images : sub.image ? [sub.image] : [];
    return rawList.map(normalizeImage).filter((img) => img && img.url);
  };

  const allImages = useMemo(() => {
    const images = [];
    data.categories.forEach(cat => {
      cat.subs.forEach(sub => {
        const list = getSubImages(sub);
        list.forEach((imgObj, idx) => {
          images.push({ catId: cat.id, catName: cat.name, catIcon: cat.icon, subId: sub.id, subTitle: sub.title, url: imgObj.url, desc: imgObj.desc, index: idx });
        });
      });
    });
    return images;
  }, [data.categories]);

  const filteredGalleryImages = useMemo(() => {
    let list = allImages;
    if (galleryFilterSectionId !== null) {
      const catIds = data.categories.filter((c) => c.sectionId === galleryFilterSectionId).map((c) => c.id);
      list = list.filter((img) => catIds.includes(img.catId));
    }
    if (galleryFilterCatId !== null) list = list.filter((img) => img.catId === galleryFilterCatId);
    return list;
  }, [allImages, galleryFilterCatId, galleryFilterSectionId, data.categories]);

  useEffect(() => {
    setGalleryFilterCatId(null);
  }, [galleryFilterSectionId]);

  const hasImagesForSelectedCategory = useMemo(() => {
    if (selectedCategoryId === null) return false;
    return allImages.some(img => img.catId === selectedCategoryId);
  }, [selectedCategoryId, allImages]);

  const galleryCategories = useMemo(() => {
    if (galleryFilterSectionId === null) return data.categories;
    return data.categories.filter((c) => c.sectionId === galleryFilterSectionId);
  }, [data.categories, galleryFilterSectionId]);

  const showImageSidebar = useMemo(() => {
    if (isMobile) return false;
    return hasImagesForSelectedCategory;
  }, [isMobile, hasImagesForSelectedCategory]);

  const sectionsWithImages = useMemo(() => {
    const sectionIds = new Set();
    allImages.forEach((img) => {
      const cat = data.categories.find((c) => c.id === img.catId);
      if (cat) sectionIds.add(cat.sectionId);
    });
    return data.sections.filter((s) => sectionIds.has(s.id));
  }, [allImages, data.categories, data.sections]);

  const drawerCategories = useMemo(() => {
    const withImages = new Set(allImages.map((img) => img.catId));
    return data.categories.filter((cat) => withImages.has(cat.id) && (!drawerSectionId || cat.sectionId === drawerSectionId));
  }, [allImages, data.categories, drawerSectionId]);

  const drawerImages = useMemo(() => {
    if (!drawerCategoryId) return [];
    return allImages.filter((img) => img.catId === drawerCategoryId);
  }, [allImages, drawerCategoryId]);

  useEffect(() => {
    if (!hasImagesForSelectedCategory) setImageDrawerOpen(false);
  }, [hasImagesForSelectedCategory]);

  useEffect(() => {
    if (!isMobile) setImageDrawerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!imageDrawerOpen) return;
    // Seed drawer selectors based on current selection or available data.
    const selectedCat = data.categories.find((c) => c.id === selectedCategoryId);
    const fallbackSection = selectedCat?.sectionId || sectionsWithImages[0]?.id || null;
    const nextSection = drawerSectionId && sectionsWithImages.some((s) => s.id === drawerSectionId) ? drawerSectionId : fallbackSection;
    setDrawerSectionId(nextSection);

    const availableCats = drawerCategories.filter((c) => !nextSection || c.sectionId === nextSection);
    const chosenCat = selectedCat && availableCats.some((c) => c.id === selectedCat.id) ? selectedCat.id : availableCats[0]?.id || null;
    setDrawerCategoryId(chosenCat);
  }, [imageDrawerOpen, selectedCategoryId, data.categories, sectionsWithImages, drawerCategories, drawerSectionId]);

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startEditSub = (catId, sub) => {
    setSelectedCategoryId(catId);
    setEditingSubId(sub.id);
    setEditTitle(sub.title);
    setEditText(sub.text);
    setEditColor(sub.color || "#e6eef8");
  };

  const saveEditSub = () => {
    if (!editTitle.trim()) { showToast("Le titre ne peut pas être vide"); return; }
    setData((d) => ({
      ...d,
      categories: d.categories.map((cat) =>
        cat.id === selectedCategoryId
          ? { ...cat, subs: cat.subs.map((s) => s.id === editingSubId ? { ...s, title: editTitle, text: editText, color: editColor } : s) }
          : cat
      )
    }));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingSubId(null);
    setEditTitle("");
    setEditText("");
    setEditColor("#e6eef8");
  };

  const deleteSub = (catId, subId) => {
    askConfirm("Supprimer ce module ?", () => {
      setData((d) => ({
        ...d,
        categories: d.categories.map((cat) => cat.id === catId ? { ...cat, subs: cat.subs.filter((s) => s.id !== subId) } : cat)
      }));
    });
  };

  const handleTextSelect = (e, target) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    const text = e.target.value.substring(start, end);
    if (text && text.trim().length > 0) {
      setSelectionInfo({ text, start, end, target });
    } else {
      setSelectionInfo({ text: "", start: 0, end: 0, target: null });
    }
  };

  const applyColorToSelection = (color) => {
    if (!selectionInfo.text || !selectionInfo.target) return;
    const wrap = `[color=${color}]${selectionInfo.text}[/color]`;
    if (selectionInfo.target === "editSub") {
      const updated = editText.slice(0, selectionInfo.start) + wrap + editText.slice(selectionInfo.end);
      setEditText(updated);
    } else if (selectionInfo.target === "newSub") {
      const updated = newSubText.slice(0, selectionInfo.start) + wrap + newSubText.slice(selectionInfo.end);
      setNewSubText(updated);
    }
    setSelectionInfo({ text: "", start: 0, end: 0, target: null });
  };

  const applyFormatting = (type, sizeValue) => {
    if (!selectionInfo.text || !selectionInfo.target) { showToast("Sélectionne du texte"); return; }
    let wrapStart = "";
    let wrapEnd = "";
    if (type === "bold") { wrapStart = "**"; wrapEnd = "**"; }
    else if (type === "italic") { wrapStart = "_"; wrapEnd = "_"; }
    else if (type === "underline") { wrapStart = "[u]"; wrapEnd = "[/u]"; }
    else if (type === "size") { const sz = sizeValue || 16; wrapStart = `[size=${sz}]`; wrapEnd = "[/size]"; }
    else { return; }

    if (selectionInfo.target === "editSub") {
      const updated = editText.slice(0, selectionInfo.start) + wrapStart + selectionInfo.text + wrapEnd + editText.slice(selectionInfo.end);
      setEditText(updated);
    } else if (selectionInfo.target === "newSub") {
      const updated = newSubText.slice(0, selectionInfo.start) + wrapStart + selectionInfo.text + wrapEnd + newSubText.slice(selectionInfo.end);
      setNewSubText(updated);
    }
    setSelectionInfo({ text: "", start: 0, end: 0, target: null });
  };

  const insertTableTemplate = (target, tplText) => {
    const useSelection = selectionInfo.target === target && typeof selectionInfo.start === "number";
    if (target === "editSub") {
      const base = editText;
      const start = useSelection ? selectionInfo.start : base.length;
      const end = useSelection ? selectionInfo.end : base.length;
      const updated = base.slice(0, start) + tplText + base.slice(end);
      setEditText(updated);
    } else if (target === "newSub") {
      const base = newSubText;
      const start = useSelection ? selectionInfo.start : base.length;
      const end = useSelection ? selectionInfo.end : base.length;
      const updated = base.slice(0, start) + tplText + base.slice(end);
      setNewSubText(updated);
    }
    setTableMenuOpen(null);
    setSelectionInfo({ text: "", start: 0, end: 0, target: null });
  };

  const handleSelectVisitor = () => {
    setAccessMode("visitor");
    setIsAuthenticated(false);
    setEditMode(false);
    setShowLoginModal(false);
    setAdminPassword("");
    setLoginError("");
    setShowEditSectionsPanel(false);
  };

  const handleOpenAdminLogin = () => {
    setAccessMode("home");
    setIsAuthenticated(false);
    setEditMode(false);
    setShowLoginModal(true);
    setAdminPassword("");
    setLoginError("");
    setShowEditSectionsPanel(false);
  };

  const handleAdminLogin = () => {
    if (adminPassword.trim() === "ITSTIEC2026") {
      setIsAuthenticated(true);
      setAccessMode("admin");
      setShowLoginModal(false);
      setAdminPassword("");
      setLoginError("");
    } else {
      setLoginError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setAccessMode("home");
    setIsAuthenticated(false);
    setEditMode(false);
    setShowLoginModal(false);
    setAdminPassword("");
    setLoginError("");
    setShowEditSectionsPanel(false);
    setShowSectionPanel(false);
  };

  const showToast = (message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message });
    toastTimeoutRef.current = setTimeout(() => setToast({ message: "" }), 2200);
  };

  const saveSnapshot = async () => {
    if (!isAuthenticated) { showToast("Réservé à l'admin"); return; }
    if (!kvReadyRef.current) { showToast("KV non prêt"); return; }
    setKvStatus("saving");
    setKvErrorMsg("");
    try {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.error || `HTTP ${res.status}`;
        throw new Error(msg);
      }
      setKvStatus("saved");
      setKvLastSaved(Date.now());
      setIsDirty(false);
      setKvErrorMsg("");
      showToast("Sauvegardé");
    } catch (err) {
      setKvStatus("error");
      setKvErrorMsg(err?.message || "Échec sauvegarde");
      showToast("Échec sauvegarde");
    }
  };

  const askConfirm = (message, onConfirm) => {
    setConfirmModal({ open: true, message, onConfirm });
  };

  const closeConfirm = () => setConfirmModal({ open: false, message: "", onConfirm: null });

  const acceptConfirm = () => {
    if (confirmModal.onConfirm) confirmModal.onConfirm();
    closeConfirm();
  };

  const theme = darkMode
    ? { bg: "linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #0f172a 100%)", panel: "rgba(255, 255, 255, 0.08)", border: "rgba(255, 255, 255, 0.1)", text: "#f8f9fa", subtext: "#b0b8c8", input: "rgba(255, 255, 255, 0.05)", accent1: "#FFB366", accent2: "#FF6B9D", accent3: "#4A4E69", shadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }
    : { bg: "linear-gradient(135deg, #f8fafc 0%, #f0e6ff 50%, #fff5f0 100%)", panel: "rgba(255, 255, 255, 0.9)", border: "rgba(0, 0, 0, 0.08)", text: "#1a1a2e", subtext: "#6b7280", input: "rgba(0, 0, 0, 0.05)", accent1: "#FFB366", accent2: "#FF6B9D", accent3: "#4A4E69", shadow: "0 8px 32px rgba(0, 0, 0, 0.1)" };

  const kvBadgeBg = kvStatus === "error" ? "#ef4444" : kvStatus === "saving" ? "#f59e0b" : (kvStatus === "loaded" || kvStatus === "saved") ? "#10b981" : theme.panel;
  const kvBadgeText = kvStatus === "error" ? "KV err" : kvStatus === "saving" ? "KV..." : (kvStatus === "loaded" || kvStatus === "saved") ? "KV ok" : "KV";
  const kvBadgeColor = kvStatus === "idle" ? theme.text : "white";

  const layout = useMemo(() => ({
    headerPad: isMobile ? 6 : 16,
    contentTop: isMobile ? 110 : 120,
    contentPad: isMobile ? 12 : 20,
    homeCardPad: isMobile ? 20 : 32,
    homeGridMin: isMobile ? 200 : 240,
    homeGridGap: isMobile ? 12 : 16,
    sideWidth: isMobile ? 280 : 350,
    modalPad: isMobile ? 16 : 24,
    headerTitle: isMobile ? 16 : 28,
    headerIconSize: isMobile ? 15 : 20,
    headerButtonPad: isMobile ? "6px 10px" : "10px 16px",
    headerRowGap: isMobile ? 6 : 12,
  }), [isMobile]);

  const safeTopInset = "env(safe-area-inset-top, 0px)";
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (!headerRef.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setHeaderHeight(headerRef.current?.getBoundingClientRect().height || 0);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: theme.bg, color: theme.text, height: "100vh", display: "flex", fontFamily: "'Inter', -apple-system, 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', sans-serif", overflow: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); * { box-sizing: border-box; } html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; } button:hover { transform: translateY(-2px); } input:focus, textarea:focus, select:focus { outline: none; box-shadow: 0 0 0 3px rgba(255, 179, 102, 0.2); } ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); } ::-webkit-scrollbar-thumb { background: #FFB366; border-radius: 4px; } .chips-scroll { scrollbar-width: thin; } .chips-scroll::-webkit-scrollbar { height: 4px; background: transparent; } .chips-scroll::-webkit-scrollbar-thumb { background: #FFB366 !important; border-radius: 4px; border: 2px solid #FFB366 !important; } .chips-scroll { scrollbar-color: #FFB366 transparent !important; }`}</style>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
      <input ref={inlineFileInputRef} type="file" accept="image/*" onChange={onInlineFileChange} style={{ display: "none" }} />

      {accessMode === "home" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ maxWidth: 760, width: "100%", padding: layout.homeCardPad, borderRadius: 16, backgroundColor: theme.panel, border: `1px solid ${theme.border}`, boxShadow: theme.shadow, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: "bold", color: theme.accent1 }}>Choisis un mode</h1>
              <button onClick={() => setDarkMode((d) => !d)} style={{ padding: "10px 16px", borderRadius: 12, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {darkMode ? <Emoji symbol="☀️" label="Mode clair" size={18} /> : <Emoji symbol="🌙" label="Mode sombre" size={18} />}
              </button>
            </div>
            <p style={{ margin: 0, color: theme.subtext, lineHeight: 1.6 }}>Visiteur : consultation uniquement. Admin : accès aux boutons d'édition (mot de passe requis).</p>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${layout.homeGridMin}px, 1fr))`, gap: layout.homeGridGap }}>
              <button onClick={handleSelectVisitor} style={{ padding: "16px", borderRadius: 12, border: `1px solid ${theme.border}`, background: `linear-gradient(135deg, ${theme.panel} 0%, ${theme.input} 100%)`, color: theme.text, cursor: "pointer", fontSize: 18, fontWeight: 600, boxShadow: theme.shadow }}>
                👀 Mode Visiteur
              </button>
              <button onClick={handleOpenAdminLogin} style={{ padding: "16px", borderRadius: 12, border: `1px solid ${theme.border}`, background: `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)`, color: "white", cursor: "pointer", fontSize: 18, fontWeight: 700, boxShadow: theme.shadow }}>
                🛠️ Mode Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {accessMode !== "home" && (
      <div style={{ flex: 1, display: "flex", flexDirection: "row", overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          {/* Bouton Ajouter une note */}
          <button
            onClick={() => setShowNoteModal(true)}
            style={{
              position: "fixed",
              bottom: 18,
              right: 18,
              zIndex: 300,
              padding: isMobile ? "7px" : "7px 14px",
              borderRadius: 18,
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
              color: "white",
              border: "none",
              boxShadow: "0 2px 8px rgba(16,185,129,0.13)",
              fontWeight: 700,
              fontSize: isMobile ? 20 : 14,
              letterSpacing: 0.1,
              cursor: "pointer",
              minWidth: isMobile ? 36 : undefined,
              minHeight: isMobile ? 36 : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            📝{!isMobile && ' Ajouter une note'}
          </button>

          {/* Modale de prise de note personnelle */}
          <NoteModal
            open={showNoteModal}
            onClose={() => setShowNoteModal(false)}
            sections={data.sections}
            categories={data.categories}
            onSave={() => setShowNoteModal(false)}
          />
          <header ref={headerRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 120, backgroundColor: theme.panel, backdropFilter: "none", padding: `${layout.headerPad/2}px ${layout.headerPad}px`, paddingTop: `calc(${layout.headerPad/2}px + ${safeTopInset})`, borderBottom: `1px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: layout.headerRowGap, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: layout.headerRowGap, minWidth: 0 }}>
                <button onClick={() => setShowSectionPanel(true)} style={{ padding: layout.headerButtonPad, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, fontSize: layout.headerIconSize, cursor: "pointer", flexShrink: 0 }}>☰</button>
                {/* Bouton édition supprimé ici */}
                <h1 style={{ margin: 0, fontSize: layout.headerTitle, fontWeight: 800, background: `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.05px", lineHeight: 1.05, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>🛠️ Le Manuel</h1>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={() => askConfirm("Retour à l'accueil ? Pense à sauvegarder avant de quitter.", handleLogout)} style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", flexShrink: 0 }}>🏠</button>
                <button onClick={() => setShowGallery(true)} style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: showGallery ? "#23202d" : `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)`, color: "white", border: "none", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>📷</button>
                {isAuthenticated && (
                  <button
                    onClick={() => setEditMode((v) => !v)}
                    style={{
                      padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad,
                      minWidth: isMobile && isAuthenticated ? 15 : undefined,
                      minHeight: isMobile && isAuthenticated ? 15 : undefined,
                      borderRadius: 10,
                      backgroundColor: editMode ? theme.accent1 : theme.panel,
                      color: editMode ? 'white' : theme.text,
                      border: `1px solid ${theme.border}`,
                      cursor: "pointer",
                      fontWeight: 600,
                      flexShrink: 0,
                      marginRight: 4
                    }}
                    title={editMode ? "Quitter le mode édition" : "Activer le mode édition"}
                  >
                    ✏️
                  </button>
                )}
                <button onClick={() => setShowSearchModal(true)} style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", flexShrink: 0 }}>🔍</button>
                <button onClick={() => setDarkMode((d) => !d)} style={{ padding: isMobile && isAuthenticated ? '2px 2px' : isMobile ? '4px 7px' : layout.headerButtonPad, minWidth: isMobile && isAuthenticated ? 15 : undefined, minHeight: isMobile && isAuthenticated ? 15 : undefined, borderRadius: 10, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, flexShrink: 0 }}>
                  {darkMode ? <Emoji symbol="☀️" label="Mode clair" size={layout.headerIconSize} /> : <Emoji symbol="🌙" label="Mode sombre" size={layout.headerIconSize} />}
                </button>
              </div>
            </div>

            {/* Barre des grandes parties (sections) juste sous le header */}
            <div className="chips-scroll" style={{ display: "flex", gap: 10, flexWrap: "nowrap", overflowX: "auto", padding: '8px 0 8px 0', alignItems: 'center', position: 'relative', top: 0, marginBottom: isAuthenticated && isMobile ? 2 : 8 }}>
              <button onClick={() => { setSelectedSectionId(null); setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "5px 10px", borderRadius: 16, backgroundColor: selectedSectionId === null ? `linear-gradient(135deg, ${theme.accent1} 0%, ${theme.accent2} 100%)` : theme.panel, color: selectedSectionId === null ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", fontWeight: 700 }}>📌 Tout</button>
              {data.sections.map((section) => (
                <button key={section.id} onClick={() => { setSelectedSectionId(section.id); setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "5px 10px", borderRadius: 16, backgroundColor: selectedSectionId === section.id ? section.color : theme.panel, color: selectedSectionId === section.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", fontWeight: 700 }}>
                  {section.emoji} {section.name}
                </button>
              ))}
            </div>

            {/* Barre des catégories sous le header (mobile ET desktop) */}
            {selectedSectionId && (
              <div
                className="chips-scroll"
                style={{
                  marginTop: 0,
                  marginBottom: isMobile ? 0 : 16,
                  padding: `6px 0 8px 0`,
                  display: "flex",
                  gap: 10,
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  backgroundColor: theme.panel,
                  borderBottom: `1px solid ${theme.border}`
                }}
              >
                <button onClick={() => { setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "4px 10px", borderRadius: 14, backgroundColor: selectedCategoryId === null ? theme.accent1 : theme.panel, color: selectedCategoryId === null ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>◆ Toutes</button>
                {data.categories.filter(cat => cat.sectionId === selectedSectionId).map((cat) => (
                  <button key={cat.id} onClick={() => { setSelectedCategoryId(cat.id); setSearch(""); }} style={{ padding: "4px 10px", borderRadius: 14, backgroundColor: selectedCategoryId === cat.id ? cat.color || theme.accent1 : theme.panel, color: selectedCategoryId === cat.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            )}
          </header>

          <div
            style={{
              marginTop:
                headerHeight
                  ? (selectedSectionId ? headerHeight + 56 : headerHeight + 12)
                  : (isMobile ? (selectedSectionId ? 166 : 110) : (selectedSectionId ? 176 : 120)),
              flex: 1,
              display: "flex",
              flexDirection: "column",
            overflow: "hidden",
            position: "relative"
          }}>
            {/* Ancienne barre des catégories mobile supprimée ici */}
            {showSectionPanel && (
              <>
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 200 }} onClick={() => setShowSectionPanel(false)} />
                <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: layout.sideWidth, backgroundColor: theme.panel, backdropFilter: "blur(20px)", zIndex: 300, overflow: "auto", padding: layout.modalPad, borderRight: `1px solid ${theme.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ margin: 0, color: theme.accent1 }}>📂 Menu</h2>
                    <button onClick={() => setShowSectionPanel(false)} style={{ padding: "8px 12px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>✖</button>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h3 style={{ margin: 0, color: theme.accent1, fontSize: 14 }}>🏗️ Grandes Parties</h3>
                      {isAuthenticated && (
                        <button onClick={() => setShowEditSectionsPanel(!showEditSectionsPanel)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: showEditSectionsPanel ? "#ef4444" : "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>{showEditSectionsPanel ? "✖" : "⚙️"}</button>
                      )}
                    </div>

                    {isAuthenticated && showEditSectionsPanel ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ backgroundColor: theme.bg, padding: 12, borderRadius: 8, border: `2px dashed #10b981` }}>
                          <h4 style={{ margin: "0 0 8px 0", color: "#10b981", fontSize: 12 }}>➕ Ajouter</h4>
                          <input placeholder="Nom" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                          <input placeholder="Emoji" value={newSectionEmoji} onChange={(e) => setNewSectionEmoji(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <input type="color" value={newSectionColor} onChange={(e) => setNewSectionColor(e.target.value)} style={{ width: "100%", padding: 4, borderRadius: 4, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 10 }}>
                            {sectionSwatches.map((c) => (
                              <button key={c} onClick={() => setNewSectionColor(c)} style={{ height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                            ))}
                          </div>
                          <button onClick={addSection} style={{ width: "100%", padding: "6px", borderRadius: 4, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: "bold" }}>➕ Ajouter</button>
                        </div>

                        {data.sections.map((section) => (
                          <div key={section.id}>
                            {editingSectionId === section.id ? (
                              <div style={{ backgroundColor: theme.bg, padding: 12, borderRadius: 8, border: `1px solid ${theme.accent1}` }}>
                                <input placeholder="Nom" value={editSectionName} onChange={(e) => setEditSectionName(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                                <input placeholder="Emoji" value={editSectionEmoji} onChange={(e) => setEditSectionEmoji(e.target.value)} style={{ width: "100%", padding: 6, borderRadius: 4, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 8, fontSize: 12 }} />
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <input type="color" value={editSectionColor} onChange={(e) => setEditSectionColor(e.target.value)} style={{ width: "100%", padding: 4, borderRadius: 4, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 10 }}>
                                  {sectionSwatches.map((c) => (
                                    <button key={c} onClick={() => setEditSectionColor(c)} style={{ height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                                  ))}
                                </div>
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button onClick={saveEditSection} style={{ flex: 1, padding: "6px", borderRadius: 4, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>✅</button>
                                  <button onClick={cancelEditSection} style={{ flex: 1, padding: "6px", borderRadius: 4, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>❌</button>
                                </div>
                              </div>
                            ) : (
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 8, backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}>
                                <span style={{ fontSize: 14, fontWeight: "500" }}>{section.emoji} {section.name}</span>
                                <div style={{ display: "flex", gap: 4 }}>
                                  <button onClick={() => startEditSection(section)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>✏️</button>
                                  <button onClick={() => deleteSection(section.id)} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 11 }}>🗑️</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {data.sections.map((section) => (
                          <button key={section.id} onClick={() => { setSelectedSectionId(section.id); setSelectedCategoryId(null); setSearch(""); }} style={{ padding: "12px 16px", borderRadius: 8, backgroundColor: selectedSectionId === section.id ? section.color : theme.bg, color: selectedSectionId === section.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: "500" }}>
                            {section.emoji} {section.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSectionId && (
                    <div>
                      <h3 style={{ marginTop: 0, marginBottom: 12, color: theme.accent1, fontSize: 14 }}>📋 Catégories</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {data.categories.filter(cat => cat.sectionId === selectedSectionId).map((cat) => (
                          <button key={cat.id} onClick={() => { setSelectedCategoryId(cat.id); setSearch(""); setShowSectionPanel(false); }} style={{ padding: "12px 16px", borderRadius: 8, backgroundColor: selectedCategoryId === cat.id ? cat.color || theme.accent1 : theme.bg, color: selectedCategoryId === cat.id ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", textAlign: "left", fontSize: 14 }}>
                            {cat.icon} {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {showGallery && (
              <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.18), transparent 30%), rgba(0,0,0,0.82)", backdropFilter: "blur(6px)", zIndex: 200, overflow: "auto", padding: layout.modalPad }}>
                <div style={{ maxWidth: 1180, margin: "0 auto", backgroundColor: darkMode ? "rgba(12,14,26,0.9)" : "rgba(255,255,255,0.94)", borderRadius: 18, padding: layout.modalPad, border: `1px solid ${theme.border}`, boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <h2 style={{ margin: 0, color: theme.accent1, letterSpacing: 0.4 }}>📷 Galerie</h2>
                      <span style={{ color: theme.subtext, fontSize: 13 }}>Ajoute, trie et consulte tes photos par module.</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {isAuthenticated && (
                        <button onClick={() => setEditMode((e) => !e)} style={{ padding: "9px 14px", borderRadius: 10, background: editMode ? "linear-gradient(120deg, #10b981, #22d3ee)" : theme.panel, color: editMode ? "white" : theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", fontWeight: 700, boxShadow: editMode ? "0 8px 20px rgba(16,185,129,0.35)" : "none" }}>{editMode ? "Mode édition" : "Editer"}</button>
                      )}
                      <button onClick={() => setShowGallery(false)} style={{ padding: "9px 12px", borderRadius: 10, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>✖</button>
                    </div>
                  </div>

                  {isAuthenticated && editMode && (
                      <button onClick={() => setIsAddingImage(!isAddingImage)} style={{ padding: "10px 16px", borderRadius: 12, background: isAddingImage ? "linear-gradient(120deg, #f97316, #fb7185)" : "linear-gradient(120deg, #10b981, #22c55e)", color: "white", border: "none", cursor: "pointer", marginBottom: 18, fontWeight: 800, boxShadow: "0 10px 25px rgba(0,0,0,0.18)", transition: "transform 120ms ease, box-shadow 120ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.22)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.18)"; }}>{isAddingImage ? "Fermer" : "Ajouter une photo"}</button>
                  )}

                  {isAddingImage && (
                    <div style={{ background: darkMode ? "rgba(20,23,38,0.9)" : "rgba(248,250,252,0.9)", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, marginBottom: 22, boxShadow: "0 10px 28px rgba(0,0,0,0.12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Catégorie</label>
                        <select
                          value={newImageCatId || ""}
                          onChange={(e) => setNewImageCatId(e.target.value ? parseInt(e.target.value) : null)}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: `1px solid ${theme.border}`,
                            backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc",
                            color: theme.text,
                            boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)",
                            transition: "border-color 120ms ease, box-shadow 120ms ease"
                          }}
                        >
                          <option value="">-- Sélectionne --</option>
                          {data.categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>))}
                        </select>
                      </div>
                      {newImageCatId && (
                        <div>
                          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Module</label>
                          <select
                            value={newImageSubId || ""}
                            onChange={(e) => setNewImageSubId(e.target.value ? parseInt(e.target.value) : null)}
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              borderRadius: 10,
                              border: `1px solid ${theme.border}`,
                              backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc",
                              color: theme.text,
                              boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)",
                              transition: "border-color 120ms ease, box-shadow 120ms ease"
                            }}
                          >
                            <option value="">-- Sélectionne --</option>
                            {data.categories.find((cat) => cat.id === newImageCatId)?.subs.map((sub) => (<option key={sub.id} value={sub.id}>{sub.title}</option>))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label style={{ display: "block", marginBottom: 8, fontWeight: "bold", color: theme.text }}>Description (optionnel)</label>
                        <input value={newImageDesc} onChange={(e) => setNewImageDesc(e.target.value)} placeholder="Ex: angle du robinet" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: darkMode ? "rgba(26,30,46,0.95)" : "#f8fafc", color: theme.text, boxShadow: darkMode ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.8)", transition: "border-color 120ms ease, box-shadow 120ms ease" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px dashed ${theme.border}`, backgroundColor: darkMode ? "rgba(26,30,46,0.9)" : "#f8fafc", color: theme.text, transition: "border-color 120ms ease, box-shadow 120ms ease" }} />
                        {newImageUrl && <img src={newImageUrl} alt="Preview" style={{ width: "100%", maxHeight: 200, borderRadius: 10, objectFit: "cover", border: `1px solid ${theme.border}` }} />}
                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={saveImage} disabled={galleryUploadBusy} style={{ flex: 1, padding: "10px 14px", borderRadius: 12, background: galleryUploadBusy ? "#6b7280" : "linear-gradient(120deg, #10b981, #0ea5e9)", color: "white", border: "none", cursor: galleryUploadBusy ? "not-allowed" : "pointer", fontWeight: 800 }}>
                            {galleryUploadBusy ? "Upload..." : "💾 Enregistrer"}
                          </button>
                          <button onClick={() => { setNewImageUrl(""); setNewImageCatId(null); setNewImageSubId(null); setNewImageDesc(""); }} disabled={galleryUploadBusy} style={{ padding: "10px 14px", borderRadius: 12, backgroundColor: "#6b7280", color: "white", border: "none", cursor: galleryUploadBusy ? "not-allowed" : "pointer", fontWeight: 700, opacity: galleryUploadBusy ? 0.75 : 1 }}>Annuler</button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 18 }}>
                    <div style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, boxShadow: theme.shadow }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: theme.subtext, fontSize: 12 }}>
                        <span>🌐</span><span>Grande partie</span>
                      </div>
                      <select value={galleryFilterSectionId ?? ""} onChange={(e) => setGalleryFilterSectionId(e.target.value ? Number(e.target.value) : null)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }}>
                        <option value="">Toutes</option>
                        {data.sections.map((s) => (<option key={s.id} value={s.id}>{s.emoji} {s.name}</option>))}
                      </select>
                    </div>
                    <div style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, boxShadow: theme.shadow }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: theme.subtext, fontSize: 12 }}>
                        <span>📂</span><span>Catégorie</span>
                      </div>
                      <select value={galleryFilterCatId ?? ""} onChange={(e) => setGalleryFilterCatId(e.target.value ? Number(e.target.value) : null)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }}>
                        <option value="">Toutes</option>
                        {galleryCategories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
                    {filteredGalleryImages.map((img) => (
                      <div key={`${img.catId}-${img.subId}-${img.index}`} style={{ border: `1px solid ${theme.border}`, borderRadius: 14, overflow: "hidden", background: theme.panel, boxShadow: "0 12px 28px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}>
                        <div style={{ position: "relative" }}>
                          <img src={img.url} alt={img.desc || img.subTitle} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                          <div style={{ position: "absolute", bottom: 8, left: 8, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>{img.catName} • {img.subTitle}</div>
                        </div>
                        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                          {img.desc && <div style={{ fontSize: 13, color: theme.text }}>{img.desc}</div>}
                          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                            <button onClick={() => { 
                              setSelectedCategoryId(img.catId); 
                              setExpandedCategories(prev => ({ ...prev, [img.catId]: true }));
                              setTimeout(() => {
                                const subRef = subRefs.current[img.subId];
                                if (subRef) {
                                  subRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                } else {
                                  sectionScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 150);
                              setShowGallery(false);
                            }} style={{ flex: 1, padding: "10px", borderRadius: 10, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800, boxShadow: "0 8px 18px rgba(59,130,246,0.35)" }}>👁️ Voir</button>
                                {isAuthenticated && editMode && (
                                  <button onClick={() => deleteImage(img.catId, img.subId, img.index)} style={{ width: 44, padding: "10px", borderRadius: 10, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800 }}>🗑️</button>
                                )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showSearchModal && (
              <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 150, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20 }}>
                <div style={{ backgroundColor: theme.panel, borderRadius: 12, padding: 16, width: "90%", maxWidth: 500 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 style={{ margin: 0, color: theme.accent1 }}>🔍 Rechercher</h3>
                    <button onClick={() => setShowSearchModal(false)} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>✖</button>
                  </div>
                  <input type="search" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') setShowSearchModal(false); }} autoFocus style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }} />
                </div>
              </div>
            )}

            <section style={{ flex: 1, overflow: "auto", padding: layout.contentPad }} ref={sectionScrollRef}>
              {/* Bouton flottant Sauvegarder (emoji) */}
              {/* Bouton Sauvegarder flottant : admin uniquement, plus petit, et seulement si isDirty */}
              {isAuthenticated && isDirty && (
                <button
                  onClick={handleMainSave}
                  title="Sauvegarder"
                  style={{
                    position: "fixed",
                    bottom: 18,
                    right: 18,
                    zIndex: 999,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(120deg,#10b981,#3b82f6)",
                    color: "white",
                    fontSize: 20,
                    boxShadow: "0 4px 16px rgba(59,130,246,0.18)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >💾</button>
              )}
              {editMode && (
                <div style={{ background: `linear-gradient(135deg, ${theme.panel} 0%, ${theme.bg} 100%)`, padding: 20, borderRadius: 16, border: `1px solid ${theme.border}`, marginBottom: 20, boxShadow: theme.shadow }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800 }}>+</div>
                    <div>
                      <h3 style={{ margin: 0, color: theme.text, fontSize: 16 }}>Nouvelle catégorie</h3>
                      <div style={{ fontSize: 12, color: theme.subtext }}>Titre, grande partie, emoji et couleur en un coup d'oeil.</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr", gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Titre</label>
                      <input placeholder="Titre" value={newCatTitle} onChange={(e) => setNewCatTitle(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Emoji</label>
                      <input placeholder="🧭" value={newCatEmoji} onChange={(e) => setNewCatEmoji(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 10, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Grande partie</label>
                      <select value={newCatSection || ""} onChange={(e) => setNewCatSection(Number(e.target.value))} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }}>
                        <option value="">Choisir...</option>
                        {data.sections.map(section => (<option key={section.id} value={section.id}>{section.emoji} {section.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Couleur</label>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="color" value={newCatColor} onChange={(e) => setNewCatColor(e.target.value)} style={{ flex: "0 0 46px", height: 46, padding: 4, borderRadius: 10, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                        <div style={{ flex: 1, height: 46, borderRadius: 10, background: newCatColor, border: `1px solid ${theme.border}` }} />
                      </div>
                    </div>
                  </div>

                  <button onClick={addCategory} style={{ width: "100%", padding: 12, borderRadius: 12, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700, letterSpacing: 0.2 }}>Enregistrer la catégorie</button>
                </div>
              )}

              {filteredCategories.map((cat) => {
                const expanded = expandedCategories[cat.id] ?? true;
                const catImages = allImages.filter(img => img.catId === cat.id);
                const isEditingCat = editingCategoryId === cat.id;
                return (
                  <div key={cat.id} style={{ backgroundColor: theme.panel, borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${theme.border}` }}>
                    {isEditingCat ? (
                      <div style={{ backgroundColor: theme.bg, padding: 18, borderRadius: 14, border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: theme.accent1, display: "flex", alignItems: "center", justifyContent: "center", color: "#0b1224", fontWeight: 800 }}>✏️</div>
                          <div>
                            <h3 style={{ margin: 0, color: theme.text, fontSize: 15 }}>Modifier la catégorie</h3>
                            <div style={{ fontSize: 12, color: theme.subtext }}>Nom, emoji, couleur et grande partie.</div>
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: 10, marginBottom: 10 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Nom</label>
                            <input placeholder="Nom" value={editCatName} onChange={(e) => setEditCatName(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Emoji</label>
                            <input placeholder="⚡" value={editCatEmoji} onChange={(e) => setEditCatEmoji(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text }} />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 10, marginBottom: 12 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Grande partie</label>
                            <select value={editCatSection || ""} onChange={(e) => setEditCatSection(Number(e.target.value))} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text }}>
                              {data.sections.map(section => (<option key={section.id} value={section.id}>{section.emoji} {section.name}</option>))}
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 12, color: theme.subtext, marginBottom: 4 }}>Couleur</label>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                              <input type="color" value={editCatColor} onChange={(e) => setEditCatColor(e.target.value)} style={{ flex: "0 0 46px", height: 46, padding: 4, borderRadius: 10, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                              <div style={{ flex: 1, height: 46, borderRadius: 10, background: editCatColor, border: `1px solid ${theme.border}` }} />
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={saveEditCategory} style={{ flex: 1, padding: 12, borderRadius: 12, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Enregistrer</button>
                          <button onClick={cancelEditCategory} style={{ padding: 12, borderRadius: 12, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => toggleCategory(cat.id)}>
                        <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: 12, color: cat.color || theme.accent1 }}><span style={{ fontSize: 28 }}>{cat.icon}</span>{cat.name}</h2>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          {editMode && <button onClick={(e) => { e.stopPropagation(); moveCategoryUp(cat.id); }} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#8b5cf6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }} title="Monter">⬆️</button>}
                          {editMode && <button onClick={(e) => { e.stopPropagation(); moveCategoryDown(cat.id); }} style={{ padding: "4px 8px", borderRadius: 4, backgroundColor: "#8b5cf6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }} title="Descendre">⬇️</button>}
                          {editMode && <button onClick={(e) => { e.stopPropagation(); startEditCategory(cat); }} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer" }}>✏️</button>}
                          {editMode && <button onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>🗑️</button>}
                          <span style={{ fontSize: 20 }}>{expanded ? "▼" : "▶"}</span>
                        </div>
                      </div>
                    )}

                    {expanded && !isEditingCat && (
                      <div style={{ marginTop: 16 }}>
                        {cat.subs.map((sub) => {
                          const isEditing = editingSubId === sub.id;
                          const subImages = catImages.filter(img => img.subId === sub.id);
                          return (
                            <div key={sub.id} ref={(el) => { if (el) subRefs.current[sub.id] = el; }} style={{ backgroundColor: theme.bg, padding: 16, borderRadius: 8, marginBottom: 12, border: `1px solid ${theme.border}` }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <h3
                                  style={{ margin: 0, color: sub.color || "#60a5fa", cursor: 'pointer', textDecoration: 'underline dotted' }}
                                  onClick={() => {
                                    setDrawerCategoryId(cat.id);
                                    setDrawerSectionId(cat.sectionId);
                                    setImageDrawerOpen(true);
                                  }}
                                >
                                  {sub.title} {subImages.length > 0 && <span style={{ fontSize: 12, color: theme.accent1 }}>📷 {subImages.length}</span>}
                                </h3>
                                {editMode && !isEditing && (
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => startEditSub(cat.id, sub)} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer" }}>✏️</button>
                                    <button onClick={() => deleteSub(cat.id, sub.id)} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>🗑️</button>
                                  </div>
                                )}
                              </div>

                              {isEditing ? (
                                <div>
                                  <input placeholder="Titre" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 10 }} />
                                  <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onSelect={(e) => handleTextSelect(e, "editSub")}
                                    placeholder="Saisis ou colle ton texte (markdown)"
                                    style={{
                                      width: "100%",
                                      minHeight: 180,
                                      padding: 14,
                                      borderRadius: 12,
                                      border: `1px solid ${theme.accent1}`,
                                      background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.92), rgba(17,24,39,0.92))" : "linear-gradient(135deg, #f8fafc, #eef2ff)",
                                      color: theme.text,
                                      fontFamily: "'Inter', 'SFMono-Regular', monospace",
                                      lineHeight: 1.6,
                                      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                                      marginBottom: 12,
                                      borderColor: darkMode ? "rgba(255,179,102,0.45)" : "rgba(255,179,102,0.65)",
                                    }}
                                  />

                                  {selectionInfo.text && selectionInfo.target === "editSub" && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme.panel, border: `1px solid ${theme.border}`, marginBottom: 10 }}>
                                      <span style={{ fontSize: 12, color: theme.subtext }}>{`"${selectionInfo.text}"`}</span>
                                      <div style={{ display: "flex", gap: 6 }}>
                                        <button onClick={() => applyFormatting("bold")}
                                          style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, fontWeight: 800, cursor: "pointer", fontSize: 12 }}>G</button>
                                        <button onClick={() => applyFormatting("italic")}
                                          style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, fontStyle: "italic", cursor: "pointer", fontSize: 12 }}>I</button>
                                        <button onClick={() => applyFormatting("underline")}
                                          style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>U</button>
                                        {[14, 16, 18, 20].map((s) => (
                                          <button key={s} onClick={() => applyFormatting("size", s)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", fontSize: 12 }}>{s}px</button>
                                        ))}
                                        <div style={{ position: "relative" }}>
                                          <button onClick={() => setTableMenuOpen(tableMenuOpen === "editSub" ? null : "editSub")}
                                            style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
                                            📊
                                            <span style={{ fontWeight: 700 }}>Table</span>
                                          </button>
                                          {tableMenuOpen === "editSub" && (
                                            <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: theme.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                                              {tableTemplates.map((tpl) => (
                                                <button key={tpl.key} onClick={() => insertTableTemplate("editSub", tpl.text)} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
                                                  <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                                                  <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {quickColors.map((c) => (
                                        <button key={c} onClick={() => applyColorToSelection(c)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                                      ))}
                                      <input type="color" value={selectionCustomColor} onChange={(e) => setSelectionCustomColor(e.target.value)} style={{ width: 32, height: 32, padding: 2, borderRadius: 8, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                                      <button onClick={() => applyColorToSelection(selectionCustomColor)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>OK</button>
                                      <button onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }} style={{ padding: "6px 8px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>✖</button>
                                    </div>
                                  )}
                                  
                                  <input type="color" value={editColor} onChange={(e) => setEditColor(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${theme.border}`, cursor: "pointer", marginBottom: 10 }} />
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={saveEditSub} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer" }}>💾</button>
                                    <button onClick={cancelEdit} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer" }}>❌</button>
                                  </div>
                                </div>
                              ) : (
                                <Markdown content={sub.text} />
                              )}

                              {isAuthenticated && editMode && !isEditing && (
                                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <button onClick={() => startInlineImage(cat.id, sub.id)} style={{ padding: "8px 12px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontWeight: 600 }}>➕ Photo</button>
                                    {inlineImageTarget && inlineImageTarget.catId === cat.id && inlineImageTarget.subId === sub.id && inlineImageLoading && (
                                      <span style={{ color: theme.subtext, fontSize: 12 }}>Compression...</span>
                                    )}
                                  </div>
                                  {inlineImageTarget && inlineImageTarget.catId === cat.id && inlineImageTarget.subId === sub.id && inlineImageUrl && (
                                    <div style={{ backgroundColor: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                                      <img src={inlineImageUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 8, objectFit: "cover" }} />
                                      <input value={inlineImageDesc} onChange={(e) => setInlineImageDesc(e.target.value)} placeholder="Description (optionnel)" style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text }} />
                                      <div style={{ display: "flex", gap: 8 }}>
                                        <button onClick={saveInlineImage} disabled={inlineUploadBusy} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, backgroundColor: inlineUploadBusy ? "#6b7280" : "#10b981", color: "white", border: "none", cursor: inlineUploadBusy ? "not-allowed" : "pointer", fontWeight: 700 }}>
                                          {inlineUploadBusy ? "Upload..." : "💾 Enregistrer"}
                                        </button>
                                        <button onClick={cancelInlineImage} disabled={inlineUploadBusy} style={{ padding: "10px 12px", borderRadius: 8, backgroundColor: "#6b7280", color: "white", border: "none", cursor: inlineUploadBusy ? "not-allowed" : "pointer", opacity: inlineUploadBusy ? 0.7 : 1 }}>Annuler</button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {editMode && (
                          <div style={{ backgroundColor: theme.bg, padding: 16, borderRadius: 8, border: `2px dashed ${theme.border}` }}>
                            {addingSubToCatId === cat.id ? (
                              <div>
                                <h4 style={{ marginTop: 0, color: "#10b981" }}>➕ Module</h4>
                                <input placeholder="Titre" value={newSubTitle} onChange={(e) => setNewSubTitle(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text, marginBottom: 10 }} />
                                <textarea
                                  placeholder="Saisis ou colle ton texte (markdown)"
                                  value={newSubText}
                                  onChange={(e) => setNewSubText(e.target.value)}
                                  onSelect={(e) => handleTextSelect(e, "newSub")}
                                  style={{
                                    width: "100%",
                                    minHeight: 160,
                                    padding: 14,
                                    borderRadius: 12,
                                    border: `1px solid ${theme.accent1}`,
                                    background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.92), rgba(17,24,39,0.92))" : "linear-gradient(135deg, #f8fafc, #eef2ff)",
                                    color: theme.text,
                                    fontFamily: "'Inter', 'SFMono-Regular', monospace",
                                    lineHeight: 1.6,
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                                    marginBottom: 12,
                                    borderColor: darkMode ? "rgba(255,179,102,0.45)" : "rgba(255,179,102,0.65)",
                                  }}
                                />

                                {selectionInfo.text && selectionInfo.target === "newSub" && (
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: 10, borderRadius: 10, backgroundColor: theme.panel, border: `1px solid ${theme.border}`, marginBottom: 10 }}>
                                    <span style={{ fontSize: 12, color: theme.subtext }}>{`"${selectionInfo.text}"`}</span>
                                    <div style={{ display: "flex", gap: 6 }}>
                                      <button onClick={() => applyFormatting("bold")}
                                        style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, fontWeight: 800, cursor: "pointer", fontSize: 12 }}>G</button>
                                      <button onClick={() => applyFormatting("italic")}
                                        style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, fontStyle: "italic", cursor: "pointer", fontSize: 12 }}>I</button>
                                      <button onClick={() => applyFormatting("underline")}
                                        style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, textDecoration: "underline", cursor: "pointer", fontSize: 12 }}>U</button>
                                      {[14, 16, 18, 20].map((s) => (
                                        <button key={s} onClick={() => applyFormatting("size", s)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", fontSize: 12 }}>{s}px</button>
                                      ))}
                                      <div style={{ position: "relative" }}>
                                        <button onClick={() => setTableMenuOpen(tableMenuOpen === "newSub" ? null : "newSub")}
                                          style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
                                          📊
                                          <span style={{ fontWeight: 700 }}>Table</span>
                                        </button>
                                        {tableMenuOpen === "newSub" && (
                                          <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: theme.shadow, padding: 8, minWidth: 180, zIndex: 50 }}>
                                            {tableTemplates.map((tpl) => (
                                              <button key={tpl.key} onClick={() => insertTableTemplate("newSub", tpl.text)} style={{ width: "100%", textAlign: "left", padding: 8, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.text, cursor: "pointer", marginBottom: 6, fontSize: 12 }}>
                                                <div style={{ fontWeight: 700 }}>{tpl.label}</div>
                                                <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.8 }}>{tpl.preview}</div>
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {quickColors.map((c) => (
                                      <button key={c} onClick={() => applyColorToSelection(c)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.border}`, backgroundColor: c, cursor: "pointer" }} />
                                    ))}
                                    <input type="color" value={selectionCustomColor} onChange={(e) => setSelectionCustomColor(e.target.value)} style={{ width: 32, height: 32, padding: 2, borderRadius: 8, border: `1px solid ${theme.border}`, cursor: "pointer" }} />
                                    <button onClick={() => applyColorToSelection(selectionCustomColor)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>OK</button>
                                    <button onClick={() => { setSelectionInfo({ text: "", start: 0, end: 0, target: null }); setTableMenuOpen(null); }} style={{ padding: "6px 8px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>✖</button>
                                  </div>
                                )}
                                
                                <input type="color" value={newSubColor} onChange={(e) => setNewSubColor(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${theme.border}`, cursor: "pointer", marginBottom: 10 }} />
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button onClick={saveNewSub} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer" }}>✅</button>
                                  <button onClick={cancelAddingSub} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer" }}>❌</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => startAddingSub(cat.id)} style={{ width: "100%", padding: "12px", borderRadius: 8, backgroundColor: "transparent", color: theme.text, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: 16 }}>➕</button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </div>
        </div>

        {showImageSidebar && (
          <div style={{ width: layout.sideWidth, minHeight: 0, backgroundColor: theme.panel, backdropFilter: "blur(20px)", borderLeft: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: headerHeight ? headerHeight + 2 : 76 }}>
            <h3 style={{ margin: "0 16px 16px 16px", color: theme.accent1, flexShrink: 0 }}>📷 Images ({filteredGalleryImages.length})</h3>
            <div style={{ flex: 1, minHeight: 0, overflow: "auto", paddingRight: 8 }}>
              <div style={{ paddingLeft: 16, paddingRight: 8, paddingTop: 12 }}>
                {filteredGalleryImages.length === 0 ? (
                  <div style={{ color: theme.subtext, textAlign: "center", padding: 20 }}>Aucune image</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {data.categories.find(c => c.id === selectedCategoryId)?.subs.map((sub) => {
                      const subImages = filteredGalleryImages.filter(img => img.subId === sub.id);
                      if (subImages.length === 0) return null;
                      return (
                        <div key={sub.id}>
                          <div style={{ fontSize: 12, fontWeight: "bold", color: theme.accent1, marginBottom: 8 }}>🧩 {sub.title}</div>
                          {subImages.map((img) => (
                            <div
                              key={`${img.catId}-${img.subId}-${img.index}`}
                              style={{
                                borderRadius: 10,
                                overflow: "hidden",
                                border: "1px solid rgba(255, 179, 102, 0.55)",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                                marginBottom: 10,
                                background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.7), rgba(17,24,39,0.85))" : "linear-gradient(135deg, #fffaf5, #f0f4ff)",
                              }}
                            >
                              <img src={img.url} alt={img.desc || img.subTitle} style={{ width: "100%", height: 120, objectFit: "cover", cursor: "pointer" }} onClick={() => { setLightboxImage(img); setImageDrawerOpen(false); }} />
                              {img.desc && <div style={{ padding: "6px 8px", fontSize: 12, color: theme.text }}>{img.desc}</div>}
                              <div style={{ display: "flex", gap: 4, padding: 6 }}>
                                {isAuthenticated && editMode && <button onClick={() => deleteImage(img.catId, img.subId, img.index)} style={{ flex: 1, padding: "4px", backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 11, borderRadius: 4 }}>🗑️</button>}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
      )}

      {showLoginModal && (
        <>
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 600 }} onClick={() => { setShowLoginModal(false); setAdminPassword(""); setLoginError(""); }} />
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 700 }}>
            <div style={{ width: 360, backgroundColor: darkMode ? "rgba(15,17,30,0.95)" : "rgba(255,255,255,0.98)", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 24, boxShadow: theme.shadow, display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{ margin: 0, color: theme.accent1 }}>Accès Admin</h3>
              <p style={{ margin: 0, color: theme.subtext, fontSize: 13 }}>Saisis le mot de passe pour activer l'édition.</p>
              <input type="password" value={adminPassword} onChange={(e) => { setAdminPassword(e.target.value); setLoginError(""); }} onKeyDown={(e) => { if (e.key === "Enter") handleAdminLogin(); }} style={{ width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.input, color: theme.text }} placeholder="Mot de passe" />
              {loginError && <div style={{ color: "#ef4444", fontSize: 12 }}>{loginError}</div>}
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                <button onClick={() => { setShowLoginModal(false); setAdminPassword(""); setLoginError(""); }} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer" }}>Annuler</button>
                <button onClick={handleAdminLogin} style={{ padding: "10px 16px", borderRadius: 8, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Valider</button>
              </div>
            </div>
          </div>
        </>
      )}

      {confirmModal.open && (
        <>
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", zIndex: 750 }} onClick={closeConfirm} />
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 800 }}>
            <div style={{ width: 360, backgroundColor: darkMode ? "rgba(15,17,30,0.96)" : "rgba(255,255,255,0.98)", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 20, boxShadow: theme.shadow, display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{ margin: 0, color: theme.accent1 }}>Confirmation</h3>
              <div style={{ color: theme.text }}>{confirmModal.message}</div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={closeConfirm} style={{ padding: "10px 16px", borderRadius: 10, backgroundColor: "#6b7280", color: "white", border: "none", cursor: "pointer" }}>Retour</button>
                <button onClick={acceptConfirm} style={{ padding: "10px 16px", borderRadius: 10, backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>Continuer</button>
              </div>
            </div>
          </div>
        </>
      )}

      {lightboxImage && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.75)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setLightboxImage(null)}>
          <div style={{ maxWidth: "90vw", maxHeight: "90vh", backgroundColor: darkMode ? "rgba(15,17,30,0.96)" : "rgba(255,255,255,0.98)", borderRadius: 14, overflow: "hidden", border: `1px solid ${theme.border}`, boxShadow: theme.shadow, position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.url} alt={lightboxImage.desc || lightboxImage.subTitle} style={{ display: "block", maxWidth: "90vw", maxHeight: "75vh", objectFit: "contain", backgroundColor: "black" }} />
            {(lightboxImage.desc || lightboxImage.subTitle) && (
              <div style={{ padding: 12, color: theme.text, fontSize: 13, borderTop: `1px solid ${theme.border}` }}>
                <div style={{ fontWeight: 700 }}>{lightboxImage.subTitle}</div>
                {lightboxImage.desc && <div style={{ marginTop: 4 }}>{lightboxImage.desc}</div>}
              </div>
            )}
            <button onClick={() => setLightboxImage(null)} style={{ position: "absolute", top: 8, right: 8, padding: "8px 10px", borderRadius: 10, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>✖</button>
          </div>
        </div>
      )}

      {isMobile && imageDrawerOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 820 }} onClick={() => setImageDrawerOpen(false)} />
          <div style={{ position: "fixed", top: headerHeight ? headerHeight + 6 : 80, right: 0, bottom: 0, width: "78vw", maxWidth: 360, backgroundColor: darkMode ? "rgba(17,24,39,0.95)" : "rgba(255,255,255,0.98)", borderLeft: `1px solid ${theme.border}`, boxShadow: "-8px 0 24px rgba(0,0,0,0.35)", zIndex: 840, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ fontWeight: 800, color: theme.accent1 }}>📷 Images</div>
              <button onClick={() => setImageDrawerOpen(false)} style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: "#ef4444", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}>✖</button>
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <select
                  value={drawerSectionId ?? ""}
                  onChange={(e) => {
                    const val = e.target.value ? Number(e.target.value) : null;
                    setDrawerSectionId(val);
                    const available = drawerCategories.filter((c) => !val || c.sectionId === val);
                    setDrawerCategoryId(available[0]?.id || null);
                  }}
                  style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text }}
                >
                  {sectionsWithImages.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <select
                  value={drawerCategoryId ?? ""}
                  onChange={(e) => setDrawerCategoryId(e.target.value ? Number(e.target.value) : null)}
                  style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, backgroundColor: theme.panel, color: theme.text }}
                >
                  {drawerCategories.filter((c) => !drawerSectionId || c.sectionId === drawerSectionId).map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "0 12px 12px" }}>
              {drawerImages.length === 0 ? (
                <div style={{ color: theme.subtext, textAlign: "center", padding: 20 }}>Aucune image</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {drawerImages.map((img) => (
                    <div key={`${img.catId}-${img.subId}-${img.index}-drawer`} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255, 179, 102, 0.55)", boxShadow: "0 8px 20px rgba(0,0,0,0.25)", background: darkMode ? "linear-gradient(135deg, rgba(26,32,44,0.7), rgba(17,24,39,0.85))" : "linear-gradient(135deg, #fffaf5, #f0f4ff)" }}>
                      <img src={img.url} alt={img.desc || img.subTitle} style={{ width: "100%", height: 160, objectFit: "cover", cursor: "pointer" }} onClick={() => { setLightboxImage(img); setImageDrawerOpen(false); }} />
                      {img.desc && <div style={{ padding: "8px 10px", fontSize: 12, color: theme.text }}>{img.desc}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {toast.message && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 850, display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, backgroundColor: darkMode ? "rgba(15,17,30,0.95)" : "rgba(255,255,255,0.98)", border: `1px solid ${theme.border}`, boxShadow: theme.shadow, color: theme.text, minWidth: 200 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}
    </div>
  );
}