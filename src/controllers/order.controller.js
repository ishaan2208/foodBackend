import Order from "../models/order.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productsArray } = req.body;
  if (!productsArray) {
    throw new ApiError(400, "Products array is required");
  }
  if (productsArray.length === 0) {
    throw new ApiError(400, "Products array cannot be empty");
  }
  if (!req.user._id) {
    throw new ApiError(400, "User is required");
  }
  const order = await Order.create({
    userId: req.user._id,
    productsArray,
  });
  res.status(201).json(new ApiResponse(201, order, "Order created"));
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.status(200).json(new ApiResponse(200, orders, "Orders fetched"));
});
