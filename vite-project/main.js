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
const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL

function fetchData(tag) {
  const params = new URLSearchParams({
    included_tags: tag});

  fetch(`${apiUrl}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status code: ' + response.status);
      }
      return response.json();
    })
    .then(displayImages)
    .catch(error => console.error('An error occurred:', error.message));
}

function displayImages(data) {
  console.log(data)
  const cardsContainer = document.getElementById('cards');

  if (data?.images?.length) {
    data.images.forEach(imageData => {
      const imageUrl = imageData.url;
      const imageHtml = `<img src="${imageUrl}" alt="Waifu Image">`;
      cardsContainer.insertAdjacentHTML('beforeend', `<a href="${imageUrl}" target="_blank">${imageHtml}</a>`);
    });
  } else {
    console.log('No valid image data available');
  }
}

const buttons = document.querySelectorAll('.waifu');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    fetchData(button.value);
  });
});

document.getElementById('clearButton').addEventListener('click', function() {
  const cardsContainer = document.getElementById('cards');
  if (cardsContainer) {
    cardsContainer.innerHTML = '';
  } else {
    console.error('Cards container not found');
  }
});
