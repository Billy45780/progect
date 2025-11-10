const db = require('../config/database');

console.log('Запуск миграции: создание таблицы users...');

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.run(createUsersTable, function(err) {
    if (err) {
        console.error('Ошибка создания таблицы:', err.message);
        process.exit(1);
    } else {
        console.log('Таблица users успешно создана');
        
        const insertTestData = `
        INSERT OR IGNORE INTO users (email, password_hash, role) 
        VALUES 
            ('admin@test.ru', '$2a$10$TEST_HASH_ADMIN', 'admin'),
            ('user@test.ru', '$2a$10$TEST_HASH_USER', 'user')
        `;
        
        db.run(insertTestData, function(err) {
            if (err) {
                console.log('Тестовые данные не добавлены (возможно уже существуют)');
            } else {
                console.log('Добавлены тестовые пользователи');
            }
            db.close();
            console.log('Миграция завершена');
        });
    }
});