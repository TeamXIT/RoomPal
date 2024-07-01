const mongoose = require('mongoose');
const RefundSchema = new mongoose.Schema({
    cf_payment_id: { type: Number, required: true },
    cf_refund_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    entity: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: null },
    order_id: { type: String, required: true, unique: true },
    processed_at: { type: Date, required: false },
    refund_amount: { type: Number, required: true },
    refund_arn: { type: String, required: false },
    refund_charge: { type: Number, required: true },
    refund_currency: { type: String, required: true },
    refund_id: { type: String, required: true },
    refund_mode: { type: String, default: null },
    refund_note: { type: String, default: null },
    refund_speed: {
        requested: { type: String, required: false },
        accepted: { type: String, required: false },
        processed: { type: String, required: false },
        message: { type: String, default: null }
    },
    refund_splits: { type: [mongoose.Schema.Types.Mixed], default: [] },
    refund_status: { type: String, required: true },
    refund_type: { type: String, required: true },
    status_description: { type: String, required: true }
});

const Refund = mongoose.model('Refund', RefundSchema);

module.exports = Refund;