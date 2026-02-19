const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

// -------------------------------
// User Registration
// -------------------------------
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).send({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).send({ message: error.message || "Server Error" });
  }
};

// -------------------------------
// User Login
// -------------------------------
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).send({ message: "Email & Password required" });
    }

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Check password
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).send({ message: error.message || "Server Error" });
  }
};

