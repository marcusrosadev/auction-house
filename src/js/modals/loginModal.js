/* global */
import { loginController } from '../controllers/auth/loginController';

(function addDOMContentLoadedListener() {
  document.addEventListener('DOMContentLoaded', () => {
    loginController();
  });
})();
