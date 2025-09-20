// Utility script to seed the backend with sample data
import gameAPI from '../services/api'
import gamesData from '../data/games.json'

export const seedBackend = async () => {
  console.log('🌱 Seeding backend with sample data...')
  
  try {
    // Transform frontend data format to backend format
    const backendGames = gamesData.map(game => ({
      name: game.title,
      price: game.price,
      description: game.description,
      image: game.image,
      category: game.category,
      duration: game.duration,
      difficulty: game.difficulty,
      players: game.players
    }))

    // Add each game to the backend
    for (const game of backendGames) {
      try {
        await gameAPI.createGame(game)
        console.log(`✅ Added: ${game.name}`)
      } catch (error) {
        console.log(`⚠️  Failed to add ${game.name}:`, error.message)
      }
    }
    
    console.log('🎉 Backend seeding completed!')
  } catch (error) {
    console.error('❌ Error seeding backend:', error)
  }
}

// Run seeding if this file is executed directly
if (typeof window !== 'undefined') {
  // Make it available globally for testing
  window.seedBackend = seedBackend
}
