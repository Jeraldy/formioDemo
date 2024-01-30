const factory = require('./handle.factrory');
const ProductSubCategory = require('../models/product.subcategory.model');
const Product = require('../models/product.model');
const ProductSell = require('../models/product.sell.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app.error');

exports.validateOnDelete = catchAsync(async (req, res, next) => {
    const subCategoryId = req.params.id;
    const products = await Product.find({ subCategoryId })
    for(const index in products){
        const product = products[index]
        const productSell = await ProductSell.findOne({ productId: product._id });
        if (productSell) {
            return next(new AppError("This product category cannot be deleted. There are sales associated with it."));
        }
    }
    next();
});

exports.create = factory.createOne(ProductSubCategory)
exports.update = factory.updateOne(ProductSubCategory)
exports.delete = factory.deleteOne(ProductSubCategory)
exports.getAll = factory.getAll(ProductSubCategory, 'categoryId')
exports.getOne = factory.getOne(ProductSubCategory, 'categoryId')
