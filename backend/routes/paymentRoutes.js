const express = require('express');
const { createOrder, fetchOrder, webhook, getAllOrders } = require('../controllers/paymentController');
const router = express.Router();
router.post('/create-order',createOrder);
router.get('/fetch-order',fetchOrder);
router.post('/webhook',webhook);
router.get('/getAll',getAllOrders);
module.exports = router;