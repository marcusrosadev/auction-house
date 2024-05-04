/* global $ */
$(document).ready(function () {
  $('#login-modal-container').load('/src/pages/login/', function () {
    loginController();
  });
});

import { loginController } from '../controllers/auth/loginController';
