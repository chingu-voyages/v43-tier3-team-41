const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const ProductDetail = require('../src/models/ProductDetail');
require('dotenv').config();
console.log(`${process.env.MONGODB_CONNECTION_STRING_2}`)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING_2, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
  useFindAndModify: false
});
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("b869d5c6500fd281ffc5ed4b8366a724277e3daba4c847a1fd3b23f042b2494e");


// set up the request parameters


const productDetailsExec = async () =>
await Product.find().exec()
.then(async products =>{
  for(const [i, product] of products.entries()){
    console.log(`finding record ${i}`)
    const existingProductDetailRecord = await ProductDetail.findOne({"productId":product.productId}).exec();
    if(!existingProductDetailRecord){
        console.log(`product ${product.productId} does not exist in details collection`)
    try{
          console.log('fetching data...');
          search.json({
            engine: "walmart_product",
            product_id: product.productId
          }, product =>{
            
            //console.log(`${JSON.stringify(product.product_result)}`)
            const productFields = product.product_result;
            let productDetail = new ProductDetail({
              productId: productFields.us_item_id, 
              brand: productFields.manufacturer ? productFields.manufacturer :'NO BRAND',
              description: productFields.detailed_description_html ? productFields.detailed_description_html:'NO DESCRIPTION AVAILABLE', 
              images: productFields.images ? productFields.images : [],
              // productFields.images.map(image => image.link) : [], 
              // categories: productFields.breadcrumbs ? productFields.breadcrumbs.map(breadcrumb =>breadcrumb.name): [], 
              categories: productFields.categories.map(category => category.name), 
              //numReviews:productFields.ratings_total
              numReviews: productFields.reviews
                });
            productDetail.save()
            // .then(()=>{
            //   if(i == products.length - 1){
            //       process.exit();
            //     }
            // })
          })
    }
    catch(err){
          console.log(err);
        }

    }
    else{
      console.log(`product ${existingProductDetailRecord.productId} exists already in details collection`)
    }
  }
})
//.finally(()=>process.exit());

productDetailsExec();

// axios.get('https://api.bluecartapi.com/request', 
//   {
//   api_key: "71F40E39C00D447FA87ECF814F675260",
//   type: "product",
//   item_id:product.productId
//    })
// .then(response => {

//     // print the JSON response from BlueCart API
//     console.log(JSON.stringify(response.data, 0, 2));

//   }).catch(error => {
// // catch and print the error
// console.log(error);
// })
