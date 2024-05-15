const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    // Add any other properties specific to your category model
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
