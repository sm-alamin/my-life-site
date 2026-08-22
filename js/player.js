document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".audio-player").forEach((player) => {
    const src = player.dataset.src;
    const audio = new Audio(src);
    const playBtn = player.querySelector(".play-btn");
    const progressContainer = player.querySelector(".progress-container");
    const progressBar = player.querySelector(".progress-bar");
    const timeDisplay = player.querySelector(".time-display");

    let isPlaying = false;

    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? "⏸" : "▶";
    });

    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percent}%`;

      const mins = Math.floor(audio.currentTime / 60);
      const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
      timeDisplay.textContent = `${mins}:${secs}`;
    });

    audio.addEventListener("ended", () => {
      isPlaying = false;
      playBtn.textContent = "▶";
      progressBar.style.width = "0%";
    });

    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.currentTime = percent * audio.duration;
    });
  });
});