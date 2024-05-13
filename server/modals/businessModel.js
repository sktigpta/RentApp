// businessModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  businessPhone: { type: String, required: true },
  businessDiscription: { type: String, required: true },
  businessAddress: { type: String, required: true },
  BusinessCategories: [{}],
  createdAt: { type: Date, default: Date.now },

});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;