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
const port=process.env.PORT||5555
const app=express();
app.use(express.json());
app.use("/api/orders",order);

app.listen(port,()=>{
    console.log("server dey run");
})
