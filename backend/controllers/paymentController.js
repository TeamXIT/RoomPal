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
        // console.log(error);
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const createPayment = async (req, res) => {
    try {
        const paymentData = req.body.paymentDetails;
        // console.log(paymentData.order_id);
        
        const order = await Order.findOne({order_id:paymentData.order_id});
        console.log(order.customer_details.customer_id);
        const customer_id = order.customer_details.customer_id;

        if (!order) {
            return res.status(400).send({ error: 'Invalid order_id' });
        }
        const payment = new Payment(paymentData);
        console.log(payment);
        payment.save();
        if(payment.payment_status == 'SUCCESS'){
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

module.exports = { payOrder ,createPayment};