// server.js - Starter Express server for Week 2 assignment

// Import required modules
const mongoose = require('mongoose');
const express = require('express');
dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;



// Middleware parse json setup
app.use(express.json());


//connect DB
connectDB();

// Route for products
app.use('/products', require('./routes/productRoute'));

//Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});



// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];



// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);      
  if (product) {
    res.json(product);
  }
  else {
    res.status(404).json({ error: 'Product not found' }); 
  }
});

app.post('/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;
  const product = products.find(p => p.id === id);  
  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.inStock = inStock;
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.status(204).end();
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// middleware to log requests
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
  next();
});

// middleware for - Authentication
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
});

// middleware for - Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Export the app for testing purposes
module.exports = app; 