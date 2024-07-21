const express = require('express');
require("dotenv").config();

const db = require("./Connection/connection")

// 
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send("This is an ecommerce server")
});

app.listen(port, () => {
  console.log(`Server get started at ${port}`)
});

