document.addEventListener("DOMContentLoaded", () => {
  const modalProd = document.getElementById("modal-prod-tickets");
  const prodButtons = document.querySelectorAll(".view__prod-ticket");
  const closeProdButton = modalProd.querySelector(".close-prod-tickets");

  prodButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      modalProd.style.display = "flex";
    });
  });

  closeProdButton.addEventListener("click", () => {
    modalProd.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modalProd) {
      modalProd.style.display = "none";
    }
  });
});
