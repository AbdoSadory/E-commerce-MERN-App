import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch All Products
// @route   /api/products/
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch Product with id
// @route   /api/products/id
// @access  Public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error(`Product not found, it's ${product}`)
  }
})

export { getProducts, getProductByID }
