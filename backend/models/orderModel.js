const mongoose = require('mongoose');
const User = require('./userModel');
const orderSchema = new mongoose.Schema({
    order_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    order_amount: { 
        type: Number, 
        required: true 
    },
    order_currency: { 
        type: String, 
        required: true 
    },
    customer_details: {
        customer_id: { 
            type: mongoose.Types.ObjectId, 
            ref: 'User',
            required: true },
        customer_phone: { type: String, required: true },
        customer_email: { type: String, required: true } 
    },
    order_meta: {
        return_url: { type: String, required: true }
    },
    order_status: { type: String, default: 'PENDING' },
    room_id: { type: mongoose.Types.ObjectId, ref: 'Room' },
    created_at: { type: Date, default: Date.now }
},{timestamps:true, versionKey:false});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;