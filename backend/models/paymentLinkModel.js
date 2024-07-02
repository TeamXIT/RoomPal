const mongoose = require('mongoose');
const paymentLinkSchema = new mongoose.Schema({
    action: { type: String, required: true },
    cf_payment_id: { type: Number, required: true },
    channel: { type: String, required: true },
    data: {
        url: { type: String, default: null },
        payload: { type: String, default: null },
        content_type: { type: String, default: null },
        method: { type: String, default: null }
    },
    payment_amount: { type: Number, required: true },
    payment_method: { type: String, required: true }
},{timestamps:true, versionKey:false});

const PaymentLink = mongoose.model('PaymentLink', paymentLinkSchema);

module.exports = PaymentLink;