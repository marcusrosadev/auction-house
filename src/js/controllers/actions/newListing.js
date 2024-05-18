// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';

export async function newListingController() {
  // const currentUser = await AuthServices.getCurrentUser();
  // const loggedProfileGet = await AuthServices.getLoggedProfile(
  //   currentUser.name,
  // );
  // const loggedProfile = loggedProfileGet.data;

  const newListingForm = document.querySelector('#newListingModal form');
  const title = newListingForm.querySelector('input#title');
  const description = newListingForm.querySelector('input#description');
  const endsAt = newListingForm.querySelector('input#event-date');

  newListingForm
    .querySelector('button')
    .addEventListener('click', async (e) => {
      e.preventDefault();

      const imageInputs = newListingForm.querySelectorAll('input.image-url');
      const images = [];

      imageInputs.forEach(input => {
          if(input.value) {
            images.push({
              url: input.value || '',
              alt: 'Listing Image'
            });
          }
      });

      if (!title && !endsAt) {
        alert('Create a title and set an end date!');
        return;
      }
      console.log(images)
      const newListingData = {
        title: title.value ?? '',
        description: description.value ?? '',
        media: images,
        endsAt: endsAt.value ?? new Date(),
      };

      await ListingsServices.createListing(newListingData);
      // window.location.reload();
    });
}
