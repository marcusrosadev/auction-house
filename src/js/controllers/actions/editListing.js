// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';

export async function editListingController(listings) {
  const editListingForm = document.querySelector('form#edit-auction-form');
  const title = editListingForm.querySelector('input#title');
  const description = editListingForm.querySelector('input#description');
  const image = editListingForm.querySelector('input#image-url');

  title.value = listings?.title ?? '';
  description.value = listings?.description ?? '';
  image.value = listings?.image?.url ?? '';
  
  editListingForm
    .querySelector('button')
    .addEventListener('click', async (e) => {
      e.preventDefault();

      if (!title) {
        alert('Create a title!');
        return;
      }

      const newListingData = {
        title: title.value ?? '',
        description: description.value ?? '',
        media: image.value
          ? [
              {
                url: image.value,
                alt: 'Listing Image',
              },
            ]
          : [],
      };
      await ListingsServices.editListing(newListingData, listings.id);
      window.location.reload();
    });
}
