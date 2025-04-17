document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.querySelector(".details__img");
  const smallImages = document.querySelectorAll(".details__small-img");

  smallImages.forEach((smallImg) => {
    smallImg.addEventListener("click", () => {
      mainImage.src = smallImg.src;
    });
  });
});
