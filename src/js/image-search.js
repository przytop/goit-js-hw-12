'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabay } from './fetch-pixabay';
import { createGalleryItemMarkup } from './gallery-markup';

const form = document.querySelector('.form');
const loading = document.querySelector('.loading');
const gallery = document.querySelector('.gallery');
const more = document.querySelector("button[name='more']");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let searchValue = '';
let totalHits = 0;

function showToast(type, message) {
  iziToast[type]({
    message,
    position: 'topRight',
  });
}

function toggleElementVisibility(element, shouldShow) {
  element.classList.toggle('disabled', !shouldShow); // Disable or enable element - must be disable on start
}

function handleResponse(response) {
  if (response.hits.length === 0) {
    showToast(
      'warning',
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  const markup = response.hits.map(createGalleryItemMarkup).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  page += 1;

  toggleElementVisibility(more, gallery.childElementCount < totalHits);
  lightbox.refresh();

  if (gallery.childElementCount >= totalHits) {
    toggleElementVisibility(more, false); // Hide the 'Load More' button if all results are displayed
    showToast(
      'info',
      "We're sorry, but you've reached the end of search results."
    );
  }
}

async function handleSearch(evt) {
  evt.preventDefault();
  searchValue = evt.target.search.value.trim();

  if (!searchValue) {
    showToast('error', 'Complete the field correctly');
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  toggleElementVisibility(loading, true);
  toggleElementVisibility(more, false);

  try {
    const response = await fetchPixabay(searchValue, page);
    totalHits = response.totalHits; // Set the total hits from the response
    handleResponse(response);
  } catch (error) {
    showToast(
      'error',
      'An error occurred while fetching data. Please try again.'
    );
    console.error('Error fetching data:', error);
  } finally {
    toggleElementVisibility(loading, false);
    form.reset();
  }
}

async function loadMore() {
  toggleElementVisibility(loading, true);
  toggleElementVisibility(more, false);

  try {
    const response = await fetchPixabay(searchValue, page);
    handleResponse(response);
  } catch (error) {
    showToast(
      'error',
      'An error occurred while fetching data. Please try again.'
    );
    console.error('Error fetching data:', error);
  } finally {
    let rect = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({
      top: rect.height * 3, // Scroll down by the 3x height of the element
      behavior: 'smooth', // Smooth scroll
    });
    toggleElementVisibility(loading, false);
  }
}

form.addEventListener('submit', handleSearch);
more.addEventListener('click', loadMore);
