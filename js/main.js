// Main script for feed tabs and sidebar popup

// Feed tabs switching
const tabs = document.querySelectorAll(".feed-tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  });
});

// More popup menu toggle
const moreBtn = document.getElementById("moreBtn");
const moreMenu = document.getElementById("moreMenu");

function closeMoreMenu() {
  if (!moreMenu) return;
  moreMenu.classList.remove("is-open");
  if (moreBtn) moreBtn.setAttribute("aria-expanded", "false");
}

if (moreBtn && moreMenu) {
  moreBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = moreMenu.classList.toggle("is-open");
    moreBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!moreMenu.classList.contains("is-open")) return;
    if (!event.target.closest(".more-wrap")) closeMoreMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMoreMenu();
  });
}
