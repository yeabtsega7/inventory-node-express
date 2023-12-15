const {
  Sale,
  Product,
  MonthlySale,
  YearlySale,
  DailySale,
  User,
} = require("../models");
const { Op } = require("sequelize");

const createSale = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const { id } = req.user;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }
    const date = new Date();

    const sale = await Sale.create({
      productId,
      quantity,
      userId: id,
      price,
      saleDate: new Date(),
    });
    const newStock = product.quantity - quantity;
    await Product.update({ quantity: newStock }, { where: { id: productId } });
    const updatedProduct = await Product.findByPk(productId);
    res.status(201).json({ sale: sale, product: updatedProduct });
    // const newStock = product.stock - quantity;
    // const sale = await Sale.create({ productId, quantity, userId: id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    //sort bu date
    // const sales = await Sale.findAll({
    //   include: { model: Product, as: "Product" },
    // });
    // return res.json(sales);
    const { date } = req.query;
    let saleDate = {};
    if (date) {
      let nexDate = date.split("-");
      nexDate[2] = parseInt(nexDate[2]) + 1;
      nexDate = nexDate.join("-");
      saleDate = {
        [Op.between]: [date, nexDate],
      };
    }

    const sales = await Sale.findAll({
      include: [
        { model: Product, as: "Product" },
        { model: User, as: "User" },
      ],

      where: {
        saleDate: saleDate,
      },

      order: [["saleDate", "Desc"]],
    });
    return res.json(sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);
    if (sale) {
      return res.json(sale);
    }
    return res.status(404).json({ message: "Sale not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity, userId, saleDate } = req.body;
    const sale = await Sale.update(
      { productId, quantity, userId, saleDate },
      { where: { id } }
    );
    if (sale) {
      return res.json(sale);
    }
    return res.status(404).json({ message: "Sale not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await Sale.findByPk(id);
  if (!sale) {
    return res.status(404).json({ message: "Sale not found" });
  }
  const product = await Product.findByPk(sale.productId);
  const newStock = product.quantity + sale.quantity;
  await Product.update(
    { quantity: newStock },
    { where: { id: sale.productId } }
  );
  await Sale.destroy({ where: { id } });

  res.status(204).end();
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
