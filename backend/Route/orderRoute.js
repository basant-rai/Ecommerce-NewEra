const express = require("express");
const { createOrder, getAllOrders, getOrderByUser, updateOrderedProduct, deleteOrderedProduct } = require("../Controller/orderController");
const { jwtMiddleware } = require("../middleware/middleware");

const { createOrderRequest, getOrderRequestById, getOrderRequest, createPaymentIntent, updateOrderRequest, getOrderRequestByUser, completeOrder } = require("../Controller/orderRequestController");

const router = express.Router();

router.get('/get-order', getAllOrders);
router.post('/create-order', createOrder);
router.get('/get-order/:userId', getOrderByUser);
router.put('/update-order/:orderId', updateOrderedProduct);
router.delete('/delete-order/:orderId', deleteOrderedProduct);


/* ************************* order request *************************** */
router.post('/order-request', createOrderRequest);
router.get('/order-request', getOrderRequest);

router.get('/order-request/:id', getOrderRequestById);
router.get('/order-request/user/:userId', getOrderRequestByUser);

router.put('/stripe-payment', createPaymentIntent);
router.put('/order-request/:id', updateOrderRequest);

router.put('/complete-order', completeOrder);


module.exports = router
