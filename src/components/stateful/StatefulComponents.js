import React, { Component } from "react";
import "./StatefulComponents.css";

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleIncrement = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  render() {
    return (
      <div className="counter">
        <h3>Счётчик: {this.state.count}</h3>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>−</button>
      </div>
    );
  }
}

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email.trim() || !this.state.password.trim()) {
      this.setState({ error: "Заполните все поля!" });
    } else {
      this.setState({ error: "", email: "", password: "" });
      alert("Форма отправлена!");
    }
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
        <input type="password" placeholder="Пароль" value={this.state.password} onChange={this.handlePasswordChange} />
        <button type="submit">Войти</button>
        {this.state.error && <p className="error">{this.state.error}</p>}
      </form>
    );
  }
}

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedColor: "#61dafb" };
    this.colors = ["#61dafb", "#4CAF50", "#f44336", "#FF9800", "#9C27B0", "#2196F3"];
  }

  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <div className="color-picker">
        <h3>Выбранный цвет: <span style={{ color: this.state.selectedColor }}>●</span></h3>
        <div className="color-options">
          {this.colors.map((color) => (
            <button key={color} className="color-option" style={{ backgroundColor: color }} onClick={() => this.handleColorSelect(color)} />
          ))}
        </div>
      </div>
    );
  }
}

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], newTodo: "" };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    const trimmedTodo = this.state.newTodo.trim();
    if (trimmedTodo) {
      const newTodoItem = { id: Date.now(), text: trimmedTodo, completed: false };
      this.setState(prevState => ({ todos: [...prevState.todos, newTodoItem], newTodo: "" }));
    }
  };

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => todo.id !== id) }));
  };

  render() {
    return (
      <div className="todo-list">
        <h3>Список задач</h3>
        <div className="todo-input">
          <input value={this.state.newTodo} onChange={this.handleInputChange} placeholder="Новая задача..." onKeyPress={(e) => e.key === 'Enter' && this.addTodo()} />
          <button onClick={this.addTodo}>Добавить</button>
        </div>
        <div className="todos">
          {this.state.todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <span className="todo-text" onClick={() => this.toggleTodo(todo.id)}>{todo.text}</span>
              <button className="delete-btn" onClick={() => this.deleteTodo(todo.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', results: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'], filteredResults: [] };
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ query });
    if (query.trim()) {
      const filtered = this.state.results.filter(item => item.toLowerCase().includes(query.toLowerCase()));
      this.setState({ filteredResults: filtered });
    } else {
      this.setState({ filteredResults: [] });
    }
  };

  clearSearch = () => {
    this.setState({ query: '', filteredResults: [] });
  };

  render() {
    return (
      <div className="search-box">
        <h3>Поиск технологий</h3>
        <div className="search-input">
          <input value={this.state.query} onChange={this.handleSearch} placeholder="Введите технологию..." />
          {this.state.query && <button className="clear-btn" onClick={this.clearSearch}>×</button>}
        </div>
        {this.state.query && (
          <div className="search-results">
            {this.state.filteredResults.length > 0 ? (
              this.state.filteredResults.map((result, index) => <div key={index} className="search-result">{result}</div>)
            ) : (
              <div className="no-results">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
