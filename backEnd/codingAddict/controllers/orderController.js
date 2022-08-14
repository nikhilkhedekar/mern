const Order = require('../models/Order');
const Product = require('../models/Product');
// const stripe = require('stripe')("sk_test_51LWdcqSJ4PPLl4fcR8WOx1SXMYdvKIhqu1pw4AwhSZ5BUjJLLR5gdgxx5XmA7r6vdL69RuOJW5eX6ftQGwj8Nutk009c24biXz")

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = '/B?E(H+MbQeThWmYq3t6w9z$C&F)J@Nc';
  return { client_secret, amount };
};

// =============================================================

// const stripeController = async (req, res) => {
//     const { total_amount, currency } = req.body;
  
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total_amount,
//       currency,
//     });
  
//     res.json({ clientSecret: paymentIntent.client_secret });
//   };
// =============================================================

const createOrder = async (req, res) => {
  const { orderItems: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new Error("No cart items provided");
    // throw new CustomError.BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new Error("Please provide tax and shipping fee");
    // throw new CustomError.BadRequestError(
    //   'Please provide tax and shipping fee'
    // );
  }

  let selectedOrderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new Error(`No product with id : ${item.product}`)
      // throw new CustomError.NotFoundError(
      //   `No product with id : ${item.product}`
      // );
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    selectedOrderItems = [...selectedOrderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    total_amount: total,
    currency: 'inr',
  });

  const order = await Order.create({
    orderItems: selectedOrderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new Error(`No order with id : ${orderId}`);
    // throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new Error(`No order with id : ${orderId}`);
    // throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
