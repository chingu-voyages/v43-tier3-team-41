const fs = require('fs-extra')
const ProductModel = require('./src/models/Product');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("6a2fc7974496083d6ac3a2a1e6c55efa2835982b8b29955c31164bc4d7011873");

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
