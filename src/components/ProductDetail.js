import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = {
    1: {
      id: 1,
      name: 'Смартфон',
      price: 29999,
      category: 'Электроника',
      description: 'Современный смартфон с отличной камерой и долгим временем работы батареи.'
    },
    2: {
      id: 2,
      name: 'Ноутбук',
      price: 59999,
      category: 'Электроника',
      description: 'Мощный ноутбук для работы и развлечений.'
    },
    3: {
      id: 3,
      name: 'Наушники',
      price: 4999,
      category: 'Аксессуары',
      description: 'Беспроводные наушники с шумоподавлением.'
    },
    4: {
      id: 4,
      name: 'Книга',
      price: 899,
      category: 'Книги',
      description: 'Интересная книга для любителей чтения.'
    },
    5: {
      id: 5,
      name: 'Футболка',
      price: 1999,
      category: 'Одежда',
      description: 'Качественная хлопковая футболка.'
    }
  };

  const product = products[id];

  if (!product) {
    return React.createElement(
      'div',
      { style: styles.page },
      React.createElement(
        'h2',
        { style: styles.errorTitle },
        'Товар не найден'
      ),
      React.createElement(
        'p',
        { style: styles.errorText },
        `Товар с ID ${id} не существует.`
      ),
      React.createElement(
        Link,
        { to: '/products', style: styles.backLink },
        'Вернуться к товарам'
      )
    );
  }

  const handleBuy = () => {
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'button',
      {
        onClick: handleBack,
        style: styles.backButton
      },
      '← Назад'
    ),
    React.createElement(
      'div',
      { style: styles.detailCard },
      React.createElement(
        'h1',
        { style: styles.productTitle },
        product.name
      ),
      React.createElement(
        'div',
        { style: styles.productInfo },
        React.createElement(
          'p',
          { style: styles.infoItem },
          React.createElement('strong', null, 'Категория:'),
          ` ${product.category}`
        ),
        React.createElement(
          'p',
          { style: styles.infoItem },
          React.createElement('strong', null, 'Цена:'),
          ` ${product.price} ₽`
        ),
        React.createElement(
          'p',
          { style: styles.infoItem },
          React.createElement('strong', null, 'Описание:'),
          ` ${product.description}`
        )
      ),
      React.createElement(
        'div',
        { style: styles.actions },
        React.createElement(
          'button',
          {
            onClick: handleBuy,
            style: styles.buyButton
          },
          'Добавить в корзину'
        ),
        React.createElement(
          Link,
          { to: '/products', style: styles.productsLink },
          'Все товары'
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
  backButton: {
    backgroundColor: '#e64980',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px'
  },
  detailCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(214, 51, 132, 0.1)'
  },
  productTitle: {
    color: '#d63384',
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  productInfo: {
    backgroundColor: '#fff5f8',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px'
  },
  infoItem: {
    margin: '12px 0',
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  buyButton: {
    backgroundColor: '#d63384',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  productsLink: {
    color: '#e64980',
    textDecoration: 'none',
    fontSize: '14px'
  },
  errorTitle: {
    color: '#d63384',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '15px'
  },
  errorText: {
    color: '#555',
    textAlign: 'center',
    marginBottom: '20px'
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    color: '#e64980',
    textDecoration: 'none'
  }
};

export default ProductDetail;