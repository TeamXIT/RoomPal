const { Cashfree } = require('cashfree-pg');
const moment = require('moment');
require('dotenv').config();
const Order = require('../models/paymentModel');
const { baseResponses } = require('../helpers/baseResponses');
Cashfree.XClientId = process.env.X_CLIENT_ID;
Cashfree.XClientSecret = process.env.X_CLIENT_SECRET;
Cashfree.XEnvironment = 'SANDBOX';

const createOrder = async (req, res) => {
    try {
        const request = {
            order_id: req.body.order_id,
            order_amount: req.body.order_amount,
            order_currency: req.body.order_currency,
            customer_details: {
                customer_id: req.body.customer_details.customer_id,
                customer_phone: req.body.customer_details.customer_phone,
                customer_email: req.body.customer_details.customer_email
            },
            // order_meta: { return_url: req.body.order_meta.return_url }
        };
        console.log(request);
        // const newOrder = new Order({
        //     order_id: order_id,
        //     order_amount: order_amount,
        //     order_currency: order_currency,
        //     customer_details: {
        //         customer_id: customer_id,
        //         customer_phone: customer_phone,
        //         customer_email: customer_email
        //     },
        //     order_meta: {
        //         return_url:return_url,
        //     }
        // });
        // newOrder.save();
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
        const order_id = req.params.order_id;
        const response = await Cashfree.PGFetchOrder('2022-09-01', order_id);
        res.status(200).json(baseResponses.constantMessages.ORDER_FETCHED_SUCCESSFULLY(response.data));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const webhook = async (req, res) => {
    try{
        Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"],req.rawBody,req.headers["x-webhook-timestamps"]);
    }catch(error){
        console.log(error);
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { createOrder, fetchOrder, webhook}