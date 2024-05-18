import { ListingsServices } from '../../services/ListingsServices.js';

export async function editListingController(listings) {
  const editListingForm = document.querySelector('form#edit-auction-form');
  const title = editListingForm.querySelector('input#title');
  const description = editListingForm.querySelector('input#description');
  const addButton = document.getElementById('add-image-button-edit');
  title.value = listings?.title ?? '';
  description.value = listings?.description ?? '';


  let imageCounter = listings.media ? listings.media.length : 0;
  addButton.addEventListener('click', () => {
    const imageInputs = editListingForm.querySelectorAll('input.edit-image-url');
    imageCounter++;
    const newImageUrlInput = document.createElement('input');
    newImageUrlInput.type = 'text';
    newImageUrlInput.className = 'form-control mb-2 edit-image-url';
    newImageUrlInput.id = `edit-image-url-${imageCounter}`;
    newImageUrlInput.placeholder = 'Image URL';
    newImageUrlInput.name = 'edit-image-url[]';

    const lastImageInput = imageInputs[imageInputs.length - 1];
    lastImageInput.parentNode.appendChild(newImageUrlInput);
  });

  editListingForm.querySelector('button[type="submit"]').addEventListener('click', async (e) => {
    e.preventDefault();

    const imageInputs = editListingForm.querySelectorAll('input.edit-image-url');
    const images = [];
    imageInputs.forEach(input => {
      if (input.value) {
        images.push({
          url: input.value,
          alt: 'Listing Image'
        });
      }
    });

    if (!title.value) {
      alert('Create a title!');
      return;
    }

    const newListingData = {
      title: title.value,
      description: description.value,
      media: images,
      endsAt: listings.endsAt
    };

    await ListingsServices.editListing(newListingData, listings.id);
    window.location.reload();
  });
}
