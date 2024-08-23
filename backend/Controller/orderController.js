const OrderModel = require("../Model/orderModel")

exports.createOrder = async (req, res) => {
  const { userId, productId, totalOrder } = req.body

  const orderCreate = new OrderModel({
    user: userId,
    product: productId,
    totalOrder: totalOrder
  })

  if (!orderCreate) {
    return res.status(400).json({ error: "Failed to create order" })
  }

  orderCreate.save()
  return res.json({ message: "Order created successfully" });
}

// 
exports.getAllOrders = async (req, res) => {
  const { sortBy, limit, sortOrder } = req.query;

  const sort_by = sortBy ? sortBy : "createdAt";
  const total = limit ? limit : 1000000000;
  const sort_order = sortOrder ? sortOrder : "asc";

  const orders = await OrderModel.find()
    .populate('user', 'userDetail email'
      // path: 'user',
      // select: 'userDetail email'
    )
    .populate('product')
    .sort([[sort_by, sort_order]])
    .limit(total);

  if (!orders) {
    return res.status(400).json({ error: "Error" })
  }

  return res.send(orders)
}

exports.getOrderByUser = async (req, res) => {
  const { sortBy, limit, sortOrder } = req.query;
  const { userId } = req.params

  const sort_by = sortBy ? sortBy : "createdAt";
  const total = limit ? limit : 1000000000;
  const sort_order = sortOrder ? sortOrder : "asc";

  const orders = await OrderModel.find({ user: userId })
    .select('-user')
    .populate('product')
    .sort([[sort_by, sort_order]])
    .limit(total);

  return res.send(orders)
}

