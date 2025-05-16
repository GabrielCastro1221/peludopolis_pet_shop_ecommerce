document.addEventListener("DOMContentLoaded", function () {
  const playIcon = document.querySelector(".play-icon");
  const videoPlayer = document.querySelector(".video-player");
  const video = videoPlayer.querySelector("video");

  playIcon.addEventListener("click", function () {
    videoPlayer.classList.remove("hide");
    video.muted = false;
    video.play();
  });

  videoPlayer.addEventListener("click", function (event) {
    if (event.target === videoPlayer) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      videoPlayer.classList.add("hide");
    }
  });
});
