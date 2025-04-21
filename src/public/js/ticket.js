document.addEventListener("DOMContentLoaded", () => {
  const cartSection = document.querySelector(".cart");
  const finishButton = document.querySelector("#payment");

  const cartId = cartSection.getAttribute("data-cart-id");
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");
  const citySelect = document.getElementById("city");

  const formatNumber = (str) => {
    return parseInt(str.replace(/\./g, "").replace(/\$/g, "").trim(), 10);
  };

  const showToast = (message, type = "info") => {
    Toastify({
      text: message,
      duration: 4000,
      gravity: "top",
      position: "right",
      backgroundColor:
        type === "error"
          ? "#ff4d4d"
          : type === "success"
          ? "#4CAF50"
          : "#007bff",
      close: true,
    }).showToast();
  };

  finishButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!citySelect.value) {
      showToast("Por favor, selecciona una ciudad.", "error");
      return;
    }

    const amount = formatNumber(totalElement.textContent);
    const shipping = formatNumber(shippingElement.textContent);
    const subtotal = formatNumber(subtotalElement.textContent);

    try {
      const response = await fetch(
        `/api/v1/ticket/cart/${cartId}/finish-purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, shipping, subtotal }),
        }
      );

      if (response.ok) {
        const ticket = await response.json();
        showToast("Orden de compra generada con exito!", "success");
        setTimeout(() => {
          window.location.href = `/checkout/${ticket._id}`;
        }, 1500);
      } else {
        showToast(
          "Error al generar la orden la compra. Intenta nuevamente.",
          "error"
        );
      }
    } catch (error) {
      showToast("Error de conexión. Por favor, intenta más tarde.", "error");
    }
  });
});
