function errorHandler(err, req, res, next) {
  console.error('Ошибка:', err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Неверный формат JSON в теле запроса'
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    message: 'Произошла непредвиденная ошибка'
  });
}

module.exports = errorHandler;
