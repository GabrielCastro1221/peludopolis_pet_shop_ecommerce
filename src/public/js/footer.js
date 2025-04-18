const locationData = [
  {
    class: "footer__description",
    span: "Dirección",
    desc: "562 Wellington Road, Street 32, San Fransisco",
  },
  {
    class: "footer__description",
    span: "Teléfono",
    desc: "+01 2222 365 /(+91) 01 2345 6789",
  },
  {
    class: "footer__description",
    span: "Horario",
    desc: "10:00 - 18:00, Mon - Sat",
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
  { link: "#", class: "footer__link", desc: "Mi cuenta" },
  { link: "#", class: "footer__link", desc: "Información de entrega" },
  { link: "#", class: "footer__link", desc: "Políticas de privacidad" },
  { link: "#", class: "footer__link", desc: "Términos y condiciones" },
  { link: "#", class: "footer__link", desc: "Contáctanos" },
  { link: "#", class: "footer__link", desc: "Centro de soporte" },
];

const accountData = [
  { link: "/login", class: "footer__link", desc: "Ingresa" },
  { link: "#", class: "footer__link", desc: "Carrito de compras" },
  { link: "#", class: "footer__link", desc: "Favoritos" },
  { link: "#", class: "footer__link", desc: "Orden de seguimiento" },
  { link: "#", class: "footer__link", desc: "Ayuda" },
  { link: "#", class: "footer__link", desc: "Órdenes" },
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
