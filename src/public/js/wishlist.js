document.addEventListener("DOMContentLoaded", () => {
  const wishSection = document.querySelector(".wishlist");
  const wishId = wishSection.getAttribute("data-wishlist-id");
  const deleteButtons = document.querySelectorAll(".btn--delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = button.getAttribute("data-product-id");
      const confirmDelete = await Swal.fire({
        title: "¿Eliminar producto de la lista de deseos?",
        text: "¿Estás seguro de que deseas eliminar este producto de la lista de deseos?",
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
          `/api/v1/wishlist/${wishId}/products/${productId}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto ha sido eliminado de la lista de deseos.",
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

  const emptyWishButton = document.querySelector(".btn--empty-wish");
  if (emptyWishButton) {
    emptyWishButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const confirmDelete = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto vaciará todos los productos de la lista de deseos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, vaciar la lista de deseos",
        cancelButtonText: "Cancelar",
      });

      if (!confirmDelete.isConfirmed) return;

      try {
        const response = await fetch(`/api/v1/wishlist/${wishId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Lista de deseos vacia",
            text: "La lista de deseos ha sido vaciada correctamente.",
          });
          location.reload();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "No se pudo vaciar la lista de deseos.",
          });
        }
      } catch (error) {
        console.error("Error al vaciar la lista de deseos:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al vaciar la lista de deseos.",
        });
      }
    });
  }
});
