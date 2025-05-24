document.addEventListener("DOMContentLoaded", function () {
    const shareButtons = document.querySelectorAll(".share__btn");

    shareButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            const productTitle = this.getAttribute("data-title");
            const productImage = this.getAttribute("data-image");
            const productUrl = `${window.location.origin}/tienda/${productId}`;

            const shareText = `🐾 ¡Mira este producto en Peludopolis! 🛒\n\n✨ *${productTitle}* ✨\n📸 Imagen: ${productImage}\n\n🛍️ Consíguelo aquí:\n${productUrl}`;
            
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

            window.open(whatsappUrl, "_blank");
        });
    });
});
