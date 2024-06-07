const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    suppliers: {
      type: String,
      required: [true, 'Suppliers is required'],
    },
    stock: {
      type: String,
      required: [true, 'Stock is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
