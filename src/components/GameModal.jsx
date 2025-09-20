import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const GameModal = ({ game, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: game.duration || '60 minutes',
    players: 1
  })
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

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
        scale: 0.8, 
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

    // Focus management
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

  const handleClose = () => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      onComplete: onClose
    })
    
    tl.to(contentRef.current, {
      scale: 0.8,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setIsBooking(true)

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsBooking(false)
    setBookingSuccess(true)

    // Auto close after success
    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (bookingSuccess) {
    return (
      <div 
        ref={modalRef}
        className="modal-overlay" 
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-success-title"
      >
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-black bg-opacity-50"
        ></div>
        <div 
          ref={contentRef}
          className="modal-content text-center p-8"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 id="booking-success-title" className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking for <strong>{game.title}</strong> has been confirmed. 
            You'll receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Booking ID:</strong> {Date.now().toString().slice(-8)}
            </p>
            <p className="text-sm text-green-800">
              <strong>Total:</strong> ${game.price}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={modalRef}
      className="modal-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      
      <div 
        ref={contentRef}
        className="modal-content max-w-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 id="game-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
              {game.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                🏷️ {game.category}
              </span>
              <span className="flex items-center gap-1">
                ⏱️ {game.duration}
              </span>
              <span className="flex items-center gap-1">
                👥 {game.players}
              </span>
              <span className="flex items-center gap-1">
                🎯 {game.difficulty}
              </span>
            </div>
          </div>
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

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Game Image */}
            <div className="space-y-4">
              <img
                src={game.image}
                alt={`${game.title} game screenshot`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h3 className="font-semibold text-primary-900 mb-2">Game Description</h3>
                <p className="text-primary-800 text-sm leading-relaxed">
                  {game.description}
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <div className="bg-gaming-50 border border-gaming-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gaming-900 font-semibold">Price</span>
                  <span className="text-2xl font-bold text-gaming-600">${game.price}</span>
                </div>
                <p className="text-gaming-800 text-sm">
                  Per session • {game.duration}
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="players" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Players
                  </label>
                  <select
                    id="players"
                    name="players"
                    value={bookingData.players}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} Player{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isBooking}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        🎮 Book Now - ${game.price}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameModal
