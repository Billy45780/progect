import React, { useRef } from 'react';

const ContactFormUncontrolled = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const priorityRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
      priority: priorityRef.current.value
    };

    console.log('Данные формы (неуправляемая):', formData);
    alert('Форма обратной связи отправлена! Проверьте консоль для просмотра данных.');

    nameRef.current.value = '';
    emailRef.current.value = '';
    subjectRef.current.value = '';
    messageRef.current.value = '';
    priorityRef.current.value = 'normal';
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fffaf7',
    borderRadius: '12px',
    border: '1px solid #e8dcd0',
    boxShadow: '0 4px 12px rgba(139, 125, 107, 0.1)'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#8b7d6b',
    fontSize: '24px',
    fontWeight: '300'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#7a6c5b',
    fontSize: '14px',
    fontWeight: '400'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d6ccc2',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: '#fefcf9',
    color: '#5a4d3e'
  };

  const selectStyle = {
    ...inputStyle
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#d4b8a4',
    color: '#5a4d3e',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Форма обратной связи</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Имя:</label>
          <input
            type="text"
            ref={nameRef}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            ref={emailRef}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Тема:</label>
          <input
            type="text"
            ref={subjectRef}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Приоритет:</label>
          <select
            ref={priorityRef}
            style={selectStyle}
            defaultValue="normal"
          >
            <option value="low">Низкий</option>
            <option value="normal">Обычный</option>
            <option value="high">Высокий</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Сообщение:</label>
          <textarea
            ref={messageRef}
            style={textareaStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Отправить сообщение
        </button>
      </form>
    </div>
  );
};

export default ContactFormUncontrolled;