


import { AuthServices } from '../../services/AuthServices';
import { createProfileCard } from '../templates/profileCard';

const profileDetailsContainer = document.querySelector(
  '.profile-details',
);

async function displayProfile() {
  if (!profileDetailsContainer) return;
  profileDetailsContainer.innerHTML = '';

  const currentLoggedProfile = await AuthServices.getCurrentUser();

  try {
    const profileDetails = await AuthServices.getLoggedProfile(currentLoggedProfile.name);

    if (profileDetails) {
      console.log(profileDetails);
      const singleListingHtml = createProfileCard(profileDetails, currentLoggedProfile);
      profileDetailsContainer.innerHTML = singleListingHtml;
    }
  } catch (error) {
    console.error('Error displaying profile:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayProfile();
});
