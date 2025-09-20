import { createContext, useContext, useState, useEffect } from 'react'
import gamesData from '../data/games.json'
import gameAPI from '../services/api'

const GameContext = createContext()

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useBackend, setUseBackend] = useState(true)

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (useBackend) {
        // Try to load from backend first
        const backendGames = await gameAPI.getAllGames()
        setGames(backendGames)
      } else {
        throw new Error('Backend disabled')
      }
    } catch (error) {
      console.warn('Backend not available, falling back to localStorage:', error)
      
      // Fallback to localStorage or default data
      const savedGames = localStorage.getItem('gaming-hub-games')
      if (savedGames) {
        try {
          setGames(JSON.parse(savedGames))
        } catch (parseError) {
          console.error('Error parsing saved games:', parseError)
          setGames(gamesData)
        }
      } else {
        setGames(gamesData)
      }
      
      setUseBackend(false)
      setError('Backend not available - using offline mode')
    } finally {
      setLoading(false)
    }
  }

  const addGame = async (game) => {
    try {
      if (useBackend) {
        const newGame = await gameAPI.createGame(game)
        setGames(prev => [...prev, newGame])
      } else {
        // Fallback to localStorage
        const newGame = {
          ...game,
          id: Date.now().toString(),
        }
        const updatedGames = [...games, newGame]
        setGames(updatedGames)
        localStorage.setItem('gaming-hub-games', JSON.stringify(updatedGames))
      }
    } catch (error) {
      console.error('Error adding game:', error)
      setError('Failed to add game')
      throw error
    }
  }

  const updateGame = async (id, updatedGame) => {
    try {
      if (useBackend) {
        const game = await gameAPI.updateGame(id, updatedGame)
        setGames(prev => prev.map(g => g.id === id ? game : g))
      } else {
        // Fallback to localStorage
        const updatedGames = games.map(game => 
          game.id === id ? { ...game, ...updatedGame } : game
        )
        setGames(updatedGames)
        localStorage.setItem('gaming-hub-games', JSON.stringify(updatedGames))
      }
    } catch (error) {
      console.error('Error updating game:', error)
      setError('Failed to update game')
      throw error
    }
  }

  const deleteGame = async (id) => {
    try {
      if (useBackend) {
        await gameAPI.deleteGame(id)
        setGames(prev => prev.filter(game => game.id !== id))
      } else {
        // Fallback to localStorage
        const updatedGames = games.filter(game => game.id !== id)
        setGames(updatedGames)
        localStorage.setItem('gaming-hub-games', JSON.stringify(updatedGames))
      }
    } catch (error) {
      console.error('Error deleting game:', error)
      setError('Failed to delete game')
      throw error
    }
  }

  const getGameById = (id) => {
    return games.find(game => game.id === id)
  }

  const retryConnection = () => {
    setUseBackend(true)
    loadGames()
  }

  const value = {
    games,
    loading,
    error,
    useBackend,
    addGame,
    updateGame,
    deleteGame,
    getGameById,
    retryConnection,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
