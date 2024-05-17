import { AuthServices } from '../../services/AuthServices';
import { updateButtonVisibility } from '../actions/logged';

export function loginController() {
  const loginForm = document.querySelector('#loginModal form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const credentials = {
      email: document.getElementById('email-login').value.trim(),
      password: document.getElementById('password-login').value,
    };

    try {
      await AuthServices.login(credentials);
      window.location.reload();
      alert('Login Successful');
      updateButtonVisibility();
    } catch (error) {
      alert('Error during login: ' + error.message);
    } finally {
      document.querySelector('#loginModal'); //make loading function
    }
  });
}
