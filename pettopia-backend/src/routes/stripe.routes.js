const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const router = require('express').Router()
const { isAuth } = require("../middlewares/authentication");
router.get('/', (req, res) =>{
	res.send('testing stripe router!')
})

router.post('/checkout/:orderId', isAuth, (req, res) =>{
	const userId = req.user.id;
	const orderId = req.params.orderId;
	console.log(`successurl ${req.body.success_url}`)
	console.log(`cancelurl ${req.body.cancel_url}`)
	console.log(`clienturl ${process.env.CLIENT_URL}`)
	//console.log(`user id is ${userId}`)
	Order.findById(orderId)
	.then(async order =>{
		//console.log(`cart is ${JSON.stringify(cart)}`)
		const line_items = await Promise.all(order.cart.items.map(async item =>{
			const product = await Product.findOne({productId:item.productId})
							.catch(err => { throw err })
			return {
				price_data:{
				currency:'usd',
				product_data:{
					images:[product.imageUrl],
					name:product.name
				},
				unit_amount: Math.floor(product.price * 100)
			}, 
			quantity: item.quantity
			}}))
		const session = await stripe.checkout.sessions.create({
			line_items:line_items,
			mode:'payment', 
			success_url:process.env.CLIENT_URL+req.body.success_url,
			cancel_url:process.env.CLIENT_URL+req.body.cancel_url
		})
		return session
	})
	.then(session =>{
		res.status(200)
		.json({
			ok:true,
			url:session.url
		})
	})
	.catch(err => {
		console.log(`error : ${err}`)
		res.status(500).json({ ok: false , err: `${err}`})
	})
	//res.send(userId);
})
module.exports = router