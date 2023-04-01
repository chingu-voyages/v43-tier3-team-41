const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

const controller = {};
controller.createCart = (req, res) =>{
	res.send('creating new cart');
}
controller.addToNewCart = (req, res) =>{
	const productId = req.params.productId;
	cart = new Favorite({
					items:[productId]
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
	const cart = Favorite.findOne({ _id: id }).exec()
			.then(async (cartObj) =>{
				//console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Favorite.findOne({_id:id, "items": productId}).exec();
				//console.log(`product - ${JSON.stringify(product)}`)
				if(!product)
					{
					console.log(`product does not exist in this cart yet`);
					Favorite.updateOne({
						_id:id
						},
						{$push: 
							{items:productId, 
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
		
			const cart = Favorite.findOne({ _id: id }).exec()
			.then(async (cartObj) =>{
				//console.log(`here is the current cart - ${JSON.stringify(cartObj)}`)
				let product = await Favorite.findOne({_id:id, "items": productId}).exec();
				//console.log(`product - ${JSON.stringify(product)}`)
				if(!product)
					{
					console.log(`product does not exist in this cart`);
					
						return res.status(500).json({
						ok:true, 
						errorMsg: `product does not exist in this cart`
						})
					
					}
				
				Favorite.updateOne(
					{_id:id}, 
					{ $pull :
						{items: productId}
					})
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
	const { favoriteId } = req.params;
	console.log(`cartId is ${favoriteId}`);
  	if(!favoriteId){
  		res.status(500).json({
  		ok:false,
  		errorMsg:'no cartId parameter in request'
  		});
  	}
  	Favorite.findById(favoriteId).exec()
  	.then((cart) =>{
  		//console.log(`cart is ${JSON.stringify(cart)}`)
  		return Promise.all(cart.items.map(async item =>
  			({
  				product: await Product.findOne({'productId':item}).exec(),
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
