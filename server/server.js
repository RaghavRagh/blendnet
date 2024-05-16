import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR: "));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

app.use('/auth', authRoutes);
app.use('/api', authMiddleware, watchlistRoutes);

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
