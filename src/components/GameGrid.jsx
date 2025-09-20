import { useEffect, useRef } from 'react'
import GameCard from './GameCard'
import { gsap } from 'gsap'

const GameGrid = ({ games, onGameClick }) => {
  const gridRef = useRef(null)

  useEffect(() => {
    if (!gridRef.current) return

    // Stagger animation for game cards
    const cards = gridRef.current.querySelectorAll('.game-card')
    
    gsap.fromTo(cards, 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.2
      }
    )
  }, [games])

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Games Available</h3>
        <p className="text-gray-600">Check back later for new gaming experiences!</p>
      </div>
    )
  }

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="grid"
      aria-label="Games collection"
    >
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onClick={() => onGameClick(game)}
        />
      ))}
    </div>
  )
}

export default GameGrid
