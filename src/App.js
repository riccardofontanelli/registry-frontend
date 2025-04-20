import { useEffect, useState } from "react";
import FormStrumento from "./components/FormStrumento";
import ListaStrumenti from "./components/ListaStrumenti";

export default function App() {
  const [strumenti, setStrumenti] = useState([]);
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

  const aggiungiStrumento = async (payload) => {
    try {
      await fetch("https://i-phoqs-registry.onrender.com/strumenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      fetchStrumenti();
    } catch (err) {
      console.error("Errore invio:", err);
    }
  };

  const handleDelete = async (id) => {
    const conferma = window.confirm("Sei sicuro di voler eliminare questo strumento?");
    if (!conferma) return;

     try {
      await fetch(`https://i-phoqs-registry.onrender.com/strumenti/${id}`, {
        method: "DELETE",
      });
      fetchStrumenti(); // Ricarica la lista aggiornata
    } catch (err) {
      console.error("Errore eliminazione:", err);
    }
  };   

  useEffect(() => {
    fetchStrumenti();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-6 font-sans">
      <header className="bg-white text-gray-900 py-6 rounded-xl shadow-md mb-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-center tracking-wide">
          Registro I-PHOQS
        </h1>
      </header>

      <div className="max-w-3xl mx-auto">
        <FormStrumento onAdd={aggiungiStrumento} />
        <ListaStrumenti strumenti={strumenti} loading={loading} onDelete={handleDelete} />
      </div>

      <footer className="mt-10 text-center text-sm text-gray-400 italic">
        Architectura Microservorum – Riccardus et ChatGPT me fecērunt
      </footer>
    </div>
  );
}