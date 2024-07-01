const { baseResponses } = require('../helpers/baseResponses');
const Refund = require('../models/refundModel')
const { Cashfree } = require('cashfree-pg');
require('dotenv').config();
Cashfree.XClientId = process.env.X_CLIENT_ID;
Cashfree.XClientSecret = process.env.X_CLIENT_SECRET;
Cashfree.XEnvironment = 'SANDBOX';
const createRefund = async (req, res) => {
    try {
        const {
            order_id,
            refund_id,
            refund_amount
        } = req.body;
        const request = {
            refund_id: refund_id,
            refund_amount: refund_amount
        };
        const response = await Cashfree.PGOrderCreateRefund("2022-09-01", order_id, request);
        console.log(response.data);
        const newRefund = new Refund(response.data);
        await newRefund.save();
        return res.status(200).json(baseResponses.constantMessages.REFUND_CREATED());
    } catch (error) {
        console.log(error);
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getRefund = async (req, res) => {
    try {
        const {
            order_id,
            refund_id
        }=req.body;
        const response = await Cashfree.PGOrderFetchRefund("2022-09-01", order_id, refund_id);
        return res.status(200).json(baseResponses.constantMessages.REFUND_FETCHED(response.data));
    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};
const getRefundsByOrderId = async (req,res) => {
    try{
        const {
            order_id
        }=req.body;
        const response = await Cashfree.PGOrderFetchRefunds("2022-09-01", order_id);
        return res.status(200).json(baseResponses.constantMessages.REFUND_FETCHED(response.data));
    }catch(error){
        return res.status(500).json(baseResponses.error(error.message));
    }
};

module.exports={createRefund, getRefund, getRefundsByOrderId};