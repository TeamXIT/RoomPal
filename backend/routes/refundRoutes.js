const express = require('express');
const { createRefund, getRefund, getRefundsByOrderId } = require('../controllers/refundController');
const router = express.Router();
router.post('/create',createRefund);
router.get('/fetch',getRefund);
router.get('/fetchAll',getRefundsByOrderId);
module.exports = router;