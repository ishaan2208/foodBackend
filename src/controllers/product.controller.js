import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const data = [
  {
    name: "Dosa",
    imageUrl:
      "https://pipingpotcurry.com/wp-content/uploads/2020/11/Dosa-recipe-plain-sada-dosa-Piping-Pot-Curry.jpg",
    category: "food",
    price: 270,
  },
  {
    name: "Idli/Sambhar",
    imageUrl:
      "https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg",
    category: "food",
    price: 180,
  },
  {
    name: "Dal Makhni",
    imageUrl:
      "https://recipes.timesofindia.com/thumb/53097626.cms?width=1200&height=900",
    category: "food",
    price: 180,
  },

  {
    name: "Cold Coffee",
    imageUrl:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/cold-coffee-recipe-2.jpg",
    category: "beverages",
    price: 80,
  },
  {
    name: " Tea",
    imageUrl: "https://static.toiimg.com/photo/83173328.cms",
    category: "beverages",
    price: 30,
  },

  {
    name: " Coke",
    imageUrl:
      "https://5.imimg.com/data5/SELLER/Default/2021/12/MI/CM/OC/26602448/300-ml-coke-original-500x500.jpg",
    category: "beverages",
    price: 55,
  },
  {
    name: "Lassi",
    imageUrl:
      "https://pipingpotcurry.com/wp-content/uploads/2021/05/Lassi-in-a-glass.jpg",
    category: "beverages",
    price: 90,
  },
  {
    name: "Milk",
    imageUrl: "https://m.media-amazon.com/images/I/61lzZAgOCzL.jpg",
    category: "beverages",
    price: 40,
  },

  {
    name: "Tandoori Platter",
    imageUrl:
      "https://images.slurrp.com/prod/recipe_images/better-butter/tandoori-paneer-platter_HX3XOHVHLY0WD9AXFZZG.webp?impolicy=slurrp-20210601&width=1200&height=675",
    category: "food",
    price: 295,
  },
  {
    name: "Naan",
    imageUrl:
      "https://static.toiimg.com/thumb/53338316.cms?width=1200&height=900",
    category: "food",
    price: 20,
  },
  {
    name: "Paneer Butter Masala",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5kecc5mebmjSS-CrZAKaa_RUwoFa5NOuwg&usqp=CAU",
    category: "food",
    price: 240,
  },
  {
    name: "Gol Gappe",
    imageUrl: "https://static.toiimg.com/photo/75107900.cms",
    category: "food",
    price: 60,
  },
];

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category } = req.body;

  //   const product = await Product.create({ name, price, category });
  const imagePath = req.files?.image[0].path;

  const imgUrl = await uploadOnCloudinary(imagePath);

  const product = await Product.create({
    name,
    price,
    category,
    imageUrl: imgUrl.url,
  });
  res.status(201).json(new ApiResponse(201, product, "Product created"));
});

export const editProduct = asyncHandler(async (req, res) => {
  const { name, price, category } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: { name, price, category } },
    { new: true }
  );
  res.status(200).json(new ApiResponse(200, newProduct, "Product updated"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json(new ApiResponse(200, {}, "Product deleted"));
});
