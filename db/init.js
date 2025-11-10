const runMigrations = require('./migrate');
const runSeeds = require('./seed');

/**
 * Полная инициализация SQLite базы данных
 */
async function initDatabase() {
  try {
    console.log('🚀 Starting SQLite database initialization...');
    console.log('==========================================');
    
    await runMigrations();
    console.log('\n------------------------------------------');
    await runSeeds();
    
    console.log('\n==========================================');
    console.log('🎉 SQLite database initialization completed successfully!');
    console.log('📚 Database is ready with authors, categories and books');
    
  } catch (error) {
    console.error('\n💥 Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Запуск при прямом вызове
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;