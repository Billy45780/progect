const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Логирование запросов
const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${req.method} ${req.url} - IP: ${req.ip}\n`;
    
    fs.appendFile('requests.log', logMessage, (err) => {
        if (err) {
            console.error('Ошибка записи в лог:', err);
        }
    });
    
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

app.use(logRequest);

// Валидация с Joi
const bookSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(100).required(),
    isbn: Joi.string().pattern(/^[0-9-]+$/).required(),
    genre: Joi.string().max(50).optional(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    publisher: Joi.string().max(100).optional()
});

const bookUpdateSchema = Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    author: Joi.string().min(1).max(100).optional(),
    isbn: Joi.string().pattern(/^[0-9-]+$/).optional(),
    genre: Joi.string().max(50).optional(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    publisher: Joi.string().max(100).optional()
});

// "База данных" в памяти
let books = [
    {
        id: 1,
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        isbn: "978-5-699-12014-7",
        genre: "Роман",
        year: 1866,
        publisher: "Эксмо"
    },
    {
        id: 2,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        isbn: "978-5-17-067842-0",
        genre: "Роман",
        year: 1967,
        publisher: "АСТ"
    },
    {
        id: 3,
        title: "1984",
        author: "Джордж Оруэлл",
        isbn: "978-5-04-103390-0",
        genre: "Антиутопия",
        year: 1949,
        publisher: "Эксмо"
    }
];

let nextId = 4;

// Вспомогательные функции
const findBookById = (id) => books.find(book => book.id === parseInt(id));
const findBookByIsbn = (isbn) => books.find(book => book.isbn === isbn);

// Генерация ответа с пагинацией
const generatePaginatedResponse = (data, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
        data: paginatedData,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(data.length / limit),
            totalItems: data.length,
            itemsPerPage: limit,
            hasNext: endIndex < data.length,
            hasPrev: page > 1
        }
    };
};

// Routes

// GET /api/books - получение всех книг с фильтрацией и пагинацией
app.get('/api/books', (req, res) => {
    try {
        const { author, genre, year, page = 1, limit = 10 } = req.query;
        
        let filteredBooks = [...books];
        
        // Фильтрация
        if (author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        
        if (genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        if (year) {
            filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
        }
        
        // Пагинация
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        
        if (pageNum < 1 || limitNum < 1) {
            return res.status(400).json({
                error: 'Некорректные параметры пагинации',
                message: 'Номер страницы и лимит должны быть положительными числами'
            });
        }
        
        const response = generatePaginatedResponse(filteredBooks, pageNum, limitNum);
        res.json(response);
        
    } catch (error) {
        console.error('Ошибка при получении книг:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при обработке запроса'
        });
    }
});

// GET /api/books/:id - получение книги по ID
app.get('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: 'Книга не найдена',
                message: `Книга с ID ${req.params.id} не существует`
            });
        }
        
        res.json(book);
        
    } catch (error) {
        console.error('Ошибка при получении книги:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при обработке запроса'
        });
    }
});

// POST /api/books - создание новой книги
app.post('/api/books', (req, res) => {
    try {
        // Валидация данных
        const { error, value } = bookSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                error: 'Ошибка валидации',
                message: error.details[0].message,
                details: error.details
            });
        }
        
        // Проверка уникальности ISBN
        if (findBookByIsbn(value.isbn)) {
            return res.status(409).json({
                error: 'Конфликт данных',
                message: `Книга с ISBN ${value.isbn} уже существует`
            });
        }
        
        // Создание новой книги
        const newBook = {
            id: nextId++,
            ...value
        };
        
        books.push(newBook);
        
        res.status(201).json({
            message: 'Книга успешно создана',
            book: newBook
        });
        
    } catch (error) {
        console.error('Ошибка при создании книги:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при создании книги'
        });
    }
});

// PUT /api/books/:id - полное обновление книги
app.put('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: 'Книга не найдена',
                message: `Книга с ID ${req.params.id} не существует`
            });
        }
        
        // Валидация данных
        const { error, value } = bookSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                error: 'Ошибка валидации',
                message: error.details[0].message,
                details: error.details
            });
        }
        
        // Проверка уникальности ISBN (исключая текущую книгу)
        const existingBook = findBookByIsbn(value.isbn);
        if (existingBook && existingBook.id !== book.id) {
            return res.status(409).json({
                error: 'Конфликт данных',
                message: `Книга с ISBN ${value.isbn} уже существует`
            });
        }
        
        // Полное обновление
        Object.assign(book, value);
        
        res.json({
            message: 'Книга успешно обновлена',
            book: book
        });
        
    } catch (error) {
        console.error('Ошибка при обновлении книги:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при обновлении книги'
        });
    }
});

// PATCH /api/books/:id - частичное обновление книги
app.patch('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: 'Книга не найдена',
                message: `Книга с ID ${req.params.id} не существует`
            });
        }
        
        // Валидация данных
        const { error, value } = bookUpdateSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                error: 'Ошибка валидации',
                message: error.details[0].message,
                details: error.details
            });
        }
        
        // Проверка уникальности ISBN (если обновляется ISBN)
        if (value.isbn) {
            const existingBook = findBookByIsbn(value.isbn);
            if (existingBook && existingBook.id !== book.id) {
                return res.status(409).json({
                    error: 'Конфликт данных',
                    message: `Книга с ISBN ${value.isbn} уже существует`
                });
            }
        }
        
        // Частичное обновление
        Object.assign(book, value);
        
        res.json({
            message: 'Книга успешно обновлена',
            book: book
        });
        
    } catch (error) {
        console.error('Ошибка при обновлении книги:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при обновлении книги'
        });
    }
});

// DELETE /api/books/:id - удаление книги
app.delete('/api/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                error: 'Книга не найдена',
                message: `Книга с ID ${req.params.id} не существует`
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        res.json({
            message: 'Книга успешно удалена',
            book: deletedBook
        });
        
    } catch (error) {
        console.error('Ошибка при удалении книги:', error);
        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            message: 'Произошла ошибка при удалении книги'
        });
    }
});

// Обработка несуществующих маршрутов
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        message: `Запрашиваемый ресурс ${req.originalUrl} не существует`
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`API доступно по адресу: http://localhost:${PORT}/api`);
});

module.exports = app;