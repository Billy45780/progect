const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

/**
 * Роуты для работы с книгами
 * Реализует полный CRUD функционал с пагинацией и поиском
 */

// GET /books - Получить все книги с пагинацией
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    // Валидация параметров пагинации
    if (page < 1) {
      return res.status(400).json({
        success: false,
        error: 'Номер страницы должен быть положительным числом'
      });
    }
    
    if (pageSize < 1 || pageSize > 100) {
      return res.status(400).json({
        success: false,
        error: 'Размер страницы должен быть от 1 до 100'
      });
    }

    const result = await Book.findAll(page, pageSize);
    
    res.json({
      success: true,
      data: result.books,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error in GET /books:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /books/search - Поиск книг по названию
router.get('/search', async (req, res) => {
  try {
    const { title, page = 1, pageSize = 10 } = req.query;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Параметр title обязателен для поиска'
      });
    }

    const result = await Book.searchByTitle(title.trim(), page, pageSize);
    
    res.json({
      success: true,
      data: result.books,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error in GET /books/search:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /books/author/:authorId - Получить книги по автору
router.get('/author/:authorId', async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (isNaN(authorId) || authorId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID автора'
      });
    }

    const result = await Book.findByAuthor(authorId, page, pageSize);
    
    res.json({
      success: true,
      data: result.books,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error in GET /books/author/:authorId:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /books/:id - Получить книгу по ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID книги'
      });
    }

    const book = await Book.findById(id);
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error in GET /books/:id:', error);
    
    if (error.message.includes('не найдена')) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /books - Создать новую книгу
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      isbn, 
      publication_year, 
      pages, 
      description, 
      author_id, 
      category_id 
    } = req.body;
    
    // Валидация обязательных полей
    if (!title || !author_id || !category_id) {
      return res.status(400).json({
        success: false,
        error: 'Поля title, author_id и category_id обязательны'
      });
    }

    // Валидация типов данных
    if (publication_year && isNaN(publication_year)) {
      return res.status(400).json({
        success: false,
        error: 'Год публикации должен быть числом'
      });
    }

    if (pages && (isNaN(pages) || pages < 1)) {
      return res.status(400).json({
        success: false,
        error: 'Количество страниц должно быть положительным числом'
      });
    }

    const bookData = {
      title: title.trim(),
      isbn: isbn ? isbn.trim() : null,
      publication_year: publication_year ? parseInt(publication_year) : null,
      pages: pages ? parseInt(pages) : null,
      description: description ? description.trim() : null,
      author_id: parseInt(author_id),
      category_id: parseInt(category_id)
    };

    const book = await Book.create(bookData);
    
    res.status(201).json({
      success: true,
      message: 'Книга успешно создана',
      data: book
    });
  } catch (error) {
    console.error('Error in POST /books:', error);
    
    if (error.message.includes('обязательны') || error.message.includes('долж')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /books/:id - Обновить книгу
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID книги'
      });
    }

    // Валидация данных
    const updateData = { ...req.body };
    
    if (updateData.publication_year && isNaN(updateData.publication_year)) {
      return res.status(400).json({
        success: false,
        error: 'Год публикации должен быть числом'
      });
    }

    if (updateData.pages && (isNaN(updateData.pages) || updateData.pages < 1)) {
      return res.status(400).json({
        success: false,
        error: 'Количество страниц должно быть положительным числом'
      });
    }

    // Преобразуем числовые поля
    if (updateData.publication_year) {
      updateData.publication_year = parseInt(updateData.publication_year);
    }
    
    if (updateData.pages) {
      updateData.pages = parseInt(updateData.pages);
    }
    
    if (updateData.author_id) {
      updateData.author_id = parseInt(updateData.author_id);
    }
    
    if (updateData.category_id) {
      updateData.category_id = parseInt(updateData.category_id);
    }

    const book = await Book.update(id, updateData);
    
    res.json({
      success: true,
      message: 'Книга успешно обновлена',
      data: book
    });
  } catch (error) {
    console.error('Error in PUT /books/:id:', error);
    
    if (error.message.includes('не найдена') || error.message.includes('Нет данных')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /books/:id - Удалить книгу
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID книги'
      });
    }

    const result = await Book.delete(id);
    
    res.json({
      success: true,
      message: result.message,
      data: {
        deletedBook: result.deletedBook
      }
    });
  } catch (error) {
    console.error('Error in DELETE /books/:id:', error);
    
    if (error.message.includes('не найдена')) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;