import express from "express";
import { Login, Signup } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", Login);
router.post("/Signup",Signup);

export default router;