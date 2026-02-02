import React, { useRef, useState } from "react";
import { FaHighlighter } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";

// Modal universel pour le spiral color picker
export function SpiralColorPickerModal({
  value,
  onChange,
  theme,
  trigger,
  triggerStyle,
  effect = 'popSlideGrow',
  position = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  pickerKey = 'default',
  defaultColor = '#fff',
  showTextPicker,
  showHighlightPicker,
  activePicker,
  setActivePicker,
}) {
  // Favoris indépendants pour chaque picker (texte/surligneur)
  const getFavoritesKey = (type) => 'spiralFavorites_' + type;
  const [favoriteColorsText, setFavoriteColorsText] = useState(() => {
    try {
      const saved = localStorage.getItem(getFavoritesKey('text'));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favoriteColorsHighlight, setFavoriteColorsHighlight] = useState(() => {
    try {
      const saved = localStorage.getItem(getFavoritesKey('highlight'));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Utilitaire pour obtenir/mettre à jour la bonne liste selon le bloc
  const getFavorites = (type) => type === 'text' ? favoriteColorsText : favoriteColorsHighlight;
  const setFavorites = (type, arr) => {
    if (type === 'text') setFavoriteColorsText(arr);
    else setFavoriteColorsHighlight(arr);
    try {
      localStorage.setItem(getFavoritesKey(type), JSON.stringify(arr));
    } catch {}
  };

  // Utilitaire pour normaliser la couleur en hex minuscule
  function normalizeColor(col) {
    if (!col) return '';
    if (typeof col === 'string' && col[0] === '#') return col.toLowerCase();
    if (/^rgb\s*\(/i.test(col)) {
      const nums = col.match(/\d+/g);
      if (nums && nums.length >= 3) {
        return (
          '#' +
          nums.slice(0, 3)
            .map(x => {
              const hex = parseInt(x).toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
        ).toLowerCase();
      }
    }
    return col.toString().toLowerCase();
  }

  // Animation de switch
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchDirection, setSwitchDirection] = useState('right');

  function handleChange(color) {
    if (window.event) {
      window.event.stopPropagation();
    }
    onChange && onChange(color);
  }

  const bothOpen = showTextPicker && showHighlightPicker;
  const isText = pickerKey === 'text';
  const isHighlight = pickerKey === 'highlight';
  const handleSwitch = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    setSwitchDirection(activePicker === 'text' ? 'right' : 'left');
    setTimeout(() => {
      if (setActivePicker) {
        setActivePicker(activePicker === 'text' ? 'highlight' : 'text');
      }
      setIsSwitching(false);
    }, 420);
  };

  return (
    <div
      id={`spiral-modal-content-${pickerKey}`}
      style={{
        display: bothOpen ? 'flex' : 'block',
        flexDirection: bothOpen ? 'row' : 'column',
        alignItems: 'center',
        gap: bothOpen ? 0 : 8,
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,0,0,0)',
        boxShadow: 'none',
        border: 'none',
        padding: 0,
        minWidth: bothOpen ? 480 : 220,
        minHeight: 220,
        marginTop: 0,
        overflow: 'visible',
        perspective: bothOpen ? 1200 : undefined,
      }}
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      <style>{`
        .spiral-swipe { transition: transform 0.42s cubic-bezier(.7,1.8,.22,1), box-shadow 0.3s, opacity 0.42s; will-change: transform, opacity; }
        .spiral-swipe.active { z-index: 2; box-shadow: 0 0 24px #fbbf2488, 0 2px 8px #7c3aed88; }
        .spiral-swipe.mirror { filter: brightness(0.92) contrast(1.08) grayscale(0.12) blur(0.5px); opacity: 0.92; transform: scaleX(-1) translateX(24px) rotateY(6deg) scale(0.8); }
        .spiral-swipe:not(.active) { opacity: 0.7; filter: blur(0.5px) grayscale(0.18); }
        .spiral-swipe-switch-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fbbf24; color: #271d44; border: none; border-radius: 50%; width: 38px; height: 38px; font-size: 22px; box-shadow: 0 2px 8px #0004; cursor: pointer; z-index: 10; transition: background 0.18s, color 0.18s; }
        .spiral-swipe-switch-btn:hover { background: #f59e42; color: #fff; }
        .spiral-anim-left { animation: spiralSwitchLeft 0.42s cubic-bezier(.7,1.8,.22,1); }
        .spiral-anim-right { animation: spiralSwitchRight 0.42s cubic-bezier(.7,1.8,.22,1); }
        @keyframes spiralSwitchLeft {
          0% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; }
          49% { z-index: 2; }
          50% { transform: translateX(-240px) scale(0.85) rotateY(-30deg); opacity: 0.2; z-index: 1; }
          100% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; z-index: 2; }
        }
        @keyframes spiralSwitchRight {
          0% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; }
          49% { z-index: 2; }
          50% { transform: translateX(240px) scale(0.85) rotateY(30deg); opacity: 0.2; z-index: 1; }
          100% { transform: translateX(0) scale(1) rotateY(0deg); opacity: 1; z-index: 2; }
        }
      `}</style>
      {bothOpen ? (
        <>
          {(() => {
            const activeIsText = activePicker === 'text';
            return (
              <>
                {/* Picker avant-plan (actif) */}
                <div
                  className={`spiral-swipe active ${isSwitching ? (switchDirection === 'right' ? 'spiral-anim-left' : '') : ''}`}
                  style={{
                    width: 240,
                    minHeight: 240,
                    marginRight: -18,
                    pointerEvents: 'auto',
                    background: activeIsText
                      ? 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)'
                      : 'linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)',
                    borderRadius: 18,
                    boxShadow: !activeIsText
                      ? '0 24px 64px 0 #7c3aed88, 0 8px 32px #fbbf2488, 0 0 0 4px #7c3aed88 inset'
                      : '0 16px 48px 0 #fbbf2488, 0 4px 24px #7c3aedcc',
                    border: '2.5px solid #f59e42',
                    padding: 18,
                    position: 'relative',
                    transform: activeIsText
                      ? 'rotateY(-18deg) scale(1.04) translateZ(24px)'
                      : 'rotateY(-18deg) scale(1.04) translateZ(24px)',
                    filter: activeIsText
                      ? 'blur(0.5px) saturate(1.08)'
                      : 'blur(0.5px) saturate(1.08)',
                    zIndex: 2,
                    transition: 'transform 0.42s cubic-bezier(.7,1.8,.22,1), box-shadow 0.3s, filter 0.3s',
                    backdropFilter: activeIsText ? 'blur(8px) brightness(1.08)' : 'blur(8px) brightness(1.08)',
                  }}
                  onClick={() => setActivePicker && (activeIsText ? setActivePicker('text') : setActivePicker('highlight'))}
                >
                  <div style={{ position: 'absolute', top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
                    {activeIsText ? (
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? '#fbbf24' : '#fff',
                          fontWeight: 900,
                          fontSize: 22,
                          cursor: 'pointer',
                          padding: 0,
                          lineHeight: 1,
                          textShadow: '0 1px 2px #0008',
                          borderBottom: value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? '2.5px solid #fbbf24' : 'none',
                          borderRadius: 2,
                          transition: 'border-bottom 0.18s, color 0.18s',
                        }}
                        title={value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? 'Retirer la couleur du texte' : 'Aucune couleur'}
                        onClick={e => { e.stopPropagation(); onChange && onChange('none'); }}
                        onMouseDown={e => e.stopPropagation()}
                      >A</button>
                    ) : (
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: value && value !== '#fbbf24' && value !== 'none' ? '#fbbf24' : '#fff',
                          fontWeight: 900,
                          fontSize: 22,
                          cursor: 'pointer',
                          padding: 0,
                          lineHeight: 1,
                          textShadow: '0 1px 2px #0008',
                          borderBottom: value && value !== '#fbbf24' && value !== 'none' ? '2.5px solid #fbbf24' : 'none',
                          borderRadius: 2,
                          transition: 'border-bottom 0.18s, color 0.18s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title={value && value !== '#fbbf24' && value !== 'none' ? 'Retirer le surlignement' : 'Aucun surlignement'}
                        onClick={e => { e.stopPropagation(); onChange && onChange('none'); }}
                        onMouseDown={e => e.stopPropagation()}
                      ><FaHighlighter style={{ fontSize: 20, color: value && value !== '#fbbf24' && value !== 'none' ? '#fbbf24' : '#fff', verticalAlign: 'middle', filter: 'drop-shadow(0 1px 2px #0008)' }} /></button>
                    )}
                  </div>
                  <SpiralColorPicker value={value} onChange={handleChange} theme={theme} />
                  {(activeIsText ? isText : isHighlight) && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, margin: '18px 0 0 0', width: '100%', justifyContent: 'center' }}>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: getFavorites(activeIsText ? 'text' : 'highlight').includes(value) ? theme?.accent1 || '#fbbf24' : '#fff',
                          fontSize: 22,
                          cursor: 'pointer',
                          transition: 'color 0.18s, transform 0.18s',
                          marginBottom: 0,
                        }}
                        title={getFavorites(activeIsText ? 'text' : 'highlight').includes(value) ? 'Retirer des favoris' : 'Enregistrer en favori'}
                        onClick={() => toggleFavorite(value, activeIsText ? 'text' : 'highlight')}
                        onMouseDown={e => e.stopPropagation()}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {getFavorites(activeIsText ? 'text' : 'highlight').includes(value) ? '★' : '☆'}
                      </button>
                      <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
                        <div style={{
                          width: 160,
                          minHeight: 24,
                          overflowX: 'auto',
                          overflowY: 'hidden',
                          display: 'block',
                          whiteSpace: 'nowrap',
                          padding: '2px 0 14px 0',
                          margin: '0 auto',
                          boxSizing: 'border-box',
                          scrollbarGutter: 'stable',
                        }}>
                          {getFavorites(activeIsText ? 'text' : 'highlight').length === 0 && (
                            <span style={{ color: '#888', fontSize: 13 }}>Aucun favori</span>
                          )}
                          {getFavorites(activeIsText ? 'text' : 'highlight').map(c => (
                            <button
                              key={c}
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 2,
                                background: c,
                                border: value === c ? '2px solid #fff' : '1px solid #888',
                                margin: 2,
                                cursor: 'pointer',
                                boxShadow: value === c ? '0 0 0 2px #fff, 0 0 8px #f59e42' : 'none',
                                transition: 'box-shadow 0.18s, transform 0.18s',
                                display: 'inline-block',
                                padding: 0,
                                boxSizing: 'border-box',
                              }}
                              title={`Favori ${c}`}
                              onClick={() => handleChange(c)}
                              onMouseDown={e => e.stopPropagation()}
                              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Picker inactif à droite/arrière-plan */}
                <div
                  className={`spiral-swipe mirror ${isSwitching ? (switchDirection === 'right' ? 'spiral-anim-right' : switchDirection === 'left' ? 'spiral-anim-left' : '') : ''}`}
                  style={{
                    width: 210,
                    minHeight: 130,
                    height: 'auto',
                    marginLeft: -23,
                    pointerEvents: isSwitching ? 'none' : 'auto',
                    background: !activeIsText
                      ? 'linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)'
                      : 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)',
                    borderRadius: 18,
                    boxShadow: !activeIsText
                      ? '0 24px 64px 0 #7c3aed88, 0 8px 32px #fbbf2488, 0 0 0 4px #7c3aed88 inset'
                      : '0 16px 48px 0 #fbbf2488, 0 4px 24px #7c3aedcc',
                    border: '2.5px solid #f59e42',
                    padding: '22px 12px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    transform: !activeIsText
                      ? 'rotateY(-22deg) scale(0.92) translateZ(2px) translateX(12px) translateY(12px)'
                      : 'rotateY(-22deg) scale(0.92) translateZ(2px) translateX(12px) translateY(12px)',
                    opacity: 0.98,
                    filter: 'blur(1.5px)',
                    zIndex: 1,
                    transition: 'transform 0.42s cubic-bezier(.7,1.8,.22,1), box-shadow 0.3s, filter 0.3s',
                    backdropFilter: 'none',
                    overflow: 'visible',
                  }}
                  onClick={() => {
                    if (!isSwitching) handleSwitch();
                  }}
                >
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 0, marginBottom: 0 }}>
                    <div style={{ position: 'absolute', top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
                      {activeIsText ? (
                        <FaHighlighter style={{ fontSize: 20, color: '#fbbf24', filter: 'drop-shadow(0 1px 2px #0008)' }} title="Surligneur" />
                      ) : (
                        <MdFormatColorText style={{ fontSize: 22, color: '#fbbf24', filter: 'drop-shadow(0 1px 2px #0008)' }} title="Texte" />
                      )}
                    </div>
                    {/* Picker identique, mais 50px plus petit que l'avant-plan */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto', marginBottom: 10 }}>
                      <SpiralColorPicker
                        value={value}
                        onChange={handleChange}
                        theme={theme}
                        smallSize={170}
                      />
                    </div>
                    {(!activeIsText ? isHighlight : isText) && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, margin: '18px 0 0 0', width: '100%', justifyContent: 'center' }}>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            color: getFavorites(activeIsText ? 'highlight' : 'text').includes(value) ? theme?.accent1 || '#fbbf24' : '#fff',
                            fontSize: 22,
                            cursor: 'pointer',
                            transition: 'color 0.18s, transform 0.18s',
                            marginBottom: 0,
                          }}
                          title={getFavorites(activeIsText ? 'highlight' : 'text').includes(value) ? 'Retirer des favoris' : 'Enregistrer en favori'}
                          onClick={() => toggleFavorite(value, activeIsText ? 'highlight' : 'text')}
                          onMouseDown={e => e.stopPropagation()}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          {getFavorites(activeIsText ? 'highlight' : 'text').includes(value) ? '★' : '☆'}
                        </button>
                        <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
                          <div style={{
                            width: 155,
                            minHeight: 24,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            padding: '2px 0 14px 0',
                            margin: '0 auto',
                            boxSizing: 'border-box',
                            scrollbarGutter: 'stable',
                          }}>
                            {getFavorites(activeIsText ? 'highlight' : 'text').length === 0 && (
                              <span style={{ color: '#888', fontSize: 13 }}>Aucun favori</span>
                            )}
                            {getFavorites(activeIsText ? 'highlight' : 'text').map(c => (
                              <button
                                key={c}
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 2,
                                  background: c,
                                  border: value === c ? '2px solid #fff' : '1px solid #888',
                                  margin: 2,
                                  cursor: 'pointer',
                                  boxShadow: value === c ? '0 0 0 2px #fff, 0 0 8px #f59e42' : 'none',
                                  transition: 'box-shadow 0.18s, transform 0.18s',
                                  display: 'inline-block',
                                  padding: 0,
                                  boxSizing: 'border-box',
                                }}
                                title={`Favori ${c}`}
                                onClick={() => handleChange(c)}
                                onMouseDown={e => e.stopPropagation()}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </>
      ) : (
        <div
          style={{
            width: 240,
            minHeight: 240,
            background: pickerKey === 'text'
              ? 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)'
              : 'linear-gradient(120deg, #241c3a 0%, #3a2a5c 60%, #271d44 100%)',
            borderRadius: 18,
            boxShadow: pickerKey === 'text'
              ? '0 12px 48px 0 #000b, 0 2px 16px #7c3aedcc'
              : '0 8px 32px 0 #0008, 0 2px 8px #7c3aed88',
            border: '2.5px solid #f59e42',
            padding: 18,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 2,
            filter: pickerKey === 'text' ? 'blur(0.5px) saturate(1.08)' : 'blur(0.2px) saturate(1)',
            backdropFilter: pickerKey === 'text' ? 'blur(12px) brightness(1.10)' : 'blur(3px)',
            overflow: 'visible',
          }}
        >
          <div style={{ position: 'absolute', top: 8, right: 12, zIndex: 5, opacity: 0.92 }}>
            {pickerKey === 'text' ? (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? '#fbbf24' : '#fff',
                  fontWeight: 900,
                  fontSize: 22,
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                  textShadow: '0 1px 2px #0008',
                  borderBottom: value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? '2.5px solid #fbbf24' : 'none',
                  borderRadius: 2,
                  transition: 'border-bottom 0.18s, color 0.18s',
                }}
                title={value && value !== '#fff' && value !== '#ffffff' && value !== 'none' ? 'Retirer la couleur du texte' : 'Aucune couleur'}
                onClick={e => { e.stopPropagation(); onChange && onChange('none'); }}
                onMouseDown={e => e.stopPropagation()}
              >A</button>
            ) : (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: value && value !== '#fbbf24' && value !== 'none' ? '#fbbf24' : '#fff',
                  fontWeight: 900,
                  fontSize: 22,
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                  textShadow: '0 1px 2px #0008',
                  borderBottom: value && value !== '#fbbf24' && value !== 'none' ? '2.5px solid #fbbf24' : 'none',
                  borderRadius: 2,
                  transition: 'border-bottom 0.18s, color 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={value && value !== '#fbbf24' && value !== 'none' ? 'Retirer le surlignement' : 'Aucun surlignement'}
                onClick={e => { e.stopPropagation(); onChange && onChange('none'); }}
                onMouseDown={e => e.stopPropagation()}
              ><FaHighlighter style={{ fontSize: 20, color: value && value !== '#fbbf24' && value !== 'none' ? '#fbbf24' : '#fff', verticalAlign: 'middle', filter: 'drop-shadow(0 1px 2px #0008)' }} /></button>
            )}
          </div>
          <SpiralColorPicker value={value} onChange={handleChange} theme={theme} />
          <div style={{display:'none'}} onMouseDown={e => e.stopPropagation()} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, margin: '18px 0 0 0', width: '100%', justifyContent: 'center' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: getFavorites(pickerKey).includes(value) ? theme?.accent1 || '#fbbf24' : '#fff',
                fontSize: 22,
                cursor: 'pointer',
                transition: 'color 0.18s, transform 0.18s',
                marginBottom: 0,
              }}
              title={getFavorites(pickerKey).includes(value) ? 'Retirer des favoris' : 'Enregistrer en favori'}
              onClick={() => toggleFavorite(value, pickerKey)}
              onMouseDown={e => e.stopPropagation()}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {getFavorites(pickerKey).includes(value) ? '★' : '☆'}
            </button>
            <div className="favorites-scroll-x" style={{ marginTop: 0 }}>
              <div style={{
                width: 160,
                minHeight: 24,
                overflowX: 'auto',
                overflowY: 'hidden',
                display: 'block',
                whiteSpace: 'nowrap',
                padding: '2px 0 14px 0',
                margin: '0 auto',
                boxSizing: 'border-box',
                scrollbarGutter: 'stable',
              }}>
                {getFavorites(pickerKey).length === 0 && (
                  <span style={{ color: '#888', fontSize: 13 }}>Aucun favori</span>
                )}
                {getFavorites(pickerKey).map(c => (
                  <button
                    key={c}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 2,
                      background: c,
                      border: value === c ? '2px solid #fff' : '1px solid #888',
                      margin: 2,
                      cursor: 'pointer',
                      boxShadow: value === c ? '0 0 0 2px #fff, 0 0 8px #f59e42' : 'none',
                      transition: 'box-shadow 0.18s, transform 0.18s',
                      display: 'inline-block',
                      padding: 0,
                      boxSizing: 'border-box',
                    }}
                    title={`Favori ${c}`}
                    onClick={() => handleChange(c)}
                    onMouseDown={e => e.stopPropagation()}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.18)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Utilitaire pour convertir RGB en hex
function rgbToHex(r, g, b) {
	return (
		"#" +
		[r, g, b]
			.map(x => {
				const hex = x.toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			})
			.join("")
	);
}

export default function SpiralColorPicker({ value, onChange, theme, small, smallSize }) {
  // Permet d'afficher une version réduite si prop small ou smallSize
  const isSmall = !!small || !!smallSize;
  const size = smallSize ? smallSize : (small ? 90 : 180);
  const canvasSize = smallSize ? Math.round(smallSize * 0.55) : (small ? 60 : 110);
  const previewSize = smallSize ? Math.round(smallSize * 0.14) : (small ? 13 : 22);
  const fontSize = smallSize ? Math.round(smallSize * 0.07) : (small ? 9 : 13);
  const canvasRef = useRef(null);
  const [rgb, setRgb] = useState([20, 100, 204]);
  const [cursorPos, setCursorPos] = useState({ x: canvasSize / 2, y: canvasSize / 2 });

  // Animation du curseur
  const [cursorGlow, setCursorGlow] = useState(0);
  React.useEffect(() => {
    let frame;
    function animate() {
      setCursorGlow(g => (g + 1) % 60);
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Dessine la spirale colorée sur le canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    // Spirale colorée (plus épaisse)
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 7;
    ctx.save();
    ctx.lineCap = "round";
    for (let a = 0; a < 360 * 3; a += 2) {
      const rad = (a * Math.PI) / 180;
      const r = radius * (a / (360 * 3));
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = `hsl(${a % 360}, 90%, 55%)`;
      ctx.shadowColor = `hsl(${a % 360}, 90%, 70%)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    // Curseur lumineux animé qui suit la souris, couleur réelle sous la souris
    // Calcul couleur sous la souris
    const cxCur = cursorPos.x;
    const cyCur = cursorPos.y;
    const dx = cxCur - cx;
    const dy = cyCur - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hCur = ((angle + 360) % 360);
    const sCur = Math.min(100, Math.max(40, dist / (w / 2) * 100));
    const lCur = 55;
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbCur = hslToRgb(hCur, sCur, lCur);
    const colorCur = `rgb(${rgbCur[0]},${rgbCur[1]},${rgbCur[2]})`;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cursorPos.x, cursorPos.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = colorCur;
    ctx.shadowColor = colorCur;
    ctx.shadowBlur = 18 + 8 * Math.abs(Math.sin(cursorGlow * Math.PI / 30));
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.closePath();
    ctx.restore();
  }, [rgb, cursorGlow, cursorPos, value]);

  // Gestion du clic sur la spirale
  function handleCanvasClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Convertir angle/dist en couleur
    const hClick = ((angle + 360) % 360);
    const sClick = Math.min(100, Math.max(40, dist / (rect.width / 2) * 100));
    const lClick = 55;
    // hsl -> rgb
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbVal = hslToRgb(hClick, sClick, lClick);
    setRgb(rgbVal);
    onChange(rgbToHex(...rgbVal));
  }

  // Curseur suit la souris et couleur preview
  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hMove = ((angle + 360) % 360);
    const sMove = Math.min(100, Math.max(40, dist / (rect.width / 2) * 100));
    const lMove = 55;
    function hslToRgb(hh, ss, ll) {
      ss /= 100;
      ll /= 100;
      const k = n => (n + hh / 30) % 12;
      const a = ss * Math.min(ll, 1 - ll);
      const f = n =>
        ll - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
      return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }
    const rgbVal = hslToRgb(hMove, sMove, lMove);
    setRgb(rgbVal);
  }

  // Gestion des sliders RGB
  function handleRgbChange(idx, val) {
    const newRgb = [...rgb];
    newRgb[idx] = Math.max(0, Math.min(255, Number(val)));
    setRgb(newRgb);
    onChange(rgbToHex(...newRgb));
  }

  return (
    <div style={{
      background: theme?.bg || 'linear-gradient(120deg, #271d44 0%, #3a2a5c 60%, #241c3a 100%)',
      borderRadius: isSmall ? 10 : 14,
      boxShadow: theme?.shadow || '0 4px 18px rgba(0,0,0,0.10)',
      padding: isSmall ? 6 : 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: isSmall ? size : 180,
      gap: isSmall ? 4 : 8,
      transform: isSmall ? undefined : 'scale(0.05) translateY(220px) translateX(-80px)',
      animation: isSmall ? undefined : 'popSlideGrow 1.6s cubic-bezier(.18,1.8,.22,1) forwards',
      overflow: 'visible',
    }}>
      {!isSmall && <style>{`
        @keyframes popSlideGrow {
          0% { transform: scale(0.05) translateY(220px) translateX(-80px); opacity: 0; }
          50% { transform: scale(1.2) translateY(-10px) translateX(10px); opacity: 1; }
          70% { transform: scale(0.9) translateY(5px) translateX(-5px); }
          100% { transform: scale(1) translateY(0) translateX(0); }
        }
      `}</style>}
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ borderRadius: isSmall ? 8 : 12, cursor: 'pointer', boxShadow: '0 0 16px #7c3aed88' }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseDown={e => e.stopPropagation()}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? 4 : 8 }}>
        <div style={{ width: previewSize, height: previewSize, borderRadius: '50%', background: rgbToHex(...rgb), boxShadow: '0 0 8px #fff8', border: '2.5px solid #fff' }} />
        <span
          style={{ color: theme?.text || '#fff', fontWeight: 600, fontSize: fontSize, padding: isSmall ? '1px 3px' : '2px 6px', borderRadius: 6, background: 'rgba(30,30,60,0.7)', cursor: 'pointer' }}
          title="Sélectionner cette couleur"
          onClick={() => onChange && onChange(rgbToHex(...rgb))}
        >
          {rgbToHex(...rgb)}
        </span>
      </div>
    </div>
  );
}
