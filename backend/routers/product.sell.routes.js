const express = require('express');
const controller = require('./../controllers/product.sell.controller');
const authController = require('./../controllers/auth.controller');


const router = express.Router();

router
.route('/')
.get(controller.getAllSells)
.post(
    authController.protect,
    authController.restrictTo('admin','shopkeeper'),
    controller.validateSell,
    controller.decrementProduct,
    controller.createSell);

router
.route('/:id')
.get(controller.getSell)
.delete(
    authController.protect,
    authController.restrictTo('admin'),
    controller.incrementProduct,
    controller.deleteSell);

module.exports = router;
