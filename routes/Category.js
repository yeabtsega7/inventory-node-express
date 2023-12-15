const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category");

const { admin } = require("../Middelware/Auth");

// Create a new category
router.post("/category", admin, createCategory);

// Get all categories
router.get("/category", admin, getAllCategories);

// Get a category by id
router.get("/category/:id", admin, getCategoryById);

// Update a category
router.put("/category/:id", admin, updateCategory);

// Delete a category
router.delete("/category/:id", admin, deleteCategory);

module.exports = router;
