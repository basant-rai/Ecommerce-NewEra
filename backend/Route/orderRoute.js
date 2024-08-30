const express = require("express");
const { createOrder, getAllOrders, getOrderByUser, updateOrderedProduct, deleteOrderedProduct } = require("../Controller/orderController");
const { jwtMiddleware } = require("../middleware/middleware");

const { createOrderRequest, getOrderRequestById, getOrderRequest } = require("../Controller/orderRequestController");

const router = express.Router();

router.get('/get-order', getAllOrders);
router.post('/create-order', createOrder);
router.get('/get-order/:userId', getOrderByUser);
router.put('/update-order/:orderId', updateOrderedProduct);
router.delete('/delete-order/:orderId', deleteOrderedProduct);


/* ************************* order request *************************** */
router.get('/order-request', getOrderRequest);
router.post('/order-request', createOrderRequest);
router.get('/order-request/:id', getOrderRequestById);


module.exports = router
