document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const loginLink = document.querySelector('a[href="/login"]');
  const accountLink = document.querySelector('a[href="/perfil-usuario"]');

  const handleMissingElement = (element, message) => {
    if (!element) {
      console.error(message);
      return true;
    }
    return false;
  };

  if (
    handleMissingElement(navMenu, "No se encontró el menú de navegación.") ||
    handleMissingElement(
      navToggle,
      "No se encontró el botón para mostrar el menú."
    ) ||
    handleMissingElement(loginLink, "No se encontró el enlace de login.") ||
    handleMissingElement(accountLink, "No se encontró el enlace de Mi Cuenta.")
  ) {
    return;
  }

  const isLoggedIn = localStorage.getItem("token") !== null;

  if (isLoggedIn) {
    accountLink.style.display = "block";
    loginLink.style.display = "none";
  } else {
    accountLink.style.display = "none";
    loginLink.style.display = "block";
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }
});
