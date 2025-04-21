export function esportaCSV(strumenti) {
    if (!strumenti || strumenti.length === 0) return;
  
    const header = "ID,Nome,Laboratorio\n";
    const rows = strumenti.map(s => `${s.id},"${s.nome}","${s.laboratorio}"`).join("\n");
    const csv = header + rows;
  
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "strumenti-i-phoqs.csv";
    link.click();
  
    URL.revokeObjectURL(url);
  }