const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeExpenseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('income-expense', incomeExpenseSchema);
