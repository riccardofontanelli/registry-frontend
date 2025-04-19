import { useEffect, useState } from "react";

export default function App() {
  const [strumenti, setStrumenti] = useState([]);
  const [nome, setNome] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStrumenti = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://i-phoqs-registry.onrender.com/strumenti");
      const data = await res.json();
      setStrumenti(data);
    } catch (err) {
      console.error("Errore nel caricamento:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStrumenti();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !laboratorio) return;
    try {
      await fetch("https://i-phoqs-registry.onrender.com/strumenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, laboratorio })
      });
      setNome("");
      setLaboratorio("");
      fetchStrumenti();
    } catch (err) {
      console.error("Errore invio:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6 font-sans">
      <header className="bg-white text-gray-900 py-6 rounded-xl shadow-md mb-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-center tracking-wider uppercase">Registro I-PHOQS</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 grid gap-4 md:grid-cols-3"
        >
          <input
            type="text"
            placeholder="Nome dello strumento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl col-span-1"
          />
          <input
            type="text"
            placeholder="Laboratorio"
            value={laboratorio}
            onChange={(e) => setLaboratorio(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl col-span-1"
          />
          <button
            type="submit"
            className="bg-white border border-gray-300 text-gray-800 font-medium py-3 rounded-xl shadow-sm hover:bg-gray-100 transition"
          >
            ➕ Aggiungi
          </button>
        </form>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Elenco strumenti</h2>
          {loading ? (
            <p className="text-gray-500 italic">Caricamento...</p>
          ) : (
            <ul className="space-y-4">
              {strumenti.map((s) => (
                <li
                  key={s.id}
                  className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="font-bold text-lg">{s.nome}</p>
                  <p className="text-gray-700">Laboratorio: {s.laboratorio}</p>
                  <p className="text-xs text-gray-400">ID: {s.id}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="mt-10 text-center text-sm text-gray-400 italic">
        Architectura Microservorum – Riccardus et ChatGPT me fecērunt
      </footer>
    </div>
  );
}