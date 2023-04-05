const mongoose = require('mongoose');
const ProductModel = require('./Product');
const CART_ITEM_STATUS = require('../constants');
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