const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
});

const businessSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    businessPhone: { type: String, required: true, validate: /^\d{10}$/ }, // Example validation for a 10-digit phone number
    businessDescription: { type: String, required: true },
    businessAddress: { type: String, required: true },
    businessCategories: [categorySchema], 
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
