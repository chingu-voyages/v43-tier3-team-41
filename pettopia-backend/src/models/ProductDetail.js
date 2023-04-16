const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  // description:{
  //   type:String, 
  //   required:true
  // },
  brand:{
    type:String, 
    default:''
  },
  productId:{
  	type:String, 
  	required:true,
    unique:true
  },
  images:{
  	type:[String],
  },
  categories:{
  	type:[String],
  	required:true
  },
  numReviews:{
  	type:Number, 
  	required:true
  }
});

module.exports = mongoose.model("ProductDetail", ProductDetailSchema);
