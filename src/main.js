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

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  if (query === '') {
    showNotification('Please enter a search query', 'error');
    clearGallery();
    return;
  }

  loader.style.display = 'block';

  try {
    const data = await fetchImages(query);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
      clearGallery();
    } else {
      renderImages(data.hits);
    }
  } catch (error) {
    loader.style.display = 'none';
    showNotification('An error occurred. Please try again later.', 'error');
    clearGallery();
  }
});
