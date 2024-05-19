import { ListingsServices } from '../../services/ListingsServices';
import createFeedbackPopup from '../../utils/functions/feedback';
import { newListingController } from '../actions/newListing';
import { searchController } from '../actions/search';
import { createAuctionCard } from '../templates/auctionCard';

export default async function displayHomeListings() {
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

    newListingController();
  } catch (error) {
    if (error && error.errors && error.errors.length > 0) {
      createFeedbackPopup(error.errors[0].message, 'error');
    } else {
      createFeedbackPopup('Error to list auctions', 'error');
    }
  }
  searchController();
}

document.addEventListener('DOMContentLoaded', displayHomeListings);
