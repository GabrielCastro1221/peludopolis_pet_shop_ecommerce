const modalCreate = document.getElementById("modal-create-user");
const createUserButton = document.getElementById("create-user");
const closeCreateUserButton = modalCreate.querySelector(".close");

createUserButton.addEventListener("click", (event) => {
  event.preventDefault();
  modalCreate.style.display = "flex";
});

closeCreateUserButton.addEventListener("click", () => {
  modalCreate.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modalCreate) {
    modalCreate.style.display = "none";
  }
});
