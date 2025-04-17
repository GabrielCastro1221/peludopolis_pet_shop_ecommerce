const date = new Date();

export const fechaCompra = date.toLocaleDateString("es-MX", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
