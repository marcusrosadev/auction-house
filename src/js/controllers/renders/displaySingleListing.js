import { AuthServices } from '../../services/AuthServices';
import { ListingsServices } from '../../services/ListingsServices';
import { deleteListingController } from '../actions/deleteListing';
import { createSingleListingPage } from '../templates/singleListingPage';

const singleListingContainer = document.querySelector(
  '.container.single-item-listing--container',
);

async function displaySingleListing(id) {
  if (!singleListingContainer) return;

  singleListingContainer.innerHTML = '';
  const currentUser = AuthServices.getCurrentUser();

  try {
    const listings = await ListingsServices.getListingById(id);
    if (listings) {
      const singleListingHtml = await createSingleListingPage(listings);
      singleListingContainer.innerHTML = singleListingHtml;

      if (listings.seller.name === currentUser.name) {
        deleteListingController(listings);
      }
    }
  } catch (error) {
    console.error('Error displaying single listing:', error);
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
        alert('Please enter a valid bid amount.');
        return;
      }

      try {
        const response = await ListingsServices.bidOnListing(id, amount);
        alert('Bid submitted successfully!');
        console.log(response);
        displaySingleListing(id);
      } catch (error) {
        console.error('Error submitting bid:', error);
        alert('Failed to submit bid.');
      }
    });
  }
}

// async function onClickBidButton() {
//   const bidButton = document.querySelector('#bidButton');
//   bidButton.addEventListener('click', () => {

//   })
// }

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;
  const urlParams = new URLSearchParams(new URL(url).search);
  const id = urlParams.get('id');
  displaySingleListing(id);
});
