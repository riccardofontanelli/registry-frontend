import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "i-phoqs") {
      localStorage.setItem("loggedIn", "true");
      onLogin();
    } else {
      alert("Credenziali errate");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 font-sans dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-800 p-8 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-full border rounded dark:bg-zinc-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full border rounded dark:bg-zinc-700 dark:text-white"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Accedi
        </button>
      </form>
    </div>
  );
}
