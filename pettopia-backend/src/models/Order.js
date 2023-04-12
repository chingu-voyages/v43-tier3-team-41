const mongoose = require("mongoose");
const Cart = require('./Cart');
const constants = require('../constants');
const ORDER_STATUS = constants.ORDER_STATUS;
const Schema = mongoose.Schema;

const OrderSchema = new Schema({  
  
  cart:{
    type: Cart.schema,
    required:true
  },
  
  created_at:{
    type: Date, 
    default: Date.now
  },
  status:{
    type:String,
    required:true,
    enum:[
      ORDER_STATUS.IN_PROGRESS,
      ORDER_STATUS.Placed,
      ORDER_STATUS.Cancelled
      ],
    default:ORDER_STATUS.Placed
  }
});

module.exports = mongoose.model("Order", OrderSchema);
