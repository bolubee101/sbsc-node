module.exports={
    connection_string:process.env.SCSCORDERDB||"mongodb://localhost:27017/sbscorderdb",
    products:process.env.PRODUCTS||"http://localhost:4444/api/products"
}