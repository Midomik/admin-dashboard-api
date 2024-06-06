const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredientThumb: { type: String, required: true },
    'thumb-medium': { type: String, required: true },
    'thumb-small': { type: String, required: true },
    alcohol: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: false }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
