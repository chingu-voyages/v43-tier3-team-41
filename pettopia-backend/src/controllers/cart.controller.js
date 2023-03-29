const Cart = require("../models/Cart");

const CART_ITEM_STATUS = require('../constants');

const controller = {};
controller.createCart = (req, res) =>{
	res.send('creating new cart');
}
controller.addToCart = (req, res) => {
	console.log('calling add to cart!');
	const { cartId } = req.params;
	const productId = req.body.productId;
	console.log(`${typeof productId}`);
	let cart;
	if (!cartId){
			cart = new Cart({
					items:[
					{
						productId: productId, 
						quantity: 1
					}], 
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
		
			const cart = Cart.find({ _id: cartId }).exec()
			.then(async (cartObj) =>{
				console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Cart.find({_id:cartId}, {"items.productId": productId});
				if(product){
					product.quantity = product.quantity + 1;
				}
				else{
					cartObj.items.push({
						productId:productId, 
						quantity: 1
					})
				}
				
					res.status(200).json({
						ok:true, 
						cartId: cartObj._id
					})
			})
			.catch((err) =>{
				res.status(500).
				json({
					ok:false, 
					message: `add to cart failed with error ${err}`
				})
			})
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
