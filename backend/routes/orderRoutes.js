const express = require('express');
const { createOrder, fetchOrder, webhook, getAllOrders, getOrdersByCustomerId } = require('../controllers/orderController');
const router = express.Router();
router.post('/create-order',createOrder);
router.get('/fetch-order',fetchOrder);
router.post('/webhook',webhook);
router.get('/getAll',getAllOrders);
router.get('/getUsersOrders',getOrdersByCustomerId);
module.exports = router;