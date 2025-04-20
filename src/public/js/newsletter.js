document.getElementById("suscribe").addEventListener("click", async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector(".newsletter__input").value;

  if (!emailInput) {
    Toastify({
      text: "Por favor, ingresa un email válido.",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#f44336",
      },
    }).showToast();
    return;
  }

  try {
    const response = await fetch("/api/v1/users/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput }),
    });

    const data = await response.json();

    if (response.ok) {
      Toastify({
        text: data.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#4caf50",
        },
      }).showToast();
    } else {
      Toastify({
        text: `Error: ${data.message}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#f44336",
        },
      }).showToast();
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    Toastify({
      text: "Ocurrió un error al suscribirse. Intenta de nuevo más tarde.",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#f44336",
      },
    }).showToast();
  }
});
