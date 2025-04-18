const socket = io();
const modalProducts = document.getElementById("modal-products");
const closeProductButton = document.querySelector(".close-products");

const viewProducts = (products) => {
  const container = modalProducts.querySelector(".products-container");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const section = document.createElement("section");
    section.className = "product";
    section.id = `product-${product._id}`;
    section.style.display = "none";

    section.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <div class="actions">
        <button class="delete__btn del">Eliminar</button>
        <button class="feature__btn">Destacar</button>
        <button class="new__arrive">Nuevo Arribo</button>
        <button class="best__seller">Más Vendido</button>
      </div>
    `;

    container.appendChild(section);
  });
};

socket.on("products", (data) => {
  viewProducts(data);
});

const showProductModal = (productId) => {
  if (!productId) return;

  modalProducts.style.display = "flex";
  const productSections = modalProducts.querySelectorAll(".product");

  productSections.forEach((section) => {
    section.style.display =
      section.id === `product-${productId}` ? "block" : "none";
  });
};

const hideModal = () => {
  modalProducts.style.display = "none";
};

const getProductIdFromElement = (el) => {
  return el.closest(".product")?.id?.replace("product-", "");
};

const showToast = (text, type = "success") => {
  const colors = {
    success: "linear-gradient(to right, #00b09b, #96c93d)",
    error: "linear-gradient(to right, #FF5F6D, #FFC371)",
  };

  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: colors[type],
  }).showToast();
};

const confirmAction = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
};

document.addEventListener("click", async (e) => {
  const target = e.target;

  if (target.classList.contains("view__btn")) {
    e.preventDefault();
    const productId = target.getAttribute("data-id");
    if (!productId) return console.error("No se encontró el ID del producto.");
    showProductModal(productId);
  }

  if (target === closeProductButton || target === modalProducts) {
    hideModal();
  }

  if (
    target.classList.contains("delete__btn") &&
    target.classList.contains("del")
  ) {
    const productId = getProductIdFromElement(target);
    if (!productId)
      return showToast("No se encontró el ID del producto.", "error");

    const confirmed = await confirmAction();
    if (confirmed) {
      socket.emit("deleteProd", productId);
      showToast("Producto eliminado");
      hideModal();
      setTimeout(() => location.reload(), 1000);
    }
  }

  const actionMap = {
    feature__btn: {
      event: "featureProd",
      successMsg: "Producto destacado correctamente",
    },
    new__arrive: {
      event: "newArrive",
      successMsg: "Producto marcado como nuevo arribo.",
    },
    best__seller: {
      event: "bestSeller",
      successMsg: "Producto marcado como más vendido.",
    },
  };

  for (const className in actionMap) {
    if (target.classList.contains(className)) {
      const { event, successMsg } = actionMap[className];
      const productId = getProductIdFromElement(target);
      if (!productId)
        return showToast("No se encontró el ID del producto.", "error");

      socket.emit(event, productId);
      showToast(successMsg);
      setTimeout(() => location.reload(), 1000);
    }
  }
});