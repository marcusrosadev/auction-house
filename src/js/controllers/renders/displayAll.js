import { ListingsServices } from '../../services/ListingsServices';
import { createAuctionCard } from '../templates/auctionCard';

async function displayAllListings() {
  const allListingsContainer = document.querySelector('.all-listings');
  if (!allListingsContainer) return;

  try {
    const listings = await ListingsServices.getAllListingsPage(1, 12);
    console.log(listings);

    if (listings && listings.length > 0) {
      allListingsContainer.innerHTML = listings.map(createAuctionCard).join('');
    }
  } catch (error) {
    console.error('Error displaying Listings:', error);
  }
}

document.addEventListener('DOMContentLoaded', displayAllListings);
