import express from "express";
import { Signup } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", Signup);

export default router;