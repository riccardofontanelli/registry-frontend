import React from "react";

export default function ListaStrumenti({ strumenti, onDelete }) {
  if (strumenti.length === 0) {
    return <p className="text-gray-500 text-center">Nessun strumento registrato al momento.</p>;
  }

  return (
    <ul className="space-y-2">
      {strumenti.map((s) => (
        <li
          key={s.id}
          className="border p-3 rounded-md flex justify-between items-center hover:shadow-sm transition"
        >
          <div>
            <strong>{s.nome}</strong> – {s.laboratorio}
          </div>
          <button
            onClick={() => {
              if (window.confirm(`Eliminare "${s.nome}"?`)) {
                onDelete(s.id);
              }
            }}
            className="text-red-500 hover:text-red-700 transition text-lg font-bold"
            title="Elimina"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}