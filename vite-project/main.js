/* const URL = "https://api.waifu.im/search";

async function fetchWaifuData() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem fetching data:', error);
    return null;
  }
}
 */
// API URL
const apiUrl = "https://api.waifu.im/search";

//prevent duplicates
const displayedImages = new Set();

// Fetch and display data based on the provided tag
function fetchData(tag) {
  // Construct URL parameters with the included tag
  const params = new URLSearchParams({ included_tags: tag });

  // Fetch image data and handle the result
  fetch(`${apiUrl}?${params}`)
    .then((response) =>
      response.ok ? response.json() : Promise.reject("Failed to fetch")
    )
    .then((data) => handleImageData(data))
    .catch((error) => console.error("An error occurred:", error.message));
}

// Handle the fetched image data and display images
function handleImageData(data) {
  // Get the container for displaying images
  const cardsContainer = document.getElementById("cards");

  // Check for valid image data
  if (data?.images?.length) {
    // Loop through the image data
    data.images.forEach((imageData) => {
      // Retrieve image URL
      const imageUrl = imageData.url;

      // Prevent duplicate image display
      if (!displayedImages.has(imageUrl)) {
        // Create HTML for displaying the image with its source link
        const imageHtml = `<img src="${imageUrl}" alt="Waifu Image">`;
        const sourceUrl = imageData.source; // Assuming 'source' contains the image source URL
        cardsContainer.insertAdjacentHTML(
          "beforeend",
          `<a href="${sourceUrl}" target="_blank">${imageHtml}</a>`
        );
        // Add displayed image URL to prevent duplicates
        displayedImages.add(imageUrl);
      }
    });
  } else {
    console.log("No valid image data available");
  }
}

// Add event listeners
document.querySelectorAll(".waifu").forEach((button) => {
  button.addEventListener("click", () => fetchData(button.value));
});

// Add an event listener
document.getElementById("clearButton").addEventListener("click", function () {
  // Get the container where images are displayed
  const cardsContainer = document.getElementById("cards");

  // Clear the container and the displayed images Set
  cardsContainer
    ? ((cardsContainer.innerHTML = ""), displayedImages.clear())
    : console.error("Cards container not found");
});

// Fetch a random waifu image on page load
window.addEventListener("load", () => {
  // Fetch a random waifu image using the API
  fetch(apiUrl)
    .then((response) =>
      response.ok ? response.json() : Promise.reject("Failed to fetch")
    )
    .then((data) => handleImageData(data))
    .catch((error) => console.error("An error occurred:", error.message));
});
