import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

const PARTICLE_COUNT = 75;
const GRAVITY = 0.5;
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8C471",
  "#82E0AA",
  "#F1948A",
  "#85C1E9",
  "#D7BDE2",
];

const SHAPES = ["circle", "square", "triangle", "star"];

function App() {
  const [particles, setParticles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const animationRef = useRef();
  const containerRef = useRef();

  // TODO: Implement createParticle function
  const createParticle = useCallback((x, y) => {
    // TODO: Generate random particle properties
    // - Random angle and velocity for initial burst
    // - Random color from COLORS array
    // - Random shape from SHAPES array
    // - Random size between 4-10px
    // - Random rotation speed
    // - Initial life value of 1.0
    // - Random decay rate for fade effect
  }, []);

  // TODO: Implement updateParticles function
  const updateParticles = useCallback(() => {
    // TODO: Update particle physics
    // - Apply gravity to vy
    // - Update position based on velocity
    // - Apply air resistance to velocity
    // - Update rotation
    // - Decrease life by decay rate
    // - Filter out particles that are off-screen or have no life
  }, []);

  // TODO: Implement animation loop with useEffect
  useEffect(() => {
    // TODO: Use requestAnimationFrame for smooth animation
    // - Only run when isAnimating is true
    // - Call updateParticles in animation loop
    // - Clean up animation frame on unmount
  }, []);

  // TODO: Update particle count and stop animation when no particles
  useEffect(() => {
    // TODO: Update particleCount state
    // TODO: Stop animation when particles array is empty
  }, []);

  // TODO: Implement handleCelebrate function
  const handleCelebrate = useCallback(() => {
    // TODO: Prevent multiple celebrations
    // TODO: Get container dimensions
    // TODO: Create burst of particles from center
    // TODO: Set particles and start animation
  }, []);

  // TODO: Implement handleReset function
  const handleReset = useCallback(() => {
    // TODO: Clear all particles
    // TODO: Stop animation
  }, []);

  // TODO: Implement renderParticle function
  const renderParticle = (particle) => {
    // TODO: Create particle style object with:
    // - Absolute positioning
    // - Color and opacity
    // - Size and rotation
    // - Shape-specific styling (border-radius, clip-path)
    // TODO: Return JSX div with particle styling
  };

  return (
    <div className="confetti-container" role="main">
      <h1>Confetti Burst Celebration</h1>

      <div className="controls">
        <button
          onClick={handleCelebrate}
          disabled={isAnimating}
          className="celebrate-button"
          aria-label="Trigger confetti burst"
        >
          🎉 Celebrate!
        </button>

        <button
          onClick={handleReset}
          className="reset-button"
          aria-label="Reset confetti"
        >
          Reset
        </button>
      </div>

      <div className="particle-info">
        <p>Particles: {particleCount}</p>
        <p className="instruction">
          Click the celebrate button to see the confetti burst animation!
        </p>
      </div>

      <div
        ref={containerRef}
        className="confetti-canvas"
        data-testid="confetti-container"
      >
        {particles.map(renderParticle)}
      </div>
    </div>
  );
}

export default App;
