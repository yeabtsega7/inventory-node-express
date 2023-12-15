const router = require("express").Router();
require("dotenv").config();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  changePassword,
} = require("../controllers/User");

const { auth, admin } = require("../Middelware/auth");

// Create a new user
router.post("/user", admin, createUser);

// Get all users
router.get("/user", admin, getAllUsers);

// Get a user by id
router.get("/user/:id", admin, getUserById);

// Update a user
router.put("/user/:id", admin, updateUser);

// Delete a user
router.delete("/user/:id", admin, deleteUser);

// Login
router.post("/login", login);

// change password
router.put("/user/changepassword/:id", admin, changePassword);

module.exports = router;
