const { run, query } = require('./database');

/**
 * Тестовые данные для SQLite
 */
const testData = {
  authors: [
    {
      name: 'Лев Толстой',
      country: 'Россия',
      birth_date: '1828-09-09'
    },
    {
      name: 'Фёдор Достоевский',
      country: 'Россия',
      birth_date: '1821-11-11'
    },
    {
      name: 'Антон Чехов',
      country: 'Россия', 
      birth_date: '1860-01-29'
    },
    {
      name: 'Александр Пушкин',
      country: 'Россия',
      birth_date: '1799-06-06'
    },
    {
      name: 'Михаил Лермонтов',
      country: 'Россия',
      birth_date: '1814-10-15'
    }
  ],

  categories: [
    {
      name: 'Русская классика',
      description: 'Произведения русских классиков'
    },
    {
      name: 'Роман',
      description: 'Художественные романы'
    },
    {
      name: 'Рассказы',
      description: 'Короткие художественные произведения'
    },
    {
      name: 'Поэзия',
      description: 'Стихотворные произведения'
    },
    {
      name: 'Драма',
      description: 'Драматические произведения'
    }
  ],

  books: [
    {
      title: 'Война и мир',
      isbn: '978-5-389-00001-1',
      publication_year: 1869,
      pages: 1225,
      description: 'Роман-эпопея, описывающий русское общество в эпоху войн против Наполеона',
      author_id: 1,
      category_id: 1
    },
    {
      title: 'Анна Каренина',
      isbn: '978-5-389-00002-8',
      publication_year: 1877,
      pages: 864,
      description: 'Роман о трагической любви замужней женщины',
      author_id: 1,
      category_id: 2
    },
    {
      title: 'Преступление и наказание',
      isbn: '978-5-389-00003-5',
      publication_year: 1866,
      pages: 551,
      description: 'Роман о бывшем студенте Раскольникове, совершившем убийство',
      author_id: 2,
      category_id: 1
    },
    {
      title: 'Вишнёвый сад',
      isbn: '978-5-389-00004-2',
      publication_year: 1904,
      pages: 96,
      description: 'Пьеса о вынужденной продаже родового имения',
      author_id: 3,
      category_id: 3
    },
    {
      title: 'Евгений Онегин',
      isbn: '978-5-389-00005-9',
      publication_year: 1833,
      pages: 240,
      description: 'Роман в стихах, «энциклопедия русской жизни»',
      author_id: 4,
      category_id: 4
    },
    {
      title: 'Герой нашего времени',
      isbn: '978-5-389-00006-6',
      publication_year: 1840,
      pages: 320,
      description: 'Психологический роман о личности и обществе',
      author_id: 5,
      category_id: 2
    },
    {
      title: 'Братья Карамазовы',
      isbn: '978-5-389-00007-3',
      publication_year: 1880,
      pages: 824,
      description: 'Философский роман о вере, сомнении и свободе',
      author_id: 2,
      category_id: 1
    }
  ]
};

/**
 * Заполнение базы тестовыми данными
 */
async function runSeeds() {
  try {
    console.log('🌱 Starting SQLite database seeding...');

    // Очистка таблиц (в правильном порядке из-за внешних ключей)
    console.log('Clearing existing data...');
    await run('DELETE FROM books');
    await run('DELETE FROM categories');
    await run('DELETE FROM authors');
    await run('DELETE FROM sqlite_sequence WHERE name IN ("authors", "categories", "books")');

    // Заполнение авторов
    console.log('Inserting authors...');
    for (const author of testData.authors) {
      await run(
        'INSERT INTO authors (name, country, birth_date) VALUES (?, ?, ?)',
        [author.name, author.country, author.birth_date]
      );
    }

    // Заполнение категорий
    console.log('Inserting categories...');
    for (const category of testData.categories) {
      await run(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [category.name, category.description]
      );
    }

    // Заполнение книг
    console.log('Inserting books...');
    for (const book of testData.books) {
      await run(
        `INSERT INTO books (title, isbn, publication_year, pages, description, author_id, category_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [book.title, book.isbn, book.publication_year, book.pages, book.description, book.author_id, book.category_id]
      );
    }

    console.log('✅ All seeds completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  }
}

// Запуск при прямом вызове файла
if (require.main === module) {
  runSeeds()
    .then(() => {
      console.log('🎉 Seeding process finished');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Seeding process failed');
      process.exit(1);
    });
}

module.exports = runSeeds;