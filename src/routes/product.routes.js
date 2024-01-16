import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createProduct);

router.route("/:id").put(editProduct).delete(deleteProduct);

export default router;
