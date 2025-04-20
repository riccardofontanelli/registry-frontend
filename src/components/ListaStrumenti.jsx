export default function ListaStrumenti({ strumenti, loading }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
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
      </div>
    );
  }  