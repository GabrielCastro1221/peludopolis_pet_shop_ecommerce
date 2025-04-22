const modal = document.getElementById("modal-create-adoption");
const btn = document.getElementById("adoption-request");
const span = document.getElementsByClassName("close-create-adoption")[0];
const addFamilyMemberBtns = document.querySelectorAll("#add-family-member");

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addFamilyMemberBtns.forEach((button) => {
  button.onclick = function (event) {
    event.preventDefault();
    const familyMembersContainer = document.querySelector(
      "#modal-create-adoption #family-members-container"
    );
    const newFamilyMember = document.createElement("div");
    newFamilyMember.className = "family-member";
    newFamilyMember.innerHTML = `
        <input type="text" name="family_member_name" placeholder="Nombre del miembro de la familia" class="form__input">
        <input type="text" name="family_member_lastname" placeholder="Apellido del miembro de la familia" class="form__input">
        <input type="text" name="family_member_id" placeholder="Identificación del miembro de la familia" class="form__input">
        <input type="email" name="family_member_email" placeholder="Email del miembro de la familia" class="form__input">
        <input type="text" name="family_member_phone" placeholder="Telefono del miembro de la familia" class="form__input pass">
        <button type="button" class="btn btn--sm remove-family-member">Eliminar</button>
    `;
    familyMembersContainer.appendChild(newFamilyMember);
    const removeBtn = newFamilyMember.querySelector(".remove-family-member");
    removeBtn.onclick = function () {
      familyMembersContainer.removeChild(newFamilyMember);
    };
  };
});
