document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("lightbox-overlay");
  const overlayImg = document.getElementById("lightbox-img");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  triggers.forEach((img) => {
    img.addEventListener("click", () => {
  overlayImg.src = img.dataset.full || img.src;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    overlayImg.src = "";
  });
});