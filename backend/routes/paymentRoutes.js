const express = require('express');
const { payOrder, createPayment } = require('../controllers/paymentController')
const router = express.Router();
router.post('/payment',payOrder);
router.post('/create-payment',createPayment);
module.exports = router;