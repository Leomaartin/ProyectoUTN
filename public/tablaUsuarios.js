document.querySelectorAll(".edit-btn").forEach(boton => {
  boton.addEventListener("click", () => {
    const fila = boton.closest("tr");
    const id = boton.dataset.id; 

    const nombre = prompt("Nuevo nombre:", fila.children[1].textContent);
    const gmail = prompt("Nuevo gmail:", fila.children[2].textContent);
    const documento = prompt("Nuevo documento:", fila.children[4].textContent);
    const nacimiento = prompt("Nueva fecha nacimiento (DD-MM-YYYY):", fila.children[5].textContent);
    const adminTexto = prompt("¿Es admin? (Si/No):", fila.children[6].textContent);
    const admin = (adminTexto.toLowerCase() === "si" || adminTexto.toLowerCase() === "sí") ? 1 : 0;


    fetch(`/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, gmail, documento, nacimiento, admin })
    })
    .then(res => res.json())
    .then(data => {
      alert("Usuario editado correctamente");

      fila.children[1].textContent = nombre;
      fila.children[2].textContent = gmail;
      fila.children[4].textContent = documento;
      fila.children[5].textContent = nacimiento;
      fila.children[6].textContent = admin ? "Sí" : "No";
    })
    .catch(err => {
      alert("Error al editar usuario");
      console.error(err);
    });
  });
});