const express = require('express')
const morgan = require('morgan')
const app = express()
const { Cors } = require('./middlewares/cors')

app.use(Cors);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

app.use('/api/v1/products', require('./routes/product.routes'))
app.use('/api/v1/cart', require('./routes/cart.routes'))
app.use('/api/v1/test', require('./routes/test.routes'))
// unused routes
app.use('/api/v1/orders', require('./routes/order.routes'))
app.use('/api/v1/clients', require('./routes/client.routes'))
app.use('/api/v1/users', require('./routes/user.routes'))
app.use('/api/v1/roles', require('./routes/role.routes'))
app.use('/api/v1/auth', require('./routes/auth.routes'))



app.get('/', (req,res)=>{
  res.status(200).json({msg: `Pettopia Application! Use endpoints in format 'api/v1/* for queries'`})
})

module.exports=app
