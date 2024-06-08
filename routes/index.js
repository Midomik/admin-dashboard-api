const express = require('express');

const authMiddleware = require('../middlewares/auth');

const userRouter = require('./users');
const dashboardRouter = require('./dashboard');
const orderRouter = require('./orders');
const productRouter = require('./products');
const supplierRouter = require('./suppliers');
const customerRouter = require('./customer');

const router = express.Router();

router.use('/user', userRouter);
router.use('/dashboard', dashboardRouter);
router.use('/orders', authMiddleware, orderRouter);
router.use('/products', productRouter);
router.use('/suppliers', supplierRouter);
router.use('/customers', customerRouter);

module.exports = router;
