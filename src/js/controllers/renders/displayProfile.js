import { AuthServices } from '../../services/AuthServices';
import { ListingsServices } from '../../services/ListingsServices';
import { newListingController } from '../actions/newListing';
import { updateProfileController } from '../actions/profile';
import { createProfileCard } from '../templates/profileCard';
import { createProfileListingsCard } from '../templates/profileListingsCard';

const profileDetailsContainer = document.querySelector('.profile-details');
const profileListingsContainer = document.querySelector('.profile-listings-container');

async function displayProfile() {
  if (!profileDetailsContainer) return;
  profileDetailsContainer.innerHTML = '';

  const currentLoggedProfile = await AuthServices.getCurrentUser();

  try {
    const profileDetails = await AuthServices.getLoggedProfile(
      currentLoggedProfile.name,
    );

    const profileListings = await ListingsServices.listingsByProfile(currentLoggedProfile.name);

    if (profileDetails) {
      const singleListingHtml = createProfileCard(
        profileDetails,
        currentLoggedProfile,
      );
      profileDetailsContainer.innerHTML = singleListingHtml;
    }

    if (profileListings) {
      const profileListingCardHtml = createProfileListingsCard(
        profileListings
      );
      profileListingsContainer.innerHTML = profileListingCardHtml;
    }

    updateProfileController();
    newListingController();
  } catch (error) {
    console.error('Error displaying profile:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayProfile();
});
