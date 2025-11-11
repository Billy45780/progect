import React, { useState } from 'react'
import { updateItem, toggleItemComplete, deleteItem } from '../services/api'

const Item = ({ 
  item, 
  isEditing, 
  onEditStart, 
  onEditCancel, 
  onItemsChange, 
  onSuccess, 
  onError 
}) => {
  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description
  })
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const handleSave = async () => {
    if (!editData.title.trim()) {
      onError('Название задачи обязательно')
      return
    }

    setLoading(true)
    try {
      const response = await updateItem(item.id, editData)
      
      if (response.success) {
        onSuccess('Задача обновлена!')
        onEditCancel()
        onItemsChange()
      } else {
        throw new Error(response.message || 'Ошибка при обновлении задачи')
      }
    } catch (error) {
      onError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async () => {
    setActionLoading('toggle')
    try {
      const response = await toggleItemComplete(item.id)
      
      if (response.success) {
        onSuccess(`Задача отмечена как ${response.data.completed ? 'выполненная' : 'невыполненная'}!`)
        onItemsChange()
      } else {
        throw new Error(response.message || 'Ошибка при обновлении статуса')
      }
    } catch (error) {
      onError(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить эту задачу?')) {
      return
    }

    setActionLoading('delete')
    try {
      const response = await deleteItem(item.id)
      
      if (response.success) {
        onSuccess('Задача удалена!')
        onItemsChange()
      } else {
        throw new Error(response.message || 'Ошибка при удалении задачи')
      }
    } catch (error) {
      onError(error.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: item.title,
      description: item.description
    })
    onEditCancel()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isEditing) {
    return (
      <div className="item-card fade-in" style={{ borderLeftColor: '#4361ee' }}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control"
            value={editData.title}
            onChange={handleChange}
            placeholder="Название задачи"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            className="form-control form-textarea"
            value={editData.description}
            onChange={handleChange}
            placeholder="Описание задачи"
            disabled={loading}
            rows="3"
          />
        </div>
        <div className="item-actions">
          <button 
            className="btn btn-success"
            onClick={handleSave}
            disabled={loading || !editData.title.trim()}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button 
            className="btn btn-outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Отмена
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`item-card fade-in ${item.completed ? 'completed' : ''}`}>
      <div className="item-header">
        <h3 className="item-title">{item.title}</h3>
        <span className={`status-badge ${item.completed ? 'status-completed' : 'status-pending'}`}>
          {item.completed ? 'Выполнено' : 'В процессе'}
        </span>
      </div>
      
      {item.description && (
        <p className="item-description">{item.description}</p>
      )}
      
      <div className="item-meta">
        <span className="item-date">
          Создано: {formatDate(item.createdAt)}
        </span>
        <div className="item-actions">
          <button 
            className="btn btn-outline"
            onClick={handleToggleComplete}
            disabled={actionLoading === 'toggle'}
          >
            {actionLoading === 'toggle' ? '...' : (item.completed ? 'Отменить' : 'Выполнить')}
          </button>
          <button 
            className="btn btn-outline"
            onClick={onEditStart}
            disabled={actionLoading}
          >
            Редактировать
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={actionLoading === 'delete'}
          >
            {actionLoading === 'delete' ? '...' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item