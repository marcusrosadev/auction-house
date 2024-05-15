import { ListingsServices } from '../../services/ListingsServices';
import { createAuctionCard } from '../templates/auctionCard';

async function displayHomeListings() {
  const auctionContainer = document.querySelector('.auction-container');
  const endSoonContainer = document.querySelector('.ending-soon');
  if (!auctionContainer || !endSoonContainer) return;

  const MAX_LISTINGS = 9; // Maximum number of listings to display in auctionContainer
  const MAX_END_SOON = 6; // Maximum number of listings to display in endSoonContainer

  try {
    const listings = await ListingsServices.getAllListings();
    if (listings && listings.length > 0) {
      // Display listings in the main auction container
      const limitedPosts = listings.slice(0, MAX_LISTINGS);
      auctionContainer.innerHTML = limitedPosts.map(createAuctionCard).join('');

      // Determine listings that are ending soon
      const endSoonListings = listings
        .filter((listing) => {
          const endsAtDate = new Date(listing.endsAt);
          const now = new Date();
          return endsAtDate > now; // Ensure listing ends in the future
        })
        .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt)) // Sort listings by end date, soonest first
        .slice(0, MAX_END_SOON); // Take only the first 6

      if (endSoonListings.length > 0) {
        endSoonContainer.innerHTML = endSoonListings
          .map(createAuctionCard)
          .join('');
      } else {
        endSoonContainer.innerHTML = '<p>No listings ending soon.</p>';
      }
    } else {
      auctionContainer.innerHTML = '<p>No listings found.</p>';
      endSoonContainer.innerHTML = '<p>No listings ending soon.</p>';
    }
  } catch (error) {
    console.error('Error displaying listings:', error);
    auctionContainer.innerHTML = '<p>Error loading listings.</p>';
    endSoonContainer.innerHTML = '<p>Error loading listings.</p>';
  }
}

document.addEventListener('DOMContentLoaded', displayHomeListings);
