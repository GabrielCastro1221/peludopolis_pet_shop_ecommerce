const faqs = [
  {
    question: "¿Tienen productos específicos para cachorros o gatitos?",
    answer:
      "Sí, contamos con alimentos y productos diseñados especialmente para cachorros y gatitos, garantizando su bienestar y desarrollo saludable.",
  },
  {
    question: "¿Cómo puedo elegir el mejor alimento para mi mascota?",
    answer:
      "Recomendamos consultar con un veterinario para determinar la mejor opción según la edad, raza y estado de salud de tu mascota.",
  },
  {
    question: "¿Hacen envíos a domicilio?",
    answer:
      "Sí, ofrecemos envíos a domicilio en Manizales y otras ciudades. Puedes consultar los costos y tiempos de entrega al momento de la compra.",
  },
  {
    question: "¿Puedo devolver un producto si no cumple mis expectativas?",
    answer:
      "Sí, aceptamos devoluciones dentro de un período específico, siempre y cuando el producto esté en su estado original. Consulta nuestras políticas de devolución para más detalles.",
  },
  {
    question: "¿Cómo puedo contactar con Peludopolis?",
    answer:
      "Puedes visitarnos en nuestra tienda en Manizales, escribirnos al WhatsApp 314 638 1395, o enviarnos un correo a través de nuestra página web.",
  },
  {
    question: "¿Tienen promociones o descuentos especiales?",
    answer:
      "Sí, suscribiéndote a nuestro boletín informativo podrás recibir ofertas exclusivas y novedades sobre nuestros productos.",
  },
];

function renderFaqs() {
  const faqContainer = document.getElementById("faqs");

  faqs.forEach((faq) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const faqTitle = document.createElement("button");
    faqTitle.classList.add("faq-title");
    faqTitle.innerHTML = `${faq.question} <span class="icon"><i class="fi fi-rr-add"></i></span>`;

    const faqContent = document.createElement("div");
    faqContent.classList.add("faq-content");
    faqContent.style.display = "none";
    faqContent.innerHTML = `<p>${faq.answer}</p>`;

    faqTitle.addEventListener("click", function () {
      const isActive = faqContent.style.display === "block";

      document
        .querySelectorAll(".faq-content")
        .forEach((item) => (item.style.display = "none"));
      document
        .querySelectorAll(".faq-title .icon i")
        .forEach((icon) => (icon.className = "fi fi-rr-add"));

      faqContent.style.display = isActive ? "none" : "block";
      this.querySelector(".icon i").className = isActive
        ? "fi fi-rr-add"
        : "fi fi-rr-minus-circle";
    });

    faqItem.appendChild(faqTitle);
    faqItem.appendChild(faqContent);
    faqContainer.appendChild(faqItem);
  });
}

document.addEventListener("DOMContentLoaded", renderFaqs);
