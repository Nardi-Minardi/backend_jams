require('dotenv').config() 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// var static = require('node-static');
// var file = new static.Server('index.html');

// require('http').createServer(function(request, response) {
//   request.addListener('end', function() {
//     file.serve(request, response);
//   }).resume();
// }).listen(process.env.PORT || 5000);

// middleware express 
app.use(bodyParser.urlencoded({
  extended: true
})); // to support URL - encoded bodies
app.use(bodyParser.json()); // to support JSON-encode bodies

// cors error
app.use(cors());

//routes endpoint
app.use('/v1', require('./routes/userRoute'))

//default endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is runing http://localhost:${process.env.PORT}`)
});
