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

mongoose.connect("mongodb+srv://grace888:1234@cluster0.8m4jumn.mongodb.net/Cluster0")
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