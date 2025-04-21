document.addEventListener("DOMContentLoaded", () => {
  const createProductButton = document.getElementById("create-product");
  const modal = document.getElementById("modal-create-prod");
  const closeModalButton = document.querySelector(".close-create-prod");
  const thumbnailButton = document.getElementById("add-thumbnail");
  const thumbnailContainer = document.getElementById("thumbnail-container");

  createProductButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "flex";
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const fileInput = document.getElementById("customFile");
  const imagePreview = document.querySelector(".image-preview .preview");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  thumbnailButton.addEventListener("click", () => {
    const currentCount =
      thumbnailContainer.querySelectorAll(".thumbnail-wrapper").length;

    if (currentCount >= 4) {
      alert("Solo puedes agregar hasta 4 fotos.");
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "thumbnail-wrapper";
    wrapper.style.marginBottom = "10px";

    const input = document.createElement("input");
    input.type = "file";
    input.name = "thumbnail";
    input.accept = "image/*";
    input.className = "file-input";
    input.style.display = "none";

    const preview = document.createElement("img");
    preview.className = "thumbnail-preview";
    preview.style.width = "70px";
    preview.style.height = "70px";
    preview.style.marginTop = "5px";
    preview.style.border = "1px solid #ccc";
    preview.style.borderRadius = "6px";
    preview.style.objectFit = "cover";
    preview.style.cursor = "pointer";
    preview.src =
      "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png";
    preview.title = "Selecciona una imagen";

    preview.addEventListener("click", () => {
      input.click();
    });

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    wrapper.appendChild(preview);
    wrapper.appendChild(input);
    thumbnailContainer.appendChild(wrapper);
  });
});
