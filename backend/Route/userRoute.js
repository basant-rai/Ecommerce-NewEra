const express = require("express");

const { CreateUser, getAllUser, updateUser, logIn, getUserById, deleteUser, confirmUser, forgotPassword, resetPassword, resendConfirmation } = require("../Controller/userContoller");
const { jwtMiddleware } = require("../middleware/middleware");

const router = express.Router();

router.post('/login', logIn);
router.post('/register', CreateUser);
router.get('/users', jwtMiddleware, getAllUser);
router.put('/update-user/:id', jwtMiddleware, updateUser);
router.get('/getuser/:id', jwtMiddleware, getUserById);
router.delete('/delete/:id', jwtMiddleware, deleteUser);
router.get('/confirm-email/:token', confirmUser);
router.post('/forgot-password/', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/resend-verification/', resendConfirmation);

module.exports = router;
