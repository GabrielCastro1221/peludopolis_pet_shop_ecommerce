document.addEventListener("DOMContentLoaded", () => {
  const formCart = document.querySelectorAll(".add-to-cart-form");
  const formWish = document.querySelectorAll(".add-to-wish-form");

  formCart.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const productId = form.getAttribute("data-product-id");
      const user = JSON.parse(localStorage.getItem("user"));
      const cartId = user?.cart;

      if (!cartId) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          html: 'Debes <a href="/login" style="color: hsl(176, 88%, 27%); text-decoration: none;">iniciar sesión</a> para agregar el producto al carrito de compras.',
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
            body: JSON.stringify({ quantity: 1 }),
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
  });
});
