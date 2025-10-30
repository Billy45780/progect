import React from 'react';

const About = () => {
  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'h1',
      { style: styles.title },
      'О нашей компании'
    ),
    React.createElement(
      'div',
      { style: styles.section },
      React.createElement(
        'h2',
        { style: styles.subtitle },
        'Наша история'
      ),
      React.createElement(
        'p',
        { style: styles.text },
        'Мы работаем на рынке уже более 10 лет, предоставляя качественные товары и услуги нашим клиентам.'
      )
    ),
    React.createElement(
      'div',
      { style: styles.section },
      React.createElement(
        'h2',
        { style: styles.subtitle },
        'Наша миссия'
      ),
      React.createElement(
        'p',
        { style: styles.text },
        'Сделать покупки удобными, быстрыми и приятными для каждого клиента.'
      )
    ),
    React.createElement(
      'div',
      { style: styles.section },
      React.createElement(
        'h2',
        { style: styles.subtitle },
        'Наши ценности'
      ),
      React.createElement(
        'ul',
        { style: styles.list },
        React.createElement(
          'li',
          { style: styles.listItem },
          'Качество продукции'
        ),
        React.createElement(
          'li',
          { style: styles.listItem },
          'Клиентоориентированность'
        ),
        React.createElement(
          'li',
          { style: styles.listItem },
          'Инновации'
        ),
        React.createElement(
          'li',
          { style: styles.listItem },
          'Надежность'
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
    marginBottom: '40px',
    fontWeight: '600'
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(214, 51, 132, 0.1)'
  },
  subtitle: {
    color: '#e64980',
    fontSize: '20px',
    marginBottom: '15px',
    fontWeight: '500'
  },
  text: {
    color: '#555',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: 0
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    padding: '6px 0',
    color: '#555',
    fontSize: '15px',
    borderBottom: '1px solid #ffe4e6'
  }
};

export default About;