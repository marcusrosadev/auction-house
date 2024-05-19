/* global */
import { registerController } from '../controllers/auth/registerController';

(function addDOMContentLoadedListener() {
  document.addEventListener('DOMContentLoaded', () => {
    registerController();
  });
})();
