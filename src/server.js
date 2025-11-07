const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;

const users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
    { id: 2, name: 'Петр Петров', email: 'petr@example.com' },
    { id: 3, name: 'Мария Сидорова', email: 'maria@example.com' }
];

let products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Смартфон', price: 30000, category: 'electronics' },
    { id: 3, name: 'Книга', price: 500, category: 'books' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`${new Date().toISOString()} - ${method} ${pathname}`);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (pathname === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Добро пожаловать на сервер Node.js!',
            endpoints: {
                '/api/users': 'GET - получить всех пользователей',
                '/api/users/:id': 'GET - получить пользователя по ID',
                '/api/products': 'GET - получить все товары, POST - добавить товар',
                '/api/products/:id': 'GET, PUT, DELETE - операции с товаром',
                '/api/search': 'GET - поиск товаров по названию',
                '/api/stats': 'GET - статистика сервера'
            }
        }));
    }

    else if (pathname === '/api/users' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(users));
    }

    else if (pathname.startsWith('/api/users/') && method === 'GET') {
        const userId = parseInt(pathname.split('/')[3]);
        const user = users.find(u => u.id === userId);
        
        if (user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        }
    }

    else if (pathname === '/api/products' && method === 'GET') {
        const category = parsedUrl.query.category;
        let filteredProducts = products;
        
        if (category) {
            filteredProducts = products.filter(p => p.category === category);
        }
        
        res.writeHead(200);
        res.end(JSON.stringify(filteredProducts));
    }

    else if (pathname === '/api/products' && method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newProduct = JSON.parse(body);
                newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push(newProduct);
                
                res.writeHead(201);
                res.end(JSON.stringify(newProduct));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }

    else if (pathname.startsWith('/api/products/') && method === 'GET') {
        const productId = parseInt(pathname.split('/')[3]);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.writeHead(200);
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Товар не найден' }));
        }
    }

    else if (pathname.startsWith('/api/products/') && method === 'PUT') {
        const productId = parseInt(pathname.split('/')[3]);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Товар не найден' }));
            return;
        }
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const updatedProduct = JSON.parse(body);
                products[productIndex] = { ...products[productIndex], ...updatedProduct };
                
                res.writeHead(200);
                res.end(JSON.stringify(products[productIndex]));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }

    else if (pathname.startsWith('/api/products/') && method === 'DELETE') {
        const productId = parseInt(pathname.split('/')[3]);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Товар не найден' }));
            return;
        }
        
        const deletedProduct = products.splice(productIndex, 1)[0];
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Товар удален', product: deletedProduct }));
    }

    else if (pathname === '/api/search' && method === 'GET') {
        const query = parsedUrl.query.q;
        
        if (!query) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Не указан поисковый запрос' }));
            return;
        }
        
        const searchResults = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        
        res.writeHead(200);
        res.end(JSON.stringify(searchResults));
    }

    else if (pathname === '/api/stats' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            totalUsers: users.length,
            totalProducts: products.length,
            serverTime: new Date().toISOString(),
            categories: [...new Set(products.map(p => p.category))]
        }));
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Маршрут не найден' }));
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные endpoints:');
    console.log('GET  /');
    console.log('GET  /api/users');
    console.log('GET  /api/users/:id');
    console.log('GET  /api/products');
    console.log('POST /api/products');
    console.log('GET  /api/products/:id');
    console.log('PUT  /api/products/:id');
    console.log('DELETE /api/products/:id');
    console.log('GET  /api/search?q=query');
    console.log('GET  /api/stats');
});