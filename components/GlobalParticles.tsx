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
  impactStrength: number;
};

type Signal = {
  sourceIndex: number;
  targetIndex: number;
  progress: number;
  speed: number;
  state: "waiting" | "travelling" | "impact";
  waitTime: number;
  impactTime: number;
  impactDuration: number;
  trailLength: number;
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
    let signals: Signal[] = [];

    let previousTime = performance.now();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = () => window.innerWidth < 768;

    /*
     * =========================================================
     * POINTER
     * =========================================================
     */

    const pointer: PointerPosition = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    /*
     * =========================================================
     * NETWORK SETTINGS
     * =========================================================
     */

    const CONNECTION_DISTANCE = 145;

    const CONNECTION_DISTANCE_SQUARED =
      CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    const POINTER_DISTANCE = 185;

    const POINTER_DISTANCE_SQUARED =
      POINTER_DISTANCE * POINTER_DISTANCE;

    /*
     * =========================================================
     * DISTANCE HELPER
     * =========================================================
     */

    const getDistanceSquared = (
      firstX: number,
      firstY: number,
      secondX: number,
      secondY: number
    ) => {
      const differenceX = firstX - secondX;
      const differenceY = firstY - secondY;

      return (
        differenceX * differenceX +
        differenceY * differenceY
      );
    };

    /*
     * =========================================================
     * FIND CONNECTED PARTICLES
     * =========================================================
     */

    const getConnectedIndices = (
      particleIndex: number
    ) => {
      const source = particles[particleIndex];

      const connected: number[] = [];

      particles.forEach((candidate, index) => {
        if (index === particleIndex) {
          return;
        }

        const distanceSquared =
          getDistanceSquared(
            source.x,
            source.y,
            candidate.x,
            candidate.y
          );

        if (
          distanceSquared <=
          CONNECTION_DISTANCE_SQUARED
        ) {
          connected.push(index);
        }
      });

      return connected;
    };

    /*
     * =========================================================
     * CREATE PARTICLES
     * =========================================================
     */

    const createParticles = () => {
      const screenArea = width * height;

      const calculatedCount = Math.floor(
        screenArea /
          (isMobile() ? 14500 : 10500)
      );

      const particleCount = isMobile()
        ? Math.min(
            58,
            Math.max(34, calculatedCount)
          )
        : Math.min(
            130,
            Math.max(78, calculatedCount)
          );

      particles = Array.from(
        { length: particleCount },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,

          radius:
            Math.random() * 1.05 + 0.35,

          velocityX:
            (Math.random() - 0.5) * 0.11,

          velocityY:
            (Math.random() - 0.5) * 0.11,

          baseOpacity:
            Math.random() * 0.28 + 0.16,

          pulseOffset:
            Math.random() *
            Math.PI *
            2,

          impactStrength: 0,
        })
      );
    };

    /*
     * =========================================================
     * FIND RANDOM VALID CONNECTION
     * =========================================================
     */

    const findRandomConnection = () => {
      for (
        let attempt = 0;
        attempt < 50;
        attempt += 1
      ) {
        const sourceIndex = Math.floor(
          Math.random() * particles.length
        );

        const connected =
          getConnectedIndices(sourceIndex);

        if (connected.length === 0) {
          continue;
        }

        const targetIndex =
          connected[
            Math.floor(
              Math.random() *
                connected.length
            )
          ];

        return {
          sourceIndex,
          targetIndex,
        };
      }

      return null;
    };

    /*
     * =========================================================
     * CREATE SIGNAL
     * =========================================================
     */

    const createSignal = (
      initialDelay = 0
    ): Signal | null => {
      const connection =
        findRandomConnection();

      if (!connection) {
        return null;
      }

      return {
        sourceIndex:
          connection.sourceIndex,

        targetIndex:
          connection.targetIndex,

        progress: 0,

        speed:
          Math.random() * 0.0001 +
          0.00018,

        state:
          initialDelay > 0
            ? "waiting"
            : "travelling",

        waitTime: initialDelay,

        impactTime: 0,

        impactDuration:
          Math.random() * 250 + 500,

        trailLength:
          Math.random() * 12 + 18,
      };
    };

    /*
     * =========================================================
     * CREATE AUTONOMOUS SIGNALS
     * =========================================================
     */

    const createSignals = () => {
      if (reducedMotion) {
        signals = [];
        return;
      }

      const signalCount = isMobile()
        ? 2
        : width >= 1400
          ? 6
          : 4;

      const createdSignals: Signal[] = [];

      for (
        let index = 0;
        index < signalCount;
        index += 1
      ) {
        const initialDelay =
          index === 0
            ? 350
            : index * 900 +
              Math.random() * 650;

        const signal =
          createSignal(initialDelay);

        if (signal) {
          createdSignals.push(signal);
        }
      }

      signals = createdSignals;
    };

    /*
     * =========================================================
     * RESIZE CANVAS
     * =========================================================
     */

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.floor(
        width * pixelRatio
      );

      canvas.height = Math.floor(
        height * pixelRatio
      );

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      );

      createParticles();
      createSignals();
    };

    /*
     * =========================================================
     * POINTER EVENTS
     * =========================================================
     */

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    /*
     * =========================================================
     * UPDATE PARTICLE
     * =========================================================
     */

    const updateParticle = (
      particle: Particle
    ) => {
      if (!reducedMotion) {
        particle.x +=
          particle.velocityX;

        particle.y +=
          particle.velocityY;
      }

      if (particle.x < -20) {
        particle.x = width + 20;
      } else if (
        particle.x > width + 20
      ) {
        particle.x = -20;
      }

      if (particle.y < -20) {
        particle.y = height + 20;
      } else if (
        particle.y > height + 20
      ) {
        particle.y = -20;
      }

      if (particle.impactStrength > 0) {
        particle.impactStrength *= 0.955;

        if (
          particle.impactStrength < 0.008
        ) {
          particle.impactStrength = 0;
        }
      }
    };

    /*
     * =========================================================
     * REPLACE SIGNAL
     * =========================================================
     */

    const replaceSignal = (
      signalIndex: number
    ) => {
      const delay =
        Math.random() * 900 + 350;

      const replacement =
        createSignal(delay);

      if (replacement) {
        signals[signalIndex] =
          replacement;
      }
    };

    /*
     * =========================================================
     * UPDATE SIGNALS
     * =========================================================
     */

    const updateSignals = (
      deltaTime: number
    ) => {
      signals.forEach(
        (signal, signalIndex) => {
          if (
            signal.state === "waiting"
          ) {
            signal.waitTime -= deltaTime;

            if (signal.waitTime <= 0) {
              signal.waitTime = 0;
              signal.state =
                "travelling";
            }

            return;
          }

          if (
            signal.state ===
            "travelling"
          ) {
            signal.progress +=
              signal.speed *
              deltaTime;

            if (
              signal.progress >= 1
            ) {
              signal.progress = 1;

              signal.state =
                "impact";

              signal.impactTime = 0;

              const target =
                particles[
                  signal.targetIndex
                ];

              if (target) {
                target.impactStrength = 1;
              }
            }

            return;
          }

          signal.impactTime += deltaTime;

          if (
            signal.impactTime >=
            signal.impactDuration
          ) {
            replaceSignal(signalIndex);
          }
        }
      );
    };

    /*
     * =========================================================
     * DRAW NORMAL NETWORK CONNECTIONS
     * =========================================================
     */

    const drawConnections = () => {
      for (
        let firstIndex = 0;
        firstIndex <
        particles.length;
        firstIndex += 1
      ) {
        const firstParticle =
          particles[firstIndex];

        for (
          let secondIndex =
            firstIndex + 1;
          secondIndex <
            particles.length;
          secondIndex += 1
        ) {
          const secondParticle =
            particles[secondIndex];

          const distanceSquared =
            getDistanceSquared(
              firstParticle.x,
              firstParticle.y,
              secondParticle.x,
              secondParticle.y
            );

          if (
            distanceSquared >
            CONNECTION_DISTANCE_SQUARED
          ) {
            continue;
          }

          const distance =
            Math.sqrt(
              distanceSquared
            );

          let opacity =
            (1 -
              distance /
                CONNECTION_DISTANCE) *
            0.09;

          const impactStrength =
            Math.max(
              firstParticle.impactStrength,
              secondParticle.impactStrength
            );

          opacity +=
            impactStrength * 0.13;

          context.beginPath();

          context.moveTo(
            firstParticle.x,
            firstParticle.y
          );

          context.lineTo(
            secondParticle.x,
            secondParticle.y
          );

          context.strokeStyle = `rgba(
            45,
            212,
            191,
            ${Math.min(opacity, 0.24)}
          )`;

          context.lineWidth =
            impactStrength > 0.04
              ? 0.8
              : 0.55;

          context.stroke();
        }
      }
    };

    /*
     * =========================================================
     * DRAW POINTER CONNECTIONS
     * =========================================================
     */

    const drawPointerConnections = () => {
      if (
        !pointer.active ||
        isMobile() ||
        reducedMotion
      ) {
        return;
      }

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
          POINTER_DISTANCE_SQUARED
        ) {
          return;
        }

        const distance =
          Math.sqrt(distanceSquared);

        const influence =
          1 -
          distance /
            POINTER_DISTANCE;

        const opacity =
          influence * 0.28;

        const gradient =
          context.createLinearGradient(
            pointer.x,
            pointer.y,
            particle.x,
            particle.y
          );

        gradient.addColorStop(
          0,
          `rgba(
            94,
            234,
            212,
            ${opacity * 0.2}
          )`
        );

        gradient.addColorStop(
          0.25,
          `rgba(
            94,
            234,
            212,
            ${opacity * 0.62}
          )`
        );

        gradient.addColorStop(
          1,
          `rgba(
            153,
            246,
            228,
            ${opacity}
          )`
        );

        context.beginPath();

        context.moveTo(
          pointer.x,
          pointer.y
        );

        context.lineTo(
          particle.x,
          particle.y
        );

        context.strokeStyle =
          gradient;

        context.lineWidth = 0.8;

        context.lineCap = "round";

        context.stroke();

        if (influence > 0.38) {
          context.beginPath();

          context.arc(
            particle.x,
            particle.y,
            particle.radius + 0.4,
            0,
            Math.PI * 2
          );

          context.fillStyle = `rgba(
            153,
            246,
            228,
            ${influence * 0.26}
          )`;

          context.fill();
        }
      });
    };

    /*
     * =========================================================
     * DRAW TRAVELLING SIGNAL
     * =========================================================
     */

    const drawTravellingSignal = (
      signal: Signal
    ) => {
      const source =
        particles[
          signal.sourceIndex
        ];

      const target =
        particles[
          signal.targetIndex
        ];

      if (!source || !target) {
        return;
      }

      const progress =
        Math.min(
          Math.max(
            signal.progress,
            0
          ),
          1
        );

      const differenceX =
        target.x - source.x;

      const differenceY =
        target.y - source.y;

      const connectionLength =
        Math.sqrt(
          differenceX *
            differenceX +
            differenceY *
              differenceY
        ) || 1;

      const directionX =
        differenceX /
        connectionLength;

      const directionY =
        differenceY /
        connectionLength;

      const signalX =
        source.x +
        differenceX *
          progress;

      const signalY =
        source.y +
        differenceY *
          progress;

      /*
       * ACTIVE PATH
       */

      const travelledGradient =
        context.createLinearGradient(
          source.x,
          source.y,
          signalX,
          signalY
        );

      travelledGradient.addColorStop(
        0,
        "rgba(45, 212, 191, 0.015)"
      );

      travelledGradient.addColorStop(
        0.5,
        "rgba(45, 212, 191, 0.1)"
      );

      travelledGradient.addColorStop(
        1,
        "rgba(94, 234, 212, 0.38)"
      );

      context.beginPath();

      context.moveTo(
        source.x,
        source.y
      );

      context.lineTo(
        signalX,
        signalY
      );

      context.strokeStyle =
        travelledGradient;

      context.lineWidth = 0.8;

      context.lineCap = "round";

      context.stroke();

      /*
       * SIGNAL TRAIL
       */

      const actualTrailLength =
        Math.min(
          signal.trailLength,
          connectionLength *
            progress
        );

      const trailX =
        signalX -
        directionX *
          actualTrailLength;

      const trailY =
        signalY -
        directionY *
          actualTrailLength;

      const trailGradient =
        context.createLinearGradient(
          signalX,
          signalY,
          trailX,
          trailY
        );

      trailGradient.addColorStop(
        0,
        "rgba(230, 255, 252, 0.95)"
      );

      trailGradient.addColorStop(
        0.2,
        "rgba(153, 246, 228, 0.55)"
      );

      trailGradient.addColorStop(
        0.52,
        "rgba(94, 234, 212, 0.22)"
      );

      trailGradient.addColorStop(
        1,
        "rgba(45, 212, 191, 0)"
      );

      context.beginPath();

      context.moveTo(
        signalX,
        signalY
      );

      context.lineTo(
        trailX,
        trailY
      );

      context.strokeStyle =
        trailGradient;

      context.lineWidth = 1.05;

      context.lineCap = "round";

      context.stroke();

      /*
       * SIGNAL HEAD GLOW
       */

      const glowRadius = 8;

      const glow =
        context.createRadialGradient(
          signalX,
          signalY,
          0,
          signalX,
          signalY,
          glowRadius
        );

      glow.addColorStop(
        0,
        "rgba(235, 255, 253, 0.95)"
      );

      glow.addColorStop(
        0.18,
        "rgba(153, 246, 228, 0.5)"
      );

      glow.addColorStop(
        0.52,
        "rgba(94, 234, 212, 0.16)"
      );

      glow.addColorStop(
        1,
        "rgba(45, 212, 191, 0)"
      );

      context.beginPath();

      context.arc(
        signalX,
        signalY,
        glowRadius,
        0,
        Math.PI * 2
      );

      context.fillStyle = glow;

      context.fill();

      context.beginPath();

      context.arc(
        signalX,
        signalY,
        1.45,
        0,
        Math.PI * 2
      );

      context.fillStyle =
        "rgba(240, 255, 253, 1)";

      context.fill();
    };

    /*
     * =========================================================
     * DRAW IMPACT
     * =========================================================
     */

    const drawImpact = (
      signal: Signal
    ) => {
      const target =
        particles[
          signal.targetIndex
        ];

      if (!target) {
        return;
      }

      const progress =
        Math.min(
          signal.impactTime /
            signal.impactDuration,
          1
        );

      const opacity =
        1 - progress;

      const pulseRadius =
        2.5 + progress * 5;

      context.beginPath();

      context.arc(
        target.x,
        target.y,
        pulseRadius,
        0,
        Math.PI * 2
      );

      context.strokeStyle = `rgba(
        153,
        246,
        228,
        ${opacity * 0.24}
      )`;

      context.lineWidth = 0.65;

      context.stroke();

      const flash =
        context.createRadialGradient(
          target.x,
          target.y,
          0,
          target.x,
          target.y,
          8
        );

      flash.addColorStop(
        0,
        `rgba(
          210,
          255,
          249,
          ${opacity * 0.38}
        )`
      );

      flash.addColorStop(
        1,
        "rgba(45, 212, 191, 0)"
      );

      context.beginPath();

      context.arc(
        target.x,
        target.y,
        8,
        0,
        Math.PI * 2
      );

      context.fillStyle = flash;

      context.fill();
    };

    /*
     * =========================================================
     * DRAW SIGNALS
     * =========================================================
     */

    const drawSignals = () => {
      signals.forEach((signal) => {
        if (
          signal.state ===
          "waiting"
        ) {
          return;
        }

        if (
          signal.state ===
          "travelling"
        ) {
          drawTravellingSignal(
            signal
          );

          return;
        }

        drawImpact(signal);
      });
    };

    /*
     * =========================================================
     * DRAW PARTICLE
     * =========================================================
     */

    const drawParticle = (
      particle: Particle,
      time: number
    ) => {
      const pulse =
        0.78 +
        Math.sin(
          time *
            0.00105 +
            particle.pulseOffset
        ) *
          0.22;

      const impact =
        particle.impactStrength;

      const opacity =
        particle.baseOpacity *
          pulse +
        impact * 0.38;

      const radius =
        particle.radius *
          pulse +
        impact * 0.35;

      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        radius,
        0,
        Math.PI * 2
      );

      context.fillStyle = `rgba(
        103,
        248,
        231,
        ${Math.min(opacity, 0.88)}
      )`;

      context.fill();

      if (
        particle.radius > 0.95 ||
        impact > 0.03
      ) {
        const glowRadius =
          impact > 0.03
            ? 8
            : particle.radius * 2.8;

        const glow =
          context.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius
          );

        glow.addColorStop(
          0,
          `rgba(
            94,
            234,
            212,
            ${
              0.08 +
              impact * 0.22
            }
          )`
        );

        glow.addColorStop(
          1,
          "rgba(45, 212, 191, 0)"
        );

        context.beginPath();

        context.arc(
          particle.x,
          particle.y,
          glowRadius,
          0,
          Math.PI * 2
        );

        context.fillStyle = glow;

        context.fill();
      }
    };

    /*
     * =========================================================
     * RENDER LOOP
     * =========================================================
     */

    const render = (
      time: number
    ) => {
      const deltaTime = Math.min(
        time - previousTime,
        40
      );

      previousTime = time;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach(
        (particle) => {
          updateParticle(particle);
        }
      );

      if (!reducedMotion) {
        updateSignals(deltaTime);
      }

      /*
       * Layer 1:
       * Base network
       */

      drawConnections();

      /*
       * Layer 2:
       * Cursor interaction
       */

      drawPointerConnections();

      /*
       * Layer 3:
       * Autonomous travelling signals
       */

      if (!reducedMotion) {
        drawSignals();
      }

      /*
       * Layer 4:
       * Nodes
       */

      particles.forEach(
        (particle) => {
          drawParticle(
            particle,
            time
          );
        }
      );

      if (!reducedMotion) {
        animationFrameId =
          window.requestAnimationFrame(
            render
          );
      }
    };

    /*
     * =========================================================
     * INITIALIZE
     * =========================================================
     */

    resizeCanvas();

    if (reducedMotion) {
      render(0);
    } else {
      previousTime =
        performance.now();

      animationFrameId =
        window.requestAnimationFrame(
          render
        );
    }

    /*
     * =========================================================
     * EVENT LISTENERS
     * =========================================================
     */

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    /*
     * =========================================================
     * CLEANUP
     * =========================================================
     */

    return () => {
      window.cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
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