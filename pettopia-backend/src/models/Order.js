const mongoose = require("mongoose");
const Cart = require('./Cart');
const constants = require('../constants');
const ORDER_STATUS = constants.ORDER_STATUS;
const Schema = mongoose.Schema;

const OrderSchema = new Schema({  
  // client: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Client",
  // },
  // orderItems: [
  //   {
  //     product: {
  //       type: Schema.Types.ObjectId,
  //       ref: "Product",
  //     },
  //     qty: Number,
  //   },
  // ],
  // serial: {
  //   type: String,
  //   required: true
  // },
  // total: {
  //   type: Number,
  //   required: true,
  // },
  // created_at: {
  //   type: Date,
  //   default: Date.now,
  // },
  cart:{
    type: Cart.schema,
    required:true
  },
  status:{
    type:String,
    required:true,
    enum:[
      ORDER_STATUS.Placed,
      ORDER_STATUS.Cancelled 
      ],
    default:ORDER_STATUS.Placed
  }
});

module.exports = mongoose.model("Order", OrderSchema);
