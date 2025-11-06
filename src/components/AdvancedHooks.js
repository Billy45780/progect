import React, { useReducer, useContext, createContext, useCallback, useMemo, useRef, memo } from 'react';

// Контексты
const UserContext = createContext();
const ThemeContext = createContext();

// Редюсер для useReducer
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'RESET':
      return { name: '', age: '', email: '' };
    default:
      return state;
  }
};

// Мемоизированный компонент для useCallback
const UserDisplay = memo(({ user, onUpdate }) => {
  console.log('UserDisplay rendered');
  return (
    <div style={userDisplayStyle}>
      <h4>User Info:</h4>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => onUpdate('John', '25', 'john@example.com')}>
        Set Default User
      </button>
    </div>
  );
});

const AdvancedHooks = () => {
  // useReducer
  const [user, dispatch] = useReducer(userReducer, {
    name: '',
    age: '',
    email: ''
  });

  // useContext
  const userContextValue = useContext(UserContext);
  const theme = useContext(ThemeContext);

  // useRef для DOM
  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const emailInputRef = useRef(null);
  
  // useRef для значений
  const renderCount = useRef(0);
  const prevUserRef = useRef();

  renderCount.current++;

  // useCallback
  const updateUser = useCallback((name, age, email) => {
    dispatch({ type: 'SET_NAME', payload: name });
    dispatch({ type: 'SET_AGE', payload: age });
    dispatch({ type: 'SET_EMAIL', payload: email });
  }, []);

  // useMemo
  const userSummary = useMemo(() => {
    console.log('Calculating user summary...');
    return `User: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
  }, [user.name, user.age, user.email]);

  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, []);

  // useEffect для предыдущего значения
  React.useEffect(() => {
    prevUserRef.current = user;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const age = ageInputRef.current.value;
    const email = emailInputRef.current.value;

    dispatch({ type: 'SET_NAME', payload: name });
    dispatch({ type: 'SET_AGE', payload: age });
    dispatch({ type: 'SET_EMAIL', payload: email });
  };

  const handleFocus = (ref) => {
    ref.current.focus();
  };

  return (
    <div style={{ ...containerStyle, backgroundColor: theme.background, color: theme.text }}>
      <h2>Advanced Hooks Demo</h2>

      {/* useReducer */}
      <div style={sectionStyle}>
        <h3>useReducer: Complex State Management</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input ref={nameInputRef} placeholder="Name" style={inputStyle} />
            <button type="button" onClick={() => handleFocus(nameInputRef)}>Focus</button>
          </div>
          <div>
            <input ref={ageInputRef} placeholder="Age" style={inputStyle} />
            <button type="button" onClick={() => handleFocus(ageInputRef)}>Focus</button>
          </div>
          <div>
            <input ref={emailInputRef} placeholder="Email" style={inputStyle} />
            <button type="button" onClick={() => handleFocus(emailInputRef)}>Focus</button>
          </div>
          <button type="submit">Update User</button>
          <button type="button" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </form>
        <p>Current User: {JSON.stringify(user)}</p>
      </div>

      {/* useCallback и useMemo */}
      <div style={sectionStyle}>
        <h3>useCallback & useMemo: Optimization</h3>
        <p><strong>User Summary (useMemo):</strong> {userSummary}</p>
        <p><strong>Expensive Calculation:</strong> {expensiveCalculation}</p>
        <UserDisplay user={user} onUpdate={updateUser} />
      </div>

      {/* useRef */}
      <div style={sectionStyle}>
        <h3>useRef: DOM Access and Values</h3>
        <p><strong>Render Count:</strong> {renderCount.current}</p>
        <p><strong>Previous User:</strong> {JSON.stringify(prevUserRef.current)}</p>
      </div>

      {/* useContext */}
      <div style={sectionStyle}>
        <h3>useContext: Context Access</h3>
        <p><strong>User Context:</strong> {userContextValue}</p>
        <p><strong>Theme:</strong> {theme.name}</p>
      </div>
    </div>
  );
};

// Провайдер для контекста
const AdvancedHooksWithProvider = () => {
  const theme = {
    name: 'Dark Theme',
    background: '#333',
    text: '#fff'
  };

  return (
    <UserContext.Provider value="User Context Value">
      <ThemeContext.Provider value={theme}>
        <AdvancedHooks />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

// Стили
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

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
  borderRadius: '4px'
};

const userDisplayStyle = {
  padding: '10px',
  backgroundColor: '#f8f9fa',
  marginTop: '10px',
  borderRadius: '4px'
};

export default AdvancedHooksWithProvider;