import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const { name, email } = location.state || {};

  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'div',
      { style: styles.successCard },
      React.createElement(
        'h1',
        { style: styles.title },
        'Сообщение отправлено!'
      ),
      React.createElement(
        'div',
        { style: styles.successIcon },
        '✓'
      ),
      name &&
        React.createElement(
          'div',
          { style: styles.successInfo },
          React.createElement(
            'p',
            { style: styles.thankYou },
            `Спасибо, ${name}!`
          ),
          React.createElement(
            'p',
            { style: styles.message },
            'Ваше сообщение было успешно отправлено.'
          ),
          email &&
            React.createElement(
              'p',
              { style: styles.email },
              `Мы ответим вам на email: ${email}`
            )
        ),
      React.createElement(
        'div',
        { style: styles.actions },
        React.createElement(
          Link,
          { to: '/', style: styles.homeLink },
          'На главную'
        ),
        React.createElement(
          Link,
          { to: '/contact', style: styles.contactLink },
          'Отправить ещё сообщение'
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
  successCard: {
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
    marginBottom: '30px',
    fontWeight: '600'
  },
  successIcon: {
    fontSize: '60px',
    color: '#40c057',
    marginBottom: '25px'
  },
  successInfo: {
    marginBottom: '30px'
  },
  thankYou: {
    color: '#d63384',
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '10px'
  },
  message: {
    color: '#555',
    fontSize: '16px',
    marginBottom: '8px',
    lineHeight: '1.5'
  },
  email: {
    color: '#666',
    fontSize: '15px',
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
  contactLink: {
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

export default ContactSuccess;