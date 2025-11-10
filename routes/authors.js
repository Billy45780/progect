const express = require('express');
const Author = require('../models/Author');
const router = express.Router();

/**
 * Роуты для работы с авторами
 * Реализует полный CRUD функционал и получение авторов с книгами
 */

// GET /authors - Получить всех авторов
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    
    res.json({
      success: true,
      data: authors
    });
  } catch (error) {
    console.error('Error in GET /authors:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /authors/stats - Получить статистику по авторам
router.get('/stats', async (req, res) => {
  try {
    const stats = await Author.getAuthorsStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in GET /authors/stats:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /authors/search - Поиск авторов по имени
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Параметр name обязателен для поиска'
      });
    }

    const authors = await Author.searchByName(name.trim());
    
    res.json({
      success: true,
      data: authors
    });
  } catch (error) {
    console.error('Error in GET /authors/search:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /authors/:id - Получить автора по ID с его книгами
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID автора'
      });
    }

    const author = await Author.findByIdWithBooks(id);
    
    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    console.error('Error in GET /authors/:id:', error);
    
    if (error.message.includes('не найден')) {
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

// POST /authors - Создать нового автора
router.post('/', async (req, res) => {
  try {
    const { name, country, birth_date } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Поле name обязательно'
      });
    }

    const authorData = { 
      name: name.trim(),
      country: country ? country.trim() : null,
      birth_date: birth_date || null
    };

    const author = await Author.create(authorData);
    
    res.status(201).json({
      success: true,
      message: 'Автор успешно создан',
      data: author
    });
  } catch (error) {
    console.error('Error in POST /authors:', error);
    
    if (error.message.includes('обязательно')) {
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

// PUT /authors/:id - Обновить автора
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID автора'
      });
    }

    const updateData = { ...req.body };
    
    // Обрабатываем строковые поля
    if (updateData.name) {
      updateData.name = updateData.name.trim();
    }
    
    if (updateData.country) {
      updateData.country = updateData.country.trim();
    }

    const author = await Author.update(id, updateData);
    
    res.json({
      success: true,
      message: 'Автор успешно обновлен',
      data: author
    });
  } catch (error) {
    console.error('Error in PUT /authors/:id:', error);
    
    if (error.message.includes('не найден') || error.message.includes('Нет данных')) {
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

// DELETE /authors/:id - Удалить автора
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный ID автора'
      });
    }

    const result = await Author.delete(id);
    
    res.json({
      success: true,
      message: result.message,
      data: {
        deletedAuthor: result.deletedAuthor
      }
    });
  } catch (error) {
    console.error('Error in DELETE /authors/:id:', error);
    
    if (error.message.includes('не найден')) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    
    if (error.message.includes('нельзя удалить')) {
      return res.status(409).json({
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