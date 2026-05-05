import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodo
} from "../controllers/todoControllers.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All todo routes are protected - user must be logged in
router.use(protect);

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", toggleTodo);

export default router;