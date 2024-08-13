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
loadMoreBtn.textContent = 'Load More';
loadMoreBtn.classList.add('btn', 'btn-secondary');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  page = 1;

  if (query === '') {
    showNotification('Please enter a search query', 'error');
    clearGallery();
    loadMoreBtn.style.display = 'none';
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
      loadMoreBtn.style.display = 'none';
    } else {
      renderImages(data.hits);
      loadMoreBtn.style.display = totalHits > 15 ? 'block' : 'none';
    }
  } catch (error) {
    loader.style.display = 'none';
    showNotification('An error occurred. Please try again later.', 'error');
    loadMoreBtn.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';

    if (data.hits.length === 0 || page * 15 >= totalHits) {
      showNotification(
        'Sorry, but you have reached the end of search results.',
        'info'
      );
      loadMoreBtn.style.display = 'none';
    } else {
      renderImages(data.hits);
      window.scrollBy({
        top:
          document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect().height * 2,
        behavior: 'smoth',
      });
    }
  } catch (error) {
    loader.style.display = 'none';
    showNotification('An error occured. Please try again later.', 'error');
  }
});
