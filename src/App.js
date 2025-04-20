import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SidebarMobileToggle from "./components/SidebarMobileToggle";
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

  const aggiungiStrumento = async ({ nome, laboratorio }) => {
    try {
      await fetch("https://i-phoqs-registry.onrender.com/strumenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, laboratorio })
      });
      await fetchStrumenti(); // <-- mettiamo anche await, meglio!
    } catch (err) {
      console.error("Errore invio:", err);
    }
  };
  
  const handleDelete = async (id) => {
    const confirm = window.confirm("Confermi la cancellazione dello strumento?");
    if (!confirm) return;
    try {
      await fetch(`https://i-phoqs-registry.onrender.com/strumenti/${id}`, {
        method: "DELETE"
      });
      fetchStrumenti();
    } catch (err) {
      console.error("Errore cancellazione:", err);
    }
  };

  useEffect(() => {
    fetchStrumenti();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 font-sans flex flex-col md:flex-row">
      <SidebarMobileToggle />
      <Sidebar className="hidden md:block" />
      <main className="flex-1 p-6 mt-16 md:mt-0">
        <header className="bg-white text-gray-900 py-6 rounded-xl shadow-md mb-10 border border-gray-200">
          <h1 className="text-4xl font-bold text-center tracking-wide">Registro I-PHOQS</h1>
        </header>
  
        <div className="max-w-3xl mx-auto">
          <FormStrumento onAdd={aggiungiStrumento} />
          <ListaStrumenti strumenti={strumenti} loading={loading} onDelete={handleDelete} />
        </div>
  
        <footer className="mt-10 text-center text-sm text-gray-400 italic">
          Architectura Microservorum – Riccardus et ChatGPT me fecērunt
        </footer>
      </main>
    </div>
  );
}