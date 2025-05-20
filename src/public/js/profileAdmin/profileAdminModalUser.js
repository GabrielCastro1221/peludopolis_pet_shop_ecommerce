const modal = document.getElementById("modal");
const viewButtons = document.querySelectorAll(".view__button");
const closeButton = document.querySelector(".close");
const deleteButton = document.querySelector(".delete__btn");
const adminButton = document.querySelector(".admin__btn");
const userButton = document.querySelector(".user__btn");
let selectedUserId = null;
const token = localStorage.getItem("authToken");

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedUserId = button.getAttribute("data-id");
    if (!selectedUserId) {
      console.error(
        "No se pudo obtener el ID del usuario desde el botón 'Ver'."
      );
    }
    modal.style.display = "flex";
  });
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

deleteButton.addEventListener("click", async () => {
  if (!selectedUserId) {
    Toastify({
      text: "No se encontró el ID del usuario seleccionado.",
      duration: 3000,
      gravity: "top",
      position: "center",
      background: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/v1/users/${selectedUserId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          Toastify({
            text: `Usuario eliminado: ${data.usuario.name}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

          modal.style.display = "none";
          location.reload();
        } else {
          Toastify({
            text: `Error: ${data.message}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #FF5F6D, #FFC371)",
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Error: ${error.message}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          background: "linear-gradient(to right, #FF5F6D, #FFC371)",
        }).showToast();
      }
    }
  });
});

adminButton.addEventListener("click", async () => {
  if (!selectedUserId) {
    Toastify({
      text: "No se encontró el ID del usuario seleccionado.",
      duration: 3000,
      gravity: "top",
      position: "center",
      background: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  }

  Swal.fire({
    title: "¿Cambiar rol?",
    text: "El rol del usuario será cambiado.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cambiar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/v1/users/admin/${selectedUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          Toastify({
            text: `Rol cambiado a: ${data.role}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

          modal.style.display = "none";
          location.reload();
        } else {
          Toastify({
            text: `Error: ${data.message}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #FF5F6D, #FFC371)",
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Error: ${error.message}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          background: "linear-gradient(to right, #FF5F6D, #FFC371)",
        }).showToast();
      }
    }
  });
});

userButton.addEventListener("click", async () => {
  if (!selectedUserId) {
    Toastify({
      text: "No se encontró el ID del usuario seleccionado.",
      duration: 3000,
      gravity: "top",
      position: "center",
      background: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  }

  Swal.fire({
    title: "¿Cambiar rol?",
    text: "El rol del usuario será cambiado.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cambiar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/v1/users/user/${selectedUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          Toastify({
            text: `Rol cambiado a: ${data.role}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();

          modal.style.display = "none";
          location.reload();
        } else {
          Toastify({
            text: `Error: ${data.message}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            background: "linear-gradient(to right, #FF5F6D, #FFC371)",
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Error: ${error.message}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          background: "linear-gradient(to right, #FF5F6D, #FFC371)",
        }).showToast();
      }
    }
  });
});