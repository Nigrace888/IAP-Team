import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, "your_jwt_secret_key", {
    expiresIn: "30d"
  });
};

// Login - FIXED with token
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check password separately
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // ✅ Generate token
    const token = generateToken(user._id);
    
    // ✅ Return user data AND token
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: token  // 👈 THIS WAS MISSING!
    });
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Signup - FIXED with token
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    // ✅ Generate token
    const token = generateToken(newUser._id);

    // ✅ Return user data AND token
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token: token  // 👈 THIS WAS MISSING!
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create(POST) user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Read(GET) all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Read(GET) single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update(PUT) user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Del(DELETE) user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User deleted"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};