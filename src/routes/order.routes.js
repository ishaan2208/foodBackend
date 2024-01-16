import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { createProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getOrders).post(verifyJWT, createOrder);

export default router;
