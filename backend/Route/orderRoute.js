const express = require("express");
const { createOrder, getAllOrders, getOrderByUser } = require("../Controller/orderController");

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/get-order', getAllOrders);
router.get('/get-order/:userId', getOrderByUser);


module.exports = router
