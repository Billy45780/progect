<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Пользователи</title>
    <style>
        body { font-family: Arial; max-width: 1000px; margin: 0 auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .role-admin { background: #e74c3c; color: white; padding: 3px 8px; border-radius: 3px; }
        .role-moderator { background: #f39c12; color: white; padding: 3px 8px; border-radius: 3px; }
        .role-user { background: #27ae60; color: white; padding: 3px 8px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>👥 Список пользователей</h1>
    <a href="/">← Назад на главную</a>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
            <tr>
                <td><strong>#<?= $user['id'] ?></strong></td>
                <td><?= htmlspecialchars($user['name']) ?></td>
                <td><?= htmlspecialchars($user['email']) ?></td>
                <td>
                    <?php if ($user['role'] === 'admin'): ?>
                        <span class="role-admin">Администратор</span>
                    <?php elseif ($user['role'] === 'moderator'): ?>
                        <span class="role-moderator">Модератор</span>
                    <?php else: ?>
                        <span class="role-user">Пользователь</span>
                    <?php endif; ?>
                </td>
                <td>
                    <a href="/user/<?= $user['id'] ?>" style="padding: 5px 10px; background: #3498db; color: white; text-decoration: none; border-radius: 3px;">
                        Просмотр
                    </a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <p><strong>Всего пользователей:</strong> <?= count($users) ?></p>

    <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <h3>Статистика по ролям:</h3>
        <?php
        $roles = array_count_values(array_column($users, 'role'));
        ?>
        <ul>
            <li>Администраторы: <?= $roles['admin'] ?? 0 ?></li>
            <li>Модераторы: <?= $roles['moderator'] ?? 0 ?></li>
            <li>Пользователи: <?= $roles['user'] ?? 0 ?></li>
        </ul>
    </div>
</body>
</html>