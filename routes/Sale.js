const router = require("express").Router();

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require("../controllers/Sale");
const { auth, admin } = require("../Middelware/Auth");
// Create a new sale
router.post("/sale", auth, createSale);

// Get all sales
router.get("/sale", admin, getAllSales);

// Get a sale by id
router.get("/sale/:id", admin, getSaleById);

// Update a sale
router.put("/sale/:id", admin, updateSale);

// Delete a sale
router.delete("/sale/:id", admin, deleteSale);

module.exports = router;
