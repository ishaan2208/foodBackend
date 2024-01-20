import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if ([email, password, name].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ email, password, name });

  res.status(201).json({ user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Incorrect password");
  }

  const token = user.generateAccessToken();

  res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json(new ApiResponse(200, { token }, "Login successful"));
});

export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "Logout successful"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) {
    throw new ApiError(401, "token not valid");
  }
  const user = await User.findById(decoded._id).select("-password");
  res.status(200).json(new ApiResponse(200, user, "User found"));
});
