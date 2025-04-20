document.addEventListener("DOMContentLoaded", () => {
  const cartSection = document.querySelector(".cart");
  const cartId = cartSection.getAttribute("data-cart-id");
  const deleteButtons = document.querySelectorAll(".btn--delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-product-id");

      const confirmDelete = await Swal.fire({
        title: "¿Eliminar producto?",
        text: "¿Estás seguro de que deseas eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (!confirmDelete.isConfirmed) return;

      try {
        const response = await fetch(
          `/api/v1/cart/${cartId}/products/${productId}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();

        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto ha sido eliminado del carrito.",
            confirmButtonText: "Aceptar",
          });
          location.reload();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "No se pudo eliminar el producto.",
          });
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar el producto.",
        });
      }
    });
  });

  const emptyCartButton = document.querySelector(".btn--empty-cart");
  if (emptyCartButton) {
    emptyCartButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const confirmDelete = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto vaciará todos los productos del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar",
      });

      if (!confirmDelete.isConfirmed) return;

      try {
        const response = await fetch(`/api/v1/cart/${cartId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Carrito vaciado",
            text: "El carrito ha sido vaciado correctamente.",
          });
          location.reload();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "No se pudo vaciar el carrito.",
          });
        }
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al vaciar el carrito.",
        });
      }
    });
  }

  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateSubtotal();
    });
  }

  const citySelect = document.getElementById("city");
  if (citySelect) {
    citySelect.addEventListener("change", calculateSubtotal);
  }

  document.querySelectorAll(".quantity").forEach((input) => {
    input.addEventListener("change", calculateSubtotal);
  });

  calculateSubtotal();
});

function calculateSubtotal() {
  let subtotal = 0;
  const rows = document.querySelectorAll(".table tr");

  rows.forEach((row, index) => {
    if (index === 0) return;

    const priceElement = row.querySelector(".table__price");
    const quantityInput = row.querySelector(".quantity");

    if (priceElement && quantityInput) {
      const price = parseFloat(
        priceElement.textContent.replace("$", "").replace(",", "")
      );
      const quantity = parseInt(quantityInput.value);
      subtotal += price * quantity;
    }
  });

  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");

  const roundedSubtotal = Math.round(subtotal);
  subtotalElement.textContent = `$${roundedSubtotal.toLocaleString()}`;

  const citySelect = document.getElementById("city");
  let shipping = 0;
  if (citySelect && citySelect.value) {
    shipping = parseInt(citySelect.value);
  }
  shippingElement.textContent = `$${shipping.toLocaleString()}`;

  const total = roundedSubtotal + shipping;
  totalElement.textContent = `$${total.toLocaleString()}`;
}
