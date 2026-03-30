const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");
const menuIcon = navToggle?.querySelector(".icon");
const pageTitle = document.querySelector("#page-title");
const templeGallery = document.querySelector("#temple-gallery");
const navLinks = document.querySelectorAll(".nav-link");
const largeView = window.matchMedia("(min-width: 720px)");

const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "images/aba_nigeria_temple_lds.jpeg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500,
    imageUrl: "images/accra_ghana_temple_lds.jpeg"
  },
  {
    templeName: "Harare Zimbabwe Temple",
    location: "Harare, Zimbabwe",
    dedicated: "2024-09-15",
    area: 17249,
    imageUrl: "images/harare_temple.jpeg"
  },
  {
    templeName: "Johannesburg South Africa Temple",
    location: "Johannesburg, South Africa",
    dedicated: "1985-08-24",
    area: 19184,
    imageUrl: "images/johannesburg_temple.jpeg"
  },
  {
    templeName: "Kinshasa DR Congo Temple",
    location: "Kinshasa, Democratic Republic of the Congo",
    dedicated: "2019-04-14",
    area: 12000,
    imageUrl: "images/kinshasa_temple.jpeg"
  },
  {
    templeName: "Nairobi Kenya Temple",
    location: "Nairobi, Kenya",
    dedicated: "2025-05-18",
    area: 19870,
    imageUrl: "images/nairobi_temple.jpeg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41010,
    imageUrl: "images/rome_italy_temple.jpeg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893-04-06",
    area: 253000,
    imageUrl: "images/salt_lake_temple_lds.jpeg"
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980-10-27",
    area: 53997,
    imageUrl: "images/tokyo_japan_temple.jpeg"
  },
  {
    templeName: "Manti Utah Temple",
    location: "Manti, Utah, United States",
    dedicated: "1888-05-21",
    area: 74792,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Mesa Arizona Temple",
    location: "Mesa, Arizona, United States",
    dedicated: "1927-10-23",
    area: 75000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/mesa-arizona-temple/mesa-arizona-temple-46561-main.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2022-05-22",
    area: 6861,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-63255.jpg"
  }
];

if (currentYear) {
  currentYear.textContent = `${new Date().getFullYear()}`;
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

function setNavState(open) {
  if (!navToggle || !primaryNav || !menuIcon) {
    return;
  }

  const shouldOpen = largeView.matches ? true : open;
  primaryNav.classList.toggle("open", shouldOpen);
  navToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  navToggle.setAttribute("aria-label", shouldOpen ? "Close navigation menu" : "Open navigation menu");
  menuIcon.textContent = shouldOpen ? "X" : "\u2630";
}

function toggleNav() {
  if (!primaryNav || largeView.matches) {
    return;
  }

  setNavState(!primaryNav.classList.contains("open"));
}

function formatDedicatedDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function createTempleCard(temple) {
  return `
    <article class="temple-card">
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName}"
        width="400"
        height="300"
        loading="lazy"
      >
      <div class="temple-card-content">
        <h2>${temple.templeName}</h2>
        <p><span class="label">Location:</span> ${temple.location}</p>
        <p><span class="label">Dedicated:</span> ${formatDedicatedDate(temple.dedicated)}</p>
        <p><span class="label">Area:</span> ${temple.area.toLocaleString()} square feet</p>
      </div>
    </article>
  `;
}

function displayTemples(templeList) {
  if (!templeGallery) {
    return;
  }

  templeGallery.innerHTML = templeList.map((temple) => createTempleCard(temple)).join("");
}

function filterTemples(filter) {
  if (!pageTitle) {
    return;
  }

  let filteredTemples = temples;

  if (filter === "old") {
    filteredTemples = temples.filter((temple) => new Date(temple.dedicated).getFullYear() < 1900);
  } else if (filter === "new") {
    filteredTemples = temples.filter((temple) => new Date(temple.dedicated).getFullYear() > 2000);
  } else if (filter === "large") {
    filteredTemples = temples.filter((temple) => temple.area > 90000);
  } else if (filter === "small") {
    filteredTemples = temples.filter((temple) => temple.area < 10000);
  }

  pageTitle.textContent = `${filter.charAt(0).toUpperCase()}${filter.slice(1)}`;
  displayTemples(filteredTemples);
}

navToggle?.addEventListener("click", toggleNav);

primaryNav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  event.preventDefault();
  filterTemples(event.target.dataset.filter ?? "home");

  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");
  });
  event.target.setAttribute("aria-current", "page");

  if (!largeView.matches) {
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
filterTemples("home");
