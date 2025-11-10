const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

/**
 * Подключение к SQLite базе данных
 * SQLite не требует сервера, все данные в одном файле
 */
const dbPath = process.env.DB_PATH || './db/library.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    
    // Включаем поддержку внешних ключей
    db.run('PRAGMA foreign_keys = ON', (err) => {
      if (err) {
        console.error('Error enabling foreign keys:', err);
      } else {
        console.log('✅ Foreign keys enabled');
      }
    });
  }
});

/**
 * Универсальная функция для выполнения SQL запросов
 * @param {string} sql - SQL запрос
 * @param {Array} params - Параметры запроса
 * @returns {Promise} Результат выполнения
 */
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Функция для выполнения операций INSERT, UPDATE, DELETE
 * @param {string} sql - SQL запрос
 * @param {Array} params - Параметры запроса
 * @returns {Promise} Результат выполнения
 */
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ 
          id: this.lastID, 
          changes: this.changes 
        });
      }
    });
  });
};

/**
 * Получение одной записи
 * @param {string} sql - SQL запрос
 * @param {Array} params - Параметры запроса
 * @returns {Promise} Одна запись
 */
const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Закрытие базы данных при завершении приложения
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

module.exports = {
  query,
  run,
  get,
  db
};