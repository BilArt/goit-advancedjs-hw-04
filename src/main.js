import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderImages,
  showNotification,
} from './js/render-functions.js';
import './css/loader.css';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('btn', 'btn-secondary');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

let query = '';
let page = 1;
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  page = 1;
  loadedHits = 0;

  if (query === '') {
    showNotification('Please enter a search query', 'error');
    clearGallery();
    loadMoreBtn.style.display = 'none';
    return;
  }

  clearGallery();
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none'; // Спочатку ховаємо кнопку "Load more"

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNotification('Sorry, no images found. Please try again!', 'error');
      loadMoreBtn.style.display = 'none';
    } else {
      renderImages(data.hits);
      loadedHits += data.hits.length;
      loadMoreBtn.style.display = loadedHits < totalHits ? 'block' : 'none';

      if (loadedHits >= totalHits) {
        showNotification("We're sorry, but you've reached the end of search results.", 'info');
      }
    }
  } catch (error) {
    loader.style.display = 'none';
    showNotification('An error occurred. Please try again later.', 'error');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';

    if (data.hits.length > 0) {
      renderImages(data.hits);
      loadedHits += data.hits.length;
      loadMoreBtn.style.display = loadedHits < totalHits ? 'block' : 'none';

      window.scrollBy({
        top: document.querySelector('.gallery').firstElementChild.getBoundingClientRect().height * 2,
        behavior: 'smooth'
      });

      if (loadedHits >= totalHits) {
        showNotification("We're sorry, but you've reached the end of search results.", 'info');
        loadMoreBtn.style.display = 'none';
      }
    }
  } catch (error) {
    loader.style.display = 'none';
    showNotification('An error occurred. Please try again later.', 'error');
  }
});
