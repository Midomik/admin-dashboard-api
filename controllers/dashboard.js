const Product = require('../models/product');
const Supplier = require('../models/supplier');
const Customer = require('../models/customer');
const Order = require('../models/order');
const IncomeExpense = require('../models/income-expense');

const getDashboard = async (req, res, next) => {
  try {

    const results = await Promise.allSettled([
      Product.find(),
      Supplier.find(),
      Customer.find(),
      Order.find().limit(5),
      IncomeExpense.find().limit(6),
    ]);

    if (results[0] === null) {
      return res.status(404).send({ message: 'Products not found' });
    }

    if (results[1] === null) {
      return res.status(404).send({ message: 'Suppliers not found' });
    }

    if (results[2] === null) {
      return res.status(404).send({ message: 'Customers not found' });
    }

    if (results[3] === null) {
      return res.status(404).send({ message: 'Orders not found' });
    }

    if (results[4] === null) {
      return res.status(404).send({ message: 'Income or Expense not found' });
    }

    res.status(200).send({
      products: results[0].value.length,
      suppliers: results[1].value.length,
      customers: results[2].value.length,
      orders: results[3].value,
      incomeExpenses: results[4].value,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
