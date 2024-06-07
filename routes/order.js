const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.get('/', orderController.getOrders);

module.exports = router;
