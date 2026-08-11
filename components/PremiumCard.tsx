"use client";

import type {
  MouseEvent,
  ReactNode,
} from "react";
import { useRef } from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  tiltAmount?: number;
  ariaLabel?: string;
};

export default function PremiumCard({
  children,
  className = "",
  enableTilt = true,
  tiltAmount = 4,
  ariaLabel,
}: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Cursor position inside the card */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Raw rotation values */
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  /* Smooth rotation */
  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  /* Large internal spotlight */
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      420px circle at ${mouseX}px ${mouseY}px,
      rgba(45, 212, 191, 0.16),
      rgba(34, 211, 238, 0.055) 35%,
      transparent 70%
    )
  `;

  /* Smaller border spotlight */
  const borderSpotlightBackground = useMotionTemplate`
    radial-gradient(
      260px circle at ${mouseX}px ${mouseY}px,
      rgba(94, 234, 212, 0.72),
      rgba(34, 211, 238, 0.18) 40%,
      transparent 72%
    )
  `;

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>
  ) {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();

    const pointerX =
      event.clientX - rect.left;

    const pointerY =
      event.clientY - rect.top;

    mouseX.set(pointerX);
    mouseY.set(pointerY);

    if (!enableTilt) {
      return;
    }

    const horizontalPosition =
      pointerX / rect.width - 0.5;

    const verticalPosition =
      pointerY / rect.height - 0.5;

    rawRotateX.set(
      verticalPosition * -tiltAmount * 2
    );

    rawRotateY.set(
      horizontalPosition * tiltAmount * 2
    );
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      aria-label={ariaLabel}
      data-cursor="interactive"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -4,
        scale: 1.008,
      }}
      transition={{
        y: {
          duration: 0.24,
          ease: [0.25, 0, 0, 1],
        },

        scale: {
          duration: 0.24,
          ease: [0.25, 0, 0, 1],
        },
      }}
      style={{
        rotateX: enableTilt
          ? rotateX
          : undefined,

        rotateY: enableTilt
          ? rotateY
          : undefined,

        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className={[
        "premium-card group relative overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Base glass surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.055] via-white/[0.018] to-transparent"
      />

      {/* Cursor-following spotlight */}
      <motion.div
        aria-hidden="true"
        style={{
          background: spotlightBackground,
        }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Cursor-following border */}
      <motion.div
        aria-hidden="true"
        style={{
          background:
            borderSpotlightBackground,
        }}
        className="premium-card-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Top reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70"
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-signal-400/[0.045] blur-3xl transition-all duration-500 group-hover:bg-signal-400/[0.09]"
      />

      {/* Content */}
      <div
        className="premium-card-content relative z-10"
        style={{
          transform:
            "translateZ(22px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}