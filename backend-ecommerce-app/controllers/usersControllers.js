import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth users and get Token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body // with the help of express.json() middleware
  const user = await User.findOne({ email })

  if (user && (await user.comparePasswords(password))) {
    // user.comparePasswords(password) علشان ال this.password for user
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Wrong Email or Password')
  }
})

// @desc    Register users
// @route   Post /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exsits')
  }

  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data !!!!')
  }
})

// @desc    Get user
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userDecodedToken.id).select('-password')
  let { _id, name, email, isAdmin } = user
  res.send({ _id, name, email, isAdmin })
})

// @desc    Update user  data
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userDecodedToken.id)

  if (user) {
    user.name = req.body.name || user.name
    if (req.body.email) {
      const isExist = await User.findOne({ email: req.body.email })
      if (isExist) {
        res.status(401)
        throw new Error('Email Already exists')
      } else {
        user.email = req.body.email
      }
    }

    if (req.body.password) {
      user.password = req.body.password || user.password
    }

    const updatedUser = await user.save()
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})
export { authUser, getUserProfile, registerUser, updateUserProfile }
