const express = require('express');
const { createOrder, fetchOrder } = require('../controllers/paymentController');
const router = express.Router();
router.post('/create-order',createOrder);
router.get('/fetch-order',fetchOrder);
module.exports = router;