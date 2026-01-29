import React, { useState, useEffect, useMemo, useRef } from "react";
import imageCompression from 'browser-image-compression';
import "./AppTiptap.css";
import StaffPanelPage from "./StaffPanelPage";
import StaffLoginModal from "./modals/StaffLoginModal.jsx";
import StaffQRModal from "./modals/StaffQRModal.jsx";
// Détection du thème sombre du système pour initialiser darkMode
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// ...existing code...
import LoginModal from "./modals/LoginModal";
import ConfirmModal from "./modals/ConfirmModal";
import SearchModal from "./modals/SearchModal";
import data from "./data.structure";
const { sections, categories } = data.value || {};
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Gallery from "./components/Gallery";




import EditorPanel from "./components/EditorPanel";
import TiptapViewer from "./components/TiptapViewer";


export default function App() {
    // Nouvel état : export Git en attente
    const [isExportDirty, setIsExportDirty] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [pendingStaffPanel, setPendingStaffPanel] = useState(false);
  const [staffUser, setStaffUser] = useState(null);
  // État pour le mode développeur caché
  const [showDevMode, setShowDevMode] = useState(false);

  // Handler pour le scroll sur le bouton dark mode
  const handleDarkModeWheel = (e) => {
    if (e.deltaY > 0) { // scroll vers le bas
      setTimeout(() => {
        const pwd = window.prompt("Mot de passe staff ?");
        if (pwd === "DEV2026") {
          setShowDevMode(true);
        }
      }, 100);
    }
  };

  // Couleur personnalisée pour la sélection de texte
  const [selectionCustomColor, setSelectionCustomColor] = useState("#3b82f6");
  // Palette de couleurs rapides pour la mise en forme
  const quickColors = [
    "#f43f5e", // rouge
    "#f59e42", // orange
    "#eab308", // jaune
    "#10b981", // vert
    "#3b82f6", // bleu
    "#6366f1", // violet
    "#334155", // gris foncé
    "#64748b", // gris
    "#e5e7eb"  // gris clair
  ];
  // Hooks pour la gestion des images inline
  const [inlineImageTarget, setInlineImageTarget] = useState(null);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [inlineImageDesc, setInlineImageDesc] = useState("");
  const [inlineImageLoading, setInlineImageLoading] = useState(false);
  const [inlineUploadBusy, setInlineUploadBusy] = useState(false);
  // État pour la gestion de la sélection de texte (mise en forme, couleur, etc.)
  const [selectionInfo, setSelectionInfo] = useState({ text: "", start: 0, end: 0, target: null });
  // États pour la création d'une nouvelle catégorie
  const [newCatTitle, setNewCatTitle] = useState("");
  const [newCatEmoji, setNewCatEmoji] = useState("");
  const [newCatColor, setNewCatColor] = useState("#ffffff");
  const [newCatSection, setNewCatSection] = useState(null);
  // Enregistre une image dans la galerie (catégorie et sous-catégorie)
  const saveImage = () => {
    if (!newImageUrl) {
      setToast({ message: "Aucune image à enregistrer." });
      return;
    }
    if (!newImageCatId || !newImageSubId) {
      setToast({ message: "Sélectionne une catégorie et un module." });
      return;
    }
    setGalleryUploadBusy(true);
    setTimeout(() => {
      setData((d) => ({
        ...d,
        categories: d.categories.map((cat) =>
          cat.id === newImageCatId
            ? {
                ...cat,
                subs: cat.subs.map((sub) =>
                  sub.id === newImageSubId
                    ? {
                        ...sub,
                        images: [
                          ...(Array.isArray(sub.images) ? sub.images : sub.image ? [sub.image] : []),
                          { url: newImageUrl, desc: newImageDesc }
                        ]
                      }
                    : sub
                )
              }
            : cat
        )
      }));
      setNewImageUrl("");
      setNewImageDesc("");
      setGalleryUploadBusy(false);
      setIsAddingImage(false);
      setToast({ message: "Image ajoutée !" });
    }, 500);
  };

                                    // Références d'éléments potentiellement utilisées
                                    const subRefs = useRef({});
                                    const sectionRefs = useRef({});
                                    const toastTimeoutRef = useRef(null);
                                  const [showEditSectionsPanel, setShowEditSectionsPanel] = useState(false);
                                // Objets ou états de gestion de modaux potentiellement utilisés
                                const [confirmModal, setConfirmModal] = useState({ open: false, message: "", onConfirm: null });
                                const [noteModal, setNoteModal] = useState({ open: false, note: null });
                                const [tableModal, setTableModal] = useState({ open: false, table: null });
                              // Champs d'authentification/admin potentiellement utilisés
                              const [adminPassword, setAdminPassword] = useState("");
                              const [adminPasswordInput, setAdminPasswordInput] = useState("");
                              const [loginError, setLoginError] = useState("");
                              const [confirmText, setConfirmText] = useState("");
                            // États de modaux et d'UI potentiellement utilisés
                            const [showLoginModal, setShowLoginModal] = useState(false);
                            const [showConfirmModal, setShowConfirmModal] = useState(false);
                            const [showNoteModal, setShowNoteModal] = useState(false);
                            const [showTableModal, setShowTableModal] = useState(false);
                            const [showLightbox, setShowLightbox] = useState(false);
                            const [lightboxImage, setLightboxImage] = useState(null);
                          // États d'UI ou d'édition potentiellement utilisés
                          const [expandedCategories, setExpandedCategories] = useState({});
                          const [isEditingCat, setIsEditingCat] = useState(false);
                          const [isAddingImage, setIsAddingImage] = useState(false);
                          const [isEditing, setIsEditing] = useState(false);
                          const [editCatName, setEditCatName] = useState("");
                          const [editCatEmoji, setEditCatEmoji] = useState("");
                          const [editCatSection, setEditCatSection] = useState(null);
                          const [editCatColor, setEditCatColor] = useState("");
                          const [newCatName, setNewCatName] = useState("");
                          // ...existing code...
                          const [newSubColor, setNewSubColor] = useState("");
                          const [editTitle, setEditTitle] = useState("");
                          const [editText, setEditText] = useState("");
                          const [editColor, setEditColor] = useState("");
                        const [editMode, setEditMode] = useState(false);
                      const sectionScrollRef = useRef(null);
// États pour la gestion des sections (Sidebar)
const [newSectionName, setNewSectionName] = useState("");
const [newSectionEmoji, setNewSectionEmoji] = useState("📌");
const [newSectionColor, setNewSectionColor] = useState("#3b82f6");
const [editSectionName, setEditSectionName] = useState("");
const [editSectionEmoji, setEditSectionEmoji] = useState("");
const [editSectionColor, setEditSectionColor] = useState("");
const sectionSwatches = [
  "#0ea5e9", "#22d3ee", "#3b82f6", "#10b981", "#f97316",
  "#f59e42", "#eab308", "#a3e635", "#84cc16", "#f43f5e",
  "#a21caf", "#6366f1", "#64748b", "#334155", "#e5e7eb"
];
                    const [showSearchModal, setShowSearchModal] = useState(false);
                  const [showGallery, setShowGallery] = useState(false);
                const [showSectionPanel, setShowSectionPanel] = useState(true);
              const [accessMode, setAccessMode] = useState("home"); // "visitor" | "admin" | "home" | null
     const inlineFileInputRef = useRef(null);
     const fileInputRef = useRef(null);
                                      const [darkMode, setDarkMode] = useState(prefersDark);
    const [imageDrawerOpen, setImageDrawerOpen] = useState(false);
    // Ajout de tous les useState manquants pour les variables d'ID utilisées dans le code
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingSectionId, setEditingSectionId] = useState(null);
    // const [addingSubToCatId, setAddingSubToCatId] = useState(null); // Géré dans EditorPanel
    const [newImageCatId, setNewImageCatId] = useState(null);
    const [newImageSubId, setNewImageSubId] = useState(null);
    const [newImageDesc, setNewImageDesc] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [galleryUploadBusy, setGalleryUploadBusy] = useState(false);
    const [editingSubId, setEditingSubId] = useState(null);
  const [galleryFilterCatId, setGalleryFilterCatId] = useState(null);
  const [galleryFilterSectionId, setGalleryFilterSectionId] = useState(null);
  const [drawerSectionId, setDrawerSectionId] = useState(null);
  const [drawerCategoryId, setDrawerCategoryId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Tous les hooks doivent être déclarés ici, hors de tout objet/tableau/fonction !
  const [expandedSections, setExpandedSections] = useState({});
  const [data, setData] = useState({ sections, categories });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [insertPosition, setInsertPosition] = useState(null);
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
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ message: "" });
  const [isMobile, setIsMobile] = useState(false);
  // ...existing code...
  // const [newSubTitle, setNewSubTitle] = useState("");
  // const [newSubText, setNewSubText] = useState("");
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
  function SectionDraggable({ section, index, moveSection, draggingIndex, setDraggingIndex, insertPosition, setInsertPosition }) {
    const ref = useRef(null);
    const [isOver, setIsOver] = useState(false);
    // Gestion souris
    const isDragging = draggingIndex === index;
    // Ligne d'insertion visuelle
    const showInsertLine = insertPosition === index;
    const showInsertLineAfter = insertPosition === index + 1;

    // Fonctions manquantes
    const onDragStart = (e) => {
      setDraggingIndex(index);
        setData((d) => ({
          ...d,
          categories: d.categories.map((cat) =>
            cat.id === editingCategoryId
              ? { ...cat, name: editCatName, icon: editCatEmoji, sectionId: editCatSection, color: editCatColor }
              : cat
          ),
        }));
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index);
      if (e.dataTransfer.setDragImage) {
        e.dataTransfer.setDragImage(ref.current, 0, 0);
      }
    };
    const onDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const bounds = ref.current.getBoundingClientRect();
      const y = e.clientY - bounds.top;
      // Si la souris est dans la moitié supérieure, on insère avant, sinon après
      const pos = y < bounds.height / 2 ? index : index + 1;
      setInsertPosition(pos);
      setIsOver(true);
    };
    const onDragLeave = () => { setIsOver(false); setInsertPosition(null); };
    const onDrop = (e) => {
      e.preventDefault();
      setIsOver(false);
      const from = parseInt(e.dataTransfer.getData("text/plain"), 10);
      if (insertPosition !== null && from !== insertPosition && from + 1 !== insertPosition) {
        moveSection(from, insertPosition > from ? insertPosition - 1 : insertPosition);
      }
      setDraggingIndex(null);
      setInsertPosition(null);
    };
    const onDragEnd = () => { setDraggingIndex(null); setIsOver(false); setInsertPosition(null); };
    // Gestion tactile (mobile)
    let touchStartY = null;
    const onTouchStart = (e) => {
      setDraggingIndex(index);
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchStartY === null) return;
      const deltaY = e.touches[0].clientY - touchStartY;
      if (Math.abs(deltaY) > 30) {
        moveSection(index, deltaY > 0 ? index + 1 : index - 1);
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { setDraggingIndex(null); setIsOver(false); setInsertPosition(null); };

    return (
      <div ref={ref}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          opacity: isDragging ? 0.4 : 1,
          cursor: "grab",
          background: isDragging ? "linear-gradient(90deg,#3b82f6 0%,#10b981 100%)"
            : isOver ? "rgba(59,130,246,0.12)" : undefined,
          color: isDragging ? "white" : undefined,
          boxShadow: isDragging ? "0 0 12px 2px #10b98155" : isOver ? "0 0 0 2px #3b82f6" : undefined,
          zIndex: isDragging ? 10 : isOver ? 5 : 1,
          position: 'relative',
          transition: "background 0.2s, opacity 0.2s, color 0.2s, box-shadow 0.2s"
        }}
      >
        {showInsertLine && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            borderTop: '3px solid #10b981',
            zIndex: 20
          }} />
        )}
        <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: 8, backgroundColor: "inherit", color: "inherit", border: `1px solid #ccc`, position: 'relative' }}>
          <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: 8, cursor: "grab", userSelect: "none" }}>
            <span style={{ width: 16, height: 2, background: '#888', borderRadius: 2, margin: "1px 0" }}></span>
            <span style={{ width: 16, height: 2, background: '#888', borderRadius: 2, margin: "1px 0" }}></span>
            <span style={{ width: 16, height: 2, background: '#888', borderRadius: 2, margin: "1px 0" }}></span>
          </span>
          <span style={{ fontSize: 14, fontWeight: "500" }}>{section.emoji} {section.name}</span>
        </div>
        {showInsertLineAfter && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 0,
            borderTop: '3px solid #10b981',
            zIndex: 20
          }} />
        )}
      </div>
    );
  }

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

