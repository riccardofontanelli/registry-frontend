// src/components/ListaStrumenti.jsx
import React from "react";

export default function ListaStrumenti({ strumenti, loading, onDelete }) {
  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Caricamento in corso...</p>;
  }

  if (strumenti.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
        Nessun strumento registrato al momento.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-2 transition-all duration-500">
      {strumenti.map((strumento) => (
        <li
          key={strumento.id}
          className="bg-white dark:bg-zinc-800 p-4 rounded shadow flex justify-between items-center animate-fade-in"
        >
          <span className="text-gray-900 dark:text-gray-200">
            {strumento.nome} – {strumento.laboratorio}
          </span>
          <button
            onClick={() => onDelete(strumento.id)}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
