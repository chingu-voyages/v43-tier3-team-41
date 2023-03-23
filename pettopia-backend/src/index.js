
const config = require('./config/config')
//require('./config/database')

const app = require('./app')

app.listen(5000, ()=>{
  console.log(`Server running in port: 5000`)
})
