const mongoose = require('mongoose');
const ProductModel = require('./Product');
const CartItemSchema = new mongoose.Schema({
    item:{
        type:mongoose.Types.ObjectId,
        ref:ProductModel,
        required:true
    }, 
    quantity:{
        type:Number, 
        required:true
    }
})

const CartSchema = new mongoose.Schema({
    userId:{
        type:Number, 
        required:true
    }, 
    items:{
        type:mongoose.Types.ObjectId,
        ref:CartItemSchema,
        required:true
    },
    status:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('Cart', CartSchema)