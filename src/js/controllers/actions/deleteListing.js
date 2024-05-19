// import { AuthServices } from '../../services/AuthServices.js';
import { ListingsServices } from '../../services/ListingsServices.js';
import createFeedbackPopup from '../../utils/functions/feedback.js';

export async function deleteListingController(listing) {
  const deleteButton = document.querySelector('.delete-listing-btn');

  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      await ListingsServices.deleteListing(listing.id);
    } catch (error) {
      if (error && error.errors && error.errors.length > 0) {
        createFeedbackPopup(error.errors[0].message, 'error');
      } else {
        createFeedbackPopup('Error to delete', 'error');
      }
    } finally {
      window.location.href = '/';
    }
  });
}
