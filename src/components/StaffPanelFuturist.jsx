import React, { useState, useEffect, useRef } from "react";
// Pour le QR code, on garde la logique existante
let QRCode;
try {
  QRCode = require("qrcode.react");
} catch (e) {
  QRCode = () => <div style={{color:'#ff0055',fontWeight:700}}>QR code indisponible</div>;
}

// Données de démo pour les modules (à remplacer par API plus tard)
import '../AppTiptap.css'; // pour s'assurer que le CSS mobile est chargé

const demoStats = {
  visitors: 12847,
  bandwidth: "48 GB",
  uptime: "99.8%",
  jobs: 124,
  quota: 72,
  requests: "2.4M",
  data: "48 GB",
  daysLeft: 18,
  unique: 12847,
  pageviews: 48392,
  avgTime: "4m 32s"
};
const demoCategories = [
  { name: "Maçon", value: 92 },
  { name: "Élec", value: 78 },
  { name: "Plomb", value: 85 },
  { name: "Charp", value: 68 },
  { name: "Peintr", value: 73 },
  { name: "Carrel", value: 62 },
  { name: "Menuisi", value: 81 }
];
const demoJobs = [
  { title: "Maçon - Fondations & Murs", views: 3247 },
  { title: "Électricien - Installation", views: 2891 },
  { title: "Plombier - Sanitaire", views: 2634 },
  { title: "Charpentier - Toiture", views: 2187 },
  { title: "Peintre - Finitions", views: 1942 }
];
const demoPhotos = [
  { name: "Chantier-maison-moderne.jpg", views: 8342, size: "2.4 MB", icon: "🏠", color: "#f093fb,#f5576c" },
  { name: "Outils-electricien.jpg", views: 6721, size: "1.8 MB", icon: "🔧", color: "#4facfe,#00f2fe" },
  { name: "Technique-macon.jpg", views: 5894, size: "3.1 MB", icon: "🛠️", color: "#43e97b,#38f9d7" },
  { name: "Plans-charpente.jpg", views: 4632, size: "2.7 MB", icon: "📐", color: "#fa709a,#fee140" }
];
const demoSecurity = [
  {
    icon: "⚠️",
    title: "Tentatives multiples - spam@bot.com",
    time: "28 tentatives en 5min • IP: 192.168.1.47",
    color: "#f56565,#ed8936",
    border: "#f56565"
  },
  {
    icon: "⚡",
    title: "Activité anormale - suspicious@mail.fr",
    time: "Download excessif • IP: 45.89.123.45",
    color: "#ed8936,#f6ad55",
    border: "#ed8936"
  },
  {
    icon: "✓",
    title: "Connexion réussie - admin@jeremyamz.xyz",
    time: "Il y a 12 minutes • IP: 85.12.47.92",
    color: "#48bb78,#38b2ac",
    border: "#48bb78"
  }
];

const navTabs = [
  { key: "dashboard", label: "📊 Vue d'ensemble" },
  { key: "analytics", label: "📈 Analytiques" },
  { key: "content", label: "📚 Contenu" },
  { key: "security", label: "🔒 Sécurité" },
  { key: "vercel", label: "☁️ Vercel Stats" }
];

