const mongoose = require('mongoose');
const Customer = require('../models/customer');

const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name
      ? { name: new RegExp(req.query.name, 'i') }
      : {};

    const customers = await Customer.find(nameFilter).skip(skip).limit(limit);

    if (customers.length === 0) {
      return res.status(404).send({ message: 'Customers not found' });
    }

    const totalCustomers = await Customer.countDocuments(nameFilter);
    const totalPages = Math.ceil(totalCustomers / limit);

    res.send({
      page,
      totalPages,
      totalCustomers,
      customers,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).send({ message: 'Invalid customer ID format' });
    }

    const customer = await Customer.findOne({ _id: customerId });

    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }

    res.status(200).send(customer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
};
