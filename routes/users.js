const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 25 },
  { id: 2, name: 'Петр Петров', email: 'petr@example.com', age: 30 },
  { id: 3, name: 'Мария Сидорова', email: 'maria@example.com', age: 28 }
];

let nextId = 4;

// GET /api/users - получить всех пользователей
router.get('/', (req, res) => {
  const { name, email } = req.query;
  let filteredUsers = users;

  if (name) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (email) {
    filteredUsers = filteredUsers.filter(user => 
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  res.json({
    count: filteredUsers.length,
    users: filteredUsers
  });
});

// GET /api/users/:id - получить пользователя по ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  
  res.json(user);
});

// POST /api/users - создать пользователя
router.post('/', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Обязательные поля: name и email'
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    age: age || null
  };

  users.push(newUser);
  
  res.status(201).json({
    message: 'Пользователь создан',
    user: newUser
  });
});

module.exports = router;
