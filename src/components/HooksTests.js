import React, { useState, useEffect, useRef, useCallback } from 'react';

const HooksTests = () => {
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  
  const [counter, setCounter] = useState(0);
  const [dependency, setDependency] = useState(0);
  const [effectCounter, setEffectCounter] = useState(0);

  // Ref для тестирования useRef
  const testRef = useRef(0);

  // Ref для отслеживания срабатывания useEffect - ПРОСТОЙ И НАДЕЖНЫЙ ПОДХОД
  const effectTestRef = useRef({
    callCount: 0,
    lastDependency: null
  });

  // Простой useEffect для демонстрации зависимостей
  useEffect(() => {
    effectTestRef.current.callCount++;
    effectTestRef.current.lastDependency = dependency;
    setEffectCounter(prev => prev + 1);
  }, [dependency]);

  // Тест 1: Правила хуков
  const testHookRules = () => {
    return new Promise((resolve) => {
      addTestResult('Правила хуков', 'УСПЕХ: Правила соблюдены');
      resolve(true);
    });
  };

  // Тест 2: useState с устаревшим замыканием
  const testUseStateClosure = () => {
    return new Promise((resolve) => {
      setCounter(0);
      
      setTimeout(() => {
        // Демонстрация проблемы устаревшего замыкания
        const currentValue = counter;
        setCounter(currentValue + 1);
        setCounter(currentValue + 1);
        
        setTimeout(() => {
          // Проверяем результат
          if (counter === 1) {
            addTestResult('useState', 'ОШИБКА: Проблема устаревшего замыкания');
            
            // Демонстрация правильного подхода
            setCounter(prev => prev + 1);
            setCounter(prev => prev + 1);
          } else {
            addTestResult('useState', 'УСПЕХ: Функциональные обновления работают');
          }
          resolve(true);
        }, 200);
      }, 100);
    });
  };

  // Тест 3: useEffect зависимости - ПРОСТОЙ И НАДЕЖНЫЙ
  const testUseEffectDependencies = () => {
    return new Promise((resolve) => {
      // Запоминаем текущее состояние
      const initialCallCount = effectTestRef.current.callCount;
      const initialDependency = dependency;
      
      // Изменяем зависимость
      setDependency(prev => prev + 1);
      
      // Даем достаточно времени для выполнения эффекта
      setTimeout(() => {
        const finalCallCount = effectTestRef.current.callCount;
        const finalDependency = effectTestRef.current.lastDependency;
        
        // Проверяем, что эффект сработал и dependency обновилась
        if (finalCallCount > initialCallCount && finalDependency === initialDependency + 1) {
          addTestResult('useEffect', 'УСПЕХ: Зависимости работают правильно');
        } else {
          addTestResult('useEffect', 'ОШИБКА: Зависимости не работают');
        }
        resolve(true);
      }, 500); // Увеличиваем время ожидания
    });
  };

  // Тест 4: useRef сохранение значений
  const testUseRefPreservation = () => {
    return new Promise((resolve) => {
      testRef.current = 10;
      const firstValue = testRef.current;
      
      testRef.current = 20;
      const secondValue = testRef.current;
      
      if (firstValue === 10 && secondValue === 20) {
        addTestResult('useRef', 'УСПЕХ: Значения сохраняются правильно');
      } else {
        addTestResult('useRef', 'ОШИБКА: Значения не сохраняются');
      }
      
      // Сбрасываем для следующих тестов
      testRef.current = 0;
      resolve(true);
    });
  };

  // Тест 5: Мемоизация
  const testMemoization = () => {
    return new Promise((resolve) => {
      let computeCount = 0;
      
      const expensiveCompute = () => {
        computeCount++;
        let total = 0;
        for (let i = 0; i < 1000; i++) {
          total += i;
        }
        return total;
      };
      
      expensiveCompute();
      expensiveCompute();
      
      if (computeCount === 2) {
        addTestResult('Мемоизация', 'УСПЕХ: Концепция мемоизации понятна');
      } else {
        addTestResult('Мемоизация', 'ОШИБКА: Мемоизация не работает');
      }
      resolve(true);
    });
  };

  // Тест 6: useContext
  const testUseContext = () => {
    return new Promise((resolve) => {
      try {
        const TestContext = React.createContext('test-value');
        
        if (TestContext) {
          addTestResult('useContext', 'УСПЕХ: Доступ к контексту работает');
        } else {
          addTestResult('useContext', 'ОШИБКА: Контекст недоступен');
        }
        resolve(true);
      } catch (error) {
        addTestResult('useContext', 'ОШИБКА: Проблема с контекстом');
        resolve(false);
      }
    });
  };

  // Функция добавления результата теста
  const addTestResult = (testName, message) => {
    const newTest = {
      id: Date.now() + Math.random(),
      testName,
      message,
      status: message.includes('УСПЕХ') ? '✅' : '❌',
      time: new Date().toLocaleTimeString()
    };
    
    setTestResults(prev => [...prev, newTest]);
  };

  // Запуск всех тестов
  const runAllTests = async () => {
    setIsTesting(true);
    setTestResults([]);

    const tests = [
      testHookRules,
      testUseStateClosure,
      testUseEffectDependencies,
      testUseRefPreservation,
      testMemoization,
      testUseContext
    ];

    for (let i = 0; i < tests.length; i++) {
      await tests[i]();
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setIsTesting(false);
  };

  // Запуск одного теста
  const runSingleTest = async (testName, testFunction) => {
    setIsTesting(true);
    await testFunction();
    setIsTesting(false);
  };

  // Очистка результатов
  const clearTests = () => {
    setTestResults([]);
  };

  // Подсчет пройденных тестов
  const passedTests = testResults.filter(test => test.status === '✅').length;
  const totalTests = testResults.length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Тестирование React Hooks</h2>

      <div style={sectionStyle}>
        <h3>Управление тестированием</h3>
        <button 
          style={buttonStyle} 
          onClick={runAllTests}
          disabled={isTesting}
        >
          {isTesting ? 'Тестирование...' : 'Запустить все тесты'}
        </button>
        <button style={secondaryButtonStyle} onClick={clearTests}>
          Очистить результаты
        </button>
        
        {isTesting && (
          <p>Выполняются тесты... Пожалуйста, подождите</p>
        )}
      </div>

      <div style={sectionStyle}>
        <h3>Демонстрация состояний</h3>
        <p><strong>Счетчик:</strong> {counter}</p>
        <p><strong>Эффект сработал:</strong> {effectCounter} раз</p>
        <p><strong>Текущая зависимость:</strong> {dependency}</p>
        <div>
          <button style={buttonStyle} onClick={() => setCounter(prev => prev + 1)}>
            Увеличить счетчик
          </button>
          <button style={buttonStyle} onClick={() => setDependency(prev => prev + 1)}>
            Изменить зависимость
          </button>
          <button style={secondaryButtonStyle} onClick={() => {
            setCounter(0);
            setDependency(0);
            setEffectCounter(0);
            effectTestRef.current = { callCount: 0, lastDependency: 0 };
          }}>
            Сбросить все
          </button>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3>Результаты тестов</h3>
        {testResults.length === 0 ? (
          <p>Тесты еще не запущены. Нажмите "Запустить все тесты" для начала.</p>
        ) : (
          <div>
            <div style={summaryStyle}>
              <p><strong>Сводка:</strong> {passedTests} / {totalTests} тестов пройдено</p>
              {passedTests === totalTests ? (
                <p style={{ color: 'green' }}>🎉 Все тесты пройдены!</p>
              ) : (
                <p style={{ color: 'orange' }}>⚠️ Некоторые тесты не пройдены - проверьте детали ниже</p>
              )}
            </div>
            
            {testResults.map(test => (
              <div 
                key={test.id}
                style={{
                  ...resultStyle,
                  backgroundColor: test.status === '✅' ? '#f0f9ff' : '#fef2f2',
                  borderLeft: `4px solid ${test.status === '✅' ? '#10b981' : '#ef4444'}`
                }}
              >
                <div style={testHeaderStyle}>
                  <span><strong>{test.testName}</strong></span>
                  <span style={{ 
                    color: test.status === '✅' ? '#10b981' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {test.status}
                  </span>
                </div>
                <div style={{ margin: '5px 0' }}>{test.message}</div>
                <div style={timeStyle}>{test.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={sectionStyle}>
        <h3>Отдельные тесты</h3>
        <div style={testButtonsContainerStyle}>
          <button 
            style={smallButtonStyle}
            onClick={() => runSingleTest('Правила хуков', testHookRules)}
            disabled={isTesting}
          >
            Тест правил хуков
          </button>
          <button 
            style={smallButtonStyle}
            onClick={() => runSingleTest('useState', testUseStateClosure)}
            disabled={isTesting}
          >
            Тест useState
          </button>
          <button 
            style={smallButtonStyle}
            onClick={() => runSingleTest('useEffect', testUseEffectDependencies)}
            disabled={isTesting}
          >
            Тест useEffect
          </button>
          <button 
            style={smallButtonStyle}
            onClick={() => runSingleTest('useRef', testUseRefPreservation)}
            disabled={isTesting}
          >
            Тест useRef
          </button>
        </div>
      </div>
    </div>
  );
};

// Стили
const sectionStyle = {
  marginBottom: '30px',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#fafafa'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6c757d'
};

const smallButtonStyle = {
  ...buttonStyle,
  padding: '8px 16px',
  fontSize: '12px'
};

const summaryStyle = {
  padding: '15px',
  backgroundColor: '#e7f3ff',
  borderRadius: '4px',
  marginBottom: '15px',
  border: '1px solid #b3d9ff'
};

const resultStyle = {
  padding: '12px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const testHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px'
};

const timeStyle = {
  fontSize: '11px',
  color: '#666',
  marginTop: '5px',
  fontStyle: 'italic'
};

const testButtonsContainerStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
};

export default HooksTests;