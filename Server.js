const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models"); // Assuming your Sequelize instance is defined in a models/index.js file
const fileUpload = require("express-fileupload");
const Category = require("./routes/Category");
const Product = require("./routes/Product");
const User = require("./routes/User");
const Sale = require("./routes/Sale");

// Middleware
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "Authorization"); // Expose the Authorization header
  next();
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "An error occurred" });
});

// Routes
app.use("/api/v1", Category);
app.use("/api/v1", Product);
app.use("/api/v1", User);
app.use("/api/v1", Sale);
// Sync Sequelize models with the database
sequelize
  .sync({ force: false }) // Set force to true to drop and recreate tables on each app start (be cautious in production)
  .then(() => {
    console.log("Database synced");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