export default function StaffPanelFuturist(props) {
  // Gestion staff (on garde la logique existante)
  const [localAccounts, setLocalAccounts] = useState(() => [
    {
      name: "1t3r0g4ti0n",
      avatar: "https://media.discordapp.net/attachments/1447974664579317818/1466183951331623256/image-CDPyvyJe5jasdGIzxpnp0.webp?ex=697bd1b6&is=697a8036&hm=4a7a81b9066499b2ab15d73482a2c0a8bb8a9f7a136a7e1f08aa1be12acd3c4a&=&format=webp&width=640&height=640"
    }
  ]);
  const accounts = props.accounts || localAccounts;
  const onAdd = props.onAdd || ((name, pwd) => setLocalAccounts(accs => [...accs, { name }]));
  const onDelete = props.onDelete || ((name) => setLocalAccounts(accs => accs.filter(acc => acc.name !== name)));
  const onShowQR = props.onShowQR || ((name) => setShowQRFor(name));
  const [showQRFor, setShowQRFor] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [addError, setAddError] = useState("");

  // Onglet actif
  const [activeTab, setActiveTab] = useState("dashboard");

  // Animation étoiles
  const starsRef = useRef();
  useEffect(() => {
    if (!starsRef.current) return;
    const starsContainer = starsRef.current;
    starsContainer.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 3 + "s";
      starsContainer.appendChild(star);
    }
  }, []);

  // Chart catégories animées
  const [chartVals, setChartVals] = useState(demoCategories.map(c => c.value));
  const randomizeChart = () => {
    setChartVals(chartVals.map(() => Math.floor(Math.random() * 75) + 50));
  };

  // Animation stats (rafraîchissement)
  const [stats, setStats] = useState(demoStats);
  const refreshStats = () => {
    setStats(s => ({
      ...s,
      visitors: s.visitors + Math.floor(Math.random() * 100),
      requests: s.requests,
      data: s.data,
      quota: Math.min(100, s.quota + Math.floor(Math.random() * 5)),
      daysLeft: Math.max(0, s.daysLeft - 1)
    }));
  };

  // Ajout staff
  const handleAdd = () => {
    if (!newName.trim() || !newPwd.trim()) {
      setAddError("Nom et mot de passe obligatoires");
      return;
    }
    onAdd(newName.trim(), newPwd.trim());
    setNewName("");
    setNewPwd("");
    setAddError("");
    setShowAdd(false);
  };

  // Animation auto stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(s => ({ ...s, visitors: s.visitors + Math.floor(Math.random() * 10) - 5 }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Actions rapides (alertes)
  const quickAction = (action) => {
    const messages = {
      content: '📚 Ouvrir gestion du contenu...',
      ban: '🚫 Bannir une adresse email...',
      logs: '📝 Affichage des logs système...',
      users: '👥 Liste des utilisateurs...',
      analytics: "📊 Rapport d'analytics détaillé...",
      backup: '💾 Lancement de la sauvegarde...',
      watch: '👁️ Ajouté à la surveillance...'
    };
    alert(messages[action] || 'Action en cours...');
  };

  // Animation stat card
  const animateStatCard = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotate(5deg) scale(1.1)';
    setTimeout(() => { card.style.transform = 'rotate(-5deg) scale(1.1)'; }, 100);
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 200);
  };

  // Gestion switch onglet
  const switchTab = (tab) => setActiveTab(tab);

  // Calcul pour le cercle de progression
  const circleRadius = 65;
  const circleCirc = 2 * Math.PI * circleRadius;
  const circleOffset = circleCirc * (1 - stats.quota / 100);

  // Animation d'apparition globale
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        color: '#fff',
        overflow: 'auto',
        position: 'relative',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1)'
      }}
    >
      {/* Etoiles animées */}
      <div className="stars" ref={starsRef} style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:0}}></div>
      <div className="container" style={{position:'relative',zIndex:1,maxWidth:1600,width:'100%',margin:'0 auto',padding:20,paddingBottom:60,height:'100%',boxSizing:'border-box',display:'flex',flexDirection:'column'}}>
        {/* Header profil (restauré, statique, intégré au flux) */}
        <div className="header" style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          position: 'relative',
          zIndex: 1
        }}>
          <div className="profile-pic">
            JA
          </div>
          <div className="profile-info">
            <div className="profile-name">Jeremy AMZ - Admin Panel</div>
            <div className="profile-role">
              🏗️ Manuel du Bâtiment
              <span className="status-badge status-online">● Site actif</span>
            </div>
            <div className="profile-stats">
              <div className="stat-item"><div className="stat-value">{stats.visitors.toLocaleString()}</div><div className="stat-label">Visiteurs/mois</div></div>
              <div className="stat-item"><div className="stat-value">{stats.bandwidth}</div><div className="stat-label">Bande passante</div></div>
              <div className="stat-item"><div className="stat-value">{stats.uptime}</div><div className="stat-label">Disponibilité</div></div>
              <div className="stat-item"><div className="stat-value">{stats.jobs}</div><div className="stat-label">Métiers référencés</div></div>
            </div>
          </div>
        </div>
        {/* Navigation onglets */}
        <div className="nav-tabs" style={{display:'flex',gap:15,marginBottom:30,flexWrap:'wrap'}}>
          {navTabs.map(tab => (
            <div key={tab.key} className={"nav-tab" + (activeTab===tab.key?' active':'')} style={{padding:'12px 25px',background:activeTab===tab.key?'linear-gradient(135deg,#667eea 0%,#764ba2 100%)':'rgba(255,255,255,0.05)',border:activeTab===tab.key?'none':'1px solid rgba(255,255,255,0.1)',borderRadius:10,cursor:'pointer',fontWeight:600,backdropFilter:'blur(10px)',transition:'all 0.3s'}} onClick={()=>switchTab(tab.key)}>{tab.label}</div>
          ))}
        </div>
        {/* Grille dashboard */}
        {activeTab==="dashboard" && (
        <div className="dashboard-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))',gap:25,flex:1,overflow:'auto',minHeight:0}}>
          {/* Module Vercel quota */}
          <div className="module" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>☁️</div>Vercel - Quota du Mois</div>
              <div className="module-actions" style={{display:'flex',gap:10}}>
                <button className="action-btn" style={{padding:'8px 15px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,cursor:'pointer',fontSize:12,color:'#fff'}} onClick={refreshStats}>🔄</button>
              </div>
            </div>
            <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:15}}>
              <div className="stat-card" onClick={animateStatCard}>
                <div className="stat-card-value" style={{fontSize:32,fontWeight:'bold',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:5}}>{stats.quota}%</div>
                <div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Bande passante</div>
              </div>
              <div className="stat-card" onClick={animateStatCard}>
                <div className="stat-card-value" style={{fontSize:32,fontWeight:'bold',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:5}}>{stats.requests}</div>
                <div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Requêtes</div>
              </div>
              <div className="stat-card" onClick={animateStatCard}>
                <div className="stat-card-value" style={{fontSize:32,fontWeight:'bold',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:5}}>{stats.data}</div>
                <div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Data utilisée</div>
              </div>
              <div className="stat-card" onClick={animateStatCard}>
                <div className="stat-card-value" style={{fontSize:32,fontWeight:'bold',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:5}}>{stats.daysLeft}</div>
                <div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Jours restants</div>
              </div>
            </div>
            <div className="progress-container" style={{marginTop:20}}>
              <div className="progress-label" style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14}}>
                <span>Quota mensuel</span>
                <span>{stats.quota}%</span>
              </div>
              <div className="progress-bar" style={{height:10,background:'rgba(255,255,255,0.1)',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <div className="progress-fill" style={{height:'100%',background:'linear-gradient(90deg,#667eea 0%,#764ba2 100%)',borderRadius:10,transition:'width 1s',width:`${stats.quota}%`,position:'relative',overflow:'hidden'}}></div>
              </div>
            </div>
          </div>
          {/* Module Catégories les plus vues */}
          <div className="module" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🏗️</div>Catégories Populaires</div>
              <div className="module-actions" style={{display:'flex',gap:10}}>
                <button className="action-btn" style={{padding:'8px 15px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,cursor:'pointer',fontSize:12,color:'#fff'}} onClick={randomizeChart}>📊</button>
              </div>
            </div>
            <div className="chart-container" style={{height:200,position:'relative',marginTop:15,display:'flex',alignItems:'flex-end',gap:15,justifyContent:'space-around'}}>
              {demoCategories.map((cat, i) => (
                <div key={cat.name} className="chart-bar" style={{width:40,background:'linear-gradient(to top,#667eea,#764ba2)',borderRadius:'5px 5px 0 0',position:'relative',cursor:'pointer',height:chartVals[i]*2}}>
                  <div className="chart-label" style={{position:'absolute',bottom:-25,left:'50%',transform:'translateX(-50%)',fontSize:11,color:'#a0aec0'}}>{cat.name}</div>
                  <div className="chart-value" style={{position:'absolute',top:-25,left:'50%',transform:'translateX(-50%)',fontSize:13,fontWeight:'bold',color:'#667eea'}}>{chartVals[i]}%</div>
                </div>
              ))}
            </div>
          </div>
          {/* Module Métiers les plus consultés */}
          <div className="module" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>👷</div>Top Métiers Consultés</div>
              <div className="module-actions"><span className="notification-badge" style={{background:'linear-gradient(135deg,#f56565 0%,#ed8936 100%)',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:'bold'}}>Top 10</span></div>
            </div>
            <div className="activity-list" style={{maxHeight:250,overflowY:'auto'}}>
              {demoJobs.map((job,i) => (
                <div key={job.title} className="activity-item" style={{display:'flex',alignItems:'center',gap:15,padding:12,background:'rgba(255,255,255,0.03)',borderRadius:10,marginBottom:10,cursor:'pointer'}}>
                  <div className="activity-icon" style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{i+1}</div>
                  <div className="activity-details" style={{flex:1}}>
                    <div className="activity-title" style={{fontSize:14,fontWeight:600,marginBottom:3}}>{job.title}</div>
                    <div className="activity-time" style={{fontSize:12,color:'#a0aec0'}}>{job.views.toLocaleString()} vues ce mois</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Module Trafic du site */}
          <div className="module" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📈</div>Trafic du Site</div>
            </div>
            <div className="circular-progress" style={{width:150,height:150,margin:'20px auto',position:'relative'}}>
              <svg width="150" height="150" style={{transform:'rotate(-90deg)'}}>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
                    <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <circle className="bg-circle" cx="75" cy="75" r={circleRadius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle className="progress-circle" cx="75" cy="75" r={circleRadius} fill="none" stroke="url(#gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circleCirc} strokeDashoffset={circleOffset} />
              </svg>
              <div className="circular-progress-text" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:32,fontWeight:'bold'}}>+28%</div>
            </div>
            <div className="progress-container">
              <div className="progress-label" style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14}}>
                <span>Visiteurs uniques</span>
                <span>{stats.unique.toLocaleString()}</span>
              </div>
              <div className="progress-bar" style={{height:10,background:'rgba(255,255,255,0.1)',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <div className="progress-fill" style={{height:'100%',background:'linear-gradient(90deg,#667eea 0%,#764ba2 100%)',borderRadius:10,transition:'width 1s',width:'84%',position:'relative',overflow:'hidden'}}></div>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-label" style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14}}>
                <span>Pages vues</span>
                <span>{stats.pageviews.toLocaleString()}</span>
              </div>
              <div className="progress-bar" style={{height:10,background:'rgba(255,255,255,0.1)',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <div className="progress-fill" style={{height:'100%',background:'linear-gradient(90deg,#667eea 0%,#764ba2 100%)',borderRadius:10,transition:'width 1s',width:'92%',position:'relative',overflow:'hidden'}}></div>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-label" style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14}}>
                <span>Durée moyenne</span>
                <span>{stats.avgTime}</span>
              </div>
              <div className="progress-bar" style={{height:10,background:'rgba(255,255,255,0.1)',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <div className="progress-fill" style={{height:'100%',background:'linear-gradient(90deg,#667eea 0%,#764ba2 100%)',borderRadius:10,transition:'width 1s',width:'76%',position:'relative',overflow:'hidden'}}></div>
              </div>
            </div>
          </div>
          {/* Module Photos les plus vues */}
          <div className="module" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📸</div>Photos Populaires</div>
              <div className="module-actions"><span className="notification-badge" style={{background:'linear-gradient(135deg,#f56565 0%,#ed8936 100%)',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:'bold'}}>+342</span></div>
            </div>
            <div className="user-list" style={{display:'flex',flexDirection:'column',gap:10}}>
              {demoPhotos.map(photo => (
                <div key={photo.name} className="user-item" style={{display:'flex',alignItems:'center',gap:15,padding:12,background:'rgba(255,255,255,0.03)',borderRadius:10,cursor:'pointer'}}>
                  <div className="user-avatar" style={{width:45,height:45,borderRadius:'50%',background:`linear-gradient(135deg,${photo.color})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',position:'relative'}}>{photo.icon}</div>
                  <div className="user-details" style={{flex:1}}>
                    <div className="user-name" style={{fontSize:14,fontWeight:600,marginBottom:3}}>{photo.name}</div>
                    <div className="user-role" style={{fontSize:12,color:'#a0aec0'}}>{photo.views.toLocaleString()} vues • {photo.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Module Sécurité & Logs */}
          <div className="module module-large" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)',gridColumn:'span 2'}}>
            <div className="module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="module-title" style={{fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',gap:10}}><div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🔒</div>Sécurité & Activité Suspecte</div>
              <div className="module-actions" style={{display:'flex',gap:10}}>
                <span className="notification-badge" style={{background:'linear-gradient(135deg,#f56565 0%,#ed8936 100%)',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:'bold'}}>3</span>
                <button className="action-btn" style={{padding:'8px 15px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,cursor:'pointer',fontSize:12,color:'#fff'}} onClick={()=>quickAction('logs')}>📝 Logs</button>
              </div>
            </div>
            <div className="activity-list" style={{maxHeight:200,overflowY:'auto'}}>
              {demoSecurity.map((item,i) => (
                <div key={item.title} className="activity-item" style={{display:'flex',alignItems:'center',gap:15,padding:12,background:'rgba(255,255,255,0.03)',borderRadius:10,marginBottom:10,cursor:'pointer',borderLeft:`3px solid ${item.border}`}}>
                  <div className="activity-icon" style={{width:40,height:40,borderRadius:'50%',background:`linear-gradient(135deg,${item.color})`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{item.icon}</div>
                  <div className="activity-details" style={{flex:1}}>
                    <div className="activity-title" style={{fontSize:14,fontWeight:600,marginBottom:3}}>{item.title}</div>
                    <div className="activity-time" style={{fontSize:12,color:'#a0aec0'}}>{item.time}</div>
                  </div>
                  {i<2 && <button className="action-btn" style={{padding:'8px 15px',background:i===0?'rgba(245,101,101,0.2)':'rgba(237,137,54,0.2)',border:'1px solid '+item.border,borderRadius:8,cursor:'pointer',fontSize:12,color:'#fff'}} onClick={()=>quickAction(i===0?'ban':'watch')}>{i===0?'🚫 Bannir':'👁️ Surveiller'}</button>}
                </div>
              ))}
            </div>
            <div className="stats-grid" style={{marginTop:20,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:15}}>
              <div className="stat-card"><div className="stat-card-value" style={{color:'#f56565',fontSize:32,fontWeight:'bold'}}>12</div><div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>IP bannies</div></div>
              <div className="stat-card"><div className="stat-card-value" style={{color:'#ed8936',fontSize:32,fontWeight:'bold'}}>47</div><div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Tentatives bloquées</div></div>
              <div className="stat-card"><div className="stat-card-value" style={{color:'#48bb78',fontSize:32,fontWeight:'bold'}}>99.2%</div><div className="stat-card-label" style={{fontSize:13,color:'#a0aec0'}}>Taux de sécurité</div></div>
            </div>
          </div>
          {/* Module Actions Administration */}
          <div className="module module-large" style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:15,padding:25,boxShadow:'0 4px 16px rgba(0,0,0,0.2)',gridColumn:'span 2'}}>
            <div className="module-header" style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div className="module-icon" style={{width:35,height:35,background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>⚡</div>
              <div className="module-title" style={{fontSize:22,fontWeight:'bold'}}>Actions Administration</div>
            </div>
            <div className="admin-actions-grid" style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
              gap: '28px',
              marginTop: 18,
              marginBottom: 8,
              justifyItems: 'center',
              alignItems: 'center',
            }}>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('content')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>📚</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Gérer Contenu</div>
              </div>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('ban')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>🚫</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Bannir Email</div>
              </div>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('logs')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>📝</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Consulter Logs</div>
              </div>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('users')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>👥</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Utilisateurs</div>
              </div>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('analytics')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>📊</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Analytics</div>
              </div>
              <div className="admin-action-card" style={{background:'rgba(255,255,255,0.07)',borderRadius:18,padding:'32px 0 18px 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:120,minWidth:180,cursor:'pointer',transition:'box-shadow 0.22s,transform 0.18s',boxShadow:'0 2px 8px #0001'}} onClick={()=>quickAction('backup')}>
                <div style={{fontSize:38,marginBottom:10,opacity:0.7}}>💾</div>
                <div style={{fontSize:18,fontWeight:500,opacity:0.8}}>Backup</div>
              </div>
            </div>
          </div>
        </div>
        )}
        {/* Bloc staff panel (optionnel, onglet ou module à part) */}
        {/* ... Tu peux intégrer ici la gestion staff (QR, ajout, suppression) dans un module ou onglet séparé ... */}
      </div>
      {/* Styles étoiles animées */}
      <style>{`
                                          /* Effet visuel sur chaque carte d'action admin */
                                          .admin-action-card {
                                            transition: box-shadow 0.22s, transform 0.18s, background 0.22s, filter 0.22s;
                                          }
                                          .admin-action-card:hover, .admin-action-card:focus {
                                            box-shadow: 0 8px 32px #00f0ff33, 0 2px 8px #764ba233;
                                            transform: scale(1.035);
                                            background: rgba(102,126,234,0.13);
                                            filter: brightness(1.08) saturate(1.12);
                                          }
                                          .admin-action-card:active {
                                            transform: scale(0.98);
                                            filter: brightness(0.98) saturate(0.95);
                                          }
                                  .dashboard-grid, .container {
                                    overflow: visible !important;
                                  }
                          /* Le header a un z-index faible pour ne pas couper les modules */
                          .header { z-index: 1 !important; position: relative; }
                          .module:hover, .module:focus-within { z-index: 10 !important; position: relative; }
                        /* Les modules passent au-dessus du header au hover */
                        .module:hover, .module:focus-within {
                          z-index: 20 !important;
                          position: relative;
                        }
                /* header statique, plus aucune position sticky/fixed */
                .profile-pic {
                  width: 120px;
                  height: 120px;
                  border-radius: 50%;
                  background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 48px;
                  font-weight: bold;
                  border: 4px solid rgba(255,255,255,0.2);
                  position: relative;
                }
                .profile-info { flex: 1; }
                .profile-name {
                  font-size: 32px;
                  font-weight: bold;
                  background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  margin-bottom: 10px;
                }
                .profile-role {
                  font-size: 18px;
                  color: #a0aec0;
                  margin-bottom: 15px;
                }
                .status-badge.status-online {
                  margin-left: 12px;
                  display: inline-block;
                  padding: 5px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: 600;
                  background: rgba(72,187,120,0.2);
                  border: 1px solid rgba(72,187,120,0.5);
                  color: #48bb78;
                }
                .profile-stats {
                  display: flex;
                  gap: 30px;
                  flex-wrap: wrap;
                }
                .stat-item {}
                .stat-value {
                  font-size: 28px;
                  font-weight: bold;
                  color: #667eea;
                }
                .stat-label {
                  font-size: 12px;
                  color: #a0aec0;
                  text-transform: uppercase;
                }
        html, body, #root {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          overflow-x: hidden !important;
          overflow-y: auto;
        }
        .container {
          overflow-x: hidden !important;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        /* Apparition fade-in/slide-in du dashboard */
        .dashboard-appear {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1);
        }
        .dashboard-appear.show {
          opacity: 1;
          transform: translateY(0);
        }
        /* Effets hover/actif sur cartes et modules (effet centré, sans décalage ni rotation) */
        .stat-card, .module, .chart-bar {
          transition: box-shadow 0.32s cubic-bezier(.4,2,.6,1), transform 0.32s cubic-bezier(.4,2,.6,1), background 0.22s, filter 0.22s;
        }
        .module:hover, .module:focus {
          box-shadow: 0 8px 32px 0 #0002, 0 1.5px 8px 0 #00f0ff22;
          background: rgba(255,255,255,0.09);
          transform: scale(1.018);
          filter: brightness(1.04) saturate(1.06);
        }
        .stat-card:hover, .stat-card:focus, .chart-bar:hover, .chart-bar:focus {
          box-shadow: 0 8px 32px #00f0ff33, 0 2px 8px #764ba233;
          transform: scale(1.035);
          background: rgba(102,126,234,0.13);
          filter: brightness(1.08) saturate(1.12);
        }
        .stat-card:active, .module:active, .chart-bar:active {
          transform: scale(0.98);
          filter: brightness(0.98) saturate(0.95);
        }
        /* Effets sur boutons */
        button, .nav-tab {
          transition: box-shadow 0.22s, transform 0.18s, background 0.22s, color 0.18s;
        }
        .nav-tab, button {
          box-shadow: 0 1px 4px #764ba211;
        }
        .nav-tab:hover, button:hover, .nav-tab:focus, button:focus {
          box-shadow: 0 8px 32px #00f0ff33, 0 2px 8px #764ba233;
          transform: scale(1.035);
          background: rgba(102,126,234,0.13);
          filter: brightness(1.08) saturate(1.12);
          color: #fff;
        }
        .nav-tab:active, button:active {
          transform: scale(0.98);
          filter: brightness(0.98) saturate(0.95);
        }
        .nav-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
        }
        @media (max-width: 768px) {
          .header { flex-direction: column !important; text-align: center; }
          .profile-stats { justify-content: center !important; }
          .dashboard-grid { grid-template-columns: 1fr !important; }
          .nav-tabs { overflow-x: auto; flex-wrap: nowrap !important; }
        }
        .module-large { grid-column: span 2; }
        @media (max-width: 1200px) { .module-large { grid-column: span 1; } }
      `}</style>
    </div>
  );
}
