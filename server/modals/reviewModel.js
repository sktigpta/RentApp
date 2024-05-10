// reviewModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewedUserId: { type: Schema.Types.ObjectId, required: true },
  reviewedModel: { type: String, enum: ['User', 'Business'], required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
