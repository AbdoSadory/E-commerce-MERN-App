import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required '],
    },
    email: {
      type: String,
      required: [true, 'email is required '],
    },
    password: {
      type: String,
      required: [true, 'password is required '],
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'isAdmin is required '],
      default: false,
    },
    orders: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.comparePasswords = async function (enteredPassword) {
  //  Schema function to compare passwords and it's part of schema
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)

export default User
