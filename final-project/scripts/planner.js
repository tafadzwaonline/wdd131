function readSavedPlan() {
  const savedPlan = localStorage.getItem("ztg-plan");
  return savedPlan ? JSON.parse(savedPlan) : null;
}

function writeSavedPlan(plan) {
  localStorage.setItem("ztg-plan", JSON.stringify(plan));
}

function chooseDestination(interest, season, pace) {
  if (interest === "wildlife" && season === "dry") {
    return "Hwange National Park";
  }

  if (interest === "heritage") {
    return pace === "active" ? "Matobo Hills" : "Great Zimbabwe";
  }

  if (interest === "nature" && season === "green") {
    return "Eastern Highlands";
  }

  return pace === "relaxed" ? "Lake Kariba" : "Victoria Falls";
}

function buildRecommendationMarkup(plan) {
  const favoriteText = plan.includeFavorites && plan.favorites.length > 0
    ? `Saved favorites to consider as extras: ${plan.favorites.join(", ")}.`
    : "No saved favorites were added to this suggestion.";

  return `
    <article>
      <h3>${plan.name}, your suggested trip focus is ${plan.destination}</h3>
      <p>
        Based on a ${plan.pace} pace, a ${plan.season} season preference, and your interest in
        ${plan.interest}, this destination is a strong match for your trip style.
      </p>
      <p>${favoriteText}</p>
    </article>
  `;
}

function renderSavedPlan() {
  const output = document.querySelector("#planner-output");
  if (!output) {
    return;
  }

  const savedPlan = readSavedPlan();
  if (!savedPlan) {
    return;
  }

  output.innerHTML = buildRecommendationMarkup(savedPlan);
}

function handlePlannerSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = document.querySelector("#traveler-name").value.trim();
  const season = document.querySelector("#travel-season").value;
  const interest = form.querySelector('input[name="interest"]:checked').value;
  const pace = document.querySelector("#trip-pace").value;
  const includeFavorites = document.querySelector("#want-saved-favorites").checked;

  const favoriteIds = JSON.parse(localStorage.getItem("ztg-favorites") ?? "[]");
  const favoriteNames = destinations
    .filter((destination) => favoriteIds.includes(destination.id))
    .map((destination) => destination.name);

  const plan = {
    name,
    season,
    interest,
    pace,
    includeFavorites,
    favorites: favoriteNames,
    destination: chooseDestination(interest, season, pace)
  };

  writeSavedPlan(plan);
  document.querySelector("#planner-output").innerHTML = buildRecommendationMarkup(plan);
}

document.addEventListener("DOMContentLoaded", () => {
  const tripForm = document.querySelector("#trip-form");
  if (!tripForm) {
    return;
  }

  renderSavedPlan();
  tripForm.addEventListener("submit", handlePlannerSubmit);
});
