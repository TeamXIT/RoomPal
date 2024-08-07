const express = require('express');
const { payOrder, createPayment, getAllPayments, getByOrderId, getByPaymentId, getPaymentByStatus} = require('../controllers/paymentController')
const router = express.Router();
router.post('/payment',payOrder);
router.post('/create-payment',createPayment);
router.get('/getAll',getAllPayments);
router.get('/getByOrderId',getByOrderId);
router.get('/getByPaymentId',getByPaymentId);
router.get('/getBystatus',getPaymentByStatus);
module.exports = router;