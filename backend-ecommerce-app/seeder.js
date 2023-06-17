import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const importedUsers = await User.insertMany(users)
    const adminUser = importedUsers[0]._id
    const importedProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(importedProducts)
    console.log('Data imported...!'.green.bold)
    process.exit()
  } catch (e) {
    console.log(e.message.red.bold)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data destroyed...!'.green.bold)
    process.exit()
  } catch (e) {
    console.log(e.message.red.bold)
    process.exit(1)
  }
}
console.log('hi seeder !')
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
