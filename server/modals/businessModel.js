const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./categoryModel'); // Import Category model

const addressSchema = new Schema({
    area: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: String, required: true },
    otherDetails: { type: String }
});

const businessSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    businessPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Matches 10 digits or a variety of common phone number formats
                return /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    businessDescription: { type: String, required: true },
    businessAddress: { type: addressSchema, required: true },
    businessCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // Reference to Category model
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
