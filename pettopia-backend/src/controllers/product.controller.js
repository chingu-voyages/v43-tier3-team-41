//const fs = require('fs');
const ProductModel = require("../models/Product");
const ProductDetailModel = require("../models/ProductDetail");
const ProductReviewModel = require("../models/ProductReview");
const Redis = require('redis')
const client = require('../redisConfig');
const DEFAULT_EXPIRATION = 3600
const CTRL = {};


CTRL.getProducts = (req, res) => {
  
  const q = req.query.q;
  try{
    console.log('retrieving from cache')
    client.get(`products?q=${q}`, (err, products) =>{
    console.log(`error is ${err}`)
    if (err) console.error(err);
    if(products) {
      console.log(`retrieving products from cache`)
        return res.json({
          ok:true, 
          products:JSON.parse(products)
        })
      }
      else{
        let query;
        try{
            if(q){
          // console.log(`query parameter ${q}`)
          query = ProductModel.find({"name": new RegExp(q, 'i')}).exec()
          }
          else {
            query = ProductModel.find().exec();
          }  
        }
        catch(err){
          return res.status(500).json({
                    ok: false,
                    err
                  })
        }
  
        let retrievedProducts = [];
        query.then(dbProducts =>{
            return Promise.all(dbProducts.map(async (dbProduct) =>({
              
              productId: dbProduct.productId,
              name : dbProduct.name,
              price : dbProduct.price,
              rating : dbProduct.rating,
              mainImageUrl : dbProduct.imageUrl,
              otherImages : await ProductDetailModel.findOne({"productId":dbProduct.productId})
              .then(productDetail =>{
                // console.log(`${JSON.stringify(productDetail.images)}`)
                return productDetail.images
              })
              .catch(err =>{
               // console.log(`no images found`);
                return []
              }),
              brand: await ProductDetailModel.findOne({"productId":dbProduct.productId})
              .then(productDetail =>{
                // console.log(`${JSON.stringify(productDetail.images)}`)
                return productDetail.brand ?? ''
              })
              .catch(err =>{
               // console.log(`no images found`);
                return ''
              }),
              categories : await ProductDetailModel.findOne({"productId":dbProduct.productId})
              .then(productDetail =>{
               // console.log(`${JSON.stringify(productDetail.categories)}`)
                return productDetail.categories
              })
              .catch(err =>{
               // console.log('no categories found')
                return []
              }),
              reviews : await ProductReviewModel.find({"productId":dbProduct.productId})
              .then(productReviews => productReviews.map(review =>({
                    text:review.text,
                    title:review.title,
                    rating:review.rating
                  })))
              .catch(err =>[])
              })
            ))
          })
        .then(products =>{
          console.log('setting products to cache')
          client.setex(`products?q=${q}`, DEFAULT_EXPIRATION, JSON.stringify(products))
          res.status(200).json({
            ok:true,
            products
          })
        })
        .catch(err =>{
          res.status(500)
          .json({
            ok:false, 
            err:`retrieving products failed with error ${err}`
          })
        })
            }
        })
  }
  catch(err){
    res.send(err);
  }
  console.log('outside redis cache check')
};

CTRL.getProduct = (req, res) => {
  const { productId } = req.params;
  let product = {
    productId: -1,
    name:'',
    price:0,
    rating:0,
    mainImageUrl:'',
    otherImages:[],
    categories:[],
    reviews:[]
  }
  ProductModel.findOne({"productId":productId})
    .then(async productDetail => {
      
      product.productId =  productDetail.productId;
      product.name = productDetail.name;
      product.price = productDetail.price;
      product.rating = productDetail.rating;
      product.mainImageUrl = productDetail.imageUrl
      await ProductDetailModel.findOne({"productId":productId})
        .then(productDetail =>{
          product.brand = productDetail.brand ?? ''
        })
      await ProductDetailModel.findOne({"productId":productId})
        .then(productDetail =>{
          product.otherImages = productDetail.images
        })
      await ProductDetailModel.findOne({"productId":productId})
        .then(productDetail =>{
          product.categories = productDetail.categories
        })
      await ProductReviewModel.find({"productId":productId}).exec()
        .then(productReviews =>{
          product.reviews = productReviews.map(review =>{
            return ({
              text:review.text,
              title:review.title
            })
          })
        })
      return product;
      })
      .then((product) =>{
      
      	res.status(200).json({
            ok:true,
            product
          })
      })
  .catch(err =>{
      return res.status(500).json({
              ok: false,
              err
            })
  })
  
};

CTRL.createProduct = (req, res) => {
  // const newProduct = new Product({
  //   code: req.body.code,
  //   name: req.body.name,
  //   excerpt: req.body.excerpt,
  //   description: req.body.description,
  //   price: req.body.price,
  //   stock: req.body.stock,
  //   image: req.body.image,
  //   category: req.body.category,
  //   status: req.body.status
  // });

  // newProduct.save((err, product) => {
  //   if (err) {
  //     return res.status(500).json({
  //       ok: false,
  //       err,
  //     });
  //   }

  //   return res.status(201).json({
  //     ok: true,
  //     product,
  //   });
  // });
  res.send(`request to create new product`);
};

CTRL.updateProduct = (req, res) => {
  // const { productId } = req.params;
  
  // Product.findByIdAndUpdate(
  //   productId,
  //   req.body,
  //   { new: true },
  //   (err, product) => {
  //     if (err) {
  //       return res.status(500).json({
  //         ok: false,
  //         err,
  //       });
  //     }

  //     return res.status(201).json({
  //       ok: true,
  //       product,
  //     });
  //   }
  // );
  res.send(`request to update product : ${productId}`);
};

CTRL.deleteProduct = (req, res) => {
  // const { productId } = req.params;
  // Product.findByIdAndRemove(productId, (err, product) => {
  //   if (err) {
  //     return res.status(500).json({
  //       ok: false,
  //       err,
  //     });
  //   }

  //   return res.status(201).json({
  //     ok: true,
  //     product,
  //   });
  // });
  res.send(`request to delete product : ${productId}`);
};

module.exports = CTRL;