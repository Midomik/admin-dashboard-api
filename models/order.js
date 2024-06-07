const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    addres: {
      type: String,
      required: [true, 'Addres is required'],
    },
    products: {
      type: String,
      required: [true, 'Products is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
    },
    order_date: {
      type: String,
      required: [true, 'Order date is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
