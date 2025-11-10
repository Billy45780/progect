const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET_KEY = 'pr23_super_secret_key_2024_change_in_production';
const TOKEN_EXPIRES = '7d';

function generateAuthToken(userData) {
    const payload = {
        userId: userData.id,
        email: userData.email,
        role: userData.role
    };
    
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRES });
}

function verifyAuthToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Требуется токен авторизации'
        });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: 'Неверный формат токена. Используйте: Bearer <token>'
        });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Срок действия токена истек'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Недействительный токен'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Ошибка проверки токена'
            });
        }
    }
}

async function attachUserToRequest(req, res, next) {
    if (!req.user) {
        return next();
    }

    try {
        const user = await User.findUserById(req.user.userId);
        if (user) {
            req.currentUser = user;
        }
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
    }
    
    next();
}

module.exports = {
    generateAuthToken,
    verifyAuthToken,
    attachUserToRequest,
    JWT_SECRET_KEY
};