/**
 * Hook to simulate keyboard behavior for color pickers on mobile.
 * When picker is open, it triggers the same visual viewport behavior as the native keyboard,
 * allowing the toolbar to follow and scroll to remain functional.
 */

import { useEffect, useCallback, useRef } from 'react';

// Shared state for picker-as-keyboard simulation
let pickerOpenCount = 0;
let currentPickerHeight = 0;

/**
 * Get whether we're on a mobile device
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 600;
}

/**
 * Simulate keyboard open state for the picker
 * This adds classes and CSS variables that the toolbar positioning system uses
 */
function setPickerKeyboardState(isOpen, height = 280) {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  if (isOpen) {
    pickerOpenCount++;
    currentPickerHeight = height;
    html.classList.add('picker-keyboard-open');
    html.style.setProperty('--picker-keyboard-height', `${height}px`);
    
    // Dispatch custom event for toolbar positioning
    window.dispatchEvent(new CustomEvent('pickerKeyboardChange', { 
      detail: { open: true, height } 
    }));
  } else {
    pickerOpenCount = Math.max(0, pickerOpenCount - 1);
    if (pickerOpenCount === 0) {
      html.classList.remove('picker-keyboard-open');
      html.style.removeProperty('--picker-keyboard-height');
      currentPickerHeight = 0;
      
      window.dispatchEvent(new CustomEvent('pickerKeyboardChange', { 
        detail: { open: false, height: 0 } 
      }));
    }
  }
}

/**
 * Hook to register a picker as simulating keyboard behavior
 * @param {boolean} isOpen - Whether the picker is currently open
 * @param {number} height - Height of the picker (default 280px)
 */
export function useMobilePickerKeyboard(isOpen, height = 280) {
  const wasOpenRef = useRef(false);
  
  useEffect(() => {
    if (!isMobileDevice()) return;
    
    if (isOpen && !wasOpenRef.current) {
      setPickerKeyboardState(true, height);
      wasOpenRef.current = true;
    } else if (!isOpen && wasOpenRef.current) {
      setPickerKeyboardState(false);
      wasOpenRef.current = false;
    }
    
    return () => {
      if (wasOpenRef.current) {
        setPickerKeyboardState(false);
        wasOpenRef.current = false;
      }
    };
  }, [isOpen, height]);
}

/**
 * Hook to listen for picker keyboard state changes (for toolbar positioning)
 * @param {function} callback - Called with { open: boolean, height: number }
 */
export function usePickerKeyboardListener(callback) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handler = (e) => callback(e.detail);
    window.addEventListener('pickerKeyboardChange', handler);
    return () => window.removeEventListener('pickerKeyboardChange', handler);
  }, [callback]);
}

/**
 * Get current picker keyboard state
 */
export function getPickerKeyboardState() {
  return {
    open: pickerOpenCount > 0,
    height: currentPickerHeight
  };
}

export default useMobilePickerKeyboard;
