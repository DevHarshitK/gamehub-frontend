# 🎮 Mall Gaming Hub - Frontend

A modern, responsive React application for a Mall Gaming Hub featuring an immersive user experience and comprehensive admin panel.

## ✨ Features

### User Experience
- **Hero Banner**: Animated landing section with GSAP animations
- **Game Grid**: Responsive grid layout with hover effects
- **Game Cards**: Interactive cards with smooth animations
- **Booking Modal**: Complete booking system with form validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Panel
- **CRUD Operations**: Add, edit, and delete games
- **Data Persistence**: LocalStorage integration
- **Search & Filter**: Find games by title, description, or category
- **Slide-in Animations**: GSAP-powered form animations
- **Form Validation**: Comprehensive input validation

### Technical Features
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **GSAP** for animations
- **Context API** for state management
- **Accessibility** features (ARIA labels, keyboard navigation)
- **Lazy Loading** for images
- **Motion Preferences** respect (prefers-reduced-motion)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Java 11+ (for Spring Boot backend)
- MongoDB (or MongoDB Atlas)

### Backend Setup (Spring Boot)

1. **Navigate to backend directory**:
   ```bash
   cd ../gaming
   ```

2. **Start the Spring Boot application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd gaming_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Backend Connection

The frontend automatically connects to the backend at `http://localhost:8080`. If the backend is not available, it falls back to localStorage mode.

**To seed the backend with sample data:**
1. Start both backend and frontend
2. Go to Admin Panel
3. Click "Seed Sample Data" button (appears when backend is connected but no games exist)

## 📁 Project Structure

```
gaming_frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminGameForm.jsx      # Game form modal
│   │   ├── AdminGameList.jsx      # Games list for admin
│   │   ├── GameCard.jsx           # Individual game card
│   │   ├── GameGrid.jsx           # Games grid layout
│   │   ├── GameModal.jsx          # Booking modal
│   │   ├── HeroBanner.jsx         # Landing hero section
│   │   └── Navbar.jsx             # Navigation component
│   ├── context/
│   │   └── GameContext.jsx        # Global state management
│   ├── data/
│   │   └── games.json             # Sample game data
│   ├── pages/
│   │   ├── AdminPage.jsx          # Admin panel page
│   │   └── HomePage.jsx           # Main user page
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Usage

### User Mode
1. **Browse Games**: View the collection of available games
2. **Game Details**: Click on any game card to view details
3. **Book a Game**: Fill out the booking form with your details
4. **Confirmation**: Receive booking confirmation with ID

### Admin Mode
1. **Toggle Admin**: Click "Admin Mode" in the navbar
2. **Add Games**: Click "Add New Game" to create new entries
3. **Edit Games**: Click "Edit" on any game in the list
4. **Delete Games**: Click "Delete" to remove games
5. **Search & Filter**: Use search bar and category filter

## 🎨 Customization

### Adding New Game Categories
Edit the category options in `AdminGameForm.jsx`:
```jsx
<option value="New Category">New Category</option>
```

### Modifying Animations
GSAP animations can be customized in individual components:
```jsx
gsap.fromTo(element, 
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
)
```

### Styling
Tailwind classes can be modified in `tailwind.config.js` or directly in components.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG compliant color schemes

## 🎮 Sample Games

The app comes with 10 sample games including:
- Cyber Racing Pro (Racing)
- Space Odyssey VR (VR Adventure)
- Zombie Apocalypse (FPS)
- Fantasy Quest (RPG)
- Neon Beat Dance (Rhythm)
- Battle Royale Arena (Battle Royale)
- Puzzle Mastermind (Puzzle)
- Sports Championship (Sports)
- Horror Mansion (Horror)
- Rocket League Extreme (Sports)

## 🚀 Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Animation library
- **Context API** - State management
- **LocalStorage** - Data persistence

## 📸 Mock Screenshots

### Home Page
- **Hero Section**: Gradient background with animated text and floating particles
- **Games Grid**: 4-column responsive grid with hover effects
- **Game Cards**: Image, title, description, price, and category badges

### Admin Panel
- **Header**: Statistics cards showing total games, categories, and average price
- **Filters**: Search bar and category dropdown
- **Games List**: Detailed list with edit/delete actions
- **Form Modal**: Slide-in form for adding/editing games

### Booking Modal
- **Game Details**: Large image, description, and game info
- **Booking Form**: Name, email, phone, date, time, and player count
- **Confirmation**: Success message with booking ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Gaming! 🎮**
