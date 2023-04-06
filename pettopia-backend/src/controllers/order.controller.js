const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const constants = require('../constants');
const ORDER_STATUS = constants.ORDER_STATUS;

const CTRL = {};
CTRL.getOrders = (req, res) => {
  Order.find({'cart.userId':req.user.id})
    .exec((err, orders) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true,
        orders,
      });
    });
};

CTRL.getOrder = (req, res) => {
  const { orderId } = req.params;
  Order.findById(orderId).exec((err, order) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      order,
    });
  });
};

CTRL.createOrder = async (req, res) => {
  // validateStock(req.body.orderItems, (cartItems) => {
  //   if (cartItems == false) {
  //     return res.status(500).json({
  //       ok: false,
  //       msg: "The product is not available at the moment.",
  //     });
  //   }

  //   const newOrder = new Order({
  //     client: req.body.client,
  //     serial: req.body.serial,
  //     total: req.body.total,
  //     orderItems: cartItems,
  //   });

  //   newOrder.save((err, order) => {
  //     if (err) {
  //       return res.status(500).json({
  //         ok: false,
  //         err,
  //       });
  //     }

  //     return res.status(201).json({
  //       ok: true,
  //       order,
  //     });
  //   });
  // });
  const userId = req.user.id;
  console.log(`user id: ${userId}`)
  Cart.findOne({userId:userId})
  .then((cart) =>{
    console.log(`cart is : ${JSON.stringify(cart)}`);
        const order = new Order({
        cart: cart
          })
        console.log(`new order is : ${JSON.stringify(order)}`);
    order.save()
    .then(()=>{
        Cart.deleteOne({userId:userId})
        .then(() => 
            res.status(200)
          .json({ok:true}))
      .catch(err => res.status(500).json({ok:false, err:`failed to delete existing cart with error : ${err}`}))
    })
    .catch(err => res.status(500).json({
          ok:false, err:'error saving new order'}))
  })
  .catch(err =>{
    res.status(500)
    .json({
      ok:false,
      err:'errror creating new order'
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
