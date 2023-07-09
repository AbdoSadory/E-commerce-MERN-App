import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import mongoose from "mongoose";
// @desc    Fetch All Products
// @route   /api/products/
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch Product with id
// @route   /api/products/id
// @access  Public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product not found, it's ${product}`);
  }
});

// @desc    Delete product
// @route   Delete /api/products/:id
// @access  Private / admin
const deletProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).send(product);
});

// @desc    create product
// @route   POST /api/products
// @access  Private / admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.collection.insertOne({
    name: req.body.name,
    price: req.body.price,
    user: new mongoose.Types.ObjectId(req.userDecodedToken.id),
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
  });
  if (product.acknowledged) {
    const newProduct = await Product.findById(product.insertedId);
    res.status(200).send(newProduct);
  } else {
    res.status(400);
    throw new Error("Couldn't to create Product !!!!");
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private / admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    user: new mongoose.Types.ObjectId(req.userDecodedToken.id),
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
  });
  if (product) {
    const newProduct = await Product.findById(product._id);
    res.status(200).send(newProduct);
  } else {
    res.status(400);
    throw new Error("Can't update the product");
  }
});
export {
  getProducts,
  getProductByID,
  deletProduct,
  createProduct,
  updateProduct,
};
