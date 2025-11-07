const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Ноутбук', price: 50000, category: 'Электроника', inStock: true },
  { id: 2, name: 'Смартфон', price: 30000, category: 'Электроника', inStock: true },
  { id: 3, name: 'Книга', price: 500, category: 'Книги', inStock: false }
];

let nextId = 4;

// GET /api/products - получить все товары
router.get('/', (req, res) => {
  const { category, inStock } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (inStock !== undefined) {
    const stockFilter = inStock === 'true';
    filteredProducts = filteredProducts.filter(product => 
      product.inStock === stockFilter
    );
  }

  res.json({
    count: filteredProducts.length,
    products: filteredProducts
  });
});

// GET /api/products/:id - получить товар по ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  res.json(product);
});

// POST /api/products - создать товар
router.post('/', (req, res) => {
  const { name, price, category, inStock } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      error: 'Обязательные поля: name, price, category'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    category,
    inStock: inStock !== undefined ? Boolean(inStock) : true
  };

  products.push(newProduct);
  
  res.status(201).json({
    message: 'Товар создан',
    product: newProduct
  });
});

module.exports = router;
