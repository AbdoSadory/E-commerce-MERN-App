import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
// @desc    Create New Order
// @route   POST /api/orders/
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Items To Order");
  } else {
    const order = await Order.collection.insertOne({
      user: new mongoose.Types.ObjectId(req.userDecodedToken.id),
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
    });
    if (order.acknowledged) {
      const user = await User.findById(req.userDecodedToken.id);
      user.orders.push(order.insertedId);
      const updatedUser = await user.save();
      res.status(200);
      res.send({
        user: { ordersID: updatedUser.orders },
        order: {
          orderID: order.insertedId,
          user: req.userDecodedToken.id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          isPaid: false,
          isDelivered: false,
        },
      });
    } else {
      res.status(400);
      throw new Error("Couldn't to order !!!!");
    }
  }
});

// @desc    Get Order by id
// @route   Get /api/order/id
// @access  Private
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.send(order);
  } else {
    res.status(400);
    throw new Error("Can't find the order");
  }
});

// @desc    update Order To Paid
// @route   PUT /api/order/id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now(),
  });
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(400);
    throw new Error("Can't update the order");
  }
});

// @desc    Get user Orders
// @route   Get /api/order/myOrders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.userDecodedToken.id });
  res.send(orders);
});

// @desc    Get Orders
// @route   Get /api/orders/admin/orders
// @access  Private admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.status(200).send(orders);
});

// @desc    update Order To Paid
// @route   PUT /api/order/id/pay
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now(),
  });
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(400);
    throw new Error("Can't update the order");
  }
});
export {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrderToDelivered,
};
