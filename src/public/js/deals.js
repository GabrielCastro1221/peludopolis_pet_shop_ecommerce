document.addEventListener("DOMContentLoaded", function () {
  function startCountdown(id, durationDays) {
    const countdownElement = document.getElementById(id);
    const key = `countdown-${id}`;
    let endTime = localStorage.getItem(key);

    if (!endTime) {
      endTime = new Date().getTime() + durationDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, endTime);
    } else {
      endTime = parseInt(endTime);
    }

    function updateCountdown() {
      const now = new Date().getTime();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        countdownElement.innerHTML = "<p>¡La oferta ha finalizado!</p>";
        clearInterval(interval);
        localStorage.removeItem(key);
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
                <div class="countdown__amount">
                    <p class="countdown__period">${days}</p>
                    <span class="unit">Días</span>
                </div>
                <div class="countdown__amount">
                    <p class="countdown__period">${hours}</p>
                    <span class="unit">Horas</span>
                </div>
                <div class="countdown__amount">
                    <p class="countdown__period">${minutes}</p>
                    <span class="unit">Mins</span>
                </div>
                <div class="countdown__amount">
                    <p class="countdown__period">${seconds}</p>
                    <span class="unit">Segs</span>
                </div>
            `;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  startCountdown("countdown-sale", 2);
  startCountdown("countdown-event", 15);
});
