export function renderGalleryItem({
  webformatURL = "",
  largeImageURL = "",
  tags = "",
  likes = 0,
  views = 0,
  comments = 0,
  downloads = 0,
}) {
  const shortTags = tags.split(",").slice(0, 5).join(", "); // Limit to 5 tags

  return `
      <li class="gallery__item">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${shortTags}">
        </a>
        <ul class="image__info">
          <li>
            <h3 class="image__title">Likes</h3>
            <p class="image__stats">${likes}</p>
          </li>
          <li>
            <h3 class="image__title">Views</h3>
            <p class="image__stats">${views}</p>
          </li>
          <li>
            <h3 class="image__title">Comments</h3>
            <p class="image__stats">${comments}</p>
          </li>
          <li>
            <h3 class="image__title">Downloads</h3>
            <p class="image__stats">${downloads}</p>
          </li>
        </ul>
      </li>`;
}
