const Order = require('../models/order');

const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;  
    const limit = parseInt(req.query.limit) || null; 
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name
      ? { name: new RegExp(req.query.name, 'i') }
      : {}; 

    const orders = await Order.find(nameFilter).skip(skip).limit(limit);

    if (orders.length === 0) {
      return res.status(404).send({ message: 'Orders not found' });
    }

    const totalOrders = await Order.countDocuments(nameFilter); 
    const totalPages = Math.ceil(totalOrders / limit); 

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
