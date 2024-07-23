'use strict';

export function createGalleryItemMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}">
        </a>
        <ul class="image-info">
          <li>
            <h3 class="image-title">Likes</h3>
            <p class="image-stats">${likes}</p>
          </li>
          <li>
            <h3 class="image-title">Views</h3>
            <p class="image-stats">${views}</p>
          </li>
          <li>
            <h3 class="image-title">Comments</h3>
            <p class="image-stats">${comments}</p>
          </li>
          <li>
            <h3 class="image-title">Downloads</h3>
            <p class="image-stats">${downloads}</p>
          </li>
        </ul>
      </li>`;
}
