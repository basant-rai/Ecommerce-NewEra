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
    enum: ['request' | 'shipping' | 'payment' | 'delivered' | 'cancelled']
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
    required: true,  // This ID is returned by Stripe when creating a payment intent
  },
  stripeChargeId: {
    type: String,
    default: null,  // This will be populated when the charge is successful
  },
}, { timestamps: true })

module.exports = mongoose.model('OrderRequest', orderRequestSchema)