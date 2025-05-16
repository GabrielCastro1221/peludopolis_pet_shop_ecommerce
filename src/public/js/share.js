document.addEventListener("DOMContentLoaded", function () {
  const shareButtons = document.querySelectorAll(".share__btn");
  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const productTitle = this.getAttribute("data-title");
      const productImage = this.getAttribute("data-image");
      const productUrl = `${window.location.origin}/tienda/${productId}`;
      const shareText = `🐾 Mira este producto en Peludopolis: ${productTitle} 🛍️ ${productUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareText
      )}`;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`;

      const shareOptions = `
                <div class="share-menu">
                    <a href="${whatsappUrl}" target="_blank">Compartir en WhatsApp</a>
                    <a href="${facebookUrl}" target="_blank">Compartir en Facebook</a>
                    <a href="${twitterUrl}" target="_blank">Compartir en Twitter</a>
                </div>
            `;
      this.insertAdjacentHTML("afterend", shareOptions);
    });
  });
});
