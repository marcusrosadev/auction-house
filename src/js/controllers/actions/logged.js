import { AuthServices } from '../../services/AuthServices.js';

document.addEventListener('DOMContentLoaded', function () {
  updateButtonVisibility();
});

export function updateButtonVisibility() {
  // const isLoggedIn = !!localStorage.getItem('accessToken');

  if (AuthServices.getAccessToken()) {
    document.querySelector('.login-modal-btn').style.display = 'none';
    document.querySelector('.register-modal-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'inline-block';
    document.querySelector('.profile-btn').style.display = 'inline-block';

    //single-item button logic
    const bidButton = document.querySelector('#bidButton')
    if(bidButton) {
      bidButton.removeAttribute('data-bs-target');
      bidButton.removeAttribute('data-bs-toggle');
      bidButton.classList.add('bidButton');
    }
    console.log(document.querySelector('#edit-btn'))
    document.querySelector('#edit-btn') &&
      document.querySelector('#edit-btn').classList.remove('d-none');

    document.querySelector('#delete-btn') &&
      document.querySelector('#delete-btn').classList.remove('d-none');

  } else {
    document.querySelector('.profile-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'none';
  }
}

document.querySelector('.logout-btn').addEventListener('click', function () {
  localStorage.removeItem('accessToken');
  updateButtonVisibility();
  window.location.reload();
});
