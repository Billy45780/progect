import React, { useState } from "react";
import "./BasicComponents.css";

export const WelcomeMessage = ({ name, age }) => {
  return (
    <div className="welcome">
      Привет, {name}! Тебе {age} лет 🌟
    </div>
  );
};

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span className={user.isOnline ? "online" : "offline"}>
          {user.isOnline ? "В сети" : "Не в сети"}
        </span>
      </div>
    </div>
  );
};

export const Button = ({ variant = "primary", size = "medium", onClick, children }) => {
  return (
    <button className={`btn ${variant} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};

export const Toggle = ({ children }) => {
  const [visible, setVisible] = useState(true);
  
  const handleToggle = () => {
    setVisible(!visible);
  };
  
  return (
    <div className="toggle">
      <Button onClick={handleToggle}>
        {visible ? "Скрыть" : "Показать"}
      </Button>
      {visible && <div className="toggle-content">{children}</div>}
    </div>
  );
};

export const ConditionalMessage = ({ status }) => {
  const getMessage = () => {
    if (status === 'success') {
      return "✅ Всё прошло успешно!";
    } else if (status === 'error') {
      return "❌ Ошибка при выполнении!";
    } else if (status === 'warning') {
      return "⚠️ Внимание: проверьте данные!";
    }
    return "";
  };
  
  return (
    <div className={`message ${status}`}>
      {getMessage()}
    </div>
  );
};