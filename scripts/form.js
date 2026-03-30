const products = [
  {
    id: "fc-1888",
    name: "Flux Capacitor"
  },
  {
    id: "fc-2050",
    name: "Power Laces"
  },
  {
    id: "fs-1987",
    name: "Time Circuits"
  },
  {
    id: "ac-2000",
    name: "Low Voltage Reactor"
  },
  {
    id: "jj-1969",
    name: "Warp Equalizer"
  }
];

const productSelect = document.querySelector("#productName");

function populateProducts() {
  if (!productSelect) {
    return;
  }

  const optionsMarkup = products
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join("");

  productSelect.insertAdjacentHTML("beforeend", optionsMarkup);
}

populateProducts();
