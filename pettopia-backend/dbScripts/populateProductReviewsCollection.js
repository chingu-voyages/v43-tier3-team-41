// Using BlueCart API
const fs = require('fs-extra');
const mongoose = require('mongoose');
const ProductModel = require('./src/models/Product');
const ProductReviewModel = require('./src/models/ProductReview');
require('dotenv').config();
console.log(`${process.env.MONGODB_CONNECTION_STRING}`)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const SerpApi = require('google-search-results-nodejs');
// 2nd email api_key
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

// make the http GET request to BlueCart API
function populateDB(){
	ProductModel.find().then((allProducts)=>
	{
		allProducts.forEach((product, idx) => {
		console.log(`${idx}.${product.productId}`);
		search.json({
				engine: "walmart_product_reviews",
  			product_id: product.productId
				},
				function (productDetail) {console.log(`${JSON.stringify(productDetail)}`) })
		// 		function (productDetail){
				// 	console.log(`${JSON.stringify(productDetail.product_result)}`)
				// 	const newProductDetail = new ProductDetailModel({
	    	// 	description: productDetail.product_result.short_description_html,
	    	// 	images:  productDetail.product_result.images, 
				// 	categories: productDetail.product_result.categories.map(category => category.name),
				// 	numReviews: productDetail.product_result.reviews,
    		// })
				// console.log(`${JSON.stringify(newProductDetail)}`)
    		// newProductDetail.save().then(doc=>{
    		// 	console.log(`\n\n${JSON.stringify(doc)}\n\n`);
    		// })
		// })
	})
	}).then(()=>process.exit())
}
async function runScripts(){
	const Products = await ProductModel.find();
	for(const product of Products){
			search.json({
					engine: "walmart_product_reviews",
	  			product_id: product.productId
					},
					function (productReviewResult) {
						const productId = product.productId;
						if(productReviewResult.hasOwnProperty('reviews'))
						for(const review of productReviewResult.reviews)
						
						{
							console.log(`${JSON.stringify(review)}`)
							const newProductReview = new ProductReviewModel({
			    		// description: productDetail.product_result.hasOwnProperty('short_description_html') ? productDetail.product_result.short_description_html : '',
			    		productId:productId,
			    		text:review.text,
							rating:review.rating,
							title:review.title,
		    			});
						//console.log(`${JSON.stringify(newProductDetail)}`)
		    			newProductReview.save().then(doc=>{
		    				console.log(`saved product review information`);
		    				})	
							
						}
				})
		}
}
runScripts();
		

