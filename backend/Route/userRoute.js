const express = require("express");

const { CreateUser, getAllUser, updateUser, logIn, getUserById, deleteUser, confirmUser } = require("../Controller/userContoller");
const { jwtMiddleware } = require("../middleware/middleware");

const router = express.Router();

router.post('/login', logIn);
router.post('/register', CreateUser);
router.get('/users', getAllUser);
router.put('/update-user/:id', jwtMiddleware, updateUser);
router.get('/getuser/:id', jwtMiddleware, getUserById);
router.delete('/delete/:id', jwtMiddleware, deleteUser);
router.get('/confirm-email/:token', confirmUser);

module.exports = router;
