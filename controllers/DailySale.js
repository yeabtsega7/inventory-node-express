const router = require("express").Router();

//get all sales
router.get("/dailysale", async (req, res) => {
  try {
    const dailySales = await DailySale.findAll();
    return res.json(dailySales);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//get a sale by id
router.get("/dailysale/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dailySale = await DailySale.findByPk(id);
    if (dailySale) {
      return res.json(dailySale);
    }
    return res.status(404).json({ message: "Sale not found!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//create a sale
// router.post("/dailysale", async (req, res) => {
//   try {
//     const { productId, quantity, userId } = req.body;
//     const dailySale = await DailySale.create({ productId, quantity, userId });
//     return res.status(201).json({
//       dailySale,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //update a sale
// router.put("/dailysale/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { productId, quantity, userId } = req.body;
//     const dailySale = await DailySale.update(
//       { productId, quantity, userId },
//       { where: { id } }
//     );
//     if (dailySale) {
//       return res.json(dailySale);
//     }
//     return res.status(404).json({ message: "Sale not found!" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// //delete a sale
// router.delete("/dailysale/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await DailySale.destroy({
//       where: { id },
//     });
//     if (deleted) {
//       return res.status(204).send("Sale deleted");
//     }
//     throw new Error("Sale not found");
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
