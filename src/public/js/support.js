document
  .getElementById("form-support")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const btnC = document.getElementById("button");
    emailjs.init("oAK3ECG81WXECBdp8");
    btnC.value = "Enviando Mensaje...";

    try {
      const serviceID = "service_snv83rj";
      const templateID = "template_pkk49xw";
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          btnC.value = "Enviar Solicitud";
          Toastify({
            text: "Mensaje enviado con éxito!",
            duration: 3000,
            gravity: "top",
            position: "right",
            background: "#28a745",
            className: "toast-success",
          }).showToast();
        },
        (err) => {
          btnC.value = "Enviar Solicitud";
          Toastify({
            text: "Error al enviar el mensaje. Inténtalo de nuevo.",
            duration: 3000,
            gravity: "top",
            position: "right",
            background: "#dc3545",
            className: "toast-error",
          }).showToast();
          console.error("Error al enviar el mensaje:", err);
        }
      );
    } catch (error) {
      btnC.value = "Enviar Solicitud";
      Toastify({
        text: "Error al enviar el mensaje. Inténtalo más tarde.",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "#dc3545",
        className: "toast-error",
      }).showToast();
      console.error("Error:", error);
    }
  });
