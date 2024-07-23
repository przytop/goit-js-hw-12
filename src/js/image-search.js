'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabay } from './fetch-pixabay';
import { createGalleryItemMarkup } from './gallery-markup';

const form = document.querySelector('.form');
const loading = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const more = document.querySelector("button[name='more']");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let searchValue = '';
let totalHits = 0;

function toggleElementVisibility(element, shouldShow) {
  if (shouldShow) {
    element.classList.remove('disabled');
  } else {
    element.classList.add('disabled');
  }
}

function handleResponse(response) {
  if (response.hits.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  const markup = response.hits.map(createGalleryItemMarkup).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  page += 1;

  toggleElementVisibility(more, true);
  lightbox.refresh();

  if (gallery.childElementCount >= totalHits) {
    toggleElementVisibility(more, false); // Hide the 'Load More' button if all results are displayed
    iziToast.warning({
        message: 'No more results',
        position: 'topRight',
    });
  } else {
    toggleElementVisibility(more, true); // Show the 'Load More' button if more results are available
  }
}

async function handleSearch(evt) {
  evt.preventDefault();
  searchValue = evt.target.search.value.trim();

  if (searchValue === '') {
    iziToast.warning({
      message: 'Complete the field correctly',
      position: 'topRight',
    });
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
    iziToast.error({
      message: 'An error occurred while fetching data. Please try again.',
      position: 'topRight',
    });
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
    iziToast.error({
      message: 'An error occurred while fetching data. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching data:', error);
  } finally {
    toggleElementVisibility(loading, false);
  }
}

form.addEventListener('submit', handleSearch);
more.addEventListener('click', loadMore);
