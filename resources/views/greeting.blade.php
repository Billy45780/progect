<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Приветствие</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
        .greeting { background: #e8f4fd; padding: 20px; border-radius: 10px; }
        .task-item { background: white; padding: 10px; margin: 5px 0; border-left: 3px solid #3498db; }
    </style>
</head>
<body>
    <h1>Blade шаблон - Приветствие</h1>
    <a href="/">← Назад на главную</a>
    
    <div class="greeting">
        <h2>Привет, <?= htmlspecialchars($name) ?>! 👋</h2>
        <p><strong>Курс:</strong> <?= htmlspecialchars($course) ?></p>
        <p><strong>Дата:</strong> <?= htmlspecialchars($date) ?></p>
    </div>

    <?php if ($name === 'Студент'): ?>
    <div style="background: #d4edda; padding: 15px; margin: 15px 0; border-radius: 5px;">
        <strong>🎓 Специальное предложение для студентов!</strong>
    </div>
    <?php endif; ?>

    <h3>Задачи практической работы:</h3>
    <?php foreach ($tasks as $index => $task): ?>
    <div class="task-item">
        <?= $index + 1 ?>. <?= htmlspecialchars($task) ?>
    </div>
    <?php endforeach; ?>

    <h3>Демонстрация возможностей Blade:</h3>
    
    <h4>Условные операторы:</h4>
    <?php if (count($tasks) > 3): ?>
    <p>✅ Много задач: <?= count($tasks) ?> заданий</p>
    <?php elseif (count($tasks) > 0): ?>
    <p>⚠️ Мало задач: <?= count($tasks) ?> заданий</p>
    <?php else: ?>
    <p>❌ Нет задач</p>
    <?php endif; ?>

    <h4>Циклы:</h4>
    <?php for ($i = 1; $i <= 3; $i++): ?>
    <span style="margin: 5px; padding: 5px 10px; background: #3498db; color: white; border-radius: 3px;">
        Итерация <?= $i ?>
    </span>
    <?php endfor; ?>
</body>
</html>