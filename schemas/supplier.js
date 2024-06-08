const Joi = require('joi');

const supplierSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.string().required(),
  status: Joi.string().valid('Active', 'Deactive').required(),
});

module.exports = supplierSchema;
