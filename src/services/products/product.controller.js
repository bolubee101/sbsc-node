const express = require("express");
let router = express.Router();
let ResponseObject = require("./product.utils").ResponseObject;
let middlewares = require("./product.middleware");
let productbodyvalidator = middlewares.productbodyvalidator;
let Product = require("./product.model");
// create product route
router.post("/add", productbodyvalidator, async (req, res) => {
  let newproduct = new Product(req.body);
  await newproduct.save().then(() => {
    let response = new ResponseObject(
      201,
      "product successfully added",
      "success",
      {
        product_id: newproduct._id,
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
      }
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  });
});

router.get("/", async (req, res) => {
  let products = await Product.find({}).exec();
  let response = new ResponseObject(
    200,
    "successfully retrieved",
    "success",
    products
  );
  res.status(response.statusCode);
  delete response.statusCode;
  res.json(response);
});

router.get("/:id", async (req, res) => {
    let id=req.params.id;
try {
  let product = await Product.findById(id).exec();
  if (!product) {
    let response = new ResponseObject(404, "product not found", "error", null);
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  } else {
    let response = new ResponseObject(
      200,
      "successfully retrieved",
      "success",
      product
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  }
} catch (error) {
  if(error){
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

router.get("/:id/:qty",async (req,res)=>{
  try {
    let id=req.params.id;
  let qty=req.params.qty;
  let product = await Product.findById(id).exec();
  if(qty<=product.quantity){
    let left=product.quantity-qty;
    product.quantity=left;
    product.save().then(()=>{
      let response = new ResponseObject(
        201,
        "order reflected on product",
        "success",
        null
      );
      res.status(response.statusCode);
      delete response.statusCode;
      res.json(response);
    })
  }  else{
    let response = new ResponseObject(
      403,
      "insufficient product quantity",
      "error",
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  }

  } catch (error) {
    console.log(error.message)
    if(error){
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
})

module.exports=router;