const mongoose = require('mongoose');
const ProductModel = require('../models/Product');
const SerpApi = require('google-search-results-nodejs');
require('dotenv').config();

// 1st email API key
const search = new SerpApi.GoogleSearch("b869d5c6500fd281ffc5ed4b8366a724277e3daba4c847a1fd3b23f042b2494e");
console.log(process.env.SERP_API_KEY1)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {  
	useNewUrlParser: true,  
	useUnifiedTopology: true,  
	useFindAndModify: false
  });

const targetCategories = 
[{
	name:'Wet Dog Food',
	id:'5440_202072_6432755_1429994'
},
{
	name:'Dry Dog Food',
	id:'5440_202072_6432755_1636265'
}, 
{
	name:'Soft and Chewy Dog Treats',
	id:'5440_202072_8052432_6046901'
},
{
	name:'Dog Toys',
	id:'5440_202072_2243339'
}];
/*
fields in Product Model
	productId
	name
	description
	price
	imageUrl
	productUrl
	rating
*/

const callback = async function(scrapedData) {
	// console.log(`${JSON.stringify(scrapedData)}`)
	console.log(`no. of products - ${JSON.stringify(scrapedData.organic_results.length)}`)
  await ProductModel.insertMany(scrapedData.organic_results.map(function (product, idx){
  	return {
	  	productId:product.us_item_id,
	  	name:product.title,
	  	price:product.primary_offer.offer_price,
	  	imageUrl:product.thumbnail, 
	  	productUrl:product.product_page_url,
	  	rating:product.rating
  		}
  	}), function(err, docs){
			console.log(`error inserting search results through callback : ${err}`);	
  })
 
};

// function getDetails(productId){
// 	let details; 
// 	const params = {
// 	  engine: "walmart_product",
// 	  product_id: productId
// 	};
// 	search.json(params, function(productDetails){
// 		details = {
// 			images:  productDetails.images, 
// 			categories: productDetails.categories.map(category => category.name),
// 			numReviews: productDetails.reviews,
// 		}
// 	})
// 	console.log(`product details - ${JSON.stringify(details)}`)
// 	return details;
// }

// function getReviews(productId){
// 	let reviews; 
// 	const params = {
// 	  engine: "walmart_product_reviews",
// 	  product_id: productId
// 	};
// 	search.json(params, function(productDetails){
// 		reviews = productDetails.reviews.map((review) =>{
// 				return ({
// 						text:review.text,
// 						rating:review.rating,
// 						title:review.title
// 					})
// 			});
// 	});
// 	console.log(`product reviews - ${JSON.stringify(reviews)}`)
// 	return reviews;
// }

const populateDB = (targetCategories)=>{
targetCategories.forEach((category)=>{
	try{
		console.log(`${JSON.stringify(category)}`)
		let params = {
			engine: 'walmart',
			cat_id: category.id
			};
			search.json(params, callback);
		}
	catch(err){
		console.log(`error in serpapi search ${err}`)
		}
	})
 
}
populateDB(targetCategories)
