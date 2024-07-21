const mongoose = require('mongoose')
const { ServerConfig } = require('../config/server.config')

// 
mongoose.connect(ServerConfig.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Database get connected")
  }).catch((error) => {
    console.log(error)
  })