import { useState } from "react";

export default function FormStrumento({ onAdd }) {
  const [nome, setNome] = useState("");
  const [laboratorio, setLaboratorio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !laboratorio) return;
    await onAdd({ nome, laboratorio });
    setNome("");
    setLaboratorio("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 mb-8 grid gap-4"
    >
      <input
        type="text"
        placeholder="Nome dello strumento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="p-3 border border-gray-300 rounded-xl w-full"
      />
      <input
        type="text"
        placeholder="Laboratorio"
        value={laboratorio}
        onChange={(e) => setLaboratorio(e.target.value)}
        className="p-3 border border-gray-300 rounded-xl w-full"
      />
      <button
        type="submit"
        className="bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Aggiungi
      </button>
    </form>
  );
}