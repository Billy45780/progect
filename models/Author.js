const { query, run, get } = require('../db/database');

/**
 * Модель авторов для SQLite
 */
class Author {
  /**
   * Получить всех авторов
   */
  static async findAll() {
    try {
      return await query('SELECT * FROM authors ORDER BY name');
    } catch (error) {
      throw new Error(`Ошибка при получении авторов: ${error.message}`);
    }
  }

  /**
   * Получить автора с книгами
   */
  static async findByIdWithBooks(id) {
    try {
      const author = await get('SELECT * FROM authors WHERE id = ?', [id]);
      
      if (!author) {
        throw new Error('Автор с указанным ID не найден');
      }

      const books = await query(`
        SELECT 
          books.*,
          categories.name as category_name
        FROM books
        LEFT JOIN categories ON books.category_id = categories.id
        WHERE books.author_id = ?
        ORDER BY books.publication_year DESC
      `, [id]);

      return {
        ...author,
        books,
        books_count: books.length
      };
    } catch (error) {
      throw new Error(`Ошибка при поиске автора: ${error.message}`);
    }
  }

  /**
   * Получить автора по ID
   */
  static async findById(id) {
    try {
      const author = await get('SELECT * FROM authors WHERE id = ?', [id]);
      
      if (!author) {
        throw new Error('Автор с указанным ID не найден');
      }

      return author;
    } catch (error) {
      throw new Error(`Ошибка при поиске автора: ${error.message}`);
    }
  }

  /**
   * Создать автора
   */
  static async create(authorData) {
    try {
      const { name, country, birth_date } = authorData;

      if (!name) {
        throw new Error('Имя автора обязательно для заполнения');
      }

      const result = await run(
        'INSERT INTO authors (name, country, birth_date) VALUES (?, ?, ?)',
        [name, country, birth_date]
      );
      
      return await this.findById(result.id);
    } catch (error) {
      throw new Error(`Ошибка при создании автора: ${error.message}`);
    }
  }

  /**
   * Обновить автора
   */
  static async update(id, authorData) {
    try {
      const existingAuthor = await this.findById(id);
      if (!existingAuthor) {
        throw new Error('Автор не найден');
      }

      const updateFields = [];
      const values = [];

      Object.keys(authorData).forEach(key => {
        if (authorData[key] !== undefined) {
          updateFields.push(`${key} = ?`);
          values.push(authorData[key]);
        }
      });

      if (updateFields.length === 0) {
        throw new Error('Нет данных для обновления');
      }

      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const updateQuery = `
        UPDATE authors 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;

      await run(updateQuery, values);
      
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Ошибка при обновлении автора: ${error.message}`);
    }
  }

  /**
   * Удалить автора
   */
  static async delete(id) {
    try {
      const existingAuthor = await this.findById(id);
      if (!existingAuthor) {
        throw new Error('Автор не найден');
      }

      // Проверяем, есть ли книги у автора
      const booksCheck = await get(
        'SELECT COUNT(*) as count FROM books WHERE author_id = ?', 
        [id]
      );
      
      if (booksCheck.count > 0) {
        throw new Error('Нельзя удалить автора, у которого есть книги. Сначала удалите или переназначьте книги.');
      }

      await run('DELETE FROM authors WHERE id = ?', [id]);

      return { 
        success: true, 
        message: 'Автор успешно удален',
        deletedAuthor: existingAuthor 
      };
    } catch (error) {
      throw new Error(`Ошибка при удалении автора: ${error.message}`);
    }
  }

  /**
   * Поиск авторов по имени
   */
  static async searchByName(name) {
    try {
      const searchQuery = `
        SELECT * FROM authors 
        WHERE name LIKE ?
        ORDER BY name
      `;
      
      const searchPattern = `%${name}%`;
      return await query(searchQuery, [searchPattern]);
    } catch (error) {
      throw new Error(`Ошибка при поиске авторов: ${error.message}`);
    }
  }

  /**
   * Статистика авторов
   */
  static async getAuthorsStats() {
    try {
      const statsQuery = `
        SELECT 
          authors.*,
          COUNT(books.id) as books_count,
          MAX(books.publication_year) as latest_publication_year
        FROM authors
        LEFT JOIN books ON authors.id = books.author_id
        GROUP BY authors.id
        ORDER BY books_count DESC
      `;
      
      return await query(statsQuery);
    } catch (error) {
      throw new Error(`Ошибка при получении статистики: ${error.message}`);
    }
  }
}

module.exports = Author;