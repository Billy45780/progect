const { run, query } = require('./database');

/**
 * Миграции для SQLite
 * SQLite использует другой синтаксис, но принципы те же
 */
const migrations = [
  // Таблица авторов
  `CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    birth_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Таблица категорий
  `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Таблица книг с внешними ключами
  `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    isbn TEXT UNIQUE,
    publication_year INTEGER,
    pages INTEGER,
    description TEXT,
    author_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  )`,

  // Индексы для оптимизации
  `CREATE INDEX IF NOT EXISTS idx_books_author_id ON books(author_id)`,
  `CREATE INDEX IF NOT EXISTS idx_books_category_id ON books(category_id)`,
  `CREATE INDEX IF NOT EXISTS idx_books_title ON books(title)`,
  `CREATE INDEX IF NOT EXISTS idx_authors_name ON authors(name)`
];

/**
 * Выполнение миграций
 */
async function runMigrations() {
  try {
    console.log('🚀 Starting SQLite database migrations...');
    
    for (let i = 0; i < migrations.length; i++) {
      console.log(`Executing migration ${i + 1}/${migrations.length}...`);
      await run(migrations[i]);
    }

    console.log('✅ All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  }
}

// Запуск миграций при прямом вызове файла
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('🎉 Migration process finished');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Migration process failed');
      process.exit(1);
    });
}

module.exports = runMigrations;