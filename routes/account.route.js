const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/account.controller.js');

router.route('/saveAccount')
    .post(accountCtrl.saveAccount);

router.route('/getAbiFromAddress')
    .post(accountCtrl.getAbiFromAddress);

router.route('/mintDataSave')
    .post(accountCtrl.mintDataSave);

module.exports = router;