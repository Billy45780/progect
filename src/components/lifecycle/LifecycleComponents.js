import React, { Component } from "react";
import './LifecycleComponents.css';

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0, running: false };
    this.interval = null;
  }

  componentDidMount() {
    console.log("Таймер создан");
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    console.log("Таймер удален");
  }

  toggleTimer = () => {
    if (this.state.running) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
      }, 1000);
    }
    this.setState(prevState => ({ running: !prevState.running }));
  };

  resetTimer = () => {
    if (this.interval) clearInterval(this.interval);
    this.setState({ seconds: 0, running: false });
  };

  render() {
    return (
      <div className="timer">
        <h3>Прошло времени: {this.state.seconds} сек</h3>
        <div className="timer-controls">
          <button onClick={this.toggleTimer}>
            {this.state.running ? "Стоп" : "Старт"}
          </button>
          <button onClick={this.resetTimer}>Сброс</button>
        </div>
      </div>
    );
  }
}

export class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    return (
      <div className="window-size">
        <h3>Текущий размер окна браузера</h3>
        <p>Ширина: {this.state.width}px</p>
        <p>Высота: {this.state.height}px</p>
      </div>
    );
  }
}

export class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, loading: false, error: null };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.setState({ loading: true, error: null });
    setTimeout(() => {
      this.setState({
        data: { 
          id: this.props.userId || 1, 
          name: "Иван Иванов", 
          email: "ivan@example.com", 
          role: "developer" 
        },
        loading: false
      });
    }, 2000);
  };

  render() {
    const { data, loading, error } = this.state;
    return (
      <div className="data-fetcher">
        <h3>Загрузка данных пользователя</h3>
        {loading && <div className="loading">Загрузка данных...</div>}
        {error && <div className="error">{error}</div>}
        {data && !loading && (
          <div className="user-data">
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Имя:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Роль:</strong> {data.role}</p>
          </div>
        )}
      </div>
    );
  }
}

DataFetcher.defaultProps = { userId: 1 };