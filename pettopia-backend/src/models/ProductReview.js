const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductReviewSchema = new Schema({
  productId:{
  	type:String,
  	required:true,
    unique:true
  },
  text:{
  	type:String,
  	
  	default:''
  },
  rating:{
  	type:Number,
  	
  	default:0.0
  },
  title:{
  	type:String, 
  	
  	default:''
  }
});

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
