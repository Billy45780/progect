import React, { useState, useEffect, useCallback } from 'react';

// Кастомный хук useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setStoredValue];
};

// Кастомный хук useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Кастомный хук useToggle
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggle];
};

// Кастомный хук useWindowSize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Кастомный хук useTimer
const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return { time, isRunning, start, pause, reset };
};

const CustomHooks = () => {
  // Использование кастомных хуков
  const [name, setName] = useLocalStorage('username', '');
  const { data: user, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users/1');
  const [isDark, toggleDark] = useToggle(false);
  const windowSize = useWindowSize();
  const { time, isRunning, start, pause, reset } = useTimer();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Custom Hooks Demo</h2>

      {/* useLocalStorage */}
      <div style={sectionStyle}>
        <h3>useLocalStorage Hook</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name (saved in localStorage)"
          style={inputStyle}
        />
        <p>Hello, {name || 'stranger'}!</p>
      </div>

      {/* useFetch */}
      <div style={sectionStyle}>
        <h3>useFetch Hook</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {user && (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>

      {/* useToggle */}
      <div style={sectionStyle}>
        <h3>useToggle Hook</h3>
        <button style={buttonStyle} onClick={toggleDark}>
          Toggle Dark Mode
        </button>
        <p>Dark mode: {isDark ? 'ON' : 'OFF'}</p>
        <div style={{
          padding: '10px',
          backgroundColor: isDark ? '#333' : '#fff',
          color: isDark ? '#fff' : '#333'
        }}>
          This content changes with theme
        </div>
      </div>

      {/* useWindowSize */}
      <div style={sectionStyle}>
        <h3>useWindowSize Hook</h3>
        <p>Window width: {windowSize.width}px</p>
        <p>Window height: {windowSize.height}px</p>
      </div>

      {/* useTimer */}
      <div style={sectionStyle}>
        <h3>useTimer Hook</h3>
        <p>Time: {time} seconds</p>
        <div>
          <button style={buttonStyle} onClick={start} disabled={isRunning}>
            Start
          </button>
          <button style={buttonStyle} onClick={pause} disabled={!isRunning}>
            Pause
          </button>
          <button style={buttonStyle} onClick={reset}>
            Reset
          </button>
        </div>
        <p>Status: {isRunning ? 'Running' : 'Paused'}</p>
      </div>
    </div>
  );
};

// Стили
const sectionStyle = {
  marginBottom: '30px',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '5px'
};

const inputStyle = {
  padding: '8px',
  margin: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '300px'
};

const buttonStyle = {
  padding: '8px 16px',
  margin: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default CustomHooks;