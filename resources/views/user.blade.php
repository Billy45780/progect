<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Пользователь <?= $id ?></title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
        .profile-card { border: 2px solid #3498db; padding: 25px; border-radius: 10px; margin: 20px 0; }
        .not-found { background: #f8d7da; color: #721c24; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>👤 Профиль пользователя</h1>
    <a href="/users">← Назад к списку</a>
    
    <?php if ($user): ?>
    <div class="profile-card">
        <h2><?= htmlspecialchars($user['name']) ?></h2>
        <p><strong>Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
        <p><strong>ID пользователя:</strong> #<?= $id ?></p>
        <p><strong>Роль:</strong> 
            <?php if ($user['role'] === 'admin'): ?>
                <span style="background: #e74c3c; color: white; padding: 3px 8px; border-radius: 3px;">Администратор</span>
            <?php elseif ($user['role'] === 'moderator'): ?>
                <span style="background: #f39c12; color: white; padding: 3px 8px; border-radius: 3px;">Модератор</span>
            <?php else: ?>
                <span style="background: #27ae60; color: white; padding: 3px 8px; border-radius: 3px;">Пользователь</span>
            <?php endif; ?>
        </p>
    </div>

    <div style="margin-top: 20px;">
        <h3>Быстрая навигация:</h3>
        <div style="display: flex; gap: 10px;">
            <a href="/user/1" style="padding: 8px 15px; background: #e74c3c; color: white; text-decoration: none; border-radius: 5px;">User #1</a>
            <a href="/user/2" style="padding: 8px 15px; background: #f39c12; color: white; text-decoration: none; border-radius: 5px;">User #2</a>
            <a href="/user/3" style="padding: 8px 15px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px;">User #3</a>
        </div>
    </div>
    <?php else: ?>
    <div class="not-found">
        <h2>❌ Пользователь не найден</h2>
        <p>Пользователь с ID <?= $id ?> не существует в системе.</p>
        <a href="/users" style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #3498db; color: white; text-decoration: none; border-radius: 5px;">
            Вернуться к списку пользователей
        </a>
    </div>
    <?php endif; ?>
</body>
</html>