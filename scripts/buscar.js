// buscar.js - Versión final con soporte Bootstrap y conexión a Google Sheet
const SHEET_URL = "https://opensheet.elk.sh/TU_ID/Hoja1"; // reemplaza con el link real de tu Google Sheet

document.getElementById("buscar-btn").addEventListener("click", async () => {
  const query = document.getElementById("busqueda").value.trim().toLowerCase();
  const resultadosDiv = document.getElementById("resultados");

  if (!query) {
    resultadosDiv.innerHTML = "<p class='text-warning'>Por favor, escribe un nombre o curso para buscar.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<div class='text-muted'>Buscando...</div>";

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
    const data = await response.json();

    const resultados = data.filter(entry => {
      const donante = entry["Donante"]?.toLowerCase() || "";
      const curso = entry["Curso/Familia"]?.toLowerCase() || "";
      return donante.includes(query) || curso.includes(query);
    });

    if (resultados.length === 0) {
      resultadosDiv.innerHTML = "<div class='alert alert-danger'>No se encontraron resultados para tu búsqueda.</div>";
      return;
    }

    resultadosDiv.innerHTML = resultados.map(r => `
      <div class="card mb-3 shadow-sm">
        <div class="card-header bg-primary text-white">
          <strong>${r["Donante"]}</strong> <span class="badge bg-light text-dark">${r["Tipo"]}</span>
        </div>
        <div class="card-body">
          <p class="mb-1"><strong>Filtro Nº:</strong> ${r["Filtro Nº"]}</p>
          <p class="mb-1"><strong>Familia Receptora:</strong> ${r["Familia Receptora"]}</p>
          <p class="mb-1"><strong>País:</strong> ${r["País"]}</p>
          <p class="mb-1"><strong>Fecha:</strong> ${r["Fecha"]}</p>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error al buscar:", error);
    resultadosDiv.innerHTML = "<div class='alert alert-danger'>Hubo un error al cargar los datos. Intenta nuevamente más tarde.</div>";
  }
});
