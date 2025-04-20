import React from 'react';

const Sidebar = ({ current }) => {
  const menuItems = [
    { label: "Dashboard", active: false },
    { label: "Registro strumenti", active: true },
    { label: "Catalogo dei Servizi I-PHOQS", active: false },
    { label: "Autenticazione", active: false },
    { label: "Statistiche", active: false },
    { label: "Esporta", active: false },
  ];

  const handleClick = (item) => {
    if (!item.active) {
      alert("🚧 Funzionalità in arrivo...");
    }
  };

  return (
    <aside className="w-60 min-h-screen bg-white border-r p-4 hidden md:block">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item)}
            className={`cursor-pointer p-3 rounded-lg text-sm font-medium transition 
              ${item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;