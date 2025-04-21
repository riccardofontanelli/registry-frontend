import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SidebarMobileToggle from "./components/SidebarMobileToggle";
import FormStrumento from "./components/FormStrumento";
import ListaStrumenti from "./components/ListaStrumenti";
import Login from "./pages/Login";

export default function App() {
  const [strumenti, setStrumenti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");

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

  useEffect(() => {
    fetchStrumenti();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen font-sans flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-900 dark:text-gray-100">
        <SidebarMobileToggle />
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-6 mt-16 md:mt-0">
          <header className="bg-white dark:bg-zinc-800 dark:text-white text-gray-900 py-6 rounded-xl shadow-md mb-10 border border-gray-200 dark:border-zinc-700 relative">
            <h1 className="text-4xl font-bold text-center tracking-wide">Registro I-PHOQS</h1>
            <div className="absolute top-4 right-4 flex gap-3">
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
            <FormStrumento onAdd={aggiungiStrumento} />
            <ListaStrumenti
              strumenti={strumenti}
              loading={loading}
              onDelete={handleDelete}
            />
          </div>

          <footer className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500 italic">
            Architectura Microservorum – Riccardus et ChatGPT me fecērunt
          </footer>
        </main>
      </div>
    </div>
  );
}
