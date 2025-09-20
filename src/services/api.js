const API_BASE_URL = 'http://localhost:8080/api/games'

class GameAPI {
  async getAllGames() {
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching games:', error)
      throw error
    }
  }

  async getGameById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching game:', error)
      throw error
    }
  }

  async createGame(game) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: game.title,
          price: game.price,
          description: game.description,
          image: game.image,
          category: game.category,
          duration: game.duration,
          difficulty: game.difficulty,
          players: game.players
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const createdGame = await response.json()
      // Transform backend response to frontend format
      return {
        id: createdGame.id,
        title: createdGame.name,
        price: createdGame.price,
        description: createdGame.description,
        image: createdGame.image,
        category: createdGame.category,
        duration: createdGame.duration,
        difficulty: createdGame.difficulty,
        players: createdGame.players
      }
    } catch (error) {
      console.error('Error creating game:', error)
      throw error
    }
  }

  async updateGame(id, game) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: game.title,
          price: game.price,
          description: game.description,
          image: game.image,
          category: game.category,
          duration: game.duration,
          difficulty: game.difficulty,
          players: game.players
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const updatedGame = await response.json()
      // Transform backend response to frontend format
      return {
        id: updatedGame.id,
        title: updatedGame.name,
        price: updatedGame.price,
        description: updatedGame.description,
        image: updatedGame.image,
        category: updatedGame.category,
        duration: updatedGame.duration,
        difficulty: updatedGame.difficulty,
        players: updatedGame.players
      }
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  async deleteGame(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting game:', error)
      throw error
    }
  }
}

export default new GameAPI()
