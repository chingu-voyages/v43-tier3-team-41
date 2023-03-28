
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true,  
  useFindAndModify: false
});
const app = require('./app')

app.listen(port, ()=>{
  console.log(`Server running in port: ${port}`)
})
