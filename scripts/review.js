const reviewCount = document.querySelector("#reviewCount");
const confirmationMessage = document.querySelector("#confirmation-message");
const submissionDetails = document.querySelector("#submission-details");
const params = new URLSearchParams(window.location.search);

const productNames = {
  "fc-1888": "Flux Capacitor",
  "fc-2050": "Power Laces",
  "fs-1987": "Time Circuits",
  "ac-2000": "Low Voltage Reactor",
  "jj-1969": "Warp Equalizer"
};

function getFeatures() {
  return params.getAll("usefulFeatures");
}

function incrementReviewCounter() {
  if (!params.has("productName")) {
    return Number(localStorage.getItem("reviewCount") ?? "0");
  }

  const currentCount = Number(localStorage.getItem("reviewCount") ?? "0") + 1;
  localStorage.setItem("reviewCount", `${currentCount}`);
  return currentCount;
}

function renderSubmissionDetails() {
  if (!submissionDetails || !params.has("productName")) {
    return;
  }

  const productId = params.get("productName");
  const features = getFeatures();
  const featuresText = features.length > 0 ? features.join(", ") : "No features selected";
  const userName = params.get("userName")?.trim() || "Anonymous";
  const writtenReview = params.get("writtenReview")?.trim() || "No written review provided";

  confirmationMessage.textContent = `Your review for ${productNames[productId] ?? "the selected product"} was submitted successfully.`;
  submissionDetails.innerHTML = `
    <dt>Product</dt>
    <dd>${productNames[productId] ?? productId}</dd>
    <dt>Rating</dt>
    <dd>${params.get("overallRating")} out of 5</dd>
    <dt>Installation Date</dt>
    <dd>${params.get("installDate")}</dd>
    <dt>Useful Features</dt>
    <dd>${featuresText}</dd>
    <dt>User Name</dt>
    <dd>${userName}</dd>
    <dt>Written Review</dt>
    <dd>${writtenReview}</dd>
  `;
}

const totalReviews = incrementReviewCounter();

if (reviewCount) {
  reviewCount.textContent = `${totalReviews}`;
}

renderSubmissionDetails();
