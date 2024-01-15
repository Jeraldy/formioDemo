const factory = require('./handle.factrory');
const ProductSell = require('../models/product.sell.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product.model');


exports.validateSell = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError("Product does not exist!"));
    }

    if (product.quantity < quantity) {
        return next(new AppError("Quntity you provided exceeds available stock"));
    }
    next();
});

exports.decrementProduct = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body
    Product.findByIdAndUpdate(productId, { $inc: { quantity: -parseInt(quantity) } },
        function (err, _) {
            if (err) return next(err);
        })
    next();
});

exports.incrementProduct = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body
    Product.findByIdAndUpdate(productId, { $inc: { quantity: parseInt(quantity) } },
        function (err, _) {
            if (err) return next(err);
        })
    next();
});

exports.createSell = factory.createOne(ProductSell)
exports.updateSell = factory.updateOne(ProductSell)
exports.deleteSell = factory.deleteOne(ProductSell)
exports.getAllSells = factory.getAll(ProductSell)
exports.getSell = factory.getOne(ProductSell)
