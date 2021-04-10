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
const port=process.env.PORT||4444
const app=express();
app.use(express.json());
app.use("/api/products",products)

app.get("/",(req,res)=>{
  console.log("product servides")
})
app.listen(port,()=>{
    console.log("server dey run");
})
