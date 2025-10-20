const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../Model/products');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      inStock
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;
    const updateProduct = await Product.findOneAndUpdateById(
      { id },
      { name, description, price, category, inStock },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updateProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }           
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;