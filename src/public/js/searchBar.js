document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "search-results";
  resultsContainer.classList.add("search-results");
  searchInput.parentElement.appendChild(resultsContainer);

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    if (query.length >= 2) {
      fetchProducts(query);
    } else {
      resultsContainer.innerHTML = "";
    }
  });

  async function fetchProducts(query) {
    try {
      const response = await fetch(
        `/api/v1/products/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        displayResults(data.products);
      } else {
        resultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
      }
    } catch (error) {
      console.error("Error al buscar productos:", error);
      resultsContainer.innerHTML = "<p>Error en la búsqueda.</p>";
    }
  }

  function displayResults(products) {
    resultsContainer.innerHTML = "";

    if (products.length === 0) {
      resultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("search-result-item");
      productElement.innerHTML = `
                <img src="${
                  product.image || "/assets/img/default-product.png"
                }" alt="${product.title}">
                <div>
                    <h4 class="title-search">${product.title}</h4>
                    <p>${
                      product.price
                    } <span class="title-search">COP</span></p>
                </div>
            `;
      productElement.addEventListener("click", () => {
        window.location.href = `/tienda/${product._id}`;
      });
      resultsContainer.appendChild(productElement);
    });
  }

  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !resultsContainer.contains(event.target)
    ) {
      resultsContainer.innerHTML = "";
    }
  });
});
