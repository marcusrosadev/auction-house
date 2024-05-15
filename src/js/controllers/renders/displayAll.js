import { ListingsServices } from '../../services/ListingsServices';
import { createAuctionCard } from '../templates/auctionCard';

const allListingsContainer = document.querySelector('.all-listings');
const nextPage = document.getElementById('next-page');
const pageNumbers = document.querySelectorAll('.page-number');
const prevPage = document.getElementById('prev-page');

let currentPage = 1;

async function displayAllListings(page) {
  if (!allListingsContainer) return;

  allListingsContainer.innerHTML = '';

  try {
    const listings = await ListingsServices.getAllListingsPage(page, 12);

    if (listings && listings.length > 0) {
      allListingsContainer.innerHTML = listings.map(createAuctionCard).join('');
    }
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

if(prevPage) {
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

if(pageNumbers) {
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
