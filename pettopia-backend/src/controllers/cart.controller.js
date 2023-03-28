const Cart = require("../models/Cart");

const CART_ITEM_STATUS = require('../constants');

const controller = {};
controller.createCart = (req, res) =>{
	res.send('creating new cart');
}
controller.addToCart = (req, res) => {
	console.log('calling add to cart!');
	const { cartId } = req.params;
	let cart;
	if (!cartId){
			cart = new Cart({
					items:[], 
					status:CART_ITEM_STATUS.Not_Processed
				});
			cart.save().then((cartObj) =>{
				console.log(`new cart id is ${cartObj._id}`);
				res.status(200).json({
					ok:true,
					cartId:cartObj._id
				});
			});
		}
	else{
			res.status(200).json({
			ok:true,
			cartId:cartId
		});
	}
}

// 	const productId = req.body.productId;
//   res.send(`adding product ${productId} to cart ${cartId}`);
// };
controller.getCart = (req, res) => {
	const { cartId } = req.params;
  res.send('getting items in cart');
};

module.exports = controller;