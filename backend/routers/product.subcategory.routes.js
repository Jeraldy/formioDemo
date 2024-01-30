const express = require('express');
const controller = require('../controllers/product.subcategory.controller');
const authController = require('./../controllers/auth.controller');


const router = express.Router();

router
.route('/')
.get(controller.getAll)
.post(
    authController.protect,
    authController.restrictTo('admin'),
    controller.create);

router
.route('/:id')
.get(controller.getOne)
.delete(
    authController.protect,
    authController.restrictTo('admin'),
    controller.validateOnDelete,
    controller.delete);

module.exports = router;

