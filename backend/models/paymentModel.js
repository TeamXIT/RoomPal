// const mongoose = require('mongoose');
// const paymentSchema = new mongoose.Schema({
//     payment_session_id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     payment_method: {
//         netbanking: {
//             channel: {
//                 type: String,
//                 required: true
//             },
//             netbanking_bank_code: {
//                 type: String,
//                 required: true
//             }
//         }
//     }
// },{timestamps:true, versionKey:false});
// const Payment = mongoose.model('payments',paymentSchema);

// module.exports = Payment;

const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    auth_id: { type: String, default: null },
    authorization: { type: String, default: null },
    bank_reference: { type: String, default: null },
    cf_payment_id: { type: String, default: null },
    entity: { type: String, default: null },
    error_details: { type: String, default: null },
    is_captured: { type: Boolean, default: false },
    order_amount: { type: Number, default: null },
    order_id: { type: String, required: true},
    payment_amount: { type: Number, default: null },
    payment_completion_time: { type: Date, default: null },
    payment_currency: { type: String, default: null },
    payment_gateway_details: {
        gateway_name: { type: String, default: null },
        gateway_order_id: { type: String, default: null },
        gateway_payment_id: { type: String, default: null },
        gateway_status_code: { type: String, default: "" },
        gateway_settlement: { type: String, default: "" }
    },
    payment_group: { type: String, default: null },
    payment_message: { type: String, default: null },
    payment_method: {

        netbanking: {
            netbanking_bank_code: { type: Number, default: null },
            netbanking_bank_name: { type: String, default: null },
            netbanking_ifsc: { type: String, default: "" },
            netbanking_account_number: { type: String, default: "" }
        }
    },
    
    payment_offers: { type: Array, default: [] },
    payment_status: { type: String, default: null },
    payment_time: { type: Date, default: null }
},{timestamps:true, versionKey:false});

const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;