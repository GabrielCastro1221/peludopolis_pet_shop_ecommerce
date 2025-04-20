let productImg = document.getElementById("productImg");
let smallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImg.length; i++) {
  smallImg[i].onclick = function () {
    productImg.src = this.src;
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const formCart = document.querySelector(".add-to-cart-form");

  if (formCart) {
    formCart.addEventListener("submit", async (e) => {
      e.preventDefault();

      const productId = formCart.getAttribute("data-product-id");
      const stock = parseInt(formCart.getAttribute("data-stock"));
      const quantityInput = formCart.querySelector(".quantity");
      const quantity = parseInt(quantityInput.value) || 1;

      if (quantity > stock) {
        return Swal.fire({
          icon: "warning",
          title: "Cantidad excedida",
          text: `Solo hay ${stock} unidades disponibles.`,
          confirmButtonText: "Ok",
          background: "#fefefe",
        });
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const cartId = user?.cart;

      if (!cartId) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró el carrito para este usuario.",
          confirmButtonText: "Ok",
          background: "#fefefe",
        });
      }

      try {
        const response = await fetch(
          `/api/v1/cart/${cartId}/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Producto agregado",
            text: "¿Qué te gustaría hacer ahora?",
            showCancelButton: true,
            confirmButtonText: "Ir al carrito",
            cancelButtonText: "Seguir comprando",
            confirmButtonColor: "#155624",
            cancelButtonColor: "#155624",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/cart/${cartId}`;
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo agregar el producto al carrito.",
            confirmButtonText: "Ok",
            background: "#fefefe",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "Ocurrió un problema al intentar agregar el producto.",
          confirmButtonText: "Ok",
          background: "#fefefe",
        });
      }
    });
  }
});
