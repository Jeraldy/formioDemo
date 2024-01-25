const factory = require('./handle.factrory');
const ProductSell = require('../models/product.sell.model');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product.model');

const onError = (next) => function (err, _) {
    if (err) return next(err);
}

exports.validateSell = catchAsync(async (req, res, next) => {
    for (const index in req.body) {
        const { productId, quantity } = req.body[index];
        const product = await Product.findById(productId);
        if (!product) {
            return next(new AppError("Product does not exist!"));
        }
    
        if (product.quantity < quantity) {
            return next(new AppError(`
            Quntity you provided for '${product.name}' exceeds available stock '${product.quantity}'.`));
        }
    }
    next();
});

exports.decrementProduct = catchAsync(async (req, res, next) => {
    for (const index in req.body) {
        const { productId, quantity } = req.body[index]
        const query = { $inc: { quantity: -parseInt(quantity) } }
        Product.findByIdAndUpdate(productId, query, onError(next))
    }
    next();
});

exports.incrementProduct = catchAsync(async (req, res, next) => {
    const productSellId = req.params.id;
    const productSell = await ProductSell.findById(productSellId);
    if (!productSell) {
        return next(new AppError("Document does not exist!"));
    }
    const query = { $inc: { quantity: productSell.quantity } };
    Product.findByIdAndUpdate(productSell.productId, query, onError(next));
    next();
});

exports.createSell = factory.createMany(ProductSell)
exports.updateSell = factory.updateOne(ProductSell)
exports.deleteSell = factory.deleteOne(ProductSell)
exports.getAllSells = factory.getAll(ProductSell, 'productId')
exports.getSell = factory.getOne(ProductSell, 'productId')
