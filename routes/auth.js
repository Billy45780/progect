const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateAuthToken, verifyAuthToken, attachUserToRequest } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email и пароль обязательны'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Пароль должен содержать минимум 6 символов'
            });
        }

        const userData = { email, password };
        if (role && ['user', 'admin', 'moderator'].includes(role)) {
            userData.role = role;
        }

        const newUser = await User.createUser(userData);
        
        const token = generateAuthToken(newUser);

        res.status(201).json({
            success: true,
            message: 'Пользователь успешно зарегистрирован',
            data: {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role
                },
                token: token
            }
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        
        if (error.message.includes('уже существует')) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Ошибка при регистрации пользователя',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email и пароль обязательны'
            });
        }

        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Неверный email или пароль'
            });
        }

        const isPasswordValid = await User.verifyPassword(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Неверный email или пароль'
            });
        }

        const token = generateAuthToken(user);

        res.json({
            success: true,
            message: 'Вход выполнен успешно',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                token: token
            }
        });

    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при входе в систему'
        });
    }
});

router.get('/profile', 
    verifyAuthToken, 
    attachUserToRequest, 
    async (req, res) => {
        try {
            if (!req.currentUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Пользователь не найден'
                });
            }

            res.json({
                success: true,
                data: {
                    user: req.currentUser
                }
            });

        } catch (error) {
            console.error('Ошибка получения профиля:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка при получении профиля'
            });
        }
    }
);

router.post('/refresh', verifyAuthToken, async (req, res) => {
    try {
        const user = await User.findUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден'
            });
        }

        const newToken = generateAuthToken(user);

        res.json({
            success: true,
            message: 'Токен обновлен',
            data: {
                token: newToken
            }
        });

    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при обновлении токена'
        });
    }
});

module.exports = router;