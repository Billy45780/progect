import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    { id: 1, name: 'Смартфон', price: 29999, category: 'Электроника' },
    { id: 2, name: 'Ноутбук', price: 59999, category: 'Электроника' },
    { id: 3, name: 'Наушники', price: 4999, category: 'Аксессуары' },
    { id: 4, name: 'Книга', price: 899, category: 'Книги' },
    { id: 5, name: 'Футболка', price: 1999, category: 'Одежда' }
  ];

  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'h1',
      { style: styles.title },
      'Наши товары'
    ),
    React.createElement(
      'div',
      { style: styles.grid },
      products.map(product =>
        React.createElement(
          'div',
          { key: product.id, style: styles.card },
          React.createElement(
            'h3',
            { style: styles.productName },
            product.name
          ),
          React.createElement(
            'p',
            { style: styles.category },
            product.category
          ),
          React.createElement(
            'p',
            { style: styles.price },
            `${product.price} ₽`
          ),
          React.createElement(
            Link,
            {
              to: `/products/${product.id}`,
              style: styles.link
            },
            'Подробнее'
          )
        )
      )
    )
  );
};

const styles = {
  page: {
    padding: '30px',
    maxWidth: '1200px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(214, 51, 132, 0.1)',
    transition: 'transform 0.2s ease'
  },
  productName: {
    color: '#d63384',
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: '500'
  },
  category: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '8px'
  },
  price: {
    color: '#e64980',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px'
  },
  link: {
    display: 'inline-block',
    backgroundColor: '#e64980',
    color: 'white',
    padding: '8px 16px',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'background-color 0.2s ease'
  }
};

export default Products;