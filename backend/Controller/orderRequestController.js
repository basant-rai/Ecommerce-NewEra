const OrderRequestModel = require("../Model/orderRequestModel")

exports.createOrderRequest = async (req, res) => {
  const { products, totalOrder, totalPrice, userId, address, orderStatus } = req.body

  const orderReq = await OrderRequestModel.findById().create({
    products: products,
    totalOrder: totalOrder,
    totalPrice: totalPrice,
    orderStatus: orderStatus,
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

exports.getOrderRequest = async (req, res) => {
  const order = await OrderRequestModel.find()
    .populate('shippingAddress.user')
    .populate('products');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.send(order)
}