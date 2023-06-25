import { Router } from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/usersControllers.js'
import verifyToken from '../middleware/authMiddleware.js'
const userRouter = Router()

userRouter.post('/login', authUser)
userRouter.post('/register', registerUser)
userRouter.get('/profile', verifyToken, getUserProfile)
userRouter.post('/profile', verifyToken, updateUserProfile)

export default userRouter
