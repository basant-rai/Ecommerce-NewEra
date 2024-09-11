const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PurchaseHistorySchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  purchasedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('History', PurchaseHistorySchema);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ['admin', 'user']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  purchaseHistory: [PurchaseHistorySchema],
  ratings: [
    {
      productId: { type: ObjectId, ref: 'Product' },
      rating: Number // 1 to 5 scale
    }
  ],
  userDetail: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    middleName: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    gender: {
      type: String
    }
  }
});

module.exports = mongoose.model('User', UserSchema);

