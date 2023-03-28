//const fs = require('fs');
const ProductModel = require("../models/Product");

const CTRL = {};

CTRL.test = (req, res) =>{
  console.log('calling test endpoint')
  res.status(200).json({'message':'!testing products endpoint'});
}

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
  
  ProductModel.find({"productId":productId})
    .exec((err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true,
        product,
      });
    });
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
