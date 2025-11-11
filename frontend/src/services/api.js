const API_BASE_URL = '/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

const apiRequest = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    return await handleResponse(response)
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export const fetchItems = () => apiRequest('/items')

export const fetchItem = (id) => apiRequest(`/items/${id}`)

export const createItem = (itemData) => 
  apiRequest('/items', {
    method: 'POST',
    body: itemData,
  })

export const updateItem = (id, itemData) =>
  apiRequest(`/items/${id}`, {
    method: 'PUT',
    body: itemData,
  })

export const toggleItemComplete = (id) =>
  apiRequest(`/items/${id}/toggle`, {
    method: 'PATCH',
  })

export const deleteItem = (id) =>
  apiRequest(`/items/${id}`, {
    method: 'DELETE',
  })

export const healthCheck = () => apiRequest('/health')