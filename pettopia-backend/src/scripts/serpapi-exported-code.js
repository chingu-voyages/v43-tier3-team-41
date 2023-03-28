const mongoose = require('mongoose');
const SerpApi = require('google-search-results-nodejs');
const ProductModel = require('../models/Product');
require('dotenv').config();
const search = new SerpApi.GoogleSearch("b869d5c6500fd281ffc5ed4b8366a724277e3daba4c847a1fd3b23f042b2494e");
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
  useFindAndModify: false
  });

const params = {
  engine: "walmart",
  cat_id: "5440_202072_6432755_1429994"
};

const callback = function(scrapedData) {
  //console.log(`${JSON.stringify(scrapedData.organic_results)}`)
  ProductModel.insertMany(scrapedData.organic_results.map(function (product, idx){
    return {
      productId:product.us_item_id,
      name:product.title,
      price:product.primary_offer.offer_price,
      imageUrl:product.thumbnail, 
      productUrl:product.product_page_url,
      rating:product.rating
      }
    }), function(err, docs){
    console.log(err);
      process.exit();
  })
};


// Show result as JSON
search.json(params, callback);
