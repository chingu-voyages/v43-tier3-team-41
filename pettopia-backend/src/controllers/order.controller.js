const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const constants = require('../constants');
const ORDER_STATUS = constants.ORDER_STATUS;

const CTRL = {};
CTRL.getOrders = async (req, res) => {
  console.log(`get orders`)
  //res.send(`${JSON.stringify(req.body)}`)
  const getOrderQuery = Order.find({'cart.userId': req.user.id});
  getOrderQuery.then(async orders  => {
        return Promise.all(
          orders.map(async order =>{
            const productTotals = await Promise.all(order.cart.items.map(async item => {
              const product = await Product.findOne({"productId":item.productId});
              return product.price * item.quantity
            }))
            const cartItems = await Promise.all(order.cart.items.map(async item =>{
              const product = await Product.findOne({"productId":item.productId});
              return { product: product, quantity: item.quantity}
            }))
            return {
              cart: cartItems,
              total: productTotals.reduce((accum, total) => accum+total, 0),
              created_at: order.created_at
            }
          })
     )
      })
  .then((orders) =>{
    //console.log(`orders are ${JSON.stringify(orders)}`);
    res.status(200).json({
      ok:true,
      orders:orders
    })
  })
      
    .catch(err =>{
      res.status(500)
      .json({
        ok:false, 
        err: err
      })
    })
};

CTRL.getOrder = (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  Order.findById(orderId).exec(async (err, order) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    const cart = await Cart.findOne({userId: userId});
    const total = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
    res.json({
      ok: true,
      order:{
        total:total, 
        date: order.created_at,
        cart: cart
      },
    });
  });
};

CTRL.createOrder = async (req, res) => {
  
  const userId = req.user.id;
  //console.log(`user id: ${userId}`)
  Cart.findOne({userId:userId})
  .then((cart) =>{
   // console.log(`cart is : ${JSON.stringify(cart)}`);
        const order = new Order({
        cart: cart, 
        status: ORDER_STATUS.InProgress
          })
      //  console.log(`new order is : ${JSON.stringify(order)}`);
    order.save()
    .then(order=>res.status(201)
          .json({ok:true, orderId:order._id}))
    .catch(err => res.status(500).json({
          ok:false, err:`error creating new order ${err}`}))
  })
  .catch(err =>{
    res.status(500)
    .json({
      ok:false,
      err:`error creating new order :${err}`
    })
  })
  
}



CTRL.deleteOrder = (req, res) => {
  const { orderId } = req.params;
  Order.findByIdAndRemove(orderId, (err, order) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(201).json({
      ok: true,
      order,
    });
  });
};

const validateStock = (products, cb) => {
  const products_id = [];

  const cartItems = [];

  products.forEach((elem) => {
    products_id.push(elem.product_id);
  });

  Product.find({})
    .where("_id")
    .in(products_id)
    .exec(async (err, data) => {
      for (const e of data) {
        let newQty = products.find((p) => p.product_id == e._id).qty;

        if (newQty <= e.stock) {
          const modify = await Product.findByIdAndUpdate(e._id, {
            stock: e.stock - newQty,
          });

          if (modify != false) {
            cartItems.push({
              product: e._id,
              qty: newQty,
            });
          }

          //console.log(cartItems)
        }
      }

      cb(cartItems.length == 0 ? false : cartItems);
    });
};

module.exports = CTRL;
