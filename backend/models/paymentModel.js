const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    payment_session_id: {
        type: String,
        required: true,
        unique: true
    },
    payment_method: {
        netbanking: {
            channel: {
                type: String,
                required: true
            },
            netbanking_bank_code: {
                type: String,
                required: true
            }
        }
    }
},{timestamps:true, versionKey:false});
const Payment = mongoose.model('payments',paymentSchema);

module.exports = Payment;