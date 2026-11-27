// Filter proyek berdasarkan kategori.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    projectCards.forEach((card) => {
      const matchesCategory =
        category === "semua" || card.dataset.category === category;

      card.classList.toggle("hidden", !matchesCategory);
    });
  });
});

// Menu navigasi untuk layar kecil.
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = mobileNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", menuIsOpen);
    menuButton.textContent = menuIsOpen ? "×" : "☰";
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

// Sorot menu sesuai bagian halaman yang sedang dibaca.
const pageSections = document.querySelectorAll("main section[id]");
const desktopNavLinks = document.querySelectorAll(".side-nav .nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        desktopNavLinks.forEach((link) => {
          const isCurrentSection =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isCurrentSection);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
    }
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}
