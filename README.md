# Library Database Management System

**Практическая работа №22: "Работа с базой данных"**

Полнофункциональная система управления библиотечной базой данных с REST API, реализованная на Node.js и PostgreSQL.

## 📋 Требования к проекту

- ✅ Все CRUD операции для книг и авторов
- ✅ Связи между таблицами с внешними ключами
- ✅ Пагинация для списков
- ✅ Обработка ошибок БД
- ✅ Комментарии и структурированный код
- ✅ Миграции и тестовые данные
- ✅ Документация API

## 🗄️ Структура базы данных

### Таблица `authors`
- `id` (SERIAL, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `country` (VARCHAR(100))
- `birth_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Таблица `categories`
- `id` (SERIAL, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL, UNIQUE)
- `description` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Таблица `books`
- `id` (SERIAL, PRIMARY KEY)
- `title` (VARCHAR(500), NOT NULL)
- `isbn` (VARCHAR(20), UNIQUE)
- `publication_year` (INTEGER)
- `pages` (INTEGER)
- `description` (TEXT)
- `author_id` (INTEGER, FOREIGN KEY)
- `category_id` (INTEGER, FOREIGN KEY)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Связи:**
- `books.author_id` → `authors.id` (CASCADE DELETE)
- `books.category_id` → `categories.id` (CASCADE DELETE)

## 🚀 Установка и запуск

### Предварительные требования
- Node.js 14+
- PostgreSQL 12+

### Шаги установки

1. **Клонирование и настройка**
   ```bash
   # Установите зависимости
   npm install
   
   # Настройте переменные окружения в файле .env
   cp .env.example .env
   # Отредактируйте .env под вашу БД