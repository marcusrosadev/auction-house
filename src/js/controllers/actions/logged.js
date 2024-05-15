import { AuthServices } from '../../services/AuthServices.js';

document.addEventListener('DOMContentLoaded', function () {
  updateButtonVisibility();
});

export function updateButtonVisibility() {
  // const isLoggedIn = !!localStorage.getItem('accessToken');

  if (AuthServices.getAccessToken()) {
    console.log(AuthServices.getAccessToken());
    document.querySelector('.login-modal-btn').style.display = 'none';
    document.querySelector('.register-modal-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'inline-block';
    document.querySelector('.profile-btn').style.display = 'inline-block';

    //single-item button logic
    document.querySelector('#bidButton').removeAttribute('data-bs-target');
    document.querySelector('#bidButton').removeAttribute('data-bs-toggle');
    document.querySelector('#bidButton').classList.add('bidButton');
    document.querySelector('#edit-btn').classList.remove('d-none');
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
