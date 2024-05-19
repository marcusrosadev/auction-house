import { AuthServices } from '../../services/AuthServices';
import { ListingsServices } from '../../services/ListingsServices';
import createFeedbackPopup from '../../utils/functions/feedback';
import { deleteListingController } from '../actions/deleteListing';
import { editListingController } from '../actions/editListing';
import { newListingController } from '../actions/newListing';
import { createSingleListingPage } from '../templates/singleListingPage';
import { createBidsHistory } from './bidHistory';

const singleListingContainer = document.querySelector(
  '.container.single-item-listing--container',
);

const bidsHistoryContainer = document.querySelector('#bid-history-container');

async function displaySingleListing(id) {
  if (!singleListingContainer) return;

  singleListingContainer.innerHTML = '';
  const currentUser = AuthServices.getCurrentUser();

  try {
    const listings = await ListingsServices.getListingById(id);

    if (listings) {
      const singleListingHtml = await createSingleListingPage(listings);
      const bidsHistory = await createBidsHistory(listings);

      singleListingContainer.innerHTML = singleListingHtml;
      bidsHistoryContainer.innerHTML = bidsHistory;

      if (listings.seller.name === currentUser.name) {
        deleteListingController(listings);
        editListingController(listings);
      }
      newListingController();
    }
  } catch (error) {
    if (error && error.errors && error.errors.length > 0) {
      createFeedbackPopup(error.errors[0].message, 'error');
    } else {
      createFeedbackPopup('Error to load single auction', 'error');
    }
  }

  const amountInput = document.querySelector('.form-control.amount-input');
  if (amountInput) {
    amountInput.addEventListener('input', function (e) {
      let value = e.target.value;
      value = value.replace(/[^\d,]/g, '');
      value = value.replace(/,/g, '');
      let formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      e.target.value = formatted ? '$' + formatted : '';
    });
  }

  const form = document.querySelector('form#bidForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = parseInt(amountInput.value.replace(/[, $]/g, ''), 10);
      if (Number.isNaN(amount)) {
        createFeedbackPopup('Please enter a valid bid amount.', 'error');
        return;
      }

      try {
        await ListingsServices.bidOnListing(id, amount);
        createFeedbackPopup('Bid submitted successfully!', 'success');
        window.location.reload();
      } catch (error) {
        if (error && error.errors && error.errors.length > 0) {
          createFeedbackPopup(error.errors[0].message, 'error');
        } else {
          createFeedbackPopup('Error to bid', 'error');
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;
  const urlParams = new URLSearchParams(new URL(url).search);
  const id = urlParams.get('id');
  displaySingleListing(id);
});
