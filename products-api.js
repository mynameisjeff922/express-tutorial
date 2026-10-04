const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory list of products (resets when the server restarts)
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Phone', price: 599.99 }
];

// GET /products - return the list of products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products - add a new product to the list
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  // Basic validation
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
