import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CORS,
  })
);

// import routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

//routes definition
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
// app config
app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
