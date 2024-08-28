const express = require("express");
const { createOrder, getAllOrders, getOrderByUser, updateOrderedProduct } = require("../Controller/orderController");

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/get-order', getAllOrders);
router.get('/get-order/:userId', getOrderByUser);
router.put('/update-order/:orderId', updateOrderedProduct);

module.exports = router
