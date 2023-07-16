import colors from "colors";
import products from "./data/products.js";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productsRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
// Port Listen
app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port}`.bold)
);

// create __dirname
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("API is running !");
});
app.use(express.json()); // body parser

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);
