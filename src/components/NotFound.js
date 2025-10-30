import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'div',
      { style: styles.notFoundCard },
      React.createElement(
        'h1',
        { style: styles.title },
        '404 - Страница не найдена'
      ),
      React.createElement(
        'p',
        { style: styles.message },
        'Извините, запрашиваемая страница не существует.'
      ),
      React.createElement(
        'div',
        { style: styles.actions },
        React.createElement(
          Link,
          { to: '/', style: styles.homeLink },
          'Вернуться на главную'
        ),
        React.createElement(
          Link,
          { to: '/products', style: styles.productsLink },
          'Посмотреть товары'
        )
      )
    )
  );
};

const styles = {
  page: {
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff5f5',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFoundCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(214, 51, 132, 0.1)',
    textAlign: 'center',
    width: '100%'
  },
  title: {
    color: '#d63384',
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  message: {
    color: '#555',
    fontSize: '16px',
    marginBottom: '30px',
    lineHeight: '1.5'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  homeLink: {
    backgroundColor: '#d63384',
    color: 'white',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  },
  productsLink: {
    backgroundColor: '#e64980',
    color: 'white',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  }
};

export default NotFound;