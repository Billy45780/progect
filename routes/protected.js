const express = require('express');
const router = express.Router();
const { verifyAuthToken, attachUserToRequest } = require('../middleware/auth');
const { requireAuth, requireRole, requireMinRole, ROLES } = require('../middleware/roles');
const User = require('../models/User');

router.use(verifyAuthToken);
router.use(attachUserToRequest);

router.get('/user-info', requireAuth, (req, res) => {
    res.json({
        success: true,
        message: 'Добро пожаловать в защищенную зону!',
        data: {
            user: req.user,
            timestamp: new Date().toISOString(),
            access: 'basic'
        }
    });
});

router.get('/user-dashboard', requireRole([ROLES.USER, ROLES.MODERATOR, ROLES.ADMIN]), (req, res) => {
    res.json({
        success: true,
        message: 'Панель пользователя',
        data: {
            dashboard: {
                welcome: `Приветствуем, ${req.user.email}!`,
                features: [
                    'Просмотр личного профиля',
                    'История действий',
                    'Настройки учетной записи'
                ],
                lastLogin: new Date().toISOString()
            }
        }
    });
});

router.get('/moderator-panel', requireRole([ROLES.MODERATOR, ROLES.ADMIN]), (req, res) => {
    res.json({
        success: true,
        message: 'Панель модератора',
        data: {
            panel: {
                title: 'Инструменты модератора',
                capabilities: [
                    'Модерация контента',
                    'Управление пользователями',
                    'Просмотр статистики'
                ],
                currentUser: req.user.email,
                accessLevel: 'moderator'
            }
        }
    });
});

router.get('/admin-panel', requireRole(ROLES.ADMIN), async (req, res) => {
    try {
        const allUsers = await User.getAllUsers();
        
        res.json({
            success: true,
            message: 'Административная панель',
            data: {
                adminPanel: {
                    title: 'Админ панель системы',
                    capabilities: [
                        'Полный доступ к системе',
                        'Управление всеми пользователями',
                        'Системные настройки',
                        'Просмотр аудита'
                    ],
                    statistics: {
                        totalUsers: allUsers.length,
                        adminCount: allUsers.filter(u => u.role === ROLES.ADMIN).length,
                        moderatorCount: allUsers.filter(u => u.role === ROLES.MODERATOR).length,
                        userCount: allUsers.filter(u => u.role === ROLES.USER).length
                    },
                    users: allUsers
                }
            }
        });

    } catch (error) {
        console.error('Ошибка получения данных для админ панели:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при загрузке админ панели'
        });
    }
});

router.get('/system-stats', requireMinRole(ROLES.MODERATOR), (req, res) => {
    const stats = {
        system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            nodeVersion: process.version
        },
        user: req.user,
        generated: new Date().toISOString()
    };

    res.json({
        success: true,
        message: 'Системная статистика',
        data: stats
    });
});

router.post('/admin/create-user', requireRole(ROLES.ADMIN), async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email и пароль обязательны'
            });
        }

        const newUser = await User.createUser({ email, password, role });

        res.status(201).json({
            success: true,
            message: 'Пользователь создан администратором',
            data: {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        });

    } catch (error) {
        console.error('Ошибка создания пользователя:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при создании пользователя'
        });
    }
});

module.exports = router;