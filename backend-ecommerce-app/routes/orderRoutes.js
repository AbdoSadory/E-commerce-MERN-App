import { Router } from 'express'
import {
  addOrderItems,
  getOrderByID,
  getUserOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import verifyToken from '../middleware/authMiddleware.js'

const orderRouter = Router()

orderRouter.get('/myOrders', verifyToken, getUserOrders)
orderRouter.post('/', verifyToken, addOrderItems)
orderRouter.get('/:id', verifyToken, getOrderByID)
orderRouter.put('/:id/pay', verifyToken, updateOrderToPaid)

export { orderRouter }
