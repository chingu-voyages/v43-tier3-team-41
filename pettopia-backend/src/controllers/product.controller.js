//const fs = require('fs');
const ProductModel = require("../models/Product");
const ProductDetailModel = require("../models/ProductDetail")
const ProductReviewModel = require("../models/ProductReview")
const CTRL = {};

CTRL.getProducts = (req, res) => {
  const q = req.query.q;
  if(q){
    console.log(`query parameter ${q}`)
    ProductModel.find({"name": new RegExp(q, 'i')})
    .then(data =>{
        res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json({msg:'Error retrieving products!'})
    })
  }
  else{
    ProductModel.find()
    .then(data =>{
        res.status(200).json(data);
    })
    .catch((err)=>{
      res.status(500).json({msg:'Error retrieving products!'})
    })
  } 
};

CTRL.getProduct = (req, res) => {
  const { productId } = req.params;
  let product = {
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
      
      product.name = productDetail.name;
      product.price = productDetail.price;
      product.rating = productDetail.rating;
      product.mainImageUrl = productDetail.imageUrl
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
