import React, { useRef } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

export default function TableEditorModal({ open, onClose, initialData, onSave }) {
  const hotRef = useRef();
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 600, minHeight: 300, boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
        <h2>Éditeur de tableau avancé</h2>
        <HotTable
          ref={hotRef}
          data={initialData || [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ]}
          colHeaders={true}
          rowHeaders={true}
          width="100%"
          height={260}
          stretchH="all"
          licenseKey="non-commercial-and-evaluation"
          manualColumnResize={true}
          manualRowResize={true}
          manualColumnMove={true}
          manualRowMove={true}
          contextMenu={true}
          mergeCells={true}
        />
        <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '7px 18px', borderRadius: 7, border: 'none', background: '#eee', color: '#23202d', fontWeight: 600 }}>Annuler</button>
          <button onClick={() => {
            const hot = hotRef.current.hotInstance;
            onSave(hot.getData());
            onClose();
          }} style={{ padding: '7px 18px', borderRadius: 7, border: 'none', background: '#f59e42', color: '#fff', fontWeight: 600 }}>Insérer</button>
        </div>
      </div>
    </div>
  );
}
