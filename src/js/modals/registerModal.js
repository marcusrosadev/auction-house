/* global $ */
$(document).ready(function () {
  $('#register-modal-container').load('/src/pages/register/', function () {
    registerController();
  });
});

import { registerController } from '../controllers/auth/registerController';
