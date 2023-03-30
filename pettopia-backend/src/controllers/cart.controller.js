const Cart = require("../models/Cart");
const Product = require("../models/Product");
const CART_ITEM_STATUS = require('../constants');

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
controller.addToCart = (req, res) => {
	console.log('calling add to cart!');
	const id = req.params.id;
	const productId = req.params.productId;
	console.log(`cart id is  - ${id}`);
	const cart = Cart.findOne({ _id: id }).exec()
			.then(async (cartObj) =>{
				//console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Cart.findOne({_id:id, "items.productId": productId}).exec();
				//console.log(`product - ${JSON.stringify(product)}`)
				if(!product)
					{
					console.log(`product does not exist in this cart yet`);
					Cart.updateOne({
						_id:id
						},
						{$push: 
							{items:{
								productId:productId, 
								quantity: 1
								}
						}})
					.then(() =>{
					//console.log(`cartObj is  - ${JSON.stringify(cartObj)}`)
						return res.status(200).json({
						ok:true, 
						cartId: cartObj._id
						})
					})
				}
				else{
					console.log(`product already exists in cart - ${JSON.stringify(cartObj)}`);
						res.status(200).json({
							ok:true,
							cartId: cartObj._id
						})
				}	
			})
			.catch((err) =>{
				res.status(500).
				json({
					ok:false, 
					message: `add to cart failed with error ${err}`
				})
			})
}

controller.removeProductFromCart = (req, res) => {
	console.log('calling remove from cart!');
	const id = req.params.id;
	const productId = req.params.productId;
	// const productId = req.body.productId;
	console.log(`${typeof productId}`);
	let cart;
	if (!id){
		res.status(500).json({
			ok:true, 
			errorMsg:`no cartId parameter in request`
			});
		}
	else{
		
			const cart = Cart.findOne({ _id: id }).exec()
			.then(async (cartObj) =>{
				//console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Cart.findOne({_id:id, "items.productId": productId}).exec();
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
					{_id:id}, 
					{ $pull :{
							items: {
								productId:productId
							}
					}}
					)
				.then(() =>{
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
	const { cartId } = req.params;
	console.log(`cartId is ${cartId}`);
  	if(!cartId){
  		res.status(500).json({
  		ok:false,
  		errorMsg:'no cartId parameter in request'
  		});
  	}
  	Cart.findById(cartId).exec()
  	.then((cart) =>{
  		//console.log(`cart is ${JSON.stringify(cart)}`)
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
  	.catch(() =>{
  		res.status(500).json({
  		ok:false,
  		err:'error retrieving items in cart'
  		})
  	})
};

module.exports = controller;
