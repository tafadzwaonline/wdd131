const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");
const menuIcon = navToggle?.querySelector(".icon");
const largeView = window.matchMedia("(min-width: 720px)");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

function setNavState(open) {
  if (!navToggle || !primaryNav || !menuIcon) {
    return;
  }

  const isDesktop = largeView.matches;
  const shouldOpen = isDesktop ? true : open;

  primaryNav.classList.toggle("open", shouldOpen);
  navToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  navToggle.setAttribute(
    "aria-label",
    shouldOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuIcon.textContent = shouldOpen ? "X" : "\u2630";
}

function toggleNav() {
  if (!primaryNav || largeView.matches) {
    return;
  }

  setNavState(!primaryNav.classList.contains("open"));
}

navToggle?.addEventListener("click", toggleNav);

primaryNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement && !largeView.matches) {
    setNavState(false);
  }
});

window.addEventListener("resize", () => {
  setNavState(false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryNav?.classList.contains("open") && !largeView.matches) {
    setNavState(false);
  }
});

setNavState(false);
