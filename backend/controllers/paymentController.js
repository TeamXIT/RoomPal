const { Cashfree } = require('cashfree-pg');
const moment = require('moment');
const Order = require('../models/paymentModel');
const { baseResponses } = require('../helpers/baseResponses');
Cashfree.XClientId = "";
Cashfree.XClientSecret = "";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

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
            order_meta: { return_url: req.body.order_meta.return_url }
        };
        //console.log(request);
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
        let order_date = moment().format('YYYY-MM-DD');
        const response = await Cashfree.PGCreateOrder(order_date, request);
        console.log(response);
        return res.status(200).json(baseResponses.constantMessages.ORDER_CREATED_SUCCESSFULLY(response.data));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

const fetchOrder = async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const orderDate = moment().format('YYYY-MM-DD');
        const response = await Cashfree.PGFetchOrder(orderDate, order_id);
        res.status(200).json(baseResponses.constantMessages.ORDER_FETCHED_SUCCESSFULLY(response.data));
    } catch (error) {
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports = { createOrder, fetchOrder }