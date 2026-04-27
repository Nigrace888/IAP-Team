// import fs from "fs";
import User from "../../models/User.js";

// Login
export const Login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found or invalid credentials" });
    }
    return res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Signup
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  // fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.json({
    message: "Signup successful",
    user: newUser,
  });
};

// Create(POST) user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.json({
      message: "User created",
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Read(GET) all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Read(GET) single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

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
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated",
      user,
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
      message: "User deleted",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
