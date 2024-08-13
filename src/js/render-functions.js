import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery__item">
            <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
            </div>
        </a>
    `
    )
    .join('');

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function showNotification(message, type = 'info') {
  iziToast.show({
    message,
    position: 'topRight',
    color: type,
  });
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
