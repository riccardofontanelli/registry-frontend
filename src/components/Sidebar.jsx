// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onClose, isMobile }) => {
  const menuItems = [
    { label: "Dashboard", active: false },
    { label: "Registro strumenti", active: true },
    { label: "Catalogo dei Servizi I-PHOQS", active: false },
    { label: "Autenticazione", active: false },
    { label: "Statistiche", active: false },
    { label: "Esporta", active: false },
  ];

  const handleClick = (item) => {
    if (item.label === "Registro strumenti") {
      if (typeof onClose === "function") onClose();
    } else {
      alert("🚧 Funzionalità in arrivo...");
      if (typeof onClose === "function") onClose();
    }
  };

  return (
    <aside className="w-60 min-h-screen bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 p-4">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item)}
            className={`cursor-pointer p-3 rounded-lg text-sm font-medium transition 
              ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
      {isMobile && (
        <button
          onClick={onClose}
          className="mt-6 text-sm text-blue-500 underline"
        >
          Chiudi menu
        </button>
      )}
    </aside>
  );
};

export default Sidebar;