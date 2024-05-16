// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';

document.addEventListener('DOMContentLoaded', function () {
  newListingController();
});

export async function newListingController() {
  // const currentUser = await AuthServices.getCurrentUser();
  // const loggedProfileGet = await AuthServices.getLoggedProfile(
  //   currentUser.name,
  // );
  // const loggedProfile = loggedProfileGet.data;

  const newListingForm = document.querySelector('#newListingModal form');
  const title = newListingForm.querySelector('input#title');
  const description = newListingForm.querySelector('input#description');
  const image = newListingForm.querySelector('input#image-url');
  const endsAt = newListingForm.querySelector('input#event-date');

  // bioInput.value = loggedProfile.bio ?? '';
  // avatarInput.value = loggedProfile?.avatar.url ?? '';
  // bannerInput.value = loggedProfile?.banner.url ?? '';

  newListingForm.querySelector('button').addEventListener('click', async () => {
    if (
      !title && !endsAt
    ) {
      alert('Create a title and set an end date!');
      return;
    }

    const newListingData = {
      title: title.value ?? '',
      description: description.value ?? '',
      media: image.value ? [
        {
          url: image.value,
          alt: 'Listing Image'
        }
      ] : [],
      endsAt: endsAt.value ?? new Date(),
    };

    await ListingsServices.createListing(newListingData);
    window.location.reload();
  });
}
