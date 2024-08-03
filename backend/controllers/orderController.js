const { Cashfree } = require('cashfree-pg');
const moment = require('moment');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Payment = require('../models/paymentModel');
const PaymentLink = require('../models/paymentLinkModel');
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
            order_meta: { return_url },
            room_id
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(customer_id)) {
            return res.status(400).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }
        const order = await Order.findOne({order_id: order_id})
        if(order) {
          return res.status(400).json(baseResponses.constantMessages.ORDER_ID_ALREADY_EXISTS());
        }
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
            },
            room_id: room_id,
        });
        await newOrder.save();
        const response = await Cashfree.PGCreateOrder('2022-09-01', request);
        return res.status(200).json(baseResponses.constantMessages.ORDER_CREATED_SUCCESSFULLY(response.data));
    } catch (error) {
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
const getOrdersByCustomerId = async (req, res) => {
    try {
        const customer_id = req.query.customer_id;
        if (!mongoose.Types.ObjectId.isValid(customer_id)) {
            return res.status(400).json(baseResponses.constantMessages.USER_NOT_FOUND());
        }
        const orders = await Order.find({ 'customer_details.customer_id': customer_id });
        if (!orders || orders.length === 0) {
            return res.status(404).json(baseResponses.constantMessages.ORDER_NOT_FOUND());
        }
        return res.status(200).json(baseResponses.constantMessages.ORDER_FETCHED_SUCCESSFULLY(orders));
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



module.exports = { createOrder, fetchOrder, webhook, getAllOrders,getOrdersByCustomerId}