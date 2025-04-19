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
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-6 font-sans">
      <header className="bg-white text-gray-900 py-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-wide">
          Registro I-PHOQS
        </h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 grid gap-4"
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

        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Elenco strumenti</h2>
          {loading ? (
            <p>Caricamento...</p>
          ) : (
            <ul className="space-y-2">
              {strumenti.map((s) => (
                <li key={s.id} className="border p-3 rounded-md">
                  <strong>{s.nome}</strong> – {s.laboratorio}
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-10 text-center text-sm text-gray-400 italic">
          Architectura Microservorum – Riccardus et ChatGPT me fecērunt
        </footer>
      </main>
    </div>
  );
}