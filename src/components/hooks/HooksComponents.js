import React, { useState, useEffect, createContext, useContext } from "react";
import "./HooksComponents.css";

export const CounterWithHooks = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Счётчик: ${count}`;
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h3>Hooks счётчик: {count}</h3>
      <div className="counter-controls">
        <button onClick={decrement}>−</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Иван",
    email: "ivan@example.com",
    age: 25
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="user-profile">
      <h3>Профиль пользователя</h3>
      <button onClick={toggleEditing}>
        {isEditing ? "Сохранить" : "Редактировать"}
      </button>
      
      {isEditing ? (
        <div className="profile-form">
          <input
            value={user.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Имя"
          />
          <input
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
          />
          <input
            type="number"
            value={user.age}
            onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
            placeholder="Возраст"
          />
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Возраст:</strong> {user.age}</p>
        </div>
      )}
    </div>
  );
};

export const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(`Компонент обновлен ${count} раз`);
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Таймер работает...");
    }, 5000);

    return () => {
      clearInterval(timer);
      console.log("Таймер очищен");
    };
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="effect-demo">
      <h3>Демо useEffect</h3>
      <p>Счётчик: {count}</p>
      <p>{message}</p>
      <button onClick={increment}>
        Увеличить счётчик
      </button>
    </div>
  );
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Ошибка чтения из localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Ошибка записи в localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export const LocalStorageCounter = () => {
  const [count, setCount] = useLocalStorage("counter", 0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="local-storage-counter">
      <h3>Счётчик с localStorage: {count}</h3>
      <div className="counter-controls">
        <button onClick={decrement}>−</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Сброс</button>
      </div>
    </div>
  );
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = {
          message: "Данные успешно загружены!",
          timestamp: new Date().toLocaleString(),
          items: ["Элемент 1", "Элемент 2", "Элемент 3"]
        };
        
        setData(mockData);
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const FetchDemo = () => {
  const { data, loading, error } = useFetch('https://api.example.com/data');
  
  return (
    <div className="fetch-demo">
      <h3>Демо useFetch</h3>
      {loading && <div className="loading">Загрузка данных...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="fetch-data">
          <p>{data.message}</p>
          <p>Время: {data.timestamp}</p>
          <ul>
            {data.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



const ThemeContext = createContext();

// 1. Исправляем ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        backgroundColor: theme === "dark" ? "#333333" : "#ffffff",  // Темный или белый фон
        color: theme === "dark" ? "#ffffff" : "#000000",           // Белый или черный текст
        minHeight: "100vh",
        padding: "20px"
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 2. Исправляем ThemeToggle
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{
      padding: "20px", 
      border: "2px solid #ccc",
      borderRadius: "10px",
      margin: "20px 0"
    }}>
      {/* Исправляем текст и убираем лишнюю скобку > */}
      <h4>Текущая тема: {theme === "dark" ? "Тёмная" : "Светлая"}</h4>
      
      {/* Исправляем кнопку - убираем квадратные скобки [] */}
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Переключить на светлую" : "Переключить на тёмную"}
      </button>
    </div>
  );
};