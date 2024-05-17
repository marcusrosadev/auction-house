// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';

export async function deleteListingController(listing) {
  const deleteButton = document.querySelector('.delete-listing-btn');

  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      await ListingsServices.deleteListing(listing.id);
    } catch (e) {
      throw new Error(e);
    } finally {
      window.location.href = '/';
    }
  });
}
