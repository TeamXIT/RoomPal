const { Cashfree } = require('cashfree-pg');
const moment = require('moment');
require('dotenv').config();
const Order = require('../models/orderModel');
const Payment = require('../models/paymentModel');
const { baseResponses } = require('../helpers/baseResponses');
Cashfree.XClientId = process.env.X_CLIENT_ID;
Cashfree.XClientSecret = process.env.X_CLIENT_SECRET;
Cashfree.XEnvironment = 'SANDBOX';

const createOrder = async (req, res) => {
    try {
        const request = {
            order_id,
            order_amount,
            order_currency,
            customer_details: {
                customer_id,
                customer_phone,
                customer_email
            },
            order_meta: { return_url }
        } = req.body;
        console.log(request);
        const newOrder = new Order({
            order_id,
            order_amount,
            order_currency,
            customer_details: {
                customer_id,
                customer_phone,
                customer_email
            },
            order_meta: {
                return_url,
            }
        });
        newOrder.save();
        const response = await Cashfree.PGCreateOrder('2022-09-01', request);
        console.log(response);
        return res.status(200).json(baseResponses.constantMessages.ORDER_CREATED_SUCCESSFULLY(response.data));
    } catch (error) {
        console.log(error)
        return res.status(500).json(baseResponses.error(error.message));
    }
};

const fetchOrder = async (req, res) => {
    try {
        const order_id = req.query.order_id;
        // const response = await Cashfree.PGFetchOrder('2022-09-01', order_id);
        // res.status(200).json(baseResponses.constantMessages.ORDER_FETCHED_SUCCESSFULLY(response.data));
        const order = await Order.findOne({ order_id: order_id });
        if (!order) {
            return res.status(404).json(baseResponses.constantMessages.ORDER_NOT_FOUND());
        }
        res.status(200).json(baseResponses.constantMessages.ORDER_FETCHED_SUCCESSFULLY(order));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const webhook = async (req, res) => {
    try {
        Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], req.rawBody, req.headers["x-webhook-timestamps"]);
    } catch (error) {
        console.log(error);
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getAllOrders = async (req, res) => {
    try {
        const recLimit = parseInt(req.query.limit) || 10;
        const pageNumber = parseInt(req.query.page) || 1;
        const count = await Order.countDocuments();
        const totalPages = Math.ceil(count / recLimit);
        const orders = await Order.find()
            .skip((pageNumber - 1) * recLimit)
            .limit(recLimit);

        if (!orders) {
            return res.status(404).json(null);
        }
        return res.status(200).json({ totalPages, count, orders });
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};
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
        const newPayment = new Payment({
            payment_session_id,
            payment_method: {
                netbanking: {
                    channel,
                    netbanking_bank_code
                }
            }
        });
        newPayment.save();
        const response = await Cashfree.PGPayOrder("2022-09-01", orderPayRequest);
        console.log(response);
        return res.status(200).json(baseResponses.constantMessages.PAYMENT_CREATED(response.data));
    } catch (error) {
        // console.log(error);
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { createOrder, fetchOrder, webhook, getAllOrders, payOrder }