// Ajoute deux espaces à la fin de chaque ligne pour forcer le saut de ligne Markdown
function addMarkdownLineBreaks(text) {
  return typeof text === 'string' ? text.replace(/([^\s])\n/g, '$1  \n') : text;
}

function Markdown({ content }) {
  // Conversion Markdown :
  // 1. Les doubles retours à la ligne (\n\n) deviennent des paragraphes
  // 2. Les retours à la ligne simples (\n) deviennent des <br>
  // 3. On applique le parsing Markdown APRÈS la conversion <br>
  let raw = typeof content === 'string'
    ? content
        .replace(/\n{2,}/g, '<p></p>') // paragraphes
        .replace(/\n/g, '<br>')        // sauts de ligne
    : content;

  // Appliquer le parsing Markdown sur le texte déjà converti
  let html = raw;
  // ...existing parsing Markdown...
  // Amélioration du parsing Markdown pour gérer tous les cas imbriqués
  // ...existing code...

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
          ymap.set("data", { sections, categories });
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

  // Sauvegarde automatique sur Redis à chaque modification de data (temps réel)
  useEffect(() => {
    if (!data) return;
    if (accessMode === "visitor") return; // Ne sauvegarde rien en mode visiteur
    const save = async () => {
      try {
        await fetch("/api/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        setKvStatus("saved");
        setKvLastSaved(Date.now());
        setIsDirty(false);
        setIsExportDirty(true); // Marque l'export Git comme à faire
      } catch (err) {
        setKvStatus("error");
        setKvErrorMsg(err?.message || "Échec sauvegarde");
      }
    };
    save();
  }, [data, accessMode]);
  // Bouton principal Sauvegarder
  const handleMainSave = async () => {
    setKvStatus("saving");
    try {
      // 1. Sauvegarde sur Redis (pour garantir que la dernière modif est bien sur Redis)
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde");
      setKvStatus("saved");
      setKvLastSaved(Date.now());
      setIsDirty(false);
      // 2. Déclenche le workflow GitHub Actions via /api/publish
      const publishRes = await fetch("/api/publish", {
        method: "POST",
      });
      if (!publishRes.ok) {
        const body = await publishRes.json().catch(() => ({}));
        throw new Error(body?.error || "Publication GitHub Actions échouée");
      }
      setIsExportDirty(false); // Export fait
      showToast("Sauvegardé + publication envoyée");
    } catch (err) {
      setKvStatus("error");
      setKvErrorMsg(err?.message || "Échec sauvegarde");
      showToast("Échec sauvegarde");
    }
  };

  // Hydrate from KV persistence (single snapshot) + polling pour synchro temps réel
  useEffect(() => {
    if (accessMode === "visitor") {
      setData({ sections, categories });
      return;
    }
    let cancelled = false;
    let intervalId;
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
            setData({ sections, categories });
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
    intervalId = setInterval(load, 2000); // Polling toutes les 2 secondes
    return () => { cancelled = true; clearInterval(intervalId); };
  }, [accessMode]);

  // Marque les changements locaux comme non sauvegardés une fois la KV chargée.
  useEffect(() => {
    if (!kvReadyRef.current) return;
    setIsDirty(true);
  }, [data]);

  // ...garde ici les autres hooks d'état et refs UNIQUEMENT si pas déjà déclarés plus haut...

  // SECTION EDIT/DELETE HANDLERS
  const startEditSection = (section) => {
    setEditingSectionId(section.id);
    setEditSectionName(section.name);
    setEditSectionEmoji(section.emoji || "");
    setEditSectionColor(section.color || "#3b82f6");
  };

  const saveEditSection = () => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === editingSectionId
          ? { ...s, name: editSectionName, emoji: editSectionEmoji, color: editSectionColor }
          : s
      ),
    }));
    setEditingSectionId(null);
    setEditSectionName("");
    setEditSectionEmoji("");
    setEditSectionColor("");
    setIsDirty(true);
  };

  const cancelEditSection = () => {
    setEditingSectionId(null);
    setEditSectionName("");
    setEditSectionEmoji("");
    setEditSectionColor("");
  };

  const deleteSection = (sectionId) => {
    setConfirmModal({
      open: true,
      message: "Supprimer cette grande partie ? Toutes les catégories associées seront aussi supprimées.",
      onConfirm: () => {
        setData((prev) => ({
          ...prev,
          sections: prev.sections.filter((s) => s.id !== sectionId),
          categories: prev.categories.filter((c) => c.sectionId !== sectionId),
        }));
        setEditingSectionId(null);
        setEditSectionName("");
        setEditSectionEmoji("");
        setEditSectionColor("");
        setIsDirty(true);
        setConfirmModal({ open: false, message: "", onConfirm: null });
      },
    });
  };


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

    // Ajout d'un module (sous-catégorie) : logiques déplacées dans EditorPanel

    // Handler for gallery image file input
    // Nouvelle fonction d'upload : compression + upload ImgBB
    const onFileChange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setToast({ message: "Le fichier doit être une image." });
        return;
      }
      try {
        setGalleryUploadBusy(true);
        // Compression
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        // Upload ImgBB
        const apiKey = "e6becf18c2ca24aef7f37411409d42ac";
        const formData = new FormData();
        formData.append("image", compressedFile);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          setNewImageUrl(data.data.url); // URL publique ImgBB
        } else {
          setToast({ message: "Erreur upload ImgBB" });
        }
      } catch (err) {
        setToast({ message: "Erreur upload image : " + err.message });
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
      // setAddingSubToCatId(null); // supprimé, géré dans EditorPanel
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
    // Ne change le filtre que si on était déjà sur une catégorie
    if (selectedCategoryId !== null) setSelectedCategoryId(catId);
    setEditingSubId(sub.id);
    setEditTitle(sub.title);
    setEditText(sub.text);
    setEditColor(sub.color || "#e6eef8");
  };

  const saveEditSub = () => {
    if (!editTitle.trim()) { showToast("Le titre ne peut pas être vide"); return; }
    setData((d) => ({
      ...d,
      categories: d.categories.map((cat) => {
        // Si on est filtré, on ne touche qu'à la catégorie sélectionnée
        if (selectedCategoryId !== null) {
          return cat.id === selectedCategoryId
            ? { ...cat, subs: cat.subs.map((s) => s.id === editingSubId ? { ...s, title: editTitle, text: editText, color: editColor } : s) }
            : cat;
        } else {
          // Sinon, on cherche la catégorie qui contient le module à éditer
          if (cat.subs.some((s) => s.id === editingSubId)) {
            return { ...cat, subs: cat.subs.map((s) => s.id === editingSubId ? { ...s, title: editTitle, text: editText, color: editColor } : s) };
          } else {
            return cat;
          }
        }
      })
    }));
    // Ne touche pas au filtre, laisse l'affichage comme il était
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
    setShowSectionPanel(false); // Ferme la barre latérale
    setData({ sections, categories }); // Force les données locales
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
      setShowSectionPanel(false); // Ferme la barre latérale
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
              <button
                onClick={() => setDarkMode((d) => !d)}
                onWheel={(e) => {
                  e.preventDefault();
                  handleDarkModeWheel(e);
                }}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData("text/plain", "darkmode");
                  e.dataTransfer.effectAllowed = "none";
                  if (e.dataTransfer.setDragImage) {
                    const img = document.createElement('img');
                    img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                    img.width = img.height = 0;
                    e.dataTransfer.setDragImage(img, 0, 0);
                  }
                  e.currentTarget._dragStartY = e.clientY;
                }}
                onDragEnd={e => {
                  const startY = e.currentTarget._dragStartY;
                  if (typeof startY === "number" && e.clientY - startY > 300) {
                    setTimeout(() => {
                      setShowStaffLogin(true);
                      setPendingStaffPanel(true);
                    }, 100);
                  }
                  e.currentTarget._dragStartY = undefined;
                }}
                style={{ padding: "10px 16px", borderRadius: 12, backgroundColor: theme.panel, color: theme.text, border: `1px solid ${theme.border}`, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, userSelect: "none" }}
              >
                {darkMode ? <Emoji symbol="☀️" label="Mode clair" size={18} /> : <Emoji symbol="🌙" label="Mode sombre" size={18} />}
              </button>
              {/* Modale de connexion staff */}
              <StaffLoginModal
                open={showStaffLogin}
                onClose={() => { setShowStaffLogin(false); setPendingStaffPanel(false); }}
                onSuccess={({ prenom, code, mdp }) => {
                  setShowStaffLogin(false);
                  setPendingStaffPanel(false);
                  setStaffUser({ prenom });
                  setShowDevMode(true);
                }}
              />
              {/* Affichage du staff panel sur une page dédiée */}
              {showDevMode && <StaffPanelPage onClose={() => { setShowDevMode(false); setStaffUser(null); }} />}

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
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            transition: "padding-left 0.3s cubic-bezier(.4,2,.6,1)",
            paddingLeft: showSectionPanel && !isMobile ? layout.sideWidth : 0
          }}
        >
          {/* Bouton Ajouter une note désactivé temporairement */}
          {/* <button
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
          </button> */}

          {/* Modale de prise de note personnelle désactivée temporairement */}
          {/* <NoteModal
            open={showNoteModal}
            onClose={() => setShowNoteModal(false)}
            sections={data.sections}
            categories={data.categories}
            onSave={() => setShowNoteModal(false)}
          /> */}
          {/* Header natif supprimé, seul le composant Header reste */}

          {/* Header extrait dans un composant dédié */}
          <Header
            isMobile={isMobile}
            isAuthenticated={isAuthenticated}
            editMode={editMode}
            setEditMode={setEditMode}
            setShowSearchModal={setShowSearchModal}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            layout={layout}
            theme={theme}
            Emoji={Emoji}
            showSectionPanel={showSectionPanel}
            setShowSectionPanel={setShowSectionPanel}
            selectedSectionId={selectedSectionId}
            setSelectedSectionId={setSelectedSectionId}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            setSearch={setSearch}
            data={data}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            onHomeClick={() => setAccessMode('home')}
          />
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
            }}
          >
            <Sidebar
              show={showSectionPanel}
              onClose={() => setShowSectionPanel(false)}
              isAuthenticated={isAuthenticated}
              showEditSectionsPanel={showEditSectionsPanel}
              setShowEditSectionsPanel={setShowEditSectionsPanel}
              newSectionName={newSectionName}
              setNewSectionName={setNewSectionName}
              newSectionEmoji={newSectionEmoji}
              setNewSectionEmoji={setNewSectionEmoji}
              newSectionColor={newSectionColor}
              setNewSectionColor={setNewSectionColor}
              sectionSwatches={sectionSwatches}
              addSection={addSection}
              data={data}
              setData={setData}
              editingSectionId={editingSectionId}
              setEditingSectionId={setEditingSectionId}
              editSectionName={editSectionName}
              setEditSectionName={setEditSectionName}
              editSectionEmoji={editSectionEmoji}
              setEditSectionEmoji={setEditSectionEmoji}
              editSectionColor={editSectionColor}
              setEditSectionColor={setEditSectionColor}
              saveEditSection={saveEditSection}
              cancelEditSection={cancelEditSection}
              startEditSection={startEditSection}
              deleteSection={deleteSection}
              selectedSectionId={selectedSectionId}
              setSelectedSectionId={setSelectedSectionId}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              setSearch={setSearch}
              theme={theme}
              layout={layout}
              draggingIndex={draggingIndex}
              setDraggingIndex={setDraggingIndex}
              insertPosition={insertPosition}
              setInsertPosition={setInsertPosition}
            />

            <Gallery
              showGallery={showGallery}
              setShowGallery={setShowGallery}
              isAuthenticated={isAuthenticated}
              editMode={editMode}
              setEditMode={setEditMode}
              isAddingImage={isAddingImage}
              setIsAddingImage={setIsAddingImage}
              newImageCatId={newImageCatId}
              setNewImageCatId={setNewImageCatId}
              newImageSubId={newImageSubId}
              setNewImageSubId={setNewImageSubId}
              newImageDesc={newImageDesc}
              setNewImageDesc={setNewImageDesc}
              newImageUrl={newImageUrl}
              setNewImageUrl={setNewImageUrl}
              fileInputRef={fileInputRef}
              onFileChange={onFileChange}
              saveImage={saveImage}
              galleryUploadBusy={galleryUploadBusy}
              galleryCategories={galleryCategories}
              galleryFilterSectionId={galleryFilterSectionId}
              setGalleryFilterSectionId={setGalleryFilterSectionId}
              galleryFilterCatId={galleryFilterCatId}
              setGalleryFilterCatId={setGalleryFilterCatId}
              filteredGalleryImages={filteredGalleryImages}
              theme={theme}
              darkMode={darkMode}
              layout={layout}
              data={data}
              setSelectedCategoryId={setSelectedCategoryId}
              setExpandedCategories={setExpandedCategories}
              subRefs={subRefs}
            />

            <SearchModal
              open={showSearchModal}
              onClose={() => setShowSearchModal(false)}
              search={search}
              setSearch={setSearch}
              theme={theme}
            />

            <section style={{ flex: 1, overflow: "auto", padding: layout.contentPad }} ref={sectionScrollRef}>
              {/* Bouton flottant Sauvegarder (emoji) */}
              {/* Bouton Sauvegarder flottant : admin uniquement, plus petit, et seulement si isDirty */}
              {isAuthenticated && isExportDirty && (
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
              {/* Bloc édition centralisé */}

              <EditorPanel
                editMode={editMode}
                setEditMode={setEditMode}
                isAuthenticated={isAuthenticated}
                data={data}
                setData={setData}
                newCatTitle={newCatTitle}
                setNewCatTitle={setNewCatTitle}
                newCatEmoji={newCatEmoji}
                setNewCatEmoji={setNewCatEmoji}
                newCatColor={newCatColor}
                setNewCatColor={setNewCatColor}
                newCatSection={newCatSection}
                setNewCatSection={setNewCatSection}
                addCategory={addCategory}
                sections={data.sections}
                theme={theme}
                // Props pour édition de module
                editingSubId={editingSubId}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editText={editText}
                setEditText={setEditText}
                editColor={editColor}
                setEditColor={setEditColor}
                saveEditSub={saveEditSub}
                cancelEdit={cancelEdit}
                selectionInfo={selectionInfo}
                setSelectionInfo={setSelectionInfo}
                applyFormatting={applyFormatting}
                applyColorToSelection={applyColorToSelection}
                tableMenuOpen={tableMenuOpen}
                setTableMenuOpen={setTableMenuOpen}
                tableTemplates={tableTemplates}
                quickColors={quickColors}
                selectionCustomColor={selectionCustomColor}
                setSelectionCustomColor={setSelectionCustomColor}
                darkMode={darkMode}
                // Props pour ajout de module gérés dans EditorPanel
                handleTextSelect={handleTextSelect}
                insertTableTemplate={insertTableTemplate}
              />

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
                          {/* Flèches haut/bas supprimées */}
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
                                  {/* Zone d'édition Tiptap uniquement, textarea supprimé */}

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
                                <div className="note-viewer">
                                  <TiptapViewer html={sub.text} darkMode={darkMode} theme={theme} />
                                </div>
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

                        {/* Ajout module déplacé dans EditorPanel */}
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

      <LoginModal
        open={showLoginModal}
        onClose={() => { setShowLoginModal(false); setAdminPassword(""); setLoginError(""); }}
        onLogin={handleAdminLogin}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        loginError={loginError}
        darkMode={darkMode}
        theme={theme}
      />

      <ConfirmModal
        open={confirmModal.open}
        onClose={closeConfirm}
        onConfirm={acceptConfirm}
        message={confirmModal.message}
        darkMode={darkMode}
        theme={theme}
      />

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