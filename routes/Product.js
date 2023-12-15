const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");
const { admin, auth } = require("../Middelware/Auth");

// Create a new product
router.post("/product", admin, createProduct);

// Get all products
router.get("/product", auth, getAllProducts);

// Get a product by id
router.get("/product/:id", auth, getProductById);

// Update a product
router.put("/product/:id", admin, updateProduct);

// Delete a product
router.delete("/product/:id", admin, deleteProduct);

module.exports = router;
