import React, { useState, useEffect } from 'react';

const BasicHooks = () => {
  // useState демонстрации
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const [user, setUser] = useState({ name: '', age: '' });

  // useEffect демонстрации
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log('useEffect: Document title updated');
  }, [count]);

  useEffect(() => {
    console.log('useEffect: Component mounted');
    
    return () => {
      console.log('useEffect: Component will unmount');
    };
  }, []);

  useEffect(() => {
    if (text) {
      console.log(`useEffect: Text changed to: ${text}`);
    }
  }, [text]);

  // Функции для счетчика
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Функции для видимости
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Функции для списка
  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Функции для формы
  const handleUserChange = (field, value) => {
    setUser({
      ...user,
      [field]: value
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Basic Hooks Demo</h2>
      
      {/* useState: Counter */}
      <div style={sectionStyle}>
        <h3>useState: Counter</h3>
        <p>Count: {count}</p>
        <div>
          <button style={buttonStyle} onClick={increment}>+</button>
          <button style={buttonStyle} onClick={decrement}>-</button>
          <button style={buttonStyle} onClick={reset}>Reset</button>
        </div>
      </div>

      {/* useState: Text Input */}
      <div style={sectionStyle}>
        <h3>useState: Text Input</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={inputStyle}
        />
        <p>You typed: {text}</p>
      </div>

      {/* useState: Visibility Toggle */}
      <div style={sectionStyle}>
        <h3>useState: Visibility Toggle</h3>
        <button style={buttonStyle} onClick={toggleVisibility}>
          {isVisible ? 'Hide' : 'Show'} Content
        </button>
        {isVisible && (
          <div style={visibleContentStyle}>
            This content is visible!
          </div>
        )}
      </div>

      {/* useState: Array Management */}
      <div style={sectionStyle}>
        <h3>useState: Array Management</h3>
        <button style={buttonStyle} onClick={addItem}>Add Item</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button 
                style={smallButtonStyle}
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* useState: Object Management */}
      <div style={sectionStyle}>
        <h3>useState: Object Management</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleUserChange('name', e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => handleUserChange('age', e.target.value)}
            style={inputStyle}
          />
        </div>
        <p>User: {user.name} {user.age}</p>
      </div>

      {/* useEffect Information */}
      <div style={sectionStyle}>
        <h3>useEffect Information</h3>
        <p>Check console and document title to see useEffect in action</p>
        <ul>
          <li>Title updates when count changes</li>
          <li>Logs on mount/unmount</li>
          <li>Logs text changes</li>
        </ul>
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

const buttonStyle = {
  padding: '8px 16px',
  margin: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
};

const smallButtonStyle = {
  ...buttonStyle,
  padding: '4px 8px',
  fontSize: '12px',
  marginLeft: '10px'
};

const inputStyle = {
  padding: '8px',
  margin: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const visibleContentStyle = {
  padding: '10px',
  backgroundColor: '#f8f9fa',
  marginTop: '10px',
  borderRadius: '4px'
};

export default BasicHooks;