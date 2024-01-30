const factory = require('./handle.factrory');
const ProductCategory = require('../models/product.category.model');
const ProductSell = require('../models/product.sell.model');
const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app.error');

exports.validateOnDelete = catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    const products = await Product.find({ categoryId })
    for (var index in products) {
        const product = products[index]
        const productSell = await ProductSell.findOne({ productId: product._id });
        if (productSell) {
            return next(new AppError("This product category cannot be deleted. There are sales associated with it."));
        }
    }
    next();
});

exports.create = factory.createOne(ProductCategory)
exports.update = factory.updateOne(ProductCategory)
exports.delete = factory.deleteOne(ProductCategory)
exports.getAll = factory.getAll(ProductCategory)
exports.getOne= factory.getOne(ProductCategory)
