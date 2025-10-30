import React from 'react';

const Home = () => {
  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'h1',
      { style: styles.title },
      'Добро пожаловать в магазин'
    ),
    React.createElement(
      'div',
      { style: styles.content },
      React.createElement(
        'p',
        { style: styles.text },
        'Главная страница React-приложения с маршрутизацией'
      ),
      React.createElement(
        'div',
        { style: styles.features },
        React.createElement(
          'h2',
          { style: styles.subtitle },
          'Наши возможности'
        ),
        React.createElement(
          'ul',
          { style: styles.list },
          React.createElement(
            'li',
            { style: styles.listItem },
            'Современный дизайн'
          ),
          React.createElement(
            'li',
            { style: styles.listItem },
            'Быстрая загрузка'
          ),
          React.createElement(
            'li',
            { style: styles.listItem },
            'Удобные покупки'
          ),
          React.createElement(
            'li',
            { style: styles.listItem },
            'Поддержка 24/7'
          )
        )
      )
    )
  );
};

const styles = {
  page: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff5f5',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    color: '#d63384',
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600'
  },
  content: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(214, 51, 132, 0.1)'
  },
  text: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  features: {
    marginTop: '25px'
  },
  subtitle: {
    color: '#e64980',
    fontSize: '20px',
    marginBottom: '15px',
    fontWeight: '500'
  },
  list: {
    listStyle: 'none',
    padding: '0'
  },
  listItem: {
    padding: '8px 0',
    color: '#555',
    fontSize: '15px',
    borderBottom: '1px solid #ffe4e6'
  }
};

export default Home;