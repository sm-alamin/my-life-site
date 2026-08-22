document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));

  const header = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  setupPagination("posts-grid", "posts-pagination", 5);
});

function setupPagination(gridId, paginationId, pageSize) {
  const grid = document.getElementById(gridId);
  const pagination = document.getElementById(paginationId);
  if (!grid || !pagination) return;

  const items = Array.from(grid.children);
  const totalPages = Math.ceil(items.length / pageSize);
  if (totalPages <= 1) return;

  function showPage(page) {
    items.forEach((item, i) => {
      const itemPage = Math.floor(i / pageSize) + 1;
      item.style.display = itemPage === page ? "" : "none";
    });
    pagination.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.page) === page);
    });
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.dataset.page = i;
    btn.addEventListener("click", () => showPage(i));
    pagination.appendChild(btn);
  }

  showPage(1);
}
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const setIcon = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    toggle.textContent = isDark ? "☀️" : "🌙";
  };
  setIcon();

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setIcon();
  });
});