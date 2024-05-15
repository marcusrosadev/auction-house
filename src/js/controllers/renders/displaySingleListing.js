import { ListingsServices } from '../../services/ListingsServices';
import { createSingleListingPage } from '../templates/singleListingPage';

const singleListingContainer = document.querySelector('.container.single-item-listing--container');

async function displaySingleListing(id) {
  if (!singleListingContainer) return;

  singleListingContainer.innerHTML = '';

  try {
    const listings = await ListingsServices.getListingById(id);
    if (listings) {
      const singleListingHtml = createSingleListingPage(listings);
      singleListingContainer.innerHTML = singleListingHtml;
    }
  } catch (error) {
    console.error('Error displaying Listings:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;
  const urlParams = new URLSearchParams(new URL(url).search);
  const id = urlParams.get('id');
  displaySingleListing(id);
});
