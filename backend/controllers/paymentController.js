const { Cashfree } = require('cashfree-pg');
require('dotenv').config();
const Order = require('../models/orderModel');
const Payment = require('../models/paymentModel');
const PaymentLink = require('../models/paymentLinkModel');
const { baseResponses } = require('../helpers/baseResponses');
const Transaction = require('../models/transactionModel');
Cashfree.XClientId = process.env.X_CLIENT_ID;
Cashfree.XClientSecret = process.env.X_CLIENT_SECRET;
Cashfree.XEnvironment = 'SANDBOX';

const payOrder = async (req, res) => {
    try {
        const orderPayRequest = {
            payment_session_id,
            payment_method: {
                netbanking: {
                    channel,
                    netbanking_bank_code
                }
            }
        } = req.body;
        const response = await Cashfree.PGPayOrder("2022-09-01", orderPayRequest);
        const paymentLink = new PaymentLink(response.data);
        await paymentLink.save();
        return res.status(200).json(baseResponses.constantMessages.PAYMENT_CREATED(response.data));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const createPayment = async (req, res) => {
    try {
        const paymentData = req.body.paymentDetails;
        const order = await Order.findOne({ order_id: paymentData.order_id });        
        const customer_id = order.customer_details.customer_id;
        if (!order) {
            return res.status(400).send({ error: 'Invalid order_id' });
        }
        const payment = new Payment(paymentData);
        await payment.save();
        if (payment.payment_status == 'SUCCESS') {
            const transaction = new Transaction({
                user_id: customer_id,
                debit_amount: payment.payment_amount
            });
            console.log(transaction);
            transaction.save();
            console.log('Payment created');
        }

        res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
const getAllPayments = async (req, res) => {
    try {
        const recLimit = parseInt(req.query.limit) || 10;
        const pageNumber = parseInt(req.query.page) || 1;
        const {
            payment_status,
            payment_date, 
        } = req.query;
        let filter = {};
        if (payment_status) {
            filter.payment_status = payment_status.toUpperCase();
        }
        if (payment_date) {
            const date = new Date(payment_date);
            const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));
            filter.payment_time = { $gte: startOfDay, $lte: endOfDay };
        }
        const count = await Payment.countDocuments(filter);
        const totalPages = Math.ceil(count / recLimit);
        const paymentList = await Payment.find(filter)
            .skip((pageNumber - 1) * recLimit)
            .limit(recLimit);
        if (!paymentList) {
            return res.status(404).json(baseResponses.constantMessages.PAYMENT_NOT_FOUND());
        }
        return res.status(200).json({
            success: true,
            totalPages,
            totalCount: count,
            data: paymentList 
        });
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getByOrderId = async (req, res) => {
    try {
        const { order_id } = req.body; // Extract order_id from req.body
        
        // Fetch the order
        const order = await Order.findOne({ order_id });
        if (!order) {
            return res.status(404).json(baseResponses.constantMessages.ORDER_NOT_FOUND());
        }

        // Fetch the payment
        const payment = await Payment.findOne({ order_id });
        if (!payment) {
            return res.status(404).json(baseResponses.constantMessages.PAYMENT_NOT_FOUND());
        }

        // Return the payment details
        return res.status(200).json(baseResponses.constantMessages.PAYMENT_FETCHED(payment));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

const getPaymentByStatus = async (req, res) => {
    try {
      const { status, userId } = req.query;
      
      // Validate the presence of status and userId
      if (!status || !userId) {
        return res.status(400).json(baseResponses.error('Status and userId are required'));
      }
  
      // Query to find payments with the given status and userId
      const payment = await Payment.find({ payment_status: status, userId });
  
      return res.status(200).json(baseResponses.constantMessages.PAYMENT_FETCHED(payment));
    } catch (error) {
        console.log(error);
      return res.status(404).json(baseResponses.error(error.message));
    }
  };
  
const getByPaymentId = async (req,res) => {
    try{
        const { payment_id } = req.body;
        const payment = await Payment.findById(payment_id);
        if(!payment){
            return res.status(404).json(baseResponses.constantMessages.PAYMENT_NOT_FOUND());
        }
        return res.status(200).json(baseResponses.constantMessages.PAYMENT_FETCHED(payment));
    } catch (error){
        return res.status(404).json(baseResponses.error(error.message));
    }
};

module.exports = { payOrder, createPayment, getAllPayments, getByOrderId, getByPaymentId, getPaymentByStatus}