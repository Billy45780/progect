import React, { useState, useEffect } from 'react'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import Stats from './components/Stats'
import { fetchItems } from './services/api'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchItems()
      if (response.success) {
        setItems(response.data)
      } else {
        throw new Error(response.message || 'Failed to load items')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error loading items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const clearMessage = () => {
    setError(null)
    setSuccess(null)
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessage, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <p>Интеграция React фронтенда с Express бэкендом</p>
        </header>

        {error && (
          <div className="error-message fade-in">
            <strong>Ошибка:</strong> {error}
          </div>
        )}

        {success && (
          <div className="success-message fade-in">
            <strong>Успех:</strong> {success}
          </div>
        )}

        <Stats items={items} />

        <div className="main-content">
          <div className="card">
            <ItemForm 
              onItemCreated={loadItems}
              onSuccess={setSuccess}
              onError={setError}
            />
          </div>

          <div className="card">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <ItemList 
                items={items}
                onItemsChange={loadItems}
                onSuccess={setSuccess}
                onError={setError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App