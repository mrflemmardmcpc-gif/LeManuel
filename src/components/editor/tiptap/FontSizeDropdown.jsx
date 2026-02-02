import React, { useState, useRef, useEffect } from 'react';

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64];

export default function FontSizeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 10 }}>
      <button
        type="button"
        style={{
          width: 22,
          height: 22,
          background: 'none',
          color: '#fff',
          border: 'none',
          fontWeight: 700,
          fontSize: 13,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          borderRadius: 0,
          boxSizing: 'border-box',
          transition: 'color 0.15s',
          outline: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {value}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '110%',
            transform: 'translateX(-50%)',
            background: '#2c2346',
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            padding: '4px 0',
            zIndex: 100,
            minWidth: 40,
          }}
        >
          {FONT_SIZES.map((size) => (
            <div
              key={size}
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                padding: '4px 12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: value === size ? '#3a2e5a' : 'none',
              }}
              onClick={() => {
                onChange(size);
                setOpen(false);
              }}
            >
              {size}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
