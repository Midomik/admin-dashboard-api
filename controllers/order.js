const Order = require('../models/order');

const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null; // Поточна сторінка, за замовчуванням 1
    const limit = parseInt(req.query.limit) || null; // Кількість елементів на сторінці, за замовчуванням 10
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name ? { name: req.query.name } : {}; // Фільтр за полем name

    const orders = await Order.find(nameFilter).skip(skip).limit(limit);

    if (orders.length === 0) {
      return res.status(404).send({ message: 'Orders not found' });
    }

    const totalOrders = await Order.countDocuments(nameFilter); // Загальна кількість замовлень
    const totalPages = Math.ceil(totalOrders / limit); // Загальна кількість сторінок

    res.send({
      page,
      totalPages,
      totalOrders,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
};
