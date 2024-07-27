const express = require('express');
const { payOrder, createPayment, getAllPayments, getByOrderId, getByPaymentId } = require('../controllers/paymentController')
const router = express.Router();
router.post('/payment',payOrder);
router.post('/create-payment',createPayment);
router.get('/getAll',getAllPayments);
router.get('/getByOrderId',getByOrderId);
router.get('/getByPaymentId',getByPaymentId);
module.exports = router;