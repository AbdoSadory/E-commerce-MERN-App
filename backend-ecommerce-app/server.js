import products from './data/products.js'
import express from 'express'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
const port = process.env.PORT || 5000
// Port Listen
app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port}`)
)
// Routes
app.get('/', (req, res) => {
  res.send('API is running !')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})
