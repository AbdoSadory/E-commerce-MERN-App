import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      default: 0,
    },
    comment: { type: String, required: [true, "comment is required"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
      default: "",
    },
    category: {
      type: String,
      required: [true, "category is required"],
      default: "",
    },
    description: {
      type: String,
      required: [true, "description is required"],
      default: "",
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: [true, "rating is required"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "numReviews is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "countInStock is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
