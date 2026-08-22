document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  let width, height, particles;

  function resize() {
    const hero = canvas.closest(".hero");
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(55, Math.floor(width / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.5,
      speed: Math.random() * 0.25 + 0.08,
      drift: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.35 + 0.12
    }));
  }

  function currentColor() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return isDark ? "255, 255, 255" : "32, 48, 58";
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const rgb = currentColor();

    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
      ctx.fill();
    });

    if (!prefersReduced) requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
});