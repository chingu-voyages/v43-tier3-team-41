
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
  useFindAndModify: false
});

const app = require('./app')

app.listen(5000, ()=>{
  console.log(`Server running in port: 5000`)
})
