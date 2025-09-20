import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const HeroBanner = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const particles = particlesRef.current

    // Create floating particles
    const createParticles = () => {
      if (!particles) return
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-white rounded-full opacity-30'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 3 + 's'
        particles.appendChild(particle)
      }
    }

    createParticles()

    // GSAP animations
    const tl = gsap.timeline()

    // Animate particles
    gsap.fromTo('.particle', 
      { 
        y: 0, 
        opacity: 0,
        scale: 0
      },
      { 
        y: -100, 
        opacity: 0.3,
        scale: 1,
        duration: 3,
        repeat: -1,
        ease: 'none',
        stagger: 0.1
      }
    )

    // Main content animation
    tl.fromTo(title, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subtitle, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(cta, 
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    )

    // Floating animation for CTA
    gsap.to(cta, {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })

  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        <style jsx>{`
          .particle {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-white">Welcome to</span>
          <span className="block bg-gradient-to-r from-primary-400 to-gaming-400 bg-clip-text text-transparent">
            Gaming Hub
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the ultimate gaming destination with cutting-edge technology, 
          immersive environments, and unforgettable adventures.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            className="bg-gradient-to-r from-primary-600 to-gaming-600 hover:from-primary-700 hover:to-gaming-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            onClick={() => document.querySelector('.games-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Explore our games collection"
          >
            🎮 Explore Games
          </button>
          
          <button 
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => document.querySelector('.games-section')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Learn more about our gaming hub"
          >
            📖 Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-gray-300">Premium Games</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Gaming Access</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">VR</div>
            <div className="text-gray-300">Ready</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
