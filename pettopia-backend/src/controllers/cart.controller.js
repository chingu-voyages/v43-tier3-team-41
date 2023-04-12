const Cart = require("../models/Cart");
const Product = require("../models/Product");
const constants = require('../constants');
const CART_ITEM_STATUS = constants.CART_ITEM_STATUS;
const controller = {};
controller.createCart = (req, res) =>{
	res.send('creating new cart');
}
controller.addToNewCart = (req, res) =>{
	const productId = req.params.productId;
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
			})
		.catch(err =>{
			res.status(500).json({
				ok:false, 
				err
			});
		})
}
controller.addToCart = async (req, res) => {
	const userId = req.user.id;
	const productId = req.params.productId;
	console.log(`user ${JSON.stringify(req.user)} adding product ${productId} to cart!`);
	console.log(`user id is  - ${userId}`);
	const cart = await Cart.findOne({ userId: userId });
	const product = await Product.findOne({productId: productId}); 
	if(!product){
		return res.status(500).json({
			ok:false,
			errorMsg:'Invalid product'
		});
	}
	if(cart){
		let product = await Cart.findOne({userId: userId, "items.productId": productId}).exec();
				//console.log(`product - ${JSON.stringify(product)}`)
				if(!product)
					{
					console.log(`product does not exist in this cart yet`);
					Cart.updateOne({
						userId: userId
						},
						{$push: 
							{items:{
								productId:productId, 
								quantity: 1
								}
						}})
					.then((cartObj) =>{
					//console.log(`cartObj is  - ${JSON.stringify(cartObj)}`)
						return res.status(200).json({
						ok:true, 
						cartId: cartObj._id
						})
					})
					.catch(err =>{
						res.status(500).
							json({
								ok:false, 
								message: `add to cart failed with error ${err}`
							})
					})
				}
				else{
					console.log(`product to increase quantity - ${JSON.stringify(product)}`)
					Cart.findOneAndUpdate({userId:userId, "items.productId":productId}
						, {$inc: {
							"items.$.quantity": 1
						}})
					.then((cartObj) =>{
						return res.status(200)
						.json({
							ok:true, 
							cartId: cartObj._id
						})
					})
					.catch(err => {
						return res.status(500).
							json({
									ok:false, 
									message: `add to cart failed with error ${err}`
								})
					})
				}
	}
	else
	{
		const newCart = new Cart({
			userId: userId, 
			items:[{
				productId:productId, 
				quantity:1
			}]
		})
		newCart.save()
		.then((cart) =>{
			res.status(200)
			.json({
				ok:true, 
				cartId:cart._id
			})
		})
		.catch((err) =>{
					return res.status(500).
					json({
						ok:false, 
						message: `add to cart failed with error ${err}`
					})
				})
		}
	}

controller.emptyCart = async (req, res) =>{
	const userId = req.user.id;
	const cart = await Cart.findOneAndUpdate({userId:userId}, 
	{
		$set:{"items":[]}
	}).exec();
	if(cart){
			return res.status(200)
						.json({
								ok:true,
								cartId:cart._id
								})
	}
		res.status(500)
			.json({
			ok:false
		})
}
controller.subtract = (req, res) =>{
	const userId = req.user.id;
	const productId = req.params.productId;
	Cart.findOne({ userId: userId }).exec()
	.then(async (cart) =>{
		let product = await Cart.findOne({userId: userId, "items.productId": productId}).exec();
		if(!product){
			return res.status(500).json({
				ok:false, 
				errorMsg:'product not present in cart!'
			})
		}
		Cart.findOneAndUpdate({userId: userId, "items.productId":productId}
						, { $inc: {
							"items.$.quantity": -1
						}})
					.then((cartObj) =>{
						res.status(200)
						.json({
							ok:true, 
							cartId: cartObj._id
						})
					})

	})
	.catch(err => res.status(500).json({
		ok:false
	}))
}

controller.removeProductFromCart = (req, res) => {
	console.log('calling remove from cart!');
	const userId = req.user.id;
	const productId = req.params.productId;
	// const productId = req.body.productId;
	console.log(`${typeof productId}`);
	let cart;
	if (!userId){
		res.status(500).json({
			ok:true, 
			errorMsg:`cart not found for user`
			});
		}
	else{
		
			const cart = Cart.findOne({ userId: userId }).exec()
			.then(async (cartObj) =>{
				//console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Cart.findOne({userId: userId, "items.productId": productId}).exec();
				//console.log(`product - ${JSON.stringify(product)}`)
				if(!product)
					{
					console.log(`product does not exist in this cart`);
					
						return res.status(500).json({
						ok:true, 
						errorMsg: `product does not exist in this cart`
						})
					
					}
				
				Cart.updateOne(
					{userId: userId}, 
					{ $pull :{
							items: {
								productId:productId
							}
					}}
					)
				.then((cartObj) =>{
				res.status(200).json({
					ok:true,
					cartId: cartObj._id
				})
				})	
			})
			.catch((err) =>{
				res.status(500).
				json({
					ok:false, 
					message: `remove from cart failed with error ${err}`
				})
			})
	}
}


controller.getCart = (req, res) => {
	const userId = req.user.id;
	//const { cartId } = req.params;
	// console.log(`userId is ${userId}`);
  	if(userId == null){
  		res.status(500).json({
  		ok:false,
  		errorMsg:'no user found'
  		});
  	}
  	Cart.findOne({userId: userId}).exec()
  	.then((cart) =>{
  		// console.log(`cart is ${JSON.stringify(cart)}`)
  		return Promise.all(cart.items.map(async item =>
  			({
  				product: await Product.findOne({'productId':item.productId}).exec(),
  				quantity: item.quantity
  				})
  			)
  		)
  	})
  	.then((cartItems) =>{
  		//console.log(`cartItems are ${JSON.stringify(cartItems)}`)
  		res.status(200).json({
				ok:true, 
				cartItems
			})
  	})
  	.catch((err) =>{
  		res.status(500).json({
  		ok:false,
  		err:`error retrieving items in cart : ${err}`
  		})
  	})
};

module.exports = controller;
