document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const loginLink = document.querySelector('a[href="/login"]');
  const userAccountLink = document.querySelector('a[href="/perfil-usuario"]');
  const adminAccountLink = document.querySelector('a[href="/perfil-admin"]');

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
    handleMissingElement(
      userAccountLink,
      "No se encontró el enlace de Mi Cuenta Usuario."
    ) ||
    handleMissingElement(
      adminAccountLink,
      "No se encontró el enlace de Mi Cuenta Admin."
    )
  ) {
    return;
  }

  const isLoggedIn = localStorage.getItem("token") !== null;
  const userRole = localStorage.getItem("role");

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userRole:", userRole);

  if (isLoggedIn) {
    if (userRole === "admin") {
      adminAccountLink.style.display = "block";
      userAccountLink.style.display = "none";
    } else if (userRole === "user") {
      userAccountLink.style.display = "block";
      adminAccountLink.style.display = "none";
    }
    loginLink.style.display = "none";
  } else {
    userAccountLink.style.display = "none";
    adminAccountLink.style.display = "none";
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
