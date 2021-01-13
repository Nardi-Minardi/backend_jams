require('dotenv').config() 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//mongodb connection
//mongodb+srv:root:<password>@cluster0.zw6s7.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zw6s7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}
).then(() => {
  console.log('Database Connected');
});


// middleware express 
app.use(bodyParser.urlencoded({
  extended: true
})); // to support URL - encoded bodies
app.use(bodyParser.json()); // to support JSON-encode bodies

// cors error
app.use(cors());

//routes endpoint
app.use('/api', require('./routes/userRoute'))

//default endpoint
app.get('/', (req, res) => {
  res.send('Rest Api Jams Logistics')
})

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is runing http://localhost:${process.env.PORT}`)
});
