const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required:true
  },
  description:{
      type: String,
      required: true
  }
},{ timestamps: true });

let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;