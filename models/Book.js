const { query, run, get } = require('../db/database');

/**
 * Модель книг для SQLite
 */
class Book {
  /**
   * Найти все книги с пагинацией
   */
  static async findAll(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      
      const booksQuery = `
        SELECT 
          books.*,
          authors.name as author_name,
          authors.country as author_country,
          categories.name as category_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN categories ON books.category_id = categories.id
        ORDER BY books.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      const countQuery = `SELECT COUNT(*) as count FROM books`;
      
      const [books, countResult] = await Promise.all([
        query(booksQuery, [pageSize, offset]),
        get(countQuery)
      ]);
      
      const totalCount = countResult.count;
      
      return {
        books,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total: totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      };
    } catch (error) {
      throw new Error(`Ошибка при получении книг: ${error.message}`);
    }
  }

  /**
   * Найти книгу по ID
   */
  static async findById(id) {
    try {
      const bookQuery = `
        SELECT 
          books.*,
          authors.name as author_name,
          authors.country as author_country,
          authors.birth_date as author_birth_date,
          categories.name as category_name,
          categories.description as category_description
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN categories ON books.category_id = categories.id
        WHERE books.id = ?
      `;
      
      const book = await get(bookQuery, [id]);
      
      if (!book) {
        throw new Error('Книга с указанным ID не найдена');
      }

      return book;
    } catch (error) {
      throw new Error(`Ошибка при поиске книги: ${error.message}`);
    }
  }

  /**
   * Создать новую книгу
   */
  static async create(bookData) {
    try {
      const {
        title,
        isbn,
        publication_year,
        pages,
        description,
        author_id,
        category_id
      } = bookData;

      // Валидация обязательных полей
      if (!title || !author_id || !category_id) {
        throw new Error('Название, автор и категория обязательны для заполнения');
      }

      const insertQuery = `
        INSERT INTO books (title, isbn, publication_year, pages, description, author_id, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await run(insertQuery, [
        title, isbn, publication_year, pages, description, author_id, category_id
      ]);

      return await this.findById(result.id);
    } catch (error) {
      throw new Error(`Ошибка при создании книги: ${error.message}`);
    }
  }

  /**
   * Обновить книгу
   */
  static async update(id, bookData) {
    try {
      // Проверяем существование книги
      const existingBook = await this.findById(id);
      if (!existingBook) {
        throw new Error('Книга не найдена');
      }

      // Формируем динамический запрос для обновления
      const updateFields = [];
      const values = [];

      Object.keys(bookData).forEach(key => {
        if (bookData[key] !== undefined) {
          updateFields.push(`${key} = ?`);
          values.push(bookData[key]);
        }
      });

      if (updateFields.length === 0) {
        throw new Error('Нет данных для обновления');
      }

      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const updateQuery = `
        UPDATE books 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;

      await run(updateQuery, values);
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Ошибка при обновлении книги: ${error.message}`);
    }
  }

  /**
   * Удалить книгу
   */
  static async delete(id) {
    try {
      // Проверяем существование книги
      const existingBook = await this.findById(id);
      if (!existingBook) {
        throw new Error('Книга не найдена');
      }

      await run('DELETE FROM books WHERE id = ?', [id]);

      return { 
        success: true, 
        message: 'Книга успешно удалена',
        deletedBook: existingBook 
      };
    } catch (error) {
      throw new Error(`Ошибка при удалении книги: ${error.message}`);
    }
  }

  /**
   * Поиск книг по названию
   */
  static async searchByTitle(title, page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      
      const searchQuery = `
        SELECT 
          books.*,
          authors.name as author_name,
          categories.name as category_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN categories ON books.category_id = categories.id
        WHERE books.title LIKE ?
        ORDER BY books.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      const countQuery = `SELECT COUNT(*) as count FROM books WHERE title LIKE ?`;
      
      const searchPattern = `%${title}%`;
      
      const [books, countResult] = await Promise.all([
        query(searchQuery, [searchPattern, pageSize, offset]),
        get(countQuery, [searchPattern])
      ]);
      
      const totalCount = countResult.count;
      
      return {
        books,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total: totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      };
    } catch (error) {
      throw new Error(`Ошибка при поиске книг: ${error.message}`);
    }
  }

  /**
   * Книги по автору
   */
  static async findByAuthor(authorId, page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      
      const booksQuery = `
        SELECT 
          books.*,
          categories.name as category_name
        FROM books
        LEFT JOIN categories ON books.category_id = categories.id
        WHERE books.author_id = ?
        ORDER BY books.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      const countQuery = `SELECT COUNT(*) as count FROM books WHERE author_id = ?`;
      
      const [books, countResult] = await Promise.all([
        query(booksQuery, [authorId, pageSize, offset]),
        get(countQuery, [authorId])
      ]);
      
      const totalCount = countResult.count;
      
      return {
        books,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total: totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      };
    } catch (error) {
      throw new Error(`Ошибка при получении книг автора: ${error.message}`);
    }
  }
}

module.exports = Book;