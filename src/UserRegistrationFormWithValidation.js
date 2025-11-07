import React, { useState } from 'react';

const UserRegistrationForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    ageGroup: '',
    about: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setUserData(prevData => ({
      ...prevData,
      [name]: inputValue
    }));

    if (touchedFields[name]) {
      validateField(name, inputValue);
    }
  };

  const handleFieldBlur = (event) => {
    const { name, value } = event.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (fieldName, fieldValue) => {
    const validationErrors = { ...fieldErrors };

    const validations = {
      firstName: () => {
        if (!fieldValue.trim()) return 'Поле обязательно для заполнения';
        return '';
      },
      email: () => {
        if (!fieldValue.trim()) return 'Поле обязательно для заполнения';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(fieldValue)) return 'Введите корректный email адрес';
        return '';
      },
      password: () => {
        if (!fieldValue) return 'Поле обязательно для заполнения';
        if (fieldValue.length < 8) return 'Пароль должен содержать не менее 8 символов';
        return '';
      },
      confirmPassword: () => {
        if (!fieldValue) return 'Поле обязательно для заполнения';
        if (fieldValue !== userData.password) return 'Пароли не совпадают';
        return '';
      },
      gender: () => {
        if (!fieldValue) return 'Выберите пол';
        return '';
      },
      ageGroup: () => {
        if (!fieldValue) return 'Выберите возрастную категорию';
        return '';
      },
      about: () => {
        if (!fieldValue.trim()) return 'Поле обязательно для заполнения';
        return '';
      }
    };

    if (validations[fieldName]) {
      const errorMessage = validations[fieldName]();
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage;
      } else {
        delete validationErrors[fieldName];
      }
    }

    setFieldErrors(validationErrors);
  };

  const validateForm = () => {
    const allFields = {};
    Object.keys(userData).forEach(field => {
      allFields[field] = true;
    });
    setTouchedFields(allFields);

    const formErrors = {};
    Object.keys(userData).forEach(field => {
      if (field !== 'newsletter') {
        validateField(field, userData[field]);
        if (fieldErrors[field]) {
          formErrors[field] = fieldErrors[field];
        }
      }
    });

    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const isValid = validateForm();
    
    if (isValid) {
      console.log('Данные формы:', userData);
      alert('Регистрация успешно завершена!');
    } else {
      alert('Пожалуйста, проверьте правильность заполнения формы.');
    }
  };

  const isFieldValid = (fieldName) => !fieldErrors[fieldName] && touchedFields[fieldName];

  const formContainer = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fffaf7',
    borderRadius: '12px',
    border: '1px solid #e8dcd0',
    boxShadow: '0 4px 12px rgba(139, 125, 107, 0.1)'
  };

  const formTitle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#8b7d6b',
    fontSize: '24px',
    fontWeight: '300'
  };

  const fieldGroup = {
    marginBottom: '20px'
  };

  const fieldLabel = {
    display: 'block',
    marginBottom: '8px',
    color: '#7a6c5b',
    fontSize: '14px',
    fontWeight: '400'
  };

  const baseInput = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d6ccc2',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: '#fefcf9',
    color: '#5a4d3e'
  };

  const errorInput = {
    ...baseInput,
    border: '1px solid #d4a5a5'
  };

  const validInput = {
    ...baseInput,
    border: '1px solid #a5d4b8'
  };

  const errorText = {
    color: '#d4a5a5',
    fontSize: '12px',
    marginTop: '5px'
  };

  const radioContainer = {
    display: 'flex',
    gap: '20px',
    marginTop: '10px'
  };

  const radioOption = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#7a6c5b'
  };

  const checkboxOption = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#7a6c5b'
  };

  const selectField = {
    ...baseInput
  };

  const selectError = {
    ...selectField,
    border: '1px solid #d4a5a5'
  };

  const selectValid = {
    ...selectField,
    border: '1px solid #a5d4b8'
  };

  const textAreaField = {
    ...baseInput,
    resize: 'vertical',
    minHeight: '80px'
  };

  const textAreaError = {
    ...textAreaField,
    border: '1px solid #d4a5a5'
  };

  const textAreaValid = {
    ...textAreaField,
    border: '1px solid #a5d4b8'
  };

  const submitButton = {
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

  const getFieldStyle = (fieldName, fieldType = 'input') => {
    if (fieldErrors[fieldName]) {
      switch (fieldType) {
        case 'select': return selectError;
        case 'textarea': return textAreaError;
        default: return errorInput;
      }
    }
    if (isFieldValid(fieldName)) {
      switch (fieldType) {
        case 'select': return selectValid;
        case 'textarea': return textAreaValid;
        default: return validInput;
      }
    }
    switch (fieldType) {
      case 'select': return selectField;
      case 'textarea': return textAreaField;
      default: return baseInput;
    }
  };

  return (
    <div style={formContainer}>
      <h2 style={formTitle}>Регистрация пользователя</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={fieldGroup}>
          <label style={fieldLabel}>Имя:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('firstName')}
          />
          {fieldErrors.firstName && <div style={errorText}>{fieldErrors.firstName}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('email')}
          />
          {fieldErrors.email && <div style={errorText}>{fieldErrors.email}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>Пароль:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('password')}
          />
          {fieldErrors.password && <div style={errorText}>{fieldErrors.password}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>Подтверждение пароля:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('confirmPassword')}
          />
          {fieldErrors.confirmPassword && <div style={errorText}>{fieldErrors.confirmPassword}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>Пол:</label>
          <div style={radioContainer}>
            <label style={radioOption}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={userData.gender === 'male'}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
              />
              Мужской
            </label>
            <label style={radioOption}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={userData.gender === 'female'}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
              />
              Женский
            </label>
          </div>
          {fieldErrors.gender && <div style={errorText}>{fieldErrors.gender}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={checkboxOption}>
            <input
              type="checkbox"
              name="newsletter"
              checked={userData.newsletter}
              onChange={handleInputChange}
            />
            Подписаться на рассылку
          </label>
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>Возраст:</label>
          <select
            name="ageGroup"
            value={userData.ageGroup}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('ageGroup', 'select')}
          >
            <option value="">Выберите возраст</option>
            <option value="18-25">18-25 лет</option>
            <option value="26-35">26-35 лет</option>
            <option value="36-45">36-45 лет</option>
            <option value="46+">46+ лет</option>
          </select>
          {fieldErrors.ageGroup && <div style={errorText}>{fieldErrors.ageGroup}</div>}
        </div>

        <div style={fieldGroup}>
          <label style={fieldLabel}>О себе:</label>
          <textarea
            name="about"
            value={userData.about}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            style={getFieldStyle('about', 'textarea')}
          />
          {fieldErrors.about && <div style={errorText}>{fieldErrors.about}</div>}
        </div>

        <button type="submit" style={submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;