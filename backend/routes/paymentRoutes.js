const express = require('express');
const { createOrder, fetchOrder, webhook } = require('../controllers/paymentController');
const router = express.Router();
router.post('/create-order',createOrder);
router.get('/fetch-order',fetchOrder);
router.post('/webhook',webhook)
module.exports = router;