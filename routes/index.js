const express = require('express');

const authMiddleware = require('../middlewares/auth');

const userRouter = require('./users');
const dashboardRouter = require('./dashboard');
const orderRouter = require('./orders');
const productRouter = require('./products');
const supplierRouter = require('./suppliers');
const customerRouter = require('./customer');
const product = require('../models/product');

const router = express.Router();

router.use('/user', userRouter);
router.use('/dashboard', authMiddleware, dashboardRouter);
router.use('/orders', authMiddleware, orderRouter);
router.use('/products', authMiddleware, productRouter);
router.use('/suppliers', authMiddleware, supplierRouter);
router.use('/customers', authMiddleware, customerRouter);
router.use('/lol', async (res, req, next) => {
  const categories = await product.distinct('category');
  const formattedCategories = categories.map(category => ({
    label: category,
    value: category,
  }));

  console.log(formattedCategories);
});

module.exports = router;
