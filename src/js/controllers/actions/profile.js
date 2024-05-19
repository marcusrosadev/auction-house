import { AuthServices } from '../../services/AuthServices.js';
import createFeedbackPopup from '../../utils/functions/feedback.js';

export async function updateProfileController() {
  const currentUser = await AuthServices.getCurrentUser();
  const loggedProfileGet = await AuthServices.getLoggedProfile(
    currentUser.name,
  );
  const loggedProfile = loggedProfileGet.data;

  const profileForm = document.querySelector('#profile-details-form');
  const bioInput = profileForm.querySelector('input#bio');
  const avatarInput = profileForm.querySelector('input#avatar');
  const bannerInput = profileForm.querySelector('input#banner');

  bioInput.value = loggedProfile.bio ?? '';
  avatarInput.value = loggedProfile?.avatar.url ?? '';
  bannerInput.value = loggedProfile?.banner.url ?? '';

  profileForm.querySelector('button').addEventListener('click', async (e) => {
    e.preventDefault();

    if (
      loggedProfile.bio === bioInput.value &&
      loggedProfile.avatar.url === avatarInput.value &&
      loggedProfile.banner.url === bannerInput.value
    ) {
      createFeedbackPopup('You have to change something', 'error');
      return;
    }

    const profileData = {
      bio: bioInput.value,
      avatar: {
        url: avatarInput.value,
        alt: 'profile picture',
      },
      banner: {
        url: bannerInput.value,
        alt: 'profile banner',
      },
    };

    try {
      await AuthServices.updateProfile(loggedProfile.name, profileData);
      createFeedbackPopup('Profile updated successfully', 'success');
      window.location.reload();
    } catch (error) {
      if (error && error.errors && error.errors.length > 0) {
        createFeedbackPopup(error.errors[0].message, 'error');
      } else {
        createFeedbackPopup('Error to update profile', 'error');
      }
    }
  });
}
