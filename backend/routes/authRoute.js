import express from "express";
import { Login, Signup,getUsers } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", (req, res) => {
  res.json({ message: "Signup successful" });
});
router.get("/users", getUsers);

export default router;