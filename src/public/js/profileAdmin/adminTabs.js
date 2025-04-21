document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-target]");
  const tabContent = document.querySelectorAll(".tab__content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);
      tabContent.forEach((content) => {
        content.classList.remove("active-tab");
        content.style.display = "none";
      });

      target.classList.add("active-tab");
      target.style.display = "block";

      tabs.forEach((t) => t.classList.remove("active-tab"));

      tab.classList.add("active-tab");
    });
  });

  if (tabs.length > 0) {
    tabs[0].classList.add("active-tab");
    const firstTabTarget = document.querySelector(tabs[0].dataset.target);
    if (firstTabTarget) {
      firstTabTarget.classList.add("active-tab");
      firstTabTarget.style.display = "block";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector(".logout-button");
  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login";
  });
});
