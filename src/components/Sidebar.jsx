// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onClose, isMobile, setView }) => {
  const menuItems = [
    { label: "Registro strumenti", view: "registro", active: true },
    { label: "Catalogo dei Servizi I-PHOQS", view: "catalogo", active: false },
    { label: "Autenticazione", view: null },
    { label: "Statistiche", view: null },
    { label: "Esporta", view: null },
  ];

  const handleClick = (item) => {
    if (item.view) {
      setView(item.view);
    } else {
      alert("🚧 Funzionalità in arrivo...");
    }

    if (typeof onClose === "function") onClose();
  };

  return (
    <aside className="w-60 min-h-screen bg-white dark:bg-zinc-800 border-r dark:border-zinc-700 p-4">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item)}
            className={`cursor-pointer p-3 rounded-lg text-sm font-medium transition 
              ${item.active
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {isMobile && (
        <div className="mt-8 space-y-2">
          <button
            onClick={() => {
              const event = new CustomEvent("toggleDarkMode");
              window.dispatchEvent(event);
            }}
            className="w-full py-2 bg-gray-100 dark:bg-zinc-700 text-sm rounded hover:bg-gray-200 dark:hover:bg-zinc-600 transition"
          >
            🌗 Cambia tema
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("loggedIn");
              window.location.reload();
            }}
            className="w-full py-2 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
