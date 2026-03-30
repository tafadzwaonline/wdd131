const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

function formatLastModified(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const year = date.getFullYear();
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modification: ${formatLastModified(document.lastModified)}`;
}
