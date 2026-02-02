import { useState, useEffect } from 'react';

// Breakpoints standards
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
};

// Hook personnalisé pour détection responsive
export function useResponsive() {
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < breakpoints.sm,
    isTablet: window.innerWidth >= breakpoints.sm && window.innerWidth < breakpoints.lg,
    isDesktop: window.innerWidth >= breakpoints.lg,
    isLargeScreen: window.innerWidth >= breakpoints.xl,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreen({
        width,
        height,
        isMobile: width < breakpoints.sm,
        isTablet: width >= breakpoints.sm && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        isLargeScreen: width >= breakpoints.xl,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screen;
}

// Tailles de texte adaptatives
export function getResponsiveTextSize(baseSize, screen) {
  if (screen.isMobile) return baseSize * 0.85;
  if (screen.isTablet) return baseSize * 0.95;
  if (screen.isLargeScreen) return baseSize * 1.1;
  return baseSize;
}

// Dimensions modales adaptatives
export function getModalSize(type, screen) {
  const sizes = {
    small: {
      mobile: { width: '95%', maxWidth: 400 },
      tablet: { width: '80%', maxWidth: 500 },
      desktop: { width: '50%', maxWidth: 600 },
    },
    medium: {
      mobile: { width: '95%', maxWidth: 500 },
      tablet: { width: '85%', maxWidth: 700 },
      desktop: { width: '60%', maxWidth: 900 },
    },
    large: {
      mobile: { width: '98%', maxWidth: '100%' },
      tablet: { width: '90%', maxWidth: 1000 },
      desktop: { width: '80%', maxWidth: 1400 },
    },
    fullEditor: {
      mobile: { width: '100%', height: '100%' },
      tablet: { width: '95%', height: '90%' },
      desktop: { width: '90%', height: '85%', maxWidth: 1600 },
    }
  };

  if (screen.isMobile) return sizes[type]?.mobile || sizes.medium.mobile;
  if (screen.isTablet) return sizes[type]?.tablet || sizes.medium.tablet;
  return sizes[type]?.desktop || sizes.medium.desktop;
}

// Padding/marges adaptatifs
export function getResponsiveSpacing(baseSpacing, screen) {
  if (screen.isMobile) return baseSpacing * 0.6;
  if (screen.isTablet) return baseSpacing * 0.8;
  return baseSpacing;
}

// Styles de boutons adaptatifs
export function getResponsiveButtonStyle(screen) {
  return {
    padding: screen.isMobile ? '8px 12px' : screen.isTablet ? '10px 16px' : '12px 20px',
    fontSize: screen.isMobile ? 14 : screen.isTablet ? 15 : 16,
    borderRadius: screen.isMobile ? 8 : 10,
  };
}

// Grid adaptatif (colonnes)
export function getResponsiveColumns(screen) {
  if (screen.isMobile) return 1;
  if (screen.isTablet) return 2;
  if (screen.isLargeScreen) return 4;
  return 3;
}

// Tailles d'icônes adaptatives
export function getResponsiveIconSize(baseSize, screen) {
  if (screen.isMobile) return baseSize * 0.8;
  if (screen.isTablet) return baseSize * 0.9;
  return baseSize;
}

// Helper pour media queries CSS-in-JS
export function mediaQuery(breakpoint) {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
}

// Générateur de styles responsive pour conteneurs
export function getResponsiveContainer(screen, customOptions = {}) {
  const defaults = {
    padding: getResponsiveSpacing(32, screen),
    borderRadius: screen.isMobile ? 12 : 16,
    maxWidth: screen.isMobile ? '100%' : screen.isTablet ? 900 : 1400,
    margin: screen.isMobile ? '8px' : '16px auto',
  };
  
  return { ...defaults, ...customOptions };
}

// Export d'un objet complet
export const responsive = {
  breakpoints,
  useResponsive,
  getResponsiveTextSize,
  getModalSize,
  getResponsiveSpacing,
  getResponsiveButtonStyle,
  getResponsiveColumns,
  getResponsiveIconSize,
  mediaQuery,
  getResponsiveContainer,
};

export default responsive;
