import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPixabayImages } from "./pixabay-api";
import { renderGalleryItem } from "./gallery-render";

let page = 1;
let searchValue = "";
let totalHits = 0;

const showToast = (type, message) => {
  iziToast[type]({
    message,
    position: "bottomCenter",
  });
};

const toggleElementVisibility = (element, className, shouldShow) => {
  if (shouldShow) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

const updateUIAfterFetch = (galleryList, loadMore, loader) => {
  toggleElementVisibility(loader, "loader--hidden", false);
  const countOfImages = galleryList.childElementCount;

  if (countOfImages >= totalHits) {
    toggleElementVisibility(loadMore, "load-more--hidden", false);
    if (page > 1) {
      showToast(
        "info",
        "We're sorry, but you've reached the end of search results."
      );
    }
  } else {
    toggleElementVisibility(loadMore, "load-more--hidden", true);
  }
};

const handleResponse = (response, galleryList, lightbox) => {
  if (response.hits.length === 0) {
    showToast(
      "warning",
      "Sorry, there are no images matching your search query. Please try again!"
    );
    return;
  }

  const markup = response.hits.map(renderGalleryItem).join("");
  galleryList.insertAdjacentHTML("beforeend", markup);
  page += 1;
  lightbox.refresh();
};

const handleSearch = async (
  e,
  galleryList,
  loadMore,
  loader,
  searchForm,
  lightbox
) => {
  e.preventDefault();
  searchValue = e.target.search.value.trim();

  if (!searchValue) {
    showToast("error", "Complete the field correctly");
    return;
  }

  page = 1;
  galleryList.innerHTML = "";
  toggleElementVisibility(loadMore, "load-more--hidden", false);
  toggleElementVisibility(loader, "loader--hidden", true);

  try {
    const response = await fetchPixabayImages(searchValue, page);
    totalHits = response.totalHits;
    handleResponse(response, galleryList, lightbox);
  } catch (error) {
    showToast(
      "error",
      "An error occurred while fetching data. Please try again."
    );
    console.error("Error fetching data:", error);
  } finally {
    updateUIAfterFetch(galleryList, loadMore, loader);
    searchForm.reset();
  }
};

const loadMoreImages = async (galleryList, loadMore, loader, lightbox) => {
  toggleElementVisibility(loadMore, "load-more--hidden", false);
  toggleElementVisibility(loader, "loader--hidden", true);

  try {
    const response = await fetchPixabayImages(searchValue, page);
    handleResponse(response, galleryList, lightbox);
  } catch (error) {
    showToast(
      "error",
      "An error occurred while fetching data. Please try again."
    );
    console.error("Error fetching data:", error);
  } finally {
    updateUIAfterFetch(galleryList, loadMore, loader);
    const galleryItem = document.querySelector(".gallery__item");

    if (galleryItem) {
      window.scrollBy({
        top: galleryItem.getBoundingClientRect().height * 2, // Scroll down by the 2x height of the element
        behavior: "smooth",
      });
    }
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search__form");
    const galleryList = document.querySelector(".gallery__list");
    const loader = document.querySelector(".loader");
    const loadMore = document.querySelector(".load-more");
    const loadMoreButton = document.querySelector(".load-more__button");
    const lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 500,
      overlayOpacity: 0.8,
      spinner: true,
    });

    searchForm.addEventListener("submit", (e) =>
      handleSearch(e, galleryList, loadMore, loader, searchForm, lightbox)
    );
    loadMoreButton.addEventListener("click", () =>
      loadMoreImages(galleryList, loadMore, loader, lightbox)
    );
  });
};

init();
