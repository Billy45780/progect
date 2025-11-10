const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDirectory = path.join(__dirname, '..', 'data');
const dbPath = path.join(dbDirectory, 'app.db');

if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err.message);
    } else {
        console.log('Успешное подключение к SQLite базе');
    }
});

db.run('PRAGMA foreign_keys = ON');

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Закрыто подключение к БД');
        process.exit(0);
    });
});

module.exports = db;