import { AuthServices } from '../../services/AuthServices.js';

document.addEventListener('DOMContentLoaded', function () {
  updateProfileController();
});

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

  profileForm.querySelector('button').addEventListener('click', async () => {
    if (
      loggedProfile.bio === bioInput.value &&
      loggedProfile.avatar.url === avatarInput.value &&
      loggedProfile.banner.url === bannerInput.value
    ) {
      alert('To confirm you have to change something');
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

    await AuthServices.updateProfile(loggedProfile.name, profileData);
    window.location.reload();
  });
}
