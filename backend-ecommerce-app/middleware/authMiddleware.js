import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      req.userDecodedToken = jwt.verify(token, process.env.JWT_KEY)
      next()
    } catch (e) {
      console.log(e.message)
      res.status(401)
      throw new Error('Bad token')
    }
  } else if (!req.headers.authorization) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default verifyToken
