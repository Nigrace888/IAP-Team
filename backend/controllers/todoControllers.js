// backend/controllers/todoControllers.js

import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    console.log("Creating todo - User:", req.user);  // Debug
    console.log("Creating todo - Body:", req.body);  // Debug
    
    const { title, description } = req.body;
    const userId = req.user.id;

    const todo = await Todo.create({
      title,
      description,
      user: userId
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo
    });
  } catch (err) {
    console.error("Create todo error:", err);  // This will show the real error
    res.status(500).json({ error: err.message });
  }
};

// READ all todos for logged-in user
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    const todos = await Todo.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ single todo
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user.id;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { 
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({
      message: "Todo updated successfully",
      todo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({
      message: "Todo deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE todo completion status
export const toggleTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: userId
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    todo.updatedAt = Date.now();
    await todo.save();

    res.json({
      message: "Todo toggled successfully",
      todo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};