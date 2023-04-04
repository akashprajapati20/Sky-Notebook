const connectToMongo =require('./db');
const express = require('express')
connectToMongo();
const app = express()
const port=5000;
var cors = require('cors')


app.use(cors())

app.use(express.json());
// routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello akash!')
// })


  app.listen(port, () => {
    console.log(`app listening at port http://127.0.0.1:${port}`)
    
  })