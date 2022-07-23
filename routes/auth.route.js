const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller.js');

router.route('/register')
    .post(authCtrl.register);

router.route('/login')
    .post(authCtrl.login)

module.exports = router;