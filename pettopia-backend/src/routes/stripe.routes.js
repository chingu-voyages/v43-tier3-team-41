const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const constants = require('../constants');
const ORDER_STATUS = constants.ORDER_STATUS;
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
			metadata:{
				orderId:orderId
			},
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


// auto-generated code for listening to stripe webhook events
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.


router.post('/checkoutCompleted', async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err) {
	console.log(`400 error - ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_succeeded':
		const checkoutSessionAsyncPaymentSucceeded = event.data.object;
	//   console.log(`async payment succeededn${JSON.stringify(checkoutSessionAsyncPaymentSucceeded)}`)
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
    	break;
    case 'checkout.session.completed':
		try{
			const checkoutSessionCompleted = event.data.object;
			const orderId = checkoutSessionCompleted.metadata.orderId;
			Order.findById(orderId)
			.then(order =>{
				console.log('deleting cart related to order');
				Cart.deleteOne({_id: order.cart._id})
				.then(() =>{
					console.log('updating order status');
					Order.updateOne({_id:order._id}, {status:ORDER_STATUS.Placed})
					.then(() =>response.send())
				})
			})
			.catch(err => response.send(err));
			
		}  
		catch(err){
			console.error(`error updating order status : ${err}`);
		}
		

      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
	  //console.log(`payment intent succeededn${JSON.stringify(paymentIntentSucceeded)}`)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



module.exports = router