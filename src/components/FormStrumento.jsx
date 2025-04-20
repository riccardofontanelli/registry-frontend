import { useState } from "react";

export default function FormStrumento({ onAdd }) {
  const [nome, setNome] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !laboratorio) return;

    try {
      await onAdd({ nome, laboratorio });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      setNome("");
      setLaboratorio("");
    } catch (err) {
      console.error(err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 grid gap-4">
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
        className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 hover:scale-105 transition"
      >
        Aggiungi
      </button>

      {success && <p className="text-green-600 text-sm">✅ Strumento aggiunto con successo!</p>}
      {error && <p className="text-red-600 text-sm">❌ Errore durante l'inserimento.</p>}
    </form>
  );
}
