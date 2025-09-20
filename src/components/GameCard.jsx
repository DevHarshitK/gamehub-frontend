import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const GameCard = ({ game, onClick }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current

    if (!card || !image) return

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <article 
      ref={cardRef}
      className="game-card card cursor-pointer group overflow-hidden"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${game.title}`}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          ref={imageRef}
          src={game.image}
          alt={`${game.title} game screenshot`}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white text-sm font-semibold">
              Click to view details
            </div>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${game.price}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-gaming-600 text-white px-2 py-1 rounded text-xs font-medium">
          {game.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {game.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Game Details */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            ⏱️ {game.duration}
          </span>
          <span className="flex items-center">
            👥 {game.players}
          </span>
          <span className="flex items-center">
            🎯 {game.difficulty}
          </span>
        </div>

        {/* Action Button */}
        <button 
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 group-hover:shadow-lg"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          aria-label={`Book ${game.title}`}
        >
          Book Now
        </button>
      </div>
    </article>
  )
}

export default GameCard
