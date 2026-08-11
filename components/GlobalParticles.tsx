"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  baseOpacity: number;
  pulseOffset: number;
};

type PointerPosition = {
  x: number;
  y: number;
  active: boolean;
};

export default function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const pointer: PointerPosition = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = () => window.innerWidth < 768;

    const createParticles = () => {
      const screenArea = width * height;

      const calculatedCount = Math.floor(
        screenArea / (isMobile() ? 13000 : 9000),
      );

      const particleCount = isMobile()
        ? Math.min(75, Math.max(45, calculatedCount))
        : Math.min(170, Math.max(95, calculatedCount));

      particles = Array.from(
        {
          length: particleCount,
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,

          radius: Math.random() * 1.45 + 0.4,

          velocityX: (Math.random() - 0.5) * 0.22,
          velocityY: (Math.random() - 0.5) * 0.22,

          baseOpacity: Math.random() * 0.5 + 0.3,
          pulseOffset: Math.random() * Math.PI * 2,
        }),
      );
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      );

      createParticles();
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const updateParticle = (
      particle: Particle,
    ) => {
      if (!reducedMotion) {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
      }

      if (particle.x < -12) {
        particle.x = width + 12;
      } else if (particle.x > width + 12) {
        particle.x = -12;
      }

      if (particle.y < -12) {
        particle.y = height + 12;
      } else if (particle.y > height + 12) {
        particle.y = -12;
      }

      /*
       * Very subtle mouse reaction.
       * It makes the background feel interactive without
       * making the particles jump aggressively.
       */
      if (pointer.active && !reducedMotion) {
        const differenceX = pointer.x - particle.x;
        const differenceY = pointer.y - particle.y;

        const distanceSquared =
          differenceX * differenceX +
          differenceY * differenceY;

        const interactionRadius = 170;
        const interactionRadiusSquared =
          interactionRadius * interactionRadius;

        if (
          distanceSquared <
            interactionRadiusSquared &&
          distanceSquared > 0
        ) {
          const distance = Math.sqrt(
            distanceSquared,
          );

          const influence =
            (1 - distance / interactionRadius) *
            0.015;

          particle.x -=
            (differenceX / distance) * influence;

          particle.y -=
            (differenceY / distance) * influence;
        }
      }
    };

    const drawParticle = (
      particle: Particle,
      time: number,
    ) => {
      const pulse =
        0.72 +
        Math.sin(
          time * 0.00125 +
            particle.pulseOffset,
        ) *
          0.28;

      const currentOpacity =
        particle.baseOpacity * pulse;

      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        particle.radius * pulse,
        0,
        Math.PI * 2,
      );

      context.fillStyle = `rgba(
  103,
  248,
  231,
  ${Math.min(currentOpacity * 1.2, 1)}
)`;

      context.fill();

      /*
       * Small glow around selected particles.
       */
      if (particle.radius > 1.15) {
        context.beginPath();

        context.arc(
          particle.x,
          particle.y,
          particle.radius * 3.2,
          0,
          Math.PI * 2,
        );

        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3.2,
        );

        glow.addColorStop(
          0,
          `rgba(45, 212, 191, ${
            currentOpacity * 0.24
          })`,
        );

        glow.addColorStop(
          1,
          "rgba(45, 212, 191, 0)",
        );

        context.fillStyle = glow;
        context.fill();
      }
    };

    const drawConnections = () => {
      if (isMobile()) {
        return;
      }

      const maximumDistance = 135;
      const maximumDistanceSquared =
        maximumDistance * maximumDistance;

      for (
        let firstIndex = 0;
        firstIndex < particles.length;
        firstIndex += 1
      ) {
        const firstParticle =
          particles[firstIndex];

        for (
          let secondIndex = firstIndex + 1;
          secondIndex < particles.length;
          secondIndex += 1
        ) {
          const secondParticle =
            particles[secondIndex];

          const differenceX =
            firstParticle.x -
            secondParticle.x;

          const differenceY =
            firstParticle.y -
            secondParticle.y;

          const distanceSquared =
            differenceX * differenceX +
            differenceY * differenceY;

          if (
            distanceSquared >
            maximumDistanceSquared
          ) {
            continue;
          }

          const distance = Math.sqrt(
            distanceSquared,
          );

          const opacity =
  (1 - distance / maximumDistance) *
  0.16;

          context.beginPath();

          context.moveTo(
            firstParticle.x,
            firstParticle.y,
          );

          context.lineTo(
            secondParticle.x,
            secondParticle.y,
          );

          context.strokeStyle = `rgba(
            45,
            212,
            191,
            ${opacity}
          )`;

          context.lineWidth = 0.75;
          context.stroke();
        }
      }
    };

    const drawPointerConnections = () => {
      if (
        !pointer.active ||
        isMobile()
      ) {
        return;
      }

      const maximumDistance = 155;
      const maximumDistanceSquared =
        maximumDistance * maximumDistance;

      particles.forEach((particle) => {
        const differenceX =
          pointer.x - particle.x;

        const differenceY =
          pointer.y - particle.y;

        const distanceSquared =
          differenceX * differenceX +
          differenceY * differenceY;

        if (
          distanceSquared >
          maximumDistanceSquared
        ) {
          return;
        }

        const distance = Math.sqrt(
          distanceSquared,
        );

        const opacity =
  (1 - distance / maximumDistance) *
  0.28;

        context.beginPath();

        context.moveTo(
          pointer.x,
          pointer.y,
        );

        context.lineTo(
          particle.x,
          particle.y,
        );

        context.strokeStyle = `rgba(
          94,
          234,
          212,
          ${opacity}
        )`;

        context.lineWidth = 0.9;
        context.stroke();
      });
    };

    const render = (time: number) => {
      context.clearRect(
        0,
        0,
        width,
        height,
      );

      particles.forEach((particle) => {
        updateParticle(particle);
      });

      drawConnections();
      drawPointerConnections();

      particles.forEach((particle) => {
        drawParticle(particle, time);
      });

      if (!reducedMotion) {
        animationFrameId =
          window.requestAnimationFrame(render);
      }
    };

    resizeCanvas();

    if (reducedMotion) {
      render(0);
    } else {
      animationFrameId =
        window.requestAnimationFrame(render);
    }

    window.addEventListener(
      "resize",
      resizeCanvas,
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );

      window.removeEventListener(
        "resize",
        resizeCanvas,
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-particle-canvas"
      aria-hidden="true"
    />
  );
}