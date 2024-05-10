// productModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  name: { type: String, required: true },
  description: { type: String },
  pricePerDay: { type: Number },
  pricePerWeek: { type: Number },
  pricePerMonth: { type: Number },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // Array of category IDs
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
