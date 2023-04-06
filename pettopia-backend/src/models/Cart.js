const mongoose = require('mongoose');
const ProductModel = require('./Product');
const constants = require('../constants');
const CART_ITEM_STATUS = constants.CART_ITEM_STATUS;
const CartItemSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    }, 
    quantity:{
        type:Number, 
        required:true
    }
})

const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    items:[CartItemSchema],
    status:{
        type: String,
        default: CART_ITEM_STATUS.Not_processed,
        enum: [
        CART_ITEM_STATUS.Not_processed,
        CART_ITEM_STATUS.Processing,
        CART_ITEM_STATUS.Shipped,
        CART_ITEM_STATUS.Delivered,
        CART_ITEM_STATUS.Cancelled
        ]
    }

})

module.exports = mongoose.model('Cart', CartSchema)