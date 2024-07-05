const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    debit_amount:{
        type: Number,
        required:false
    },
    credit_amount:{
        type: Number,
        required:false
    },
    balance_amount:{
        type: Number,
        required:false
    },

},{timestamps:true, versionKey:false});
const Transaction = mongoose.model('transactions',transactionSchema);
module.exports = Transaction;