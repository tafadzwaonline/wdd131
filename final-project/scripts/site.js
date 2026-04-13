const destinations = [
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    region: "west",
    type: "nature",
    season: "year-round",
    pace: "active",
    summary: "A dramatic waterfall destination with scenic viewpoints, river activities, and iconic mist-filled views.",
    image: "images/victoria-falls.svg"
  },
  {
    id: "hwange",
    name: "Hwange National Park",
    region: "west",
    type: "wildlife",
    season: "dry",
    pace: "balanced",
    summary: "Zimbabwe's largest national park, known for elephant sightings and rewarding safari experiences.",
    image: "images/hwange.svg"
  },
  {
    id: "great-zimbabwe",
    name: "Great Zimbabwe",
    region: "south",
    type: "heritage",
    season: "year-round",
    pace: "relaxed",
    summary: "A heritage landmark with stone architecture that reveals an important part of the country's history.",
    image: "images/great-zimbabwe.svg"
  },
  {
    id: "eastern-highlands",
    name: "Eastern Highlands",
    region: "north",
    type: "nature",
    season: "green",
    pace: "relaxed",
    summary: "A cooler mountain region with forests, valleys, and scenic drives for travelers who enjoy calm landscapes.",
    image: "images/eastern-highlands.svg"
  },
  {
    id: "matobo",
    name: "Matobo Hills",
    region: "south",
    type: "heritage",
    season: "dry",
    pace: "balanced",
    summary: "A rocky landscape where natural scenery, cultural stories, and historical significance come together.",
    image: "images/matobo-hills.svg"
  },
  {
    id: "kariba",
    name: "Lake Kariba",
    region: "north",
    type: "wildlife",
    season: "year-round",
    pace: "relaxed",
    summary: "A lakeside escape suited to sunset views, fishing experiences, and slower travel rhythms.",
    image: "images/lake-kariba.svg"
  }
];

function setFooterDates() {
  const currentYear = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");

  if (currentYear) {
    currentYear.textContent = `${new Date().getFullYear()}`;
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function getFavorites() {
  const storedFavorites = localStorage.getItem("ztg-favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("ztg-favorites", JSON.stringify(favorites));
}

function toggleFavorite(destinationId) {
  const currentFavorites = getFavorites();
  const updatedFavorites = currentFavorites.includes(destinationId)
    ? currentFavorites.filter((favoriteId) => favoriteId !== destinationId)
    : [...currentFavorites, destinationId];

  saveFavorites(updatedFavorites);
  refreshCurrentPage();
}

function createCardMarkup(destination, favorites) {
  const isSaved = favorites.includes(destination.id);
  const buttonLabel = isSaved ? "Remove from favorites" : "Save to favorites";
  const typeLabel = destination.type.charAt(0).toUpperCase() + destination.type.slice(1);
  const seasonLabel = destination.season === "year-round"
    ? "Year-round"
    : `${destination.season.charAt(0).toUpperCase() + destination.season.slice(1)} season`;
  const regionLabel = destination.region.charAt(0).toUpperCase() + destination.region.slice(1);
  const paceLabel = destination.pace.charAt(0).toUpperCase() + destination.pace.slice(1);

  return `
    <article class="card">
      <img
        class="card-image"
        src="${destination.image}"
        alt="${destination.name} travel illustration"
        width="800"
        height="600"
        loading="lazy"
      >
      <div class="card-content">
        <div class="tag-row">
          <span class="tag">${typeLabel}</span>
          <span class="tag">${seasonLabel}</span>
        </div>
        <h3>${destination.name}</h3>
        <p>${destination.summary}</p>
        <div class="meta-row">
          <span class="meta">Region: ${regionLabel}</span>
          <span class="meta">Pace: ${paceLabel}</span>
        </div>
        <button class="button favorite-button" type="button" data-favorite="${destination.id}">
          ${buttonLabel}
        </button>
      </div>
    </article>
  `;
}

function attachFavoriteEvents() {
  const buttons = document.querySelectorAll("[data-favorite]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleFavorite(button.dataset.favorite);
    });
  });
}

function renderFeatured() {
  const featuredGrid = document.querySelector("#featured-grid");
  if (!featuredGrid) {
    return;
  }

  const favorites = getFavorites();
  const featuredDestinations = destinations.slice(0, 3);
  featuredGrid.innerHTML = featuredDestinations
    .map((destination) => createCardMarkup(destination, favorites))
    .join("");

  attachFavoriteEvents();
}

function updateFavoritesSummary() {
  const summary = document.querySelector("#favorites-summary");
  if (!summary) {
    return;
  }

  const favorites = getFavorites();
  if (favorites.length === 0) {
    summary.textContent = "You have not saved any destinations yet. Browse the guide and build your shortlist.";
  } else {
    const savedNames = destinations
      .filter((destination) => favorites.includes(destination.id))
      .map((destination) => destination.name)
      .join(", ");
    const noun = favorites.length === 1 ? "favorite" : "favorites";
    summary.textContent = `You have ${favorites.length} saved ${noun}: ${savedNames}.`;
  }
}

function getFilteredDestinations() {
  const regionValue = document.querySelector("#region-filter")?.value ?? "all";
  const typeValue = document.querySelector("#type-filter")?.value ?? "all";
  const seasonValue = document.querySelector("#season-filter")?.value ?? "all";

  return destinations.filter((destination) => {
    const matchesRegion = regionValue === "all" || destination.region === regionValue;
    const matchesType = typeValue === "all" || destination.type === typeValue;
    const matchesSeason = seasonValue === "all" || destination.season === seasonValue;
    return matchesRegion && matchesType && matchesSeason;
  });
}

function renderDestinations() {
  const grid = document.querySelector("#destinations-grid");
  const summary = document.querySelector("#results-summary");
  if (!grid || !summary) {
    return;
  }

  const filteredDestinations = getFilteredDestinations();
  const favorites = getFavorites();

  if (filteredDestinations.length === 0) {
    grid.innerHTML = `
      <article class="panel">
        <h3>No destinations matched</h3>
        <p>Try adjusting the filters to widen the selection.</p>
      </article>
    `;
    summary.textContent = "0 destinations found.";
    return;
  }

  grid.innerHTML = filteredDestinations
    .map((destination) => createCardMarkup(destination, favorites))
    .join("");
  const noun = filteredDestinations.length === 1 ? "destination" : "destinations";
  summary.textContent = `${filteredDestinations.length} ${noun} found.`;

  attachFavoriteEvents();
}

function attachFilterEvents() {
  const filterInputs = document.querySelectorAll(".filter-form select");
  filterInputs.forEach((input) => {
    input.addEventListener("change", renderDestinations);
  });
}

function setupMenu() {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", `${isOpen}`);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function refreshCurrentPage() {
  const page = document.body.dataset.page;

  if (page === "home") {
    renderFeatured();
    updateFavoritesSummary();
  }

  if (page === "destinations") {
    renderDestinations();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setFooterDates();
  setupMenu();
  refreshCurrentPage();

  if (document.body.dataset.page === "destinations") {
    attachFilterEvents();
  }
});
