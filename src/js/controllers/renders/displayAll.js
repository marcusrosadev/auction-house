import { ListingsServices } from '../../services/ListingsServices';
import { newListingController } from '../actions/newListing';
import { searchController } from '../actions/search';
import { createAuctionCard } from '../templates/auctionCard';
import { noItemsFound } from '../templates/noItemsFound';

const allListingsContainer = document.querySelector('.all-listings');
const nextPage = document.getElementById('next-page');
const pageNumbers = document.querySelectorAll('.page-number');
const prevPage = document.getElementById('prev-page');

let currentPage = 1;

export default async function displayAllListings(page) {
  if (!allListingsContainer) return;

  allListingsContainer.innerHTML = '';
  let listings;

  try {
    if (window.location.search.length > 0) {
      const url = window.location.href;
      const urlParams = new URLSearchParams(new URL(url).search);
      const searchParams = urlParams.get('q');

      listings = await ListingsServices.searchListings(searchParams, page, 12);
    } else {
      listings = await ListingsServices.getAllListingsPage(page, 12);
    }

    if (listings && listings.length > 0) {
      allListingsContainer.innerHTML = listings.map(createAuctionCard).join('');
    } else {
      allListingsContainer.innerHTML = noItemsFound();
    }
    newListingController();
    searchController();
  } catch (error) {
    console.error('Error displaying Listings:', error);
  }

  updateNavigation();
}

function updateNavigation() {
  let startPage = Math.max(1, currentPage - 1); // Start from current page - 1 unless it's less than 1
  if (currentPage <= 2) {
    startPage = 1;
  }

  pageNumbers.forEach((el, index) => {
    el.textContent = startPage + index;
    el.classList.toggle('disabled', currentPage === parseInt(el.textContent)); // Disable the current page
  });

  prevPage.classList.toggle('disabled', currentPage === 1); // Disable Previous on first page
  nextPage.classList.toggle('disabled', currentPage === 10); // Assume 10 is the last page for example
}

if (prevPage) {
  prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayAllListings(currentPage);
    }
  });
}

if (nextPage) {
  nextPage.addEventListener('click', () => {
    if (currentPage < 10) {
      currentPage++;
      displayAllListings(currentPage);
    }
  });
}

if (pageNumbers) {
  pageNumbers.forEach((page) => {
    page.addEventListener('click', (e) => {
      const selectedPage = parseInt(e.target.textContent);
      if (selectedPage !== currentPage) {
        currentPage = selectedPage;
        displayAllListings(currentPage);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () =>
  displayAllListings(currentPage),
);
