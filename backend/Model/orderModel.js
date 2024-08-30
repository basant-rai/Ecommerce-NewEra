const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  totalOrder: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)