import express from "express";
import authRoute from "./routes/authRoute.js";
import todoRoutes from "./routes/todoRoutes.js"; // ADD THIS
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


// mongodb connection

mongoose.connect("mongodb://localhost:27017/IAP")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


// routes
app.use("/api", authRoute);
app.use("/api/todos", todoRoutes); // ADD THIS
app.use("/users", userRoutes);

// serve frontend
app.use(express.static("frontend"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});