import { useEffect, useRef } from 'react';

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let flowLines: FlowLine[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3 - 0.2;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '45, 212, 191' : '167, 139, 250';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) {
          this.y = canvas!.height;
          this.alpha = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    class FlowLine {
      points: { x: number; y: number }[];
      progress: number;
      speed: number;
      width: number;
      alpha: number;

      constructor() {
        this.points = [];
        this.progress = 0;
        this.speed = 0.002 + Math.random() * 0.003;
        this.width = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.generatePath();
      }

      generatePath() {
        const startX = Math.random() * canvas!.width * 0.3;
        const startY = canvas!.height * 0.3 + Math.random() * canvas!.height * 0.4;
        const endX = canvas!.width * 0.7 + Math.random() * canvas!.width * 0.3;
        const endY = canvas!.height * 0.2 + Math.random() * canvas!.height * 0.3;

        const controlX1 = startX + (endX - startX) * 0.3 + (Math.random() - 0.5) * 200;
        const controlY1 = startY - 100 - Math.random() * 150;
        const controlX2 = startX + (endX - startX) * 0.7 + (Math.random() - 0.5) * 200;
        const controlY2 = endY + 50 + Math.random() * 100;

        for (let t = 0; t <= 1; t += 0.01) {
          const x = Math.pow(1 - t, 3) * startX +
                    3 * Math.pow(1 - t, 2) * t * controlX1 +
                    3 * (1 - t) * Math.pow(t, 2) * controlX2 +
                    Math.pow(t, 3) * endX;
          const y = Math.pow(1 - t, 3) * startY +
                    3 * Math.pow(1 - t, 2) * t * controlY1 +
                    3 * (1 - t) * Math.pow(t, 2) * controlY2 +
                    Math.pow(t, 3) * endY;
          this.points.push({ x, y });
        }
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.progress = 0;
          this.points = [];
          this.generatePath();
        }
      }

      draw() {
        if (!ctx || this.points.length < 2) return;

        const visibleLength = 30;
        const startIndex = Math.floor(this.progress * (this.points.length - visibleLength));
        const endIndex = Math.min(startIndex + visibleLength, this.points.length - 1);

        if (startIndex >= this.points.length - 1) return;

        ctx.beginPath();
        ctx.moveTo(this.points[startIndex].x, this.points[startIndex].y);

        for (let i = startIndex + 1; i <= endIndex; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        const gradient = ctx.createLinearGradient(
          this.points[startIndex].x,
          this.points[startIndex].y,
          this.points[endIndex].x,
          this.points[endIndex].y
        );
        gradient.addColorStop(0, `rgba(45, 212, 191, 0)`);
        gradient.addColorStop(0.5, `rgba(45, 212, 191, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(167, 139, 250, ${this.alpha * 0.5})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    // Initialize
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
    for (let i = 0; i < 5; i++) {
      flowLines.push(new FlowLine());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient orbs
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(45, 212, 191, 0.08)');
      gradient1.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.6,
        0,
        canvas.width * 0.8,
        canvas.height * 0.6,
        canvas.width * 0.35
      );
      gradient2.addColorStop(0, 'rgba(167, 139, 250, 0.06)');
      gradient2.addColorStop(1, 'rgba(167, 139, 250, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw flow lines
      flowLines.forEach(line => {
        line.update();
        line.draw();
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}
