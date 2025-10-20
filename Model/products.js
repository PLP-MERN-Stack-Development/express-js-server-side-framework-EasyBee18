const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  id: {
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
