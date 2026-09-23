// Main script for views, tabs and sidebar popup

// Tab switching scoped per tablist container
function setupTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const tabs = container.querySelectorAll(".feed-tab");
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
}

setupTabs(".feed-tabs");
setupTabs(".explore-tabs");

// Home / Explore view switching
const viewLinks = document.querySelectorAll("[data-view]");
const homeView = document.getElementById("homeView");
const exploreView = document.getElementById("exploreView");

function showView(viewName) {
  if (!homeView || !exploreView) return;
  const isExplore = viewName === "explore";
  homeView.hidden = isExplore;
  exploreView.hidden = !isExplore;
  viewLinks.forEach((link) => {
    const active = link.getAttribute("data-view") === viewName;
    link.classList.toggle("is-active", active);
  });
  document.title = isExplore ? "Explore / X" : "Home / X";
}

viewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showView(link.getAttribute("data-view"));
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
