const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    spent: {
      type: String,
      required: [true, 'Spent is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    register_date: {
      type: String,
      required: [true, 'Register date is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', customerSchema);
