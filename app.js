const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'API системы аутентификации и авторизации',
        version: '1.0.0',
        endpoints: {
            auth: {
                'POST /api/auth/register': 'Регистрация нового пользователя',
                'POST /api/auth/login': 'Вход в систему',
                'GET /api/auth/profile': 'Получение профиля (требуется токен)',
                'POST /api/auth/refresh': 'Обновление токена'
            },
            protected: {
                'GET /api/protected/user-info': 'Базовая информация (требуется аутентификация)',
                'GET /api/protected/user-dashboard': 'Панель пользователя (роль: user+)',
                'GET /api/protected/moderator-panel': 'Панель модератора (роль: moderator+)',
                'GET /api/protected/admin-panel': 'Админ панель (роль: admin)',
                'GET /api/protected/system-stats': 'Статистика системы (роль: moderator+)',
                'POST /api/protected/admin/create-user': 'Создание пользователя (роль: admin)'
            }
        },
        documentation: 'Смотрите README.md для подробной документации'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Маршрут не найден',
        path: req.path
    });
});

app.use((error, req, res, next) => {
    console.error('Необработанная ошибка:', error);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Дата запуска: ${new Date().toLocaleString()}`);
    console.log(`=================================`);
});

module.exports = app;