const express = require("express");
const mongoose = require("mongoose");
const config = require("./product.config");
const products= require("./product.controller");
mongoose
  .connect(config.connection_string)
  .then(() => {
    console.log("connected to productdb");
  })
  .catch((err) => {
    throw err;
  });
const port=4444||process.env.PORT
const app=express();
app.use(express.json());
app.use("/api/products",products)

app.listen(port,()=>{
    console.log("server dey run");
})
