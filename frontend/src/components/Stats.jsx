import React from 'react'

const Stats = ({ items }) => {
  const totalItems = items.length
  const completedItems = items.filter(item => item.completed).length
  const pendingItems = totalItems - completedItems
  const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="stats fade-in">
      <div className="stat-card">
        <span className="stat-number">{totalItems}</span>
        <span className="stat-label">Всего задач</span>
      </div>
      <div className="stat-card">
        <span className="stat-number" style={{ color: '#4cc9f0' }}>{completedItems}</span>
        <span className="stat-label">Выполнено</span>
      </div>
      <div className="stat-card">
        <span className="stat-number" style={{ color: '#f8961e' }}>{pendingItems}</span>
        <span className="stat-label">В процессе</span>
      </div>
    </div>
  )
}

export default Stats