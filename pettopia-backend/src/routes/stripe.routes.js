const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = require('express').Router()
const { isAuth } = require("../middlewares/authentication");
router.get('/', (req, res) =>{
	res.send('testing stripe router!')
})

router.post('/checkout', isAuth, (req, res) =>{
	const userId = req.user.id;
	//console.log(`user id is ${userId}`)
	Cart.findOne({userId: userId})
	.then(async cart =>{
		//console.log(`cart is ${JSON.stringify(cart)}`)
		const line_items = await Promise.all(cart.items.map(async item =>{
			const product = await Product.findOne({productId:item.productId})
							.catch(err => { throw err })
			return {
				price_data:{
				currency:'usd',
				product_data:{
					images:[product.imageUrl],
					name:product.name
				},
				unit_amount: Math.ceil(product.price * 100)
			}, 
			quantity: item.quantity * 2
		}}
		)
		)
		const session = await stripe.checkout.sessions.create({
			line_items:line_items,
			mode:'payment', 
			success_url:'https://www.google.com',
			cancel_url:'https://www.google.com'
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
		res.status(500).json(err)
	})
	//res.send(userId);
})
module.exports = router