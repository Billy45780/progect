const express = require('express');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование
app.use((req, res, next) => {
  console.log(new Date().toISOString() + ' - ' + req.method + ' ' + req.path);
  next();
});

// Подключаем роутеры
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Корневой маршрут
app.get('/', (req, res) => {
  res.json({
    message: 'Express.js приложение работает!',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: {
        'GET /api/users': 'Все пользователи',
        'GET /api/users/:id': 'Пользователь по ID', 
        'POST /api/users': 'Создать пользователя'
      },
      products: {
        'GET /api/products': 'Все товары',
        'GET /api/products/:id': 'Товар по ID'
      }
    }
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен: http://localhost:' + PORT);
});
