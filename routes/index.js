const express = require('express');

const authMiddleware = require('../middlewares/auth');

const userRouter = require('./user');
const dashboardRouter = require('./dashboard');
const orderRouter = require('./order');

const router = express.Router();

router.use('/user', userRouter);
router.use('/dashboard', dashboardRouter);
router.use('/orders', authMiddleware, orderRouter);

module.exports = router;
