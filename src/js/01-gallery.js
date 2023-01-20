import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryBox = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryBox.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      image => `
<div class="gallery__item">
  <a class="gallery__link" href="${image.original}">
    <img
      class="gallery__image"
      src="${image.preview}"
      alt="${image.description}"
    />
  </a>
</div>
`
    )
    .join('');
}

let gallerySet = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);

// captionsData (за замовч title) - get the caption from given attribute
// captionDelay (за замовч 0) - adds a delay before the caption shows (in ms)
