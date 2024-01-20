import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { createProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(verifyJWT, createOrder);
router.route("/all").post(verifyJWT, getOrders);

export default router;
