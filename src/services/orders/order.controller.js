const express = require("express");
let router = express.Router();
let ResponseObject = require("./order.utils").ResponseObject;
let middlewares = require("./order.middleware");
let orderbodyvalidator = middlewares.orderbodyvalidator;
let Order = require("./order.model");
const fetch = require("node-fetch");
const config = require("./order.config");
const products = config.products;

// create product route
router.post("/addorder", orderbodyvalidator, async (req, res) => {
  await fetch(`${products}/${req.body.product_id}`)
    .then((resp) => {
      if (resp.status == 404) {
        throw new Error("404");
      } else {
        return resp.json();
      }
    })
    .then(async (json) => {
    
      console.log(json);
      if (req.body.quantity > json._id) {
        let response = new ResponseObject(
          400,
          "product insufficient",
          "error",
          null
        );
        res.status(response.statusCode);
        delete response.statusCode;
        res.json(response);
      } else {
        fetch(`${products}/${req.body.product_id}/${req.body.quantity}`)
          .then((resp) => {
            if (resp.status == 404) {
              throw new Error("404");
            } else if (resp.status == 403) {
              throw new Error("403");
            } else {
              return resp.json();
            }
          })
          .then(async (json2) => {
            let neworder = new Order(req.body);
            await neworder.save().then(() => {
              let response = new ResponseObject(
                201,
                "order successfully made",
                "success",
                {
                  order_id: neworder._id,
                  product_id: req.body.product_id,
                  product_name:json.data.name,
                  quantity: req.body.quantity,
                  description: json.data.description,
                }
              );
              res.status(response.statusCode);
              delete response.statusCode;
              res.json(response);
            });
          }) .catch((error) => {
            console.log(error.message);
            if (error.message == "404") {
              let response = new ResponseObject(404, "not found", "error", null);
              res.status(response.statusCode);
              delete response.statusCode;
              return res.json(response);
            }
            if (error.message == "403") {
              let response = new ResponseObject(
                403,
                "insufficient product quantity",
                "error",
                null
              );
              res.status(response.statusCode);
              delete response.statusCode;
              return res.json(response);
            }
          });
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message == "404") {
        let response = new ResponseObject(404, "not found", "error", null);
        res.status(response.statusCode);
        delete response.statusCode;
        return res.json(response);
      }
      if (error.message == "403") {
        let response = new ResponseObject(
          403,
          "insufficient product quantity",
          "error",
          null
        );
        res.status(response.statusCode);
        delete response.statusCode;
        return res.json(response);
      }
    });
});

router.get("/", async (req, res) => {
  let orders = await Order.find({}).exec();
  let response = new ResponseObject(
    200,
    "successfully retrieved",
    "success",
    orders
  );
  res.status(response.statusCode);
  delete response.statusCode;
  res.json(response);
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findById(id).exec();
    if (!product) {
      let response = new ResponseObject(
        404,
        "product not found",
        "error",
        null
      );
      res.status(response.statusCode);
      delete response.statusCode;
      return res.json(response);
    } else {
      let response = new ResponseObject(
        200,
        "successfully retrieved",
        "success",
        order
      );
      res.status(response.statusCode);
      delete response.statusCode;
      res.json(response);
    }
  } catch (error) {
    if (error) {
      let response = new ResponseObject(
        404,
        "product not found",
        "error",
        null
      );
      res.status(response.statusCode);
      delete response.statusCode;
      res.json(response);
    }
  }
});

module.exports = router;
