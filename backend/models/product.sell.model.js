const mongoose = require('mongoose');
const commonModel = require('./common.model');

const ProductSellSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, "Product is required!"],
    },
    sellingPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    ...commonModel,
});

const ProductSell = mongoose.model('ProductSell', ProductSellSchema);

module.exports = ProductSell;