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
const apiUrl = 'https://api.waifu.im/search'; // API URL for fetching waifu images
const displayedImages = new Set(); // Set to track displayed images

// Function to fetch data based on the provided tag
function fetchData(tag) {
  const params = new URLSearchParams({ included_tags: tag }); // Construct URL parameters with the included tag

  // Fetch image data based on the constructed URL
  fetch(`${apiUrl}?${params}`)
    .then(response => {
      // Check response status; throw error if not okay
      if (!response.ok) {
        throw new Error('Request failed with status code: ' + response.status);
      }
      return response.json(); // Parse response as JSON
    })
    .then(data => {
      // Handle the fetched data and display images
      console.log(data); // Log the fetched data
      handleImageData(data);
    })
    .catch(error => console.error('An error occurred:', error.message));
}

// Function to handle the fetched image data
function handleImageData(data) {
  // Get the container for displaying images
  const cardsContainer = document.getElementById('cards');

  // Check for valid image data
  if (data?.images?.length) {
    // Loop through the image data
    data.images.forEach(imageData => {
      // Retrieve image URL
      const imageUrl = imageData.url;

      // Prevent duplicate image display
      if (!displayedImages.has(imageUrl)) {
        // Create HTML for displaying the image with its source link
        const imageHtml = `<img src="${imageUrl}" alt="Waifu Image">`;
        const sourceUrl = imageData.source; // Assuming 'source' contains the image source URL
        cardsContainer.insertAdjacentHTML('beforeend', `<a href="${sourceUrl}" target="_blank">${imageHtml}</a>`);
        displayedImages.add(imageUrl); // Add displayed image URL to prevent duplicates
      }
    });
  } else {
    console.log('No valid image data available');
  }
}

// Add event listeners to elements with the class '.waifu'
document.querySelectorAll('.waifu').forEach(button => {
  button.addEventListener('click', () => {
    // Fetch data based on the value of the clicked button
    fetchData(button.value);
  });
});

// Add event listener to the element with the ID 'clearButton'
document.getElementById('clearButton').addEventListener('click', function() {
  // Get the container where images are displayed
  const cardsContainer = document.getElementById('cards');

  // Clear the container and the displayed images Set
  if (cardsContainer) {
    cardsContainer.innerHTML = '';
    displayedImages.clear();
  } else {
    console.error('Cards container not found');
  }
});
