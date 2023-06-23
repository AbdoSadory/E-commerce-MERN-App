import { Router } from 'express'
import {
  getProductByID,
  getProducts,
} from '../controllers/productsController.js'
const productRouter = Router()

productRouter.route('/').get(getProducts)
productRouter.route('/:id').get(getProductByID)

export default productRouter
