import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProduct = asyncHandler(async (req, res) => {
  const { category, color, size, title } = req.query;

  const where = {};

  if (category) {
    where.category = category;
  }

  if (color) {
    where.color = color;
  }

  if (size) {
    where.size = size;
  }

  if (title) {
    where.title = { $regex: title, $options: "i" };
  }

  const products = await Product.find(where);

  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, category, color, size } = req.body;
  const productExist = await Product.findOne({ title });

  if (productExist) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({ title, price, category, color, size });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.log(error);
  }
});

export { createProduct, getProduct, updateProduct, deleteProduct };
