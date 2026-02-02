import React from 'react';
import { useResponsive, getModalSize, getResponsiveSpacing } from '../../utils/responsive';

/**
 * Modal responsive universelle
 * S'adapte automatiquement à la taille de l'écran
 */
export default function ResponsiveModal({ 
  isOpen, 
  onClose, 
  children, 
  size = 'medium', // 'small', 'medium', 'large', 'fullEditor'
  title,
  theme,
  showCloseButton = true,
  className = '',
  style = {}
}) {
  const screen = useResponsive();
  const modalSize = getModalSize(size, screen);
  const padding = getResponsiveSpacing(24, screen);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        padding: screen.isMobile ? 8 : 16,
      }}
      onClick={onClose}
    >
      <div
        className={className}
        style={{
          background: theme?.panel || '#1a1625',
          color: theme?.text || '#fff',
          borderRadius: screen.isMobile ? 12 : 16,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...modalSize,
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec titre et bouton fermer */}
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${padding}px ${padding}px ${padding / 2}px`,
            borderBottom: `1px solid ${theme?.border || 'rgba(255, 255, 255, 0.1)'}`,
          }}>
            {title && (
              <h2 style={{
                margin: 0,
                fontSize: screen.isMobile ? 18 : screen.isTablet ? 20 : 24,
                fontWeight: 700,
                color: theme?.accent1 || '#f59e42',
              }}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme?.text || '#fff',
                  fontSize: screen.isMobile ? 24 : 28,
                  cursor: 'pointer',
                  padding: 4,
                  lineHeight: 1,
                }}
                aria-label="Fermer"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Contenu */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
