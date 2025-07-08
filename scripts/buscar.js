const SHEET_URL = "https://opensheet.elk.sh/TU_ID/Hoja1"; // reemplaza con tu link real

document.getElementById("buscar-btn").addEventListener("click", async () => {
  const query = document.getElementById("busqueda").value.toLowerCase();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "Cargando...";

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    const resultados = data.filter(entry => {
      return entry["Donante"].toLowerCase().includes(query) ||
             entry["Curso/Familia"].toLowerCase().includes(query);
    });

    if (resultados.length === 0) {
      resultadosDiv.innerHTML = "No se encontraron resultados.";
      return;
    }

    resultadosDiv.innerHTML = resultados.map(r => `
      <div class="resultado">
        <strong>Donante:</strong> ${r["Donante"]} (${r["Tipo"]})<br>
        <strong>Filtro Nº:</strong> ${r["Filtro Nº"]}<br>
        <strong>Familia Receptora:</strong> ${r["Familia Receptora"]}<br>
        <strong>País:</strong> ${r["País"]}<br>
        <strong>Fecha:</strong> ${r["Fecha"]}
      </div>
    `).join("");

  } catch (error) {
    resultadosDiv.innerHTML = "Error al cargar los datos.";
    console.error(error);
  }
});
