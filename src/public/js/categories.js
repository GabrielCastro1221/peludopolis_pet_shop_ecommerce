const categories = [
    { link: "/tienda", img: "/assets/img/category-1.jpg", category: "Alimento" },
    { link: "/tienda", img: "/assets/img/category-2.jpg", category: "Juguetes" },
    { link: "/tienda", img: "/assets/img/category-3.jpg", category: "Accesorios" },
    { link: "/tienda", img: "/assets/img/category-4.jpg", category: "Higiene" },
    { link: "/tienda", img: "/assets/img/category-5.jpg", category: "Seguridad" },
    { link: "/tienda", img: "/assets/img/category-6.jpg", category: "Transporte" },
    { link: "/tienda", img: "/assets/img/category-7.jpg", category: "Salud" },
    { link: "/tienda", img: "/assets/img/category-8.jpg", category: "Tecnologia" },
  ];

  const defaultConfig = {
    linkClass: "category__item swiper-slide",
    imgClass: "category__img",
    categoryClass: "category__title",
  };
  
  const generateCategories = (categories, config) => {
    return categories
      .map(
        (category) => `
          <a href="${category.link}" class="${config.linkClass}">
            <img src="${category.img}" alt="${category.category}" class="${config.imgClass}" />
            <h3 class="${config.categoryClass}">${category.category}</h3>
          </a>
        `
      )
      .join("");
  };
  
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = generateCategories(categories, defaultConfig);
  