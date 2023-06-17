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
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
