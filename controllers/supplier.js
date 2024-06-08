const mongoose = require('mongoose');
const Supplier = require('../models/supplier');

const getSuppliers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name
      ? { name: new RegExp(req.query.name, 'i') }
      : {};

    const suppliers = await Supplier.find(nameFilter).skip(skip).limit(limit);

    if (suppliers.length === 0) {
      return res.status(404).send({ message: 'Suppliers not found' });
    }

    const totalSuppliers = await Supplier.countDocuments(nameFilter);
    const totalPages = Math.ceil(totalSuppliers / limit);

    res.send({
      page,
      totalPages,
      totalSuppliers,
      suppliers,
    });
  } catch (error) {
    next(error);
  }
};

const addSupplier = async (req, res, next) => {
  try {
    const supplierData = req.body;

    const existingProduct = await Supplier.findOne({ name: supplierData.name });
    if (existingProduct) {
      return res.status(409).send({ message: 'Supplier already exists' });
    }

    const newProduct = await Supplier.create(supplierData);

    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    const newSupplierData = req.body;

    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).send({ message: 'Invalid customer ID format' });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      newSupplierData,
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }

    res.status(200).send(updatedSupplier);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  addSupplier,
  updateSupplier,
};
