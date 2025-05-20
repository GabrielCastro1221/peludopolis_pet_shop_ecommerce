document.addEventListener("DOMContentLoaded", () => {
  const loadProfileButton = document.querySelector(
    ".account__tab[data-target='#address']"
  );
  const profileContainer = document.querySelector(".address");
  const dashboardNameElement = document.getElementById("dashboard");
  const logoutButton = document.querySelector(".logout-button");
  const deleteAccountButton = document.querySelector(".delete-button");
  const updateForm = document.getElementById("update-form");
  const ordersTableBody = document.querySelector(".placed__order-table tbody");
  const modal = document.getElementById("modal-order-user");
  const closeModal = document.querySelector(".close-order-user");

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  ordersTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("view__order")) {
      event.preventDefault();
      modal.style.display = "block";

      const orderId = event.target.getAttribute("data-id");
      console.log("Orden seleccionada:", orderId);
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const handleMissingElement = (element, message) => {
    if (!element) {
      console.error(message);
      return true;
    }
    return false;
  };

  if (
    handleMissingElement(
      loadProfileButton,
      "No se encontró el botón para cargar el perfil."
    ) ||
    handleMissingElement(
      profileContainer,
      "No se encontró el contenedor para mostrar los datos del perfil."
    ) ||
    handleMissingElement(
      dashboardNameElement,
      "No se encontró el elemento con el ID 'dashboard-name'."
    ) ||
    handleMissingElement(
      logoutButton,
      "No se encontró el botón para cerrar sesión."
    ) ||
    handleMissingElement(
      updateForm,
      "No se encontró el formulario de actualización."
    )
  ) {
    return;
  }

  deleteAccountButton.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar tu cuenta?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          alert("No se encontró el ID del usuario en el almacenamiento local.");
          return;
        }

        try {
          const response = await fetch(`/api/v1/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Error al eliminar la cuenta: ${response.status} - ${response.statusText}`
            );
          }

          const result = await response.json();
          Swal.fire(
            "Eliminado",
            result.message || "Tu cuenta ha sido eliminada con éxito.",
            "success"
          ).then(() => {
            localStorage.clear();
            window.location.href = "/login";
          });
        } catch (error) {
          console.error("Error al eliminar la cuenta:", error);
          Swal.fire(
            "Error",
            error.message || "Ocurrió un error al eliminar la cuenta.",
            "error"
          );
        }
      }
    });
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/v1/users/profile/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "Error al cargar datos del usuario: " + response.status
        );
      }

      const result = await response.json();

      if (result.success && result.data) {
        return result.data;
      } else {
        console.warn("No se encontraron datos de usuario en la API.");
        return null;
      }
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
      return null;
    }
  };

  loadProfileButton.addEventListener("click", async () => {
    const userData = await fetchUserProfile();
    if (userData) {
      const { _id, name, last_name, age, email, role, phone, city, address } =
        userData;

      localStorage.setItem("user_id", _id);

      profileContainer.innerHTML = `
              <div class="user__data">
                  <div>
                      <p>Nombre: <span>${name}</span></p>
                      <p>Apellido: <span>${last_name}</span></p>
                      <p>Edad: <span>${age}</span></p>
                  </div>
                  <div>
                      <p>Email: <span>${email}</span></p>
                      <p>Rol: <span>${role}</span></p>
                  </div>
                  <div>
                      <p>Teléfono: <span>${phone}</span></p>
                      <p>Ciudad: <span>${city}</span></p>
                      <p>Dirección: <span>${address}</span></p>
                  </div>
              </div>
          `;

      document.getElementById("name-update").value = name || "";
      document.getElementById("last-name-update").value = last_name || "";
      document.getElementById("email-update").value = email || "";
      document.getElementById("age-update").value = age || "";
      document.getElementById("phone-update").value = phone || "";
      document.getElementById("address-update").value = address || "";
      document.getElementById("city-update").value = city || "";
      document.getElementById("role-update").value = role || "usuario";
    } else {
      alert("No se pudieron cargar los datos del perfil.");
    }
  });

  logoutButton.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_last_name");
        window.location.href = "/login";
      }
    });
  });

  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("No se encontró el ID del usuario en el almacenamiento local.");
      return;
    }

    const formData = new FormData(updateForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("idusuario", userId);
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      console.log("Respuesta de la API:", response);
      if (!response.ok) {
        throw new Error(
          `Error al actualizar los datos del usuario: ${response.status} - ${response.statusText}`
        );
      }

      const result = await response.json();
      Toastify({
        text: result.message || "Usuario actualizado con éxito.",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        close: true,
      }).showToast();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Detalles del error:", error);
      Toastify({
        text: error.message || "Ocurrió un error al actualizar el usuario.",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        close: true,
      }).showToast();
    }
  });
});

const ordersTableBody = document.querySelector(".placed__order-table tbody");
const fetchUserOrders = async () => {
  try {
    const response = await fetch("/api/v1/users/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener las órdenes: ${response.status}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    } else {
      console.warn("No se encontraron órdenes para el usuario.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    return [];
  }
};

const renderOrders = (orders) => {
  ordersTableBody.innerHTML = `
    <tr>
      <th>Codigo de la orden</th>
      <th>Fecha</th>
      <th>Estado</th>
      <th>Total</th>
    </tr>
  `;

  if (orders.length === 0) {
    ordersTableBody.innerHTML += `
      <tr>
        <td colspan="5">No hay órdenes disponibles.</td>
      </tr>
    `;
    return;
  }
  orders.forEach((order) => {
    const orderRow = document.createElement("tr");
    orderRow.innerHTML = `
      <td>#${order.code}</td>
      <td>${new Date(order.purchase_datetime).toLocaleDateString()}</td>
      <td>${order.status}</td>
      <td>$${order.amount}</td>
    `;
    ordersTableBody.appendChild(orderRow);
  });
};

fetchUserOrders().then((orders) => renderOrders(orders));
