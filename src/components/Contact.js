import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    console.log('Данные формы:', formData);

    navigate('/contact/success', {
      state: {
        name: formData.name,
        email: formData.email
      }
    });
  };

  return React.createElement(
    'div',
    { style: styles.page },
    React.createElement(
      'h1',
      { style: styles.title },
      'Свяжитесь с нами'
    ),
    React.createElement(
      'form',
      {
        onSubmit: handleSubmit,
        style: styles.form
      },
      React.createElement(
        'div',
        { style: styles.formGroup },
        React.createElement(
          'label',
          {
            htmlFor: 'name',
            style: styles.label
          },
          'Имя:'
        ),
        React.createElement('input', {
          type: 'text',
          id: 'name',
          name: 'name',
          value: formData.name,
          onChange: handleChange,
          style: styles.input,
          required: true
        })
      ),
      React.createElement(
        'div',
        { style: styles.formGroup },
        React.createElement(
          'label',
          {
            htmlFor: 'email',
            style: styles.label
          },
          'Email:'
        ),
        React.createElement('input', {
          type: 'email',
          id: 'email',
          name: 'email',
          value: formData.email,
          onChange: handleChange,
          style: styles.input,
          required: true
        })
      ),
      React.createElement(
        'div',
        { style: styles.formGroup },
        React.createElement(
          'label',
          {
            htmlFor: 'message',
            style: styles.label
          },
          'Сообщение:'
        ),
        React.createElement('textarea', {
          id: 'message',
          name: 'message',
          value: formData.message,
          onChange: handleChange,
          rows: '5',
          style: styles.textarea,
          required: true
        })
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          style: styles.submitButton
        },
        'Отправить сообщение'
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
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    color: '#d63384',
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '40px',
    fontWeight: '600'
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(214, 51, 132, 0.1)'
  },
  formGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#d63384',
    fontWeight: '500',
    fontSize: '15px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ffe4e6',
    borderRadius: '6px',
    fontSize: '15px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ffe4e6',
    borderRadius: '6px',
    fontSize: '15px',
    resize: 'vertical',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif'
  },
  submitButton: {
    backgroundColor: '#d63384',
    color: 'white',
    border: 'none',
    padding: '14px 30px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    width: '100%',
    transition: 'background-color 0.2s ease'
  }
};

export default Contact;