// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';
import createFeedbackPopup from '../../utils/functions/feedback.js';

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

      imageInputs.forEach((input) => {
        if (input.value) {
          images.push({
            url: input.value || '',
            alt: 'Listing Image',
          });
        }
      });

      const newListingData = {
        title: title.value ?? '',
        description: description.value ?? '',
        media: images,
        endsAt: endsAt.value ?? new Date(),
      };

      try {
        await ListingsServices.createListing(newListingData);
        // window.location.reload();
      } catch (error) {
        if (error && error.errors && error.errors.length > 0) {
          createFeedbackPopup(error.errors[0].message, 'error');
        } else {
          createFeedbackPopup('Error to create auction', 'error');
        }
      }
    });
}
