document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-tickets");
  const openButtons = document.querySelectorAll(".view__button");
  const closeButton = modal.querySelector(".close-tickets");
  const deleteButton = modal.querySelector(".delete__btn-t");
  const payButton = modal.querySelector(".pay__btn");
  const cancelButton = modal.querySelector(".cancel__btn");
  const processButton = modal.querySelector(".process__btn");

  let currentTicketId = null;

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      currentTicketId = button.getAttribute("data-id");
      modal.style.display = "flex";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    currentTicketId = null;
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      currentTicketId = null;
    }
  });

  deleteButton.addEventListener("click", async () => {
    if (!currentTicketId) {
      Toastify({
        text: "No se especificó el ID del ticket para eliminar.",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "#FF4C4C",
      }).showToast();
      return;
    }

    const confirmation = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const response = await fetch(`/api/v1/ticket/${currentTicketId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        Toastify({
          text: "Ticket eliminado con éxito.",
          gravity: "top",
          position: "center",
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        modal.style.display = "none";
        currentTicketId = null;
      } else {
        const errorData = await response.json();
        Toastify({
          text: `Error: ${errorData.message}`,
          duration: 3000,
          gravity: "top",
          position: "right",
          background: "#FF4C4C",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Ocurrió un error al eliminar el ticket.",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "#FF4C4C",
      }).showToast();
    }
  });

  payButton.addEventListener("click", async () => {
    if (!currentTicketId) {
      Toastify({
        text: "No se encontró el ID del ticket seleccionado.",
        duration: 3000,
        gravity: "top",
        position: "center",
        background: "linear-gradient(to right, #FF5F6D, #FFC371)",
      }).showToast();
      return;
    }

    Swal.fire({
      title: "¿Cambiar Esatdo de pago?",
      text: "El estado del pago será cambiado.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `/api/v1/ticket/pay/${currentTicketId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.status === 200) {
            Toastify({
              text: `Estado de pago cambiado a: pagado`,
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

  cancelButton.addEventListener("click", async () => {
    if (!currentTicketId) {
      Toastify({
        text: "No se encontró el ID del ticket seleccionado.",
        duration: 3000,
        gravity: "top",
        position: "center",
        background: "linear-gradient(to right, #FF5F6D, #FFC371)",
      }).showToast();
      return;
    }

    Swal.fire({
      title: "¿Cambiar estado de pago del ticket?",
      text: "El estado de pago será cambiado.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `/api/v1/ticket/cancel/${currentTicketId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.status === 200) {
            Toastify({
              text: `Estado de pago cambiado a: cancelado`,
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

  processButton.addEventListener("click", async () => {
    if (!currentTicketId) {
      Toastify({
        text: "No se encontró el ID del ticket seleccionado.",
        duration: 3000,
        gravity: "top",
        position: "center",
        background: "linear-gradient(to right, #FF5F6D, #FFC371)",
      }).showToast();
      return;
    }

    Swal.fire({
      title: "¿Cambiar estado de pago del ticket?",
      text: "El estado de pago será cambiado.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `/api/v1/ticket/process/${currentTicketId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.status === 200) {
            Toastify({
              text: `Estado de pago cambiado a: en proceso`,
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
});
