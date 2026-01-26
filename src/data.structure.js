// Grandes parties (sections)
export const sections = [
  { id: 1, name: "Technologie ECS", color: "#0ea5e9", emoji: "🚿" },
  { id: 2, name: "Différents Systèmes ECS", color: "#22d3ee", emoji: "⚡" },
  { id: 3, name: "Fixation & Pose Apparent", color: "#3b82f6", emoji: "🔧" },
  { id: 4, name: "Appareils Sanitaires", color: "#10b981", emoji: "🚰" },
  { id: 5, name: "Poste SOA", color: "#f97316", emoji: "🧯" },
];

// Catégories (categories)
export const categories = [
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
    ]