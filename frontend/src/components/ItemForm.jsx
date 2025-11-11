import React, { useState } from 'react'
import { createItem } from '../services/api'

const ItemForm = ({ onItemCreated, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      onError('Название задачи обязательно')
      return
    }

    setLoading(true)
    try {
      const response = await createItem(formData)
      
      if (response.success) {
        setFormData({ title: '', description: '' })
        onSuccess('Задача успешно создана!')
        onItemCreated()
      } else {
        throw new Error(response.message || 'Ошибка при создании задачи')
      }
    } catch (error) {
      onError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Название задачи *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите название задачи..."
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Добавьте описание задачи..."
            disabled={loading}
            rows="4"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !formData.title.trim()}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
              Создание...
            </>
          ) : (
            'Создать задачу'
          )}
        </button>
      </form>
    </div>
  )
}

export default ItemForm