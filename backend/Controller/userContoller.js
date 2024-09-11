const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// 
const UserModel = require("../Model/userModel");
const { checkMongoDBId } = require("../utils/helper");
const sendEmail = require("../utils/sendEmail");

// 
const SECRETKEY = process.env.SECRET_KEY

// ------------------------------------Controller-------------------------------------

exports.CreateUser = async (req, res) => {

  const checkEmail = await UserModel.findOne({ email: req.body.email });
  const checkContact = await UserModel.findOne({ 'userDetail.phoneNumber': req.body.phoneNumber });

  if (checkContact) {
    return res.status(400).json({ error: "Already exist" })
  }

  if (checkEmail) {
    return res.status(400).json({ error: "Email already exist" })
  }

  // Generate token for email verification
  const token = await jwt.sign(
    {
      name: req.body.firstName,
      email: req.body.email
    }, SECRETKEY,
    { expiresIn: "1h" }
  )

  if (!token) {
    return res.status(400).json({ error: "Failed to generate token" });
  }

  // Send email
  const url = `${process.env.APP_URL}/confirm-email/${token}`
  const mailOptions = {
    userEmail: req.body.email,
    subject: "Email verification",
    text: "Please verify your email",
    html: `<a href="${url}"><button>Verify Account</button></a>`
  }
  sendEmail(mailOptions);

  // Save users data in DB
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const createUser = await new UserModel({
    email: req.body.email,
    password: hashPassword,
    'userDetail.firstName': req.body.firstName,
    'userDetail.middleName': req.body.middleName,
    'userDetail.lastName': req.body.lastName,
    'userDetail.phoneNumber': req.body.phoneNumber,
  })

  const saveUser = await createUser.save();
  if (!saveUser) {
    return res.status(400).json({ error: "User registration failed" });
  } else {
    return res.status(200).json({ message: "User registration successful, Please verify your email" })
  }
}

// ------------------------------------Verify Email--------------------------------
exports.confirmUser = async (req, res) => {
  const { token } = req.params

  const { email, name } = jwt.decode(token);

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }
  if (user.isVerified) {
    return res.status(400).json({ error: "Already verified, Please login to continue" })
  }
  user.isVerified = true;
  await user.save();
  return res.status(200).json({ message: "User verified successfully" });
}


// ------------------------------------Get All User---------------------------------
exports.getAllUser = async (req, res) => {

  const users = await UserModel.find().populate('purchaseHistory.productId', 'productName tags').populate('ratings.productId', 'productName tags');;
  if (!users) {
    return res.status(400).json({ message: "Users not found" })
  }
  return res.send(users)
}

exports.updateUser = async (req, res) => {
  const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
    'userDetail.firstName': req.body.firstName,
    'userDetail.middleName': req.body.middleName,
    'userDetail.lastName': req.body.lastName,
    'userDetail.gender': req.body.gender,
    'userDetail.address': req.body.address
  }, { new: true })

  if (!updateUser) {
    return res.json({ message: "Not found" }).status(400);
  }
  res.send(updateUser);
}


// ------------------------------------Login--------------------------------
exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await UserModel.findOne({ email: email });


  if (!checkUser) {
    return res.status(400).json({ error: "User not found" });
  }

  if (!checkUser.isVerified) {
    return res.status(400).json({ error: "Please verify your email" })
  }

  // const checkPassword = await bcrypt.compare(password, checkUser.password);
  const access_token = await jwt.sign(
    {
      name: checkUser.userDetail.firstName,
      id: checkUser._id,
      email: checkUser.email,
      role: checkUser.role
    }, SECRETKEY,
    { expiresIn: "1d" }
  )

  // if (!checkPassword) {
  //   return res.status(400).json({ error: "Password is invalid" });
  // }
  return res.status(201).json({
    message: "Login successful",
    accessToken: access_token,
    user: checkUser
  });
}

// ---------------------------------------Get User By Id--------------------------

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // const user = await UserModel.findOne({ _id: id });
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(400).json({ error: "User not  found" });
  }

  return res.status(400).json({ user: user }).status(200);
}

//----------------------------------Delete User--------------------------------------

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndDelete(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  if (!user) {
    return res.json({ error: "User not found" }).status(400);
  }
  return res.json({ message: "Account deactivated" }).status(200);
}

// -----------------------------------forgot password---------------------------------

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User not found" }).status(400);
  }

  // Generate token for email verification
  const token = await jwt.sign(
    {
      email: email,
      id: user._id
    }, SECRETKEY,
    { expiresIn: "1h" }
  )

  if (!token) {
    return res.status(400).json({ error: "Failed to generate token" });
  }

  // Send email
  const url = `${process.env.APP_URL}/reset-password/${token}`
  const mailOptions = {
    userEmail: email,
    subject: "Reset password",
    text: "Reset password",
    html: `<a href="${url}"><button>Reset Password</button></a>`
  }
  sendEmail(mailOptions);

  return res.status(200).json({ message: "Reset link has been sent to your email" })
}

// -----------------------------------Reset password----------------------------------
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const { email, id } = jwt.decode(token);

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User not found" }).status(400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;

  await user.save();

  if (!user) {
    return res.json({ error: "Password not saved" }).status(400);
  }

  return res.json({ message: "Password reset successfully" }).status(200);

}

// -----------------------------------resend confirmation----------------------------------

exports.resendConfirmation = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User not found" }).status(400);
  }

  if (user.isVerified) {
    return res.json({ error: "User already verified" }).status(400);

  }
  // Generate token for email verification
  const token = await jwt.sign(
    {
      email: email
    }, SECRETKEY,
    { expiresIn: "1h" }
  )

  if (!token) {
    return res.status(400).json({ error: "Failed to generate token" });
  }

  // Send email
  const url = `${process.env.APP_URL}/confirm-email/${token}`
  const mailOptions = {
    userEmail: email,
    subject: "Resend email verification",
    text: "Please verify your email",
    html: `<a href="${url}"><button>Verify Account</button></a>`
  }
  sendEmail(mailOptions);

  return res.status(200).json({ message: "Confirmation link has been sent to your email" })

}

exports.rateProductUser = async (req, res) => {
  const { rating, productId } = req.body;

  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const existingRatingIndex = user.ratings.findIndex(
      (r) => r.productId.toString() === productId
    );

    if (existingRatingIndex !== -1) {
      user.ratings[existingRatingIndex].rating = rating;
    } else {
      user.ratings.push({ productId, rating });
    }
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};