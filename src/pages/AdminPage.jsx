import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import AdminGameForm from '../components/AdminGameForm'
import AdminGameList from '../components/AdminGameList'
import { seedBackend } from '../utils/seedBackend'
import { gsap } from 'gsap'

const AdminPage = () => {
  const { games, loading, error, useBackend, retryConnection } = useGame()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGame, setEditingGame] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    // Page load animation
    gsap.fromTo('.admin-header', 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
    
    gsap.fromTo('.admin-content', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    )
  }, [])

  const handleAddGame = () => {
    setEditingGame(null)
    setIsFormOpen(true)
  }

  const handleEditGame = (game) => {
    setEditingGame(game)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingGame(null)
  }

  const handleFormSubmit = () => {
    setIsFormOpen(false)
    setEditingGame(null)
  }

  const handleSeedBackend = async () => {
    if (window.confirm('This will add sample games to your backend. Continue?')) {
      await seedBackend()
      // Reload games after seeding
      window.location.reload()
    }
  }

  // Filter games based on search and category
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || game.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = ['all', ...new Set(games.map(game => game.category))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-header bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="mt-2 text-gray-600">
                Manage your gaming hub's game collection
              </p>
              
              {/* Connection Status */}
              <div className="mt-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${useBackend ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {useBackend ? 'Connected to Backend' : 'Offline Mode'}
                </span>
                {!useBackend && (
                  <button
                    onClick={retryConnection}
                    className="text-sm text-primary-600 hover:text-primary-700 underline"
                  >
                    Retry Connection
                  </button>
                )}
              </div>
              
              {error && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  {error}
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              {useBackend && games.length === 0 && (
                <button
                  onClick={handleSeedBackend}
                  className="btn-secondary flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Seed Sample Data
                </button>
              )}
              <button
                onClick={handleAddGame}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Game
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Games</p>
                <p className="text-2xl font-bold text-gray-900">{games.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gaming-100 rounded-lg">
                <svg className="w-6 h-6 text-gaming-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(games.map(game => game.category)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(games.reduce((sum, game) => sum + game.price, 0) / games.length).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Games
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="input-field"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Games List */}
        <AdminGameList 
          games={filteredGames}
          onEditGame={handleEditGame}
        />

        {/* Add/Edit Game Form Modal */}
        {isFormOpen && (
          <AdminGameForm
            game={editingGame}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default AdminPage
