// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';

export async function deleteListingController(listing) {
  const deleteButton = document.querySelector('.delete-listing-btn');

  deleteButton.addEventListener('click', async () => {
    await ListingsServices.deleteListing(listing.id);
    window.location.href = '/';
  });
}
