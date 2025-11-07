const express = require('express');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Базовые middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Статические файлы
app.use(express.static('public'));

// Основные маршруты
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в Express.js приложение!',
    endpoints: {
      users: '/api/users',
      products: '/api/products'
    }
  });
});

// Подключение модульных роутеров
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Обработка 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.originalUrl
  });
});

// Централизованная обработка ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Доступно по адресу: http://localhost:${PORT}`);
});

module.exports = app;