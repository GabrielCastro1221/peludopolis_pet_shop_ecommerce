document.addEventListener("DOMContentLoaded", () => {
  const locationData = [
    {
      class: "footer__description",
      span: "Dirección",
      icon: "fi fi-rr-marker icono",
      desc: "Manizales, calle 68 #8-126",
    },
    { class: "footer__description", 
      span: "Teléfono", 
      icon: "fi fi-rr-phone-call icono",
      desc: "314 638 1395" },
    {
      class: "footer__description",
      span: "Horario",
      icon: "fi fi-rr-calendar-clock icono",
      desc: "09:00 - 20:00, Lunes - Sabado",
    },
  ];

  const socialLinks = [
    {
      link: "#",
      img: "/assets/img/icon-facebook.svg",
      class: "footer__social-icon",
      title: "Facebook de peludopolis"
    },
    {
      link: "#",
      img: "/assets/img/icon-instagram.svg",
      class: "footer__social-icon",
      title: "Instagram de peludopolis"
    },
    {
      link: "#",
      img: "/assets/img/icon-youtube.svg",
      class: "footer__social-icon",
      title: "Canal de youtube peludopolis"
    },
    {
      link: "#",
      img: "/assets/img/icon-tiktok.svg",
      class: "footer__social-icon",
      title: "TikTok de peludopolis"
    },
  ];

  const infoData = [
    {
      link: "#",
      class: "footer__link terms-btn",
      desc: "Términos y condiciones",
    },
    {
      link: "#",
      class: "footer__link privacy-btn",
      desc: "Políticas de privacidad",
    },
    { link: "#", class: "footer__link support-btn", desc: "Centro de soporte" },
  ];

  const accountData = [
    { link: "#", class: "footer__link about-btn", desc: "Sobre nososotros" },
    { link: "/tienda", class: "footer__link", desc: "Nuestros productos" },
    { link: "#", class: "footer__link faqs-btn", desc: "FAQ´s" },
  ];

  const mapDataToHTML = (data, targetElementId, templateCallback) => {
    const targetElement = document.querySelector(`#${targetElementId}`);
    if (targetElement) {
      targetElement.innerHTML = data.map(templateCallback).join("");
    } else {
      console.error(
        `El elemento con id '${targetElementId}' no existe en el DOM.`
      );
    }
  };

  const locationTemplate = (item) =>
    `<p class="${item.class}"><span><i class="${item.icon}" ></i> </span> ${item.desc}</p>`;
  const socialLinksTemplate = (social) =>
    `<a href="${social.link}" title="${social.title}"><img src="${social.img}" alt="" class="${social.class}"></a>`;
  const infoTemplate = (info) =>
    `<li><a href="${info.link}" class="${info.class}">${info.desc}</a></li>`;
  const accountTemplate = (account) =>
    `<li><a href="${account.link}" class="${account.class}">${account.desc}</a></li>`;

  mapDataToHTML(locationData, "location", locationTemplate);
  mapDataToHTML(socialLinks, "social-links", socialLinksTemplate);
  mapDataToHTML(infoData, "footer-links", infoTemplate);
  mapDataToHTML(accountData, "account-links", accountTemplate);

  const modal = document.getElementById("modal-terms");
  const termsButton = document.querySelector(".terms-btn");
  const closeButton = document.querySelector(".close-terms");
  const modalPrivacy = document.getElementById("modal-privacy");
  const privacyButton = document.querySelector(".privacy-btn");
  const closePrivacyButton = document.querySelector(".close-privacy");
  const modalSupport = document.getElementById("modal-support");
  const supportButton = document.querySelector(".support-btn");
  const closeSupportButton = document.querySelector(".close-support");
  const modalFaqs = document.getElementById("modal-faqs");
  const faqsButton = document.querySelector(".faqs-btn");
  const closeFaqsButton = document.querySelector(".close-faqs");
  const modalAbout = document.getElementById("modal-about");
  const aboutButton = document.querySelector(".about-btn");
  const closeAboutButton = document.querySelector(".close-about");

  if (termsButton && modal) {
    termsButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "flex";
    });
  }

  if (closeButton && modal) {
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  if (privacyButton && modalPrivacy) {
    privacyButton.addEventListener("click", (event) => {
      event.preventDefault();
      modalPrivacy.style.display = "flex";
    });
  }

  if (closePrivacyButton && modalPrivacy) {
    closePrivacyButton.addEventListener("click", () => {
      modalPrivacy.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modalPrivacy.style.display = "none";
      }
    });
  }

  if (supportButton && modalSupport) {
    supportButton.addEventListener("click", (event) => {
      event.preventDefault();
      modalSupport.style.display = "flex";
    });
  }

  if (closeSupportButton && modalSupport) {
    closeSupportButton.addEventListener("click", () => {
      modalSupport.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modalSupport.style.display = "none";
      }
    });
  }

  if (faqsButton && modalFaqs) {
    faqsButton.addEventListener("click", (event) => {
      event.preventDefault();
      modalFaqs.style.display = "flex";
    });
  }

  if (closeFaqsButton && modalFaqs) {
    closeFaqsButton.addEventListener("click", () => {
      modalFaqs.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modalFaqs.style.display = "none";
      }
    });
  }

  if (aboutButton && modalAbout) {
    aboutButton.addEventListener("click", (event) => {
      event.preventDefault();
      modalAbout.style.display = "flex";
    });
  }

  if (closeAboutButton && modalAbout) {
    closeAboutButton.addEventListener("click", () => {
      modalAbout.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modalAbout.style.display = "none";
      }
    });
  }
});
