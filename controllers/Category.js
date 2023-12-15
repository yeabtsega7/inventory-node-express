const { Category } = require("../models");
// Import any necessary dependencies
// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name });
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a category by id
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      return res.json(category);
    }
    return res.status(404).json({ message: "Category not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Category.update({ name }, { where: { id } });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      return res.json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    }
    throw new Error("Category not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json({ message: "Category deleted" });
    }
    throw new Error("Category not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Export the controller functions
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
