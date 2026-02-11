# Narcissistic CAPTCHA

A psychological horror-comedy "Reverse Turing Test" where an elitist AI gaslights users into believing they're robots.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
narcissistic-captcha/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx    # Main interrogation chat UI
│   │   └── TypingIndicator.jsx  # Bouncing dots animation
│   ├── App.jsx                  # Main app component with state management
│   ├── App.css                  # Global styles
│   └── main.jsx                 # Entry point
├── public/
│   └── google-bg.png           # TODO: Add Google search background
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎭 Current Features

### ✅ Implemented
- **Honeypot UI**: Initial "Are you a robot?" popup with YES/NO buttons
- **Expansion Animation**: Smooth morph from honeypot to chat interface
- **4-Stage Interrogation**: 
  - Stage 1: The 10-Word Trap
  - Stage 2: The Sensory Trap (smell of rain)
  - Stage 3: The Empathy Trap (crying toaster)
  - Stage 4: The Paradox Trap (liar's paradox)
- **Typing Indicators**: Bouncing dots with staggered animation
- **Message System**: Chat-style interface with timestamps
- **Session Tracking**: Random session IDs and stage counter
- **Surrender Path**: Clicking "YES" shows VHS static/"Unit 01" message

### 🚧 TODO (Next Iterations)

1. **Audio Effects**
   - Add keyboard "thock" sound on keypress
   - AI message notification ping
   - Final rejection "THUD" sound

2. **Rejection Screen**
   - Animated red "REJECTED" stamp
   - Scale-in animation with sound
   - Lock input field

3. **Advanced Analytics**
   - Track typing latency
   - Detect typo patterns
   - Response time analysis
   - Word count validation

4. **Visual Polish**
   - Add Google search background image
   - Improve gradient animations
   - Add micro-interactions

5. **More Roast Variations**
   - Randomize AI responses
   - Add more question variations
   - Implement wildcard questions

## 🎨 Design Philosophy

- **Psychological Warfare**: The AI is condescending, paranoid, and contradictory
- **No Way to Win**: Every answer is twisted against the user
- **Engagement Through Frustration**: Make it infuriating but funny enough to share
- **Technical Intimidation**: Use jargon like "tokens," "latency," "neural weights"

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📝 Notes

- File structure follows the technical spec from the master doc
- All animations use Framer Motion for smooth 60fps performance
- Tailwind provides utility-first styling for rapid iteration
- Components are modular for easy expansion

## 🎯 Next Steps

1. Add audio files to `/public/sounds/`
2. Create rejection screen component
3. Implement typing latency tracking
4. Add more AI response variations
5. Polish transitions and micro-interactions
