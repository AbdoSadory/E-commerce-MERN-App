import colors from 'colors'
import products from './data/products.js'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
const app = express()
dotenv.config()
connectDB()
const port = process.env.PORT || 5000
// Port Listen
app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port}`.bold)
)
// Routes
app.get('/', (req, res) => {
  res.send('API is running !')
})

app.use('/api/products', productRouter)

app.use(notFound)

app.use(errorHandler)
