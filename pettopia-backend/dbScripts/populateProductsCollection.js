const fs = require('fs-extra');
const mongoose = require('mongoose');
const ProductModel = require('./src/models/Product');
const SerpApi = require('google-search-results-nodejs');
require('dotenv').config();
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);
console.log(`${process.env.MONGODB_CONNECTION_STRING}`)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const targetCategories = 
[{
	name:'Dog Chew Toys',
	id:'5440_202072_2243339_6062640'
},{
	name:'Dog Clothes and Costumes',
	id:'5440_202072_4039016'
	},
	{
		name:'Dog Food',
		id:'5440_202072_6432755'
	},
	{
		name:'Dog Bones and Chews',
		id:'5440_202072_8052432_2086612'
	}
];

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

const callback = function(scrapedData) {
  ProductModel.insertMany(scrapedData.organic_results.map(function (product, idx){
  	return {
	  	productId:product.us_item_id,
	  	name:product.title,
	  	description: (product.description ? product.description : ''),
	  	price:product.primary_offer.offer_price,
	  	imageUrl:product.thumbnail, 
	  	productUrl:product.product_page_url,
	  	rating:product.rating
  		}
  	}), function(err, docs){
  		process.exit();
  })
};

function getDetails(productId){
	let details; 
	const params = {
	  engine: "walmart_product",
	  product_id: productId
	};
	search.json(params, function(productDetails){
		details = {
			images:  productDetails.images, 
			categories: productDetails.categories.map(category => category.name),
			numReviews: productDetails.reviews,
		}
	})
	console.log(`product details - ${JSON.stringify(details)}`)
	return details;
}

function getReviews(productId){
	let reviews; 
	const params = {
	  engine: "walmart_product_reviews",
	  product_id: productId
	};
	search.json(params, function(productDetails){
		reviews = productDetails.reviews.map((review) =>{
				return ({
						text:review.text,
						rating:review.rating,
						title:review.title
					})
			});
	});
	console.log(`product reviews - ${JSON.stringify(reviews)}`)
	return reviews;
}

const populateDB = (targetCategories)=>{
targetCategories.forEach((category)=>{
	console.log(`${JSON.stringify(category)}`)
	let params = {
		engine: 'walmart',
		cat_id: category.id
		};
		search.json(params, callback);
	});

}
populateDB(targetCategories)
