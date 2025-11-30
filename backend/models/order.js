const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    serviceType: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Dicuci', 'Selesai'] },
    
    proofImage: { type: String } 

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);