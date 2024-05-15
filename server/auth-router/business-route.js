// server/routes/business-route.js

const express = require('express');
const router = express.Router();
const businessControllers = require("../controllers/business-controller");
const { businessMiddleware, businessRegistration } = require("../middleware/business-middleware");
const authMiddleware = require('../middleware/auth-middleware');
const multer = require('multer');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products'); // Directory where product images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensuring unique filenames
    }
});

const upload = multer({ storage });

// Routes for business CRUD operations
router.route("/").get((req, res) => {
    res.send("hey");
});

router.post("/register", authMiddleware, businessRegistration, businessControllers.register);
router.post("/:businessId/upload-product", authMiddleware, businessMiddleware, upload.single('productImage'), businessControllers.uploadProduct);
router.get("/:businessId/products", businessControllers.listProducts);
router.delete("/:businessId/delete-product/:productId", authMiddleware, businessMiddleware, businessControllers.deleteProduct);
router.put("/:businessId/edit-product/:productId", authMiddleware, businessMiddleware, businessControllers.editProduct);

module.exports = router;
