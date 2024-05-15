const Business = require('../modals/businessModel');
const Product = require('../modals/productModel');
const Category = require('../modals/categoryModel');
const User = require('../modals/userModel');
const fs = require('fs');

const register = async (req, res) => {
    try {
        const { businessName, businessAddress, businessDescription, businessPhone, businessCategories } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if business name already exists
        const businessExist = await Business.findOne({ businessName });
        if (businessExist) {
            return res.status(400).json({ message: "Business name already exists" });
        }

        // Create new business
        const newBusiness = await Business.create({
            userId,
            businessName,
            businessPhone,
            businessAddress,
            businessDescription,
            businessCategories
        });

        // Update user's isBusiness field to true
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBusiness = true;
        await user.save();

        return res.status(201).json({ message: "Business registered successfully", business: newBusiness });
    } catch (error) {
        console.error("Error registering business:", error.message, error.stack);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Controller to upload a product for a business
const uploadProduct = async (req, res) => {
    try {
        const { businessId } = req.params;
        const { name, description, pricePerDay, pricePerWeek, pricePerMonth, categories } = req.body;

        // Convert category names to corresponding ObjectIds
        const categoryIds = await Category.find({ name: { $in: categories } }).distinct('_id');

        // Check if all categories were found
        if (categories.length !== categoryIds.length) {
            const notFoundCategories = categories.filter(category => !categoryIds.includes(category));
            return res.status(400).json({ message: `Categories not found: ${notFoundCategories.join(', ')}` });
        }

        // Create new product
        const newProduct = await Product.create({
            businessId,
            name,
            description,
            pricePerDay,
            pricePerWeek,
            pricePerMonth,
            categories: categoryIds
        });

        return res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
    } catch (error) {
        console.error("Error uploading product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Controller to list all products of a business
const listProducts = async (req, res) => {
    try {
        const { businessId } = req.params;

        // Find all products of the business
        const products = await Product.find({ businessId });

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error listing products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to delete a product of a business
const deleteProduct = async (req, res) => {
    try {
        const { businessId, productId } = req.params;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the product belongs to the business
        if (product.businessId.toString() !== businessId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Delete the product
        await product.remove();

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to edit a product of a business
const editProduct = async (req, res) => {
    try {
        const { businessId, productId } = req.params;
        const { name, description, pricePerDay, pricePerWeek, pricePerMonth, categories } = req.body;

        // Find the business by ID
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        // Find the product by ID
        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the product belongs to the business
        if (product.businessId.toString() !== businessId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Update product details
        product.name = name;
        product.description = description;
        product.pricePerDay = pricePerDay;
        product.pricePerWeek = pricePerWeek;
        product.pricePerMonth = pricePerMonth;
        product.categories = categories;

        // Save the updated product
        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error editing product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { register, uploadProduct, listProducts, deleteProduct, editProduct };
