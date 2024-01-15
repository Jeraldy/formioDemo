const express = require('express');
const controller = require('./../controllers/product.sell.controller');
const authController = require('./../controllers/auth.controller');


const router = express.Router();

router
.route('/')
.get(controller.getAll)
.post(
    authController.protect,
    authController.restrictTo('admin'),
    controller.validateSell,
    controller.create,
    controller.decrementProduct);

router
.route('/:id')
.get(controller.getOne)
.delete(
    authController.protect,
    authController.restrictTo('admin'),
    controller.delete,
    controller.incrementProduct);

module.exports = router;
