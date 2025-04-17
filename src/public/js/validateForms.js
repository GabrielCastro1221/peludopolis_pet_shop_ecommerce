document
  .getElementById("SignInBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@(gmail|hotmail)\.com$/;
    const errorMessage = document.createElement("p");

    const previousError = document.querySelector(".error-message");
    if (previousError) {
      previousError.remove();
    }

    if (!emailRegex.test(emailValue)) {
      errorMessage.textContent = "Por favor, ingresa un email válido";
      errorMessage.className = "error-message";
      errorMessage.style.color = "red";
      emailInput.insertAdjacentElement("afterend", errorMessage);
    } else {
      console.log("Email válido: ", emailValue);
    }
  });

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const lastName = document.getElementById("last_name");
    const email = document.querySelector(".email");
    const password = document.querySelector(".pass");
    const age = document.getElementById("age");
    const gender = document.querySelector('select[name="gender"]');
    const city = document.getElementById("city");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");

    let valid = true;

    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    function showError(input, message) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = message;
      errorMessage.className = "error-message";
      errorMessage.style.color = "red";
      input.insertAdjacentElement("afterend", errorMessage);
      valid = false;
    }

    if (name.value.trim() === "") {
      showError(name, "El nombre es obligatorio.");
    } else if (name.value.trim().length < 3) {
      showError(name, "El nombre debe tener al menos 3 caracteres.");
    }

    if (lastName.value.trim() === "") {
      showError(lastName, "El apellido es obligatorio.");
    } else if (lastName.value.trim().length < 3) {
      showError(lastName, "El apellido debe tener al menos 3 caracteres.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      showError(email, "El email es obligatorio.");
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, "Por favor, ingresa un email válido.");
    }

    if (password.value.trim() === "") {
      showError(password, "La contraseña es obligatoria.");
    } else if (password.value.trim().length < 6) {
      showError(password, "La contraseña debe tener al menos 6 caracteres.");
    }

    if (age.value.trim() === "") {
      showError(age, "La edad es obligatoria.");
    } else if (isNaN(age.value) || age.value < 18 || age.value > 120) {
      showError(age, "Por favor, ingresa una edad válida entre 18 y 120.");
    }

    if (gender.value === "") {
      showError(gender, "Selecciona un género.");
    }

    if (city.value === "") {
      showError(city, "Selecciona tu ciudad.");
    }

    const phoneRegex = /^[0-9]{7,10}$/;
    if (phone.value.trim() === "") {
      showError(phone, "El teléfono es obligatorio.");
    } else if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, "Por favor, ingresa un teléfono válido (7-10 dígitos).");
    }

    if (address.value.trim() === "") {
      showError(address, "La dirección es obligatoria.");
    } else if (address.value.trim().length < 5) {
      showError(address, "La dirección debe tener al menos 5 caracteres.");
    }

    if (valid) {
      console.log("Formulario enviado exitosamente.");
      this.submit();
    }
  });
