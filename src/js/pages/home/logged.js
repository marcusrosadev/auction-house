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
  } else {
    document.querySelector('.logout-btn').style.display = 'none';
  }
}

document.querySelector('.logout-btn').addEventListener('click', function () {
  localStorage.removeItem('accessToken');
  updateButtonVisibility();
  window.location.reload();
});
