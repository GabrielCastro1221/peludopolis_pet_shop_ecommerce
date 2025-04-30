document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("name");
  const lastNameInput = document.getElementById("last_name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const ageInput = document.getElementById("age");
  const genderSelect = document.querySelector('select[name="gender"]');
  const citySelect = document.getElementById("city");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const productForm = document.getElementById("form");
  const titleInput = document.getElementById("title");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const stockInput = document.getElementById("stock");
  const categorySelect = document.querySelector('select[name="category"]');
  const typeSelect = document.querySelector('select[name="type_product"]');
  const imageInput = document.getElementById("customFile");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const positiveNumberRegex = /^[1-9][0-9]*$/;

  const showError = (element, message) => {
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    element.parentNode.insertBefore(error, element.nextSibling);
    element.classList.add("error");
  };

  const clearErrors = () => {
    document
      .querySelectorAll(".error-message")
      .forEach((error) => error.remove());
    document
      .querySelectorAll(".error")
      .forEach((input) => input.classList.remove("error"));
  };

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    if (!nameRegex.test(nameInput.value)) {
      valid = false;
      showError(nameInput, "El nombre solo puede contener letras.");
    }

    if (!nameRegex.test(lastNameInput.value)) {
      valid = false;
      showError(lastNameInput, "El apellido solo puede contener letras.");
    }

    if (!emailRegex.test(emailInput.value)) {
      valid = false;
      showError(emailInput, "Ingresa un email válido.");
    }

    if (passwordInput.value.length < 6) {
      valid = false;
      showError(
        passwordInput,
        "La contraseña debe tener al menos 6 caracteres."
      );
    }

    if (ageInput.value < 18 || ageInput.value > 100) {
      valid = false;
      showError(ageInput, "La edad debe estar entre 18 y 100 años.");
    }

    if (!genderSelect.value) {
      valid = false;
      showError(genderSelect, "Selecciona un género.");
    }

    if (!citySelect.value) {
      valid = false;
      showError(citySelect, "Selecciona una ciudad.");
    }

    if (!phoneRegex.test(phoneInput.value)) {
      valid = false;
      showError(
        phoneInput,
        "Ingresa un número de teléfono válido de 10 dígitos."
      );
    }

    if (addressInput.value.trim() === "") {
      valid = false;
      showError(addressInput, "La dirección no puede estar vacía.");
    }

    if (valid) {
      registerForm.submit();
    }
  });

  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    if (!titleInput.value.trim()) {
      valid = false;
      showError(titleInput, "El nombre del producto no puede estar vacío.");
    }

    if (!positiveNumberRegex.test(priceInput.value)) {
      valid = false;
      showError(priceInput, "El precio debe ser un número positivo.");
    }

    if (!descriptionInput.value.trim()) {
      valid = false;
      showError(descriptionInput, "La descripción no puede estar vacía.");
    }

    if (!brandInput.value.trim()) {
      valid = false;
      showError(brandInput, "La marca no puede estar vacía.");
    }

    if (!positiveNumberRegex.test(stockInput.value)) {
      valid = false;
      showError(
        stockInput,
        "Las unidades disponibles deben ser un número positivo."
      );
    }

    if (!categorySelect.value) {
      valid = false;
      showError(categorySelect, "Selecciona una categoría.");
    }

    if (!typeSelect.value || typeSelect.value === "null") {
      valid = false;
      showError(typeSelect, "Selecciona un tipo de producto.");
    }

    if (!imageInput.value) {
      valid = false;
      showError(imageInput, "Debes subir al menos una imagen.");
    }

    if (valid) {
      productForm.submit();
    }
  });
});
