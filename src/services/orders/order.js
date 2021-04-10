const express = require("express");
const mongoose = require("mongoose");
const config = require("./order.config");
const order= require("./order.controller");
mongoose
  .connect(config.connection_string)
  .then(() => {
    console.log("connected to orderdb");
  })
  .catch((err) => {
    throw err;
  });
const port=5555||process.env.PORT
const app=express();
app.use(express.json());
app.use("/api/order",order)

app.listen(port,()=>{
    console.log("server dey run");
})
