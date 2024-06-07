const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    suppliers: {
      type: String,
      required: [true, 'Suppliers is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Supplier', supplierSchema);
