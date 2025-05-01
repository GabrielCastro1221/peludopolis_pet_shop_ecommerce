const locationData = [
  {
    class: "footer__description",
    span: "Dirección",
    desc: "Manizales, calle 68 #8-126, La Sultana",
  },
  {
    class: "footer__description",
    span: "Teléfono",
    desc: "314 638 1395",
  },
  {
    class: "footer__description",
    span: "Horario",
    desc: "09:00 - 20:00, Lunes - Sabado",
  },
];

const socialLinks = [
  {
    link: "#",
    img: "/assets/img/icon-facebook.svg",
    class: "footer__social-icon",
  },
  {
    link: "#",
    img: "/assets/img/icon-twitter.svg",
    class: "footer__social-icon",
  },
  {
    link: "#",
    img: "/assets/img/icon-instagram.svg",
    class: "footer__social-icon",
  },
  {
    link: "#",
    img: "/assets/img/icon-pinterest.svg",
    class: "footer__social-icon",
  },
  {
    link: "#",
    img: "/assets/img/icon-youtube.svg",
    class: "footer__social-icon",
  },
];

const infoData = [
  { link: "#", class: "footer__link", desc: "Políticas de privacidad" },
  { link: "#", class: "footer__link", desc: "Términos y condiciones" },
  { link: "#", class: "footer__link", desc: "Centro de soporte" },
];

const accountData = [
  { link: "/login", class: "footer__link", desc: "Ingresa" },
  { link: "#", class: "footer__link", desc: "Carrito de compras" },
  { link: "#", class: "footer__link", desc: "Ayuda" },
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

const locationTemplate = (item) => `
    <p class="${item.class}">
      <span>${item.span}:</span>
      ${item.desc}
    </p>
  `;

const socialLinksTemplate = (social) => `
    <a href="${social.link}">
      <img src="${social.img}" alt="" class="${social.class}">
    </a>
  `;

const infoTemplate = (info) => `
    <li>
      <a href="${info.link}" class="${info.class}">${info.desc}</a>
    </li>
  `;

const accountTemplate = (account) => `
    <li>
      <a href="${account.link}" class="${account.class}">${account.desc}</a>
    </li>
  `;

document.addEventListener("DOMContentLoaded", () => {
  mapDataToHTML(locationData, "location", locationTemplate);
  mapDataToHTML(socialLinks, "social-links", socialLinksTemplate);
  mapDataToHTML(infoData, "footer-links", infoTemplate);
  mapDataToHTML(accountData, "account-links", accountTemplate);
});
