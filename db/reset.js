const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Скрипт для полного сброса базы данных
 * Удаляет файл БД и создает заново
 */
async function resetDatabase() {
  try {
    const dbPath = process.env.DB_PATH || './db/library.db';
    const fullPath = path.resolve(dbPath);
    
    console.log('🔄 Resetting database...');
    
    // Проверяем существование файла БД
    if (fs.existsSync(fullPath)) {
      // Закрываем все соединения перед удалением
      try {
        const { db } = require('./database');
        db.close();
      } catch (e) {
        // Игнорируем ошибки закрытия
      }
      
      // Удаляем файл базы данных
      fs.unlinkSync(fullPath);
      console.log('✅ Database file deleted');
    } else {
      console.log('ℹ️  Database file does not exist, creating new...');
    }
    
    // Создаем директорию если нужно
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Запускаем инициализацию заново
    const initDatabase = require('./init');
    await initDatabase();
    
    console.log('🎉 Database reset completed successfully!');
    
  } catch (error) {
    console.error('💥 Database reset failed:', error.message);
    process.exit(1);
  }
}

// Запуск при прямом вызове
if (require.main === module) {
  resetDatabase();
}

module.exports = resetDatabase;