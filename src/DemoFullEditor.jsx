import React from "react";
import FullEditorPage from "./modals/FullEditorPage";

export default function DemoFullEditor() {
  const [open, setOpen] = React.useState(true);
  // Ici tu passes les props nécessaires à EditorPanel via FullEditorPage
  return (
    <>
      <button onClick={() => setOpen(true)} style={{position:'fixed',top:20,right:20,zIndex:10000}}>Ouvrir éditeur complet</button>
      <FullEditorPage open={open} onClose={() => setOpen(false)} /* Ajoute ici les props de EditorPanel */ />
    </>
  );
}
