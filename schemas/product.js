const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  suppliers: Joi.string().required(),
  stock: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
});

module.exports = productSchema;
