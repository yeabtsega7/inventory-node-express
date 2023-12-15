const { User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role,
      },
      {
        attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
      }
    );
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
    });
    if (user) {
      return res.json(user);
    }
    return res.status(404).json({ message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;
    const userExists = await User.findByPk(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (userExists.id === 1 && req.user.id !== 1) {
      return res
        .status(403)
        .json({ message: "You cannot Update the owner information!" });
    }
    if (!password) {
      const updated = await User.update(
        { name, email, role },
        { where: { id } }
      );
      if (updated) {
        const updatedUser = await User.findByPk(id, {
          attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
        });
        return res.json({
          message: "User updated successfully.",
          data: updatedUser,
        });
      }
      throw new Error("User not found");
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const updated = await User.update(
      { name, email, role, password: hashedPassword },
      { where: { id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
      });
      return res.json({
        message: "User updated successfully.",
        data: updatedUser,
      });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await User.findByPk(id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (userExists.id === 1) {
      return res.status(403).json({ message: "Owner user cannot be deleted!" });
    }
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json({ message: "User deleted successfully." });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { where: { email } },
      {
        attributes: { exclude: ["password"] }, // Exclude the 'password' field from the returned data
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    return res.header("Authorization", token).json({
      message: "login successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await User.update({ password: hashedPassword }, { where: { id } });
    const updatedUser = await User.findByPk(id);

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  changePassword,
};
