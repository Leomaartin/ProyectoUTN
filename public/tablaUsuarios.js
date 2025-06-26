document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-btn").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;

      if (confirm("¿Estás seguro de que querés borrar este usuario?")) {
        fetch(`/usuarios/${id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
          alertify.success(data.mensaje);
          boton.closest("tr").remove(); 
        })
        .catch(() => alertify.error("Error al borrar el usuario"));
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach(boton => {
    boton.addEventListener("click", () => {
      const fila = boton.closest("tr");
      const id = boton.dataset.id;

      const nombre = prompt("Nuevo nombre:", fila.children[1].textContent);
      const gmail = prompt("Nuevo Gmail:", fila.children[2].textContent);
      const contrasenia = prompt("Nueva contraseña:", fila.children[3].textContent);
      const documento = prompt("Nuevo documento:", fila.children[4].textContent);

      let nacimiento = prompt("Nueva fecha de nacimiento (formato DD-MM-YYYY):", fila.children[5].textContent);
      const fechaValida = /^\d{2}-\d{2}-\d{4}$/;
      if (!fechaValida.test(nacimiento)) {
        alertify.error("Fecha inválida. Debe tener el formato DD-MM-YYYY.");
        return;
      }
      let adminTexto = prompt("¿Es admin? (Si / No):", fila.children[6].textContent);
      if (!["Si", "No", "si", "no"].includes(adminTexto)) {
        alertify.error("Debés escribir 'Si' o 'No'.");
        return;
      }

      const admin = (adminTexto.toLowerCase() === "sí" || adminTexto.toLowerCase() === "si") ? 1 : 0;

      fetch('/usuarios', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, nombre, gmail, contrasenia, documento, nacimiento, admin })
      })
      .then(res => res.json())
      .then(data => {
        alertify.success(data.mensaje);
        fila.children[1].textContent = nombre;
        fila.children[2].textContent = gmail;
        fila.children[3].textContent = contrasenia;
        fila.children[4].textContent = documento;
        fila.children[5].textContent = nacimiento;
        fila.children[6].textContent = admin === 1 ? "Sí" : "No";
      })
      .catch(() => alertify.error("Error al editar el usuario"));
    });
  });
});
