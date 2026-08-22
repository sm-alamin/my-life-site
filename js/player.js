document.addEventListener("DOMContentLoaded", () => {
  const speeds = [1, 1.25, 1.5, 0.75];
  const players = [];

  document.querySelectorAll(".audio-player").forEach((el, index) => {
    const src = el.dataset.src;
    const audio = new Audio(src);
    audio.addEventListener("error", () => {
  el.innerHTML = `
    <span class="format-warning">
      Your browser can't play this file directly —
      <a href="${src}" download>download it</a> to listen instead.
    </span>`;
});
    const playBtn = el.querySelector(".play-btn");
    const progressContainer = el.querySelector(".progress-container");
    const progressBar = el.querySelector(".progress-bar");
    const timeDisplay = el.querySelector(".time-display");
    const speedBtn = el.querySelector(".speed-btn");

    let isPlaying = false;
    let speedIndex = 0;

    const entry = { el, audio, playBtn };
    players.push(entry);

    function pauseAllOthers() {
      players.forEach((p) => {
        if (p.audio !== audio && !p.audio.paused) {
          p.audio.pause();
          p.playBtn.textContent = "▶";
        }
      });
    }

    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
      } else {
        pauseAllOthers();
        audio.play();
      }
    });

    audio.addEventListener("play", () => {
      isPlaying = true;
      playBtn.textContent = "⏸";
    });

    audio.addEventListener("pause", () => {
      isPlaying = false;
      playBtn.textContent = "▶";
    });

    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percent}%`;
      const mins = Math.floor(audio.currentTime / 60);
      const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
      timeDisplay.textContent = `${mins}:${secs}`;
    });

    audio.addEventListener("ended", () => {
      progressBar.style.width = "0%";
      const next = players[index + 1];
      if (next) {
        pauseAllOthers();
        next.audio.play();
        next.el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * audio.duration;
    });

    if (speedBtn) {
      speedBtn.addEventListener("click", () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        audio.playbackRate = speeds[speedIndex];
        speedBtn.textContent = `${speeds[speedIndex]}x`;
      });
    }
  });
});