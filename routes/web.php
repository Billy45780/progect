<?php
use Illuminate\Support\Facades\Route;

// Простая система маршрутизации с использованием Laravel
Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return 'Hello World! Это простой маршрут Laravel';
});

Route::get('/greeting', function () {
    $data = [
        'name' => 'Студент',
        'course' => 'Веб-разработка на Laravel', 
        'date' => date('d.m.Y H:i:s'),
        'tasks' => [
            'Анализ legacy-кода',
            'Установка Laravel',
            'Создание маршрутов',
            'Создание Blade шаблонов'
        ]
    ];
    return view('greeting', $data);
});

Route::get('/users', function () {
    $users = [
        ['id' => 1, 'name' => 'Иван Иванов', 'email' => 'ivan@example.com', 'role' => 'admin'],
        ['id' => 2, 'name' => 'Петр Петров', 'email' => 'petr@example.com', 'role' => 'moderator'],
        ['id' => 3, 'name' => 'Мария Сидорова', 'email' => 'maria@example.com', 'role' => 'user']
    ];
    return view('users', ['users' => $users]);
});

Route::get('/user/{id}', function ($id) {
    $users = [
        1 => ['name' => 'Иван Иванов', 'email' => 'ivan@example.com', 'role' => 'admin'],
        2 => ['name' => 'Петр Петров', 'email' => 'petr@example.com', 'role' => 'moderator'],
        3 => ['name' => 'Мария Сидорова', 'email' => 'maria@example.com', 'role' => 'user']
    ];
    
    if (isset($users[$id])) {
        return view('user', ['user' => $users[$id], 'id' => $id]);
    } else {
        abort(404);
    }
});