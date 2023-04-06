const mongoose = require("mongoose");
const ProductModel = require('./ProductDetail');
const ProductReview = require('./ProductReview');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productId:{
    type:String, 
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required : 512,
  },
  productUrl:{
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);
