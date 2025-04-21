const urlParams = new URLSearchParams(window.location.search);
const sort = urlParams.get("sort");
const select = document.getElementById("filter-select");

if (sort) {
  select.value = `/tienda?sort=${sort}`;
}

select.addEventListener("change", function () {
  const selectedValue = this.value;
  window.location.href = selectedValue;
});
