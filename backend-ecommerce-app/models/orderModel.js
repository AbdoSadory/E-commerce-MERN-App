import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user is required '],
      ref: 'User',
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, 'name is required '],
        },
        qty: {
          type: Number,
          required: [true, 'qty is required '],
        },
        image: {
          type: String,
          required: [true, 'image is required '],
        },
        price: {
          type: Number,
          required: [true, 'price is required '],
        },
        prodcut: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'prodcut is required '],
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: [true, 'address is required '],
      },
      city: {
        type: String,
        required: [true, 'city is required '],
      },
      postalCode: {
        type: String,
        required: [true, 'postalCode is required '],
      },
      country: {
        type: String,
        required: [true, 'country is required '],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'paymentMethod is required '],
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      update_time: {
        type: String,
      },
      email_address: {
        type: String,
      },
    },
    taxPrice: {
      type: Number,
      required: [true, 'taxPrice is required '],
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'shippingPrice is required '],
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'totalPrice is required '],
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'isPaid is required '],
      default: false,
    },
    paidAt: {
      type: Date,
      required: [true, 'paidAt is required '],
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'isDelivered is required '],
      default: false,
    },
    deliveredAt: {
      type: Date,
      required: [true, 'deliveredAt is required '],
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
