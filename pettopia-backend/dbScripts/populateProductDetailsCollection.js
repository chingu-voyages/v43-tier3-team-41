// Using BlueCart API
const fs = require('fs-extra');
const mongoose = require('mongoose');
const ProductModel = require('./src/models/Product');
const ProductDetailModel = require('./src/models/ProductDetail');
require('dotenv').config();
console.log(`${process.env.MONGODB_CONNECTION_STRING}`)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const SerpApi = require('google-search-results-nodejs');
// 2nd email api_key
const search = new SerpApi.GoogleSearch("088ccfe5d58aaf5d1a445d6fbe5afa05582ca19f952dfd0cc4d2575043521925");

// make the http GET request to BlueCart API
function populateDB(){
	ProductModel.find().then((allProducts)=>
	{
		allProducts.forEach((product, idx) => {
		console.log(`${idx}.${product.productId}`);
		search.json({
				engine: "walmart_product",
  			product_id: product.productId
				},
				function (productDetail) {console.log(`${JSON.stringify(productDetail)}`) })
		
	})
	}).then(()=>process.exit())
}
async function runScripts(){
	const Products = await ProductModel.find();
	for(const product of Products){
			search.json({
					engine: "walmart_product",
	  			product_id: product.productId
					},
					function (productDetail) {
						if(productDetail.product_result)
						{
							console.log(`${JSON.stringify(productDetail.product_result)}`)
							const newProductDetail = new ProductDetailModel({
			    		// description: productDetail.product_result.hasOwnProperty('short_description_html') ? productDetail.product_result.short_description_html : '',
			    		productId: product.productId,
			    		images:  productDetail.product_result.hasOwnProperty('images') ? productDetail.product_result.images : [], 
							categories: productDetail.product_result.categories.map(category => category.name),
							numReviews: productDetail.product_result.reviews,
		    			});
						//console.log(`${JSON.stringify(newProductDetail)}`)
		    			newProductDetail.save().then(doc=>{
		    				console.log(`\n\nsaved doc\n\n`);
		    			})	
						}
				})
		}
}
runScripts();
		

