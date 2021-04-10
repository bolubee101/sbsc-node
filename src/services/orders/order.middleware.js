let ResponseObject = require("./order.utils").ResponseObject;

module.exports.orderbodyvalidator = (req, res, next) => {
  let orderDTO = req.body;
  let missing = [];
  if (!orderDTO.product_id) {
    missing.push("product_id");
  }
  if (!orderDTO.quantity) {
    missing.push("quantity");
  }

  if (missing.length !== 0) {
    let response = new ResponseObject(
      400,
      `missing fields: ${missing.join(", ")}`,
      "error",
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  } else {
    next();
  }
};
