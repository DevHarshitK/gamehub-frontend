import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import HeroBanner from '../components/HeroBanner'
import GameGrid from '../components/GameGrid'
import GameModal from '../components/GameModal'
import { gsap } from 'gsap'

const HomePage = () => {
  const { games, loading } = useGame()
  const [selectedGame, setSelectedGame] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Page load animation
    const tl = gsap.timeline()
    
    tl.fromTo('.hero-section', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.games-section', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
  }, [])

  const handleGameClick = (game) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGame(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative bg-gradient-to-br from-primary-900 via-primary-800 to-gaming-900 text-white overflow-hidden">
        <HeroBanner />
      </section>

      {/* Games Section */}
      <section className="games-section py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immerse yourself in our collection of premium gaming experiences. 
              From heart-pounding action to mind-bending puzzles, we have something for every gamer.
            </p>
          </div>

          <GameGrid 
            games={games} 
            onGameClick={handleGameClick}
          />
        </div>
      </section>

      {/* Game Modal */}
      {isModalOpen && selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default HomePage
