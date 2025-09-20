import { useState, useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'
import { gsap } from 'gsap'

const AdminGameForm = ({ game, onClose, onSubmit }) => {
  const { addGame, updateGame } = useGame()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    category: '',
    duration: '60 minutes',
    difficulty: 'Medium',
    players: '1-4'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const isEditing = !!game

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || '',
        description: game.description || '',
        image: game.image || '',
        price: game.price?.toString() || '',
        category: game.category || '',
        duration: game.duration || '60 minutes',
        difficulty: game.difficulty || 'Medium',
        players: game.players || '1-4'
      })
    }
  }, [game])

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return

    // Modal entrance animation
    const tl = gsap.timeline()
    
    tl.fromTo(overlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    .fromTo(contentRef.current, 
      { 
        scale: 0.9, 
        opacity: 0,
        y: 50
      },
      { 
        scale: 1, 
        opacity: 1,
        y: 0,
        duration: 0.4, 
        ease: 'back.out(1.7)' 
      },
      '-=0.1'
    )

    // Focus first input
    const firstInput = contentRef.current?.querySelector('input')
    if (firstInput) {
      firstInput.focus()
    }

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL'
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const gameData = {
        ...formData,
        price: parseFloat(formData.price)
      }

      if (isEditing) {
        updateGame(game.id, gameData)
      } else {
        addGame(gameData)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSubmit()
    } catch (error) {
      console.error('Error saving game:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      onComplete: onClose
    })
    
    tl.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1')
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  return (
    <div 
      ref={modalRef}
      className="modal-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-form-title"
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      
      <div 
        ref={contentRef}
        className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 id="game-form-title" className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Game' : 'Add New Game'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Game Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter game title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select category</option>
                  <option value="Racing">Racing</option>
                  <option value="VR Adventure">VR Adventure</option>
                  <option value="FPS">FPS</option>
                  <option value="RPG">RPG</option>
                  <option value="Rhythm">Rhythm</option>
                  <option value="Battle Royale">Battle Royale</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Sports">Sports</option>
                  <option value="Horror">Horror</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`input-field ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`input-field ${errors.image ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                  <option value="90 minutes">90 minutes</option>
                  <option value="120 minutes">120 minutes</option>
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label htmlFor="players" className="block text-sm font-medium text-gray-700 mb-1">
                  Players
                </label>
                <select
                  id="players"
                  name="players"
                  value={formData.players}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="1">1 Player</option>
                  <option value="1-2">1-2 Players</option>
                  <option value="1-4">1-4 Players</option>
                  <option value="1-6">1-6 Players</option>
                  <option value="1-8">1-8 Players</option>
                  <option value="100">100 Players (Battle Royale)</option>
                </select>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </label>
                  <div className="border border-gray-300 rounded-lg p-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter game description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {isEditing ? 'Update Game' : 'Add Game'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminGameForm
