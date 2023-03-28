// script to write products into a file from Serpapi.com walmart-product-search

const fs = require('fs-extra')
const ProductModel = require('../models/Product');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY1);

const params = {
  engine: "walmart",
  query: "dog food",
  cat_id: ""
}
fs.ensureFileSync('products.json');
const callback = function(scrapedData) {
  let data = scrapedData.organic_results.map(function (product, idx){
  	return {
	  	productId:product.product_id,
	  	name:product.title,
	  	description:product.description ? product.description : '',
	  	price:product.primary_offer.offer_price,
	  	imageUrl:product.thumbnail, 
	  	productUrl:product.product_page_url,
	  	rating:product.rating
  		}
  	}
 );
 //console.log(`${JSON.stringify(data)}`);
  fs.writeFileSync('products.json', JSON.stringify(data), (err)=>{
	if(err) {
		console.log(`error writing to file : ${err}`);
	}
  })
};

const printFile = function (){
	let data = JSON.parse(fs.readFileSync('products.json'));
	data.forEach(product =>{
		console.log(`title:${product.name}\ndescription:${product.description}\nprice:${product.price}\nimage:${product.imageUrl}\nproductUrl:${product.productPageUrl}\nrating:${product.rating}\n\n`)
	});
}

// Show result as JSON
search.json(params, callback);
printFile();
