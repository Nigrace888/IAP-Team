import express from "express";
import { Login, Signup, getUsers } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);  // ✅ Now using the actual Signup controller
router.get("/users", getUsers);

export default router;