// src/components/LoginForm.jsx
import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "iphqs2025") {
      localStorage.setItem("loggedIn", "true");  // <<< questo è il fix
      onLogin();
    } else {
      setErrore(true);
      setTimeout(() => setErrore(false), 3000);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 font-sans p-6">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center dark:text-white">Login I-PHOQS</h2>
        <input
          type="text"
          placeholder="Username"
          className="p-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Entra
        </button>
        {errore && <p className="text-sm text-red-500 text-center">Credenziali errate</p>}
      </form>
    </div>
  );
}