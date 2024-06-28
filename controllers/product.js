const mongoose = require('mongoose');

const Product = require('../models/product');

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name
      ? { name: new RegExp(req.query.name, 'i') }
      : {};

    const products = await Product.find(nameFilter).skip(skip).limit(limit);

    if (products.length === 0) {
      return res.status(404).send({ message: 'Products not found' });
    }

    const totalProducts = await Product.countDocuments(nameFilter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.send({
      page,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
      return res.status(409).send({ message: 'Product already exists' });
    }

    const newProduct = await Product.create(productData);

    const allProducts = await Product.find().sort({ createdAt: -1 });

    const updatedProducts = await Promise.all(
      allProducts.map(async (product, index) => {
        if (product._id.equals(newProduct._id)) {
          return newProduct;
        }
        return product;
      })
    );

    await Product.deleteMany({});
    await Product.insertMany(updatedProducts);

    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const newProductData = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: 'Invalid customer ID format' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      newProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: 'Invalid customer ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId, {
      new: true,
    });

    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(deletedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
