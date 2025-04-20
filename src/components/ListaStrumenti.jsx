import React from 'react';

const ListaStrumenti = ({ strumenti, onDelete }) => {
  if (strumenti.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        Nessun strumento registrato al momento.
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {strumenti.map((strumento) => (
        <li key={strumento.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <span>{strumento.nome} - {strumento.laboratorio}</span>
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
};

export default ListaStrumenti;