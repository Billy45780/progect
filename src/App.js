import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      { className: 'app' },
      React.createElement(
        'nav',
        { className: 'navbar' },
        React.createElement(
          'div',
          { className: 'nav-container' },
          React.createElement(
            'h1',
            { className: 'nav-logo' },
            'Магазин'
          ),
          React.createElement(
            'ul',
            { className: 'nav-menu' },
            React.createElement(
              'li',
              { className: 'nav-item' },
              React.createElement(
                'a',
                { href: '/', className: 'nav-link' },
                'Главная'
              )
            ),
            React.createElement(
              'li',
              { className: 'nav-item' },
              React.createElement(
                'a',
                { href: '/about', className: 'nav-link' },
                'О нас'
              )
            ),
            React.createElement(
              'li',
              { className: 'nav-item' },
              React.createElement(
                'a',
                { href: '/products', className: 'nav-link' },
                'Товары'
              )
            ),
            React.createElement(
              'li',
              { className: 'nav-item' },
              React.createElement(
                'a',
                { href: '/contact', className: 'nav-link' },
                'Контакты'
              )
            )
          )
        )
      ),
      React.createElement(
        'main',
        { className: 'main-content' },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: '/', element: React.createElement(Home, null) }),
          React.createElement(Route, { path: '/about', element: React.createElement(About, null) }),
          React.createElement(Route, { path: '/products', element: React.createElement(Products, null) }),
          React.createElement(Route, { path: '/products/:id', element: React.createElement(ProductDetail, null) }),
          React.createElement(Route, { path: '/contact', element: React.createElement(Contact, null) }),
          React.createElement(Route, { path: '/contact/success', element: React.createElement(ContactSuccess, null) }),
          React.createElement(Route, { path: '*', element: React.createElement(NotFound, null) })
        )
      )
    )
  );
}

export default App;