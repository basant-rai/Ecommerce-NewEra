const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const orderRequestSchema = new mongoose.Schema({
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    }
  ],
  totalOrder: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  orderStatus: {
    type: String,
    default: 'shipping',
    enum: ['shipping', 'payment', 'delivered', 'cancelled']
  },
  shippingAddress: {
    user: {
      type: ObjectId,
      ref: 'User'
    },
    address: {
      type: String
    }
  },
  stripePaymentIntentId: {
    type: String,
  },
  stripeChargeId: {
    type: String,
    default: null,  // This will be populated when the charge is successful
  },
}, { timestamps: true })

module.exports = mongoose.model('OrderRequest', orderRequestSchema)