const OrderRequestModel = require("../Model/orderRequestModel")
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrderRequest = async (req, res) => {
  const { products, totalOrder, totalPrice, userId, address, orderStatus } = req.body

  const orderReq = await OrderRequestModel.create({
    products: products,
    totalOrder: totalOrder,
    totalPrice: totalPrice,
    shippingAddress: {
      user: userId,
      address: address
    }
  })

  if (!orderReq) {
    return res.status(400).json({ error: "Failed to create order" })
  }
  return res.status(200).json({ message: "Order request created successfully" })
}

// 
exports.getOrderRequestById = async (req, res) => {
  const { id } = req.params

  const order = await OrderRequestModel.findOne({ "shippingAddress.user": id })
    .populate('shippingAddress.user')
    .populate('products');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.send(order);
}

exports.getOrderRequest = async (req, res) => {
  const order = await OrderRequestModel.find()
    .populate('shippingAddress.user')
    .populate('products');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.send(order)
}

exports.createPaymentIntent = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Find the order request by ID and populate the products field
    const order = await OrderRequestModel.findById(requestId).populate('products');

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Calculate the amount in the smallest currency unit (e.g., cents for USD)
    const amount = Math.round(order.totalPrice); // assuming totalPrice is in dollars

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent) {
      return res.status(400).json({ error: "Failed to create payment intent" });
    }

    // Save the Stripe Payment Intent ID to the order
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    // Return the client secret for the payment intent
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateOrderRequest = async (req, res) => {
  const { id } = req.params
  const { address, orderStatus } = req.body
  const orderRequest = await OrderRequestModel.findByIdAndUpdate(
    id,
    {
      orderStatus: orderStatus,
      $set: {
        'shippingAddress.address': address
      }

    }, { new: true, runValidators: true })
  if (!orderRequest) {
    return res.status(400).json({ error: "Not found" })
  }
  console.log("🚀 ~ exports.updateOrderRequest= ~ orderRequest:", orderRequest)
  return res.json({ message: "Update successfully" })
}