let ResponseObject = require("./product.utils").ResponseObject;

module.exports.productbodyvalidator = (req, res, next) => {
  let productDTO = req.body;
  let missing = [];
  if (!productDTO.name) {
    missing.push("name");
  }
  if (!productDTO.quantity) {
    missing.push("quantity");
  }
  if (!productDTO.description) {
    missing.push("description");
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
