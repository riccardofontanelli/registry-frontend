// src/components/SidebarMobileToggle.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarMobileToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barra superiore (visibile solo su mobile) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-zinc-800 shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold dark:text-white">Registro I-PHOQS</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 dark:text-gray-200 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar a comparsa */}
      {open && (
        <div className="md:hidden fixed top-0 left-0 h-full w-60 bg-white dark:bg-zinc-800 border-r dark:border-gray-700 p-4 shadow-lg z-50">
          <Sidebar onClose={() => setOpen(false)} isMobile />
        </div>
      )}
    </>
  );
}