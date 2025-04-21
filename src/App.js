import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SidebarMobileToggle from "./components/SidebarMobileToggle";
import FormStrumento from "./components/FormStrumento";
import ListaStrumenti from "./components/ListaStrumenti";
import Login from "./pages/Login";
import { esportaCSV } from "./utils/exportCSV";

export default function App() {
  const [strumenti, setStrumenti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const [view, setView] = useState("registro");
  const [query, setQuery] = useState("");

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
      await fetchStrumenti();
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

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  useEffect(() => {
    fetchStrumenti();
    const listener = () => setDarkMode((prev) => !prev);
    window.addEventListener("toggleDarkMode", listener);
    return () => window.removeEventListener("toggleDarkMode", listener);
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  const strumentiFiltrati = strumenti.filter(s =>
    s.nome.toLowerCase().includes(query.toLowerCase()) ||
    s.laboratorio.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen font-sans flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-900 dark:text-gray-100">
        <SidebarMobileToggle setView={setView} />
        <div className="hidden md:block">
          <Sidebar setView={setView} />
        </div>

        <main className="flex-1 p-6 mt-16 md:mt-0">
          <header className="bg-white dark:bg-zinc-800 dark:text-white text-gray-900 py-6 rounded-xl shadow-md mb-10 border border-gray-200 dark:border-zinc-700 relative">
            <h1 className="text-4xl font-bold text-center tracking-wide">Registro I-PHOQS</h1>
            <div className="absolute top-4 right-4 gap-3 hidden md:flex">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 rounded border border-red-400 bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Logout
              </button>
            </div>
          </header>

          <div className="max-w-3xl mx-auto">
            {view === "registro" && (
              <>
                <FormStrumento onAdd={aggiungiStrumento} />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-2">
                  <input
                    type="text"
                    placeholder="Cerca per nome o laboratorio..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-3 border border-gray-300 rounded-xl w-full md:w-3/4 dark:bg-zinc-700 dark:text-white"
                  />
                  <button
                    onClick={() => esportaCSV(strumentiFiltrati)}
                    className="py-3 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition w-full md:w-auto"
                  >
                    Esporta CSV
                  </button>
                </div>

                <ListaStrumenti
                  strumenti={strumentiFiltrati}
                  loading={loading}
                  onDelete={handleDelete}
                />
              </>
            )}

            {view === "catalogo" && (
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md text-gray-800 dark:text-gray-100">
                <h2 className="text-2xl font-bold mb-4">Catalogo dei Servizi I-PHOQS</h2>
                <p className="mb-6">
                  Qui comparirà l’elenco dei servizi dell’infrastruttura I-PHOQS:
                  accesso ai laboratori, assistenza tecnica, formazione, PoC, challenge...
                </p>
                <button
                  onClick={() => setView("registro")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Torna al registro strumenti
                </button>
              </div>
            )}
          </div>

          <footer className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500 italic">
            Architectura Microservorum – Riccardus et ChatGPT me fecērunt
          </footer>
        </main>
      </div>
    </div>
  );
}