const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperature = 8;
const windSpeed = 12;
const windChill = document.querySelector("#wind-chill");

function calculateWindChill(tempCelsius, speedKmH) {
  return `${(13.12 + 0.6215 * tempCelsius - 11.37 * speedKmH ** 0.16 + 0.3965 * tempCelsius * speedKmH ** 0.16).toFixed(1)} \u00B0C`;
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (windChill) {
  windChill.textContent = temperature <= 10 && windSpeed > 4.8
    ? calculateWindChill(temperature, windSpeed)
    : "N/A";
}
