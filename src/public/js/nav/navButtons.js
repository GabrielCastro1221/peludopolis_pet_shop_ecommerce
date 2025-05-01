document.addEventListener("DOMContentLoaded", async () => {
  const loginTopLink = document.getElementById("login-top-link");
  const userTopLink = document.getElementById("user-top-link");
  const adminTopLink = document.getElementById("admin-top-link");

  const loginNavLink = document.getElementById("login-nav-link");
  const userNavLink = document.getElementById("user-nav-link");
  const adminNavLink = document.getElementById("admin-nav-link");

  const cartLink = document.querySelector(".header__action-btn.cartId");

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(
          "No se encontró el token. El usuario no ha iniciado sesión."
        );
        return null;
      }

      const response = await fetch("/api/v1/users/profile/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error al obtener perfil: ${response.status} - ${response.statusText}`
        );
      }

      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
      return null;
    }
  };

  const userData = await fetchUserProfile();
  if (userData) {
    localStorage.setItem("role", userData.role);
    if (userData.role === "usuario") {
      loginTopLink.style.display = "none";
      userTopLink.style.display = "inline-block";
      loginNavLink.style.display = "none";
      userNavLink.style.display = "inline-block";
    } else if (userData.role === "admin") {
      loginTopLink.style.display = "none";
      adminTopLink.style.display = "inline-block";
      loginNavLink.style.display = "none";
      adminNavLink.style.display = "inline-block";
    }

    if (userData.cart && cartLink) {
      cartLink.href = `/cart/${userData.cart}`;
    } else {
      console.warn("No se encontró un carrito válido en userData.");
    }
  }
});
