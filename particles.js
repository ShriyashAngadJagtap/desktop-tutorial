// Particles background for hero section
class Particles {
  constructor(options) {
    this.options = {
      selector: '.particles-canvas',
      maxParticles: 100,
      speed: 1,
      color: '#3B82F6',
      size: 3,
      connectParticles: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 50
          }
        },
        {
          breakpoint: 425,
          options: {
            maxParticles: 25
          }
        }
      ],
      ...options
    };
// main part particles related
    this.canvas = document.querySelector(this.options.selector);
    this.ctx = this.canvas?.getContext('2d');
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.isDarkMode = document.body.classList.contains('dark');
    this.responsiveMaxParticles = this.options.maxParticles;

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    // Resize handler
    window.addEventListener('resize', () => this.resize());
    
    // Initialize canvas
    this.resize();
    
    // Create particles
    this.createParticles();
    
    // Start animation
    this.animate();
    
    // Update particles color on theme change
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTimeout(() => {
        this.isDarkMode = document.body.classList.contains('dark');
      }, 50);
    });
  }

  resize() {
    // Set canvas size to match parent
    if (this.canvas) {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Update responsive settings
      if (this.options.responsive) {
        this.responsiveMaxParticles = this.options.maxParticles;
        
        for (const item of this.options.responsive) {
          if (window.innerWidth <= item.breakpoint) {
            if (item.options.maxParticles !== undefined) {
              this.responsiveMaxParticles = item.options.maxParticles;
            }
            break;
          }
        }
        
        // Recreate particles if needed
        if (this.particles.length > this.responsiveMaxParticles) {
          this.particles = this.particles.slice(0, this.responsiveMaxParticles);
        } else if (this.particles.length < this.responsiveMaxParticles) {
          this.createParticles();
        }
      }
    }
  }

  createParticles() {
    if (!this.canvas) return;
    
    // Add particles until we reach max
    const particlesToAdd = this.responsiveMaxParticles - this.particles.length;
    
    for (let i = 0; i < particlesToAdd; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * (this.options.size - 1) + 1,
        color: this.options.color
      });
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.isDarkMode ? '#60A5FA' : '#3B82F6';
      this.ctx.fill();

      // Connect particles if enabled
      if (this.options.connectParticles) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const distance = Math.sqrt(
            Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
          );

          if (distance < 120) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.isDarkMode 
              ? `rgba(96, 165, 250, ${1 - distance / 120})` 
              : `rgba(59, 130, 246, ${1 - distance / 120})`;
            this.ctx.lineWidth = 0.7;
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new Particles({
    selector: '#particles-canvas',
    maxParticles: 80,
    connectParticles: true,
    speed: 0.5,
    color: '#3B82F6',
    size: 2
  });
});
