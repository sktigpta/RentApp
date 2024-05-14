// businessRoutes.js

const express = require('express');
const router = express.Router();
const businessControllers = require("../controllers/business-controller");
const businessMiddleware = require("../middleware/business-middleware");
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

router.post("/register", businessMiddleware, businessControllers.register);
router.post("/:businessId/upload-product", businessMiddleware, upload.single('productImage'), businessControllers.uploadProduct);
router.get("/:businessId/products", businessMiddleware, businessControllers.listProducts);
router.delete("/:businessId/delete-product/:productId", businessMiddleware, businessControllers.deleteProduct);
router.put("/:businessId/edit-product/:productId", businessMiddleware, businessControllers.editProduct);

module.exports = router;
