const { Product, Category } = require("../models");
const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId, description, quantity } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }
    const existproduct = await Product.findOne({ where: { name } });
    if (existproduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const product = await Product.create({
      name,
      price,
      categoryId,
      description,
      quantity,
    });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: Category, as: "Category" },
      order: [["name", "ASC"]],
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      return res.json(product);
    }
    return res.status(404).json({ message: "Product not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId, description, quantity } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }
    const updated = await Product.update(
      { name, price, categoryId, description, quantity },
      { where: { id } }
    );
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.json({
        message: "Product updated successfully. ",
        data: updatedProduct,
      });
    }
    throw new Error("Product not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send("Product deleted");
    }
    throw new Error("Product not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
