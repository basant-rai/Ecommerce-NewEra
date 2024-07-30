const express = require('express');
require("dotenv").config();

const db = require("./Connection/connection")

//  initialize
const app = express();
const morgan = require("morgan")
const port = process.env.PORT;
const bodyParser = require('body-parser');


// route import
// user route
const UserRoute = require("./Route/userRoute");
// const { jwtMiddleware } = require('./middleware/middleware');

// server uses
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api', UserRoute);

// Server start index
app.get('/', (req, res) => {
  res.send("This is an ecommerce server")
});

app.listen(port, () => {
  console.log(`Server get started at ${port}`)
});

