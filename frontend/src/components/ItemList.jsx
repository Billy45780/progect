import React, { useState } from 'react'
import Item from './Item'

const ItemList = ({ items, onItemsChange, onSuccess, onError }) => {
  const [editingId, setEditingId] = useState(null)

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3>Задачи отсутствуют</h3>
        <p>Создайте первую задачу, используя форму слева</p>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
        Список задач ({items.length})
      </h2>
      <div className="item-list">
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            isEditing={editingId === item.id}
            onEditStart={() => setEditingId(item.id)}
            onEditCancel={() => setEditingId(null)}
            onItemsChange={onItemsChange}
            onSuccess={onSuccess}
            onError={onError}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemList