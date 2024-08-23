const express = require("express");
const { addProduct, getAllProduct, relatedProduct, updateProduct, getProductById, deleteProduct } = require("../Controller/productController");
const upload = require("../utils/upload");

// 
const router = express.Router();

router.post("/add-product", upload.single('productImage'), addProduct);
router.get("/products", getAllProduct);
router.put("/update-product/:id", upload.single('productImage'), updateProduct);
router.get("/related-products/:id", relatedProduct);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deleteProduct);


module.exports = router;