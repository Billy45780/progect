const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
    { id: 2, name: 'Петр Петров', email: 'petr@example.com' }
];

let products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Смартфон', price: 30000, category: 'electronics' }
];

const requestLogger = (req) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.socket.remoteAddress}`);
};

const authMiddleware = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authenticated: false, user: null };
    }
    return { authenticated: true, user: { id: 1, name: 'Admin' } };
};

const serveStaticFile = (req, res) => {
    const publicPath = path.join(__dirname, '..', 'public');
    let filePath = path.join(publicPath, req.url === '/' ? 'client.html' : req.url);
    
    if (!filePath.startsWith(publicPath)) {
        return false;
    }
    
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Файл не найден');
            } else {
                res.writeHead(500);
                res.end('Ошибка сервера');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
    
    return true;
};

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    if (req.headers['content-type'] === 'application/json') {
                        resolve(JSON.parse(body));
                    } else {
                        resolve(querystring.parse(body));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            resolve({});
        }
    });
};

const server = http.createServer(async (req, res) => {
    requestLogger(req);
    const auth = authMiddleware(req);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (serveStaticFile(req, res)) {
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    try {
        const body = await parseBody(req);
        
        if (pathname === '/api/admin' && req.method === 'GET') {
            if (!auth.authenticated) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Требуется авторизация' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Админ панель',
                user: auth.user,
                stats: {
                    users: users.length,
                    products: products.length
                }
            }));
        }
        
        else if (pathname === '/api/products' && req.method === 'POST') {
            if (!auth.authenticated) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Требуется авторизация' }));
                return;
            }
            
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name: body.name,
                price: parseFloat(body.price),
                category: body.category
            };
            
            products.push(newProduct);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newProduct));
        }
        
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Маршрут не найден' }));
        }
        
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ошибка обработки запроса' }));
    }
});

server.listen(PORT, () => {
    console.log(`Продвинутый сервер запущен на http://localhost:${PORT}`);
    console.log('Статические файлы обслуживаются из папки public');
});