
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');

const simpleLightbox = new SimpleLightbox(
  '.gallery .gallery-link', {captionsData: 'alt'}
);

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          <p>Likes <span>${likes}</span></p>
          <p>Views <span>${views}</span></p>
          <p>Comments <span>${comments}</span></p>
          <p>Downloads <span>${downloads}</span></p>
          </a>
        </li>`
  ).join("");
  galleryEl.innerHTML = markup;
  simpleLightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader(element) {
  element.classList.remove('hidden');
}

export function hideLoader(element) {
  element.classList.add('hidden');
}

