const OrderRequestModel = require("../Model/orderRequestModel")
const UserModel = require("../Model/userModel")

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

  const order = await OrderRequestModel.findById(id)
    .populate('shippingAddress.user')
    .populate('products');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.send(order);
}

exports.getOrderRequestByUser = async (req, res) => {
  const { userId: id } = req.params

  const order = await OrderRequestModel.find({ "shippingAddress.user": id })
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
    const order = await OrderRequestModel.findById(requestId).populate('products');

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const amount = Math.round(order.totalPrice)

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
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.completeOrder = async (req, res) => {
  const { requestId, userId, stripePaymentIntentId } = req.body;
  
  try {
    const order = await OrderRequestModel.findById(requestId).populate('products');
    
    console.log("🚀 ~ exports.completeOrder ~ stripePaymentIntentId:", stripePaymentIntentId)
    console.log("🚀 ~ exports.completeOrder ~ order.stripePaymentIntentId:", order.stripePaymentIntentId)

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    // if (!order.stripePaymentIntentId || order.stripePaymentIntentId !== stripePaymentIntentId) {
    //   return res.status(400).json({ error: "Payment verification failed" });
    // }
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    order.products.forEach(product => {
      user.purchaseHistory.push({
        productId: product._id, 
        purchasedAt: new Date()  
      });
    });

    await user.save();

    order.orderStatus = 'delivered';
    await order.save();

    return res.status(200).json({
      message: "Order completed and purchase history updated successfully",
      order
    });

  } catch (error) {
    console.log("🚀 ~ exports.completeOrder ~ error:", error)
    return res.status(500).json({ error: "Internal server error" });
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