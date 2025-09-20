import { useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'
import { gsap } from 'gsap'

const AdminGameList = ({ games, onEditGame }) => {
  const { deleteGame } = useGame()
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return

    // Stagger animation for game items
    const items = listRef.current.querySelectorAll('.game-item')
    
    gsap.fromTo(items, 
      { 
        y: 20, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1
      }
    )
  }, [games])

  const handleDelete = (gameId, gameTitle) => {
    if (window.confirm(`Are you sure you want to delete "${gameTitle}"? This action cannot be undone.`)) {
      deleteGame(gameId)
    }
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Games Found</h3>
        <p className="text-gray-600">
          {games.length === 0 ? 'Start by adding your first game!' : 'Try adjusting your search filters.'}
        </p>
      </div>
    )
  }

  return (
    <div ref={listRef} className="space-y-4">
      {games.map((game) => (
        <div 
          key={game.id} 
          className="game-item bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Game Image */}
              <div className="flex-shrink-0">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Game Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {game.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        {game.category}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {game.duration}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {game.players}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <div className="text-2xl font-bold text-primary-600">
                      ${game.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEditGame(game)}
                  className="btn-secondary flex items-center gap-1 text-sm"
                  aria-label={`Edit ${game.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(game.id, game.title)}
                  className="btn-danger flex items-center gap-1 text-sm"
                  aria-label={`Delete ${game.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminGameList
