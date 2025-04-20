// src/components/SidebarMobileToggle.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarMobileToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold">Registro I-PHOQS</h1>
        <button onClick={() => setOpen(!open)} className="text-gray-600 text-2xl">
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed top-14 left-0 h-full w-60 bg-white border-r p-4 shadow-lg z-40">
          <Sidebar isMobile onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}