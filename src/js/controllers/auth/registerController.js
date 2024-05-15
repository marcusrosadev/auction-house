import { AuthServices } from '../../services/AuthServices';

export function registerController() {
  const registerForm = document.querySelector('#registerModal form');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userData = {
      name: document.getElementById('username').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value,
    };

    try {
      await AuthServices.register(userData);
      await AuthServices.login({
        email: userData.email,
        password: userData.password,
      });
      window.location.reload();
      alert('Registration Successful');
    } catch (error) {
      alert('Error during registration: ' + error.message);
    } finally {
      document.querySelector('#registerModal'); //make loading
    }
  });
}
