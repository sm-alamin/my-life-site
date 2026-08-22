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

  // Safety net: force visibility after 2s no matter what,
  // so content never stays permanently hidden.
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
      el.classList.add("in-view");
    });
  }, 2000);

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

document.addEventListener("DOMContentLoaded", () => {
  const dataEl = document.getElementById("quotes-data");
  if (!dataEl) return;

  const quotes = JSON.parse(dataEl.textContent);
  const textEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");
  const btn = document.getElementById("new-quote-btn");

  let lastIndex = -1;

  function showRandomQuote() {
    let index;
    do {
      index = Math.floor(Math.random() * quotes.length);
    } while (index === lastIndex && quotes.length > 1);
    lastIndex = index;

    const q = quotes[index];
    textEl.textContent = `"${q.text}"`;
    authorEl.textContent = q.author ? `— ${q.author}` : "— Al Amin";
  }

  showRandomQuote();
  if (btn) btn.addEventListener("click", showRandomQuote);
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("post-search");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const grid = document.getElementById("posts-grid");
  const noResults = document.getElementById("no-results");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".card"));
  let activeFilter = "All";

  function applyFilters() {
    const query = (searchInput.value || "").toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesCategory = activeFilter === "All" || card.dataset.category === activeFilter;
      const matchesSearch = !query || card.dataset.title.includes(query);
      const show = matchesCategory && matchesSearch;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
    setupPagination("posts-grid", "posts-pagination", 5);
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeFilter = tab.dataset.filter;
      applyFilters();
    });
  });
});