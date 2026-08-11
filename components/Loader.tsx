"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* =========================================================
   BOOT SEQUENCE

   Each message appears according to the current progress.
========================================================= */

const bootSteps = [
  {
    max: 20,
    label: "Initializing Enterprise AI Engine",
  },
  {
    max: 42,
    label: "Loading Enterprise Knowledge",
  },
  {
    max: 66,
    label: "Building Decision Intelligence",
  },
  {
    max: 94,
    label: "Connecting Agentic Automation Layer",
  },
  {
    max: 100,
    label: "Portfolio Ready",
  },
] as const;

/* =========================================================
   STATUS HELPER
========================================================= */

function getBootStatus(progress: number): string {
  const currentStep =
    bootSteps.find((step) => progress <= step.max) ??
    bootSteps[bootSteps.length - 1];

  return currentStep.label;
}

/* =========================================================
   LOADER COMPONENT
========================================================= */

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  const bootStatus = useMemo(
    () => getBootStatus(pct),
    [pct]
  );

  const isReady = pct >= 100;

  useEffect(() => {
    let hideTimer: number | undefined;

    const interval = window.setInterval(() => {
      setPct((current) => {
        if (current >= 100) {
          window.clearInterval(interval);

          hideTimer = window.setTimeout(() => {
  setVisible(false);

  window.dispatchEvent(
    new Event("portfolio-ready")
  );
}, 500);

          return 100;
        }

        /*
         * Progress moves faster at the beginning and slows
         * near completion for a controlled boot experience.
         */
        let increment = 1;

        if (current < 25) {
          increment =
            Math.floor(Math.random() * 5) + 4;
        } else if (current < 70) {
          increment =
            Math.floor(Math.random() * 4) + 2;
        } else if (current < 92) {
          increment =
            Math.floor(Math.random() * 3) + 1;
        }

        return Math.min(current + increment, 100);
      });
    }, 85);

    return () => {
      window.clearInterval(interval);

      if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="portfolio-loader"
          className="loader-screen"
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.25, 0, 0, 1],
          }}
        >
          {/* =================================================
              BACKGROUND EFFECTS
          ================================================== */}

          {/* Central ambient glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/[0.055] blur-[115px]"
            animate={{
              opacity: [0.3, 0.65, 0.3],
              scale: [0.96, 1.06, 0.96],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle horizontal intelligence line */}
          <motion.div
            aria-hidden="true"
            initial={{
              opacity: 0,
              scaleX: 0.2,
            }}
            animate={{
              opacity: [0.08, 0.22, 0.08],
              scaleX: 1,
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },

              scaleX: {
                duration: 1.1,
                ease: [0.25, 0, 0, 1],
              },
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[70vw] max-w-[1100px] -translate-x-1/2 bg-gradient-to-r from-transparent via-signal-400/30 to-transparent"
          />

          {/* =================================================
              LOADER CONTENT
          ================================================== */}

          <div className="relative z-10 w-full max-w-[760px] px-6 text-center">
            {/* Name */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
                letterSpacing: "0.14em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.22em",
              }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0, 0, 1],
              }}
              className="font-display text-3xl font-medium text-white sm:text-4xl lg:text-[42px]"
            >
              ASHISH PAWAR
            </motion.h1>

            {/* Premium positioning statement */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
                duration: 0.6,
              }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-signal-400 sm:text-xs lg:text-[13px]"
            >
              <span>Enterprise AI</span>

              <span
                className="text-signal-400/45"
                aria-hidden="true"
              >
                •
              </span>

              <span>Data Intelligence</span>

              <span
                className="text-signal-400/45"
                aria-hidden="true"
              >
                •
              </span>

              <span>Agentic Automation</span>
            </motion.div>

            {/* =================================================
                SYSTEM LABEL AND PREMIUM PERCENTAGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.34,
                duration: 0.55,
              }}
              className="mt-14 flex items-center justify-between gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500 sm:text-xs"
            >
              <span className="text-left">
                Enterprise Intelligence System
              </span>

              <motion.span
                aria-live="polite"
                aria-label={`${pct} percent loaded`}
                animate={{
                  scale: isReady ? [1, 1.08, 1] : 1,
                  textShadow: isReady
                    ? [
                        "0 0 0 rgba(94,234,212,0)",
                        "0 0 18px rgba(94,234,212,0.65)",
                        "0 0 8px rgba(94,234,212,0.25)",
                      ]
                    : "0 0 0 rgba(94,234,212,0)",
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="inline-flex min-w-[58px] items-baseline justify-end tabular-nums"
              >
                <span
                  className={
                    isReady
                      ? "text-signal-200"
                      : "text-mist-300"
                  }
                >
                  {pct}
                </span>

                <span
                  aria-hidden="true"
                  className={
                    isReady
                      ? "ml-[2px] text-signal-300"
                      : "ml-[2px] text-signal-400/70"
                  }
                >
                  %
                </span>
              </motion.span>
            </motion.div>

            {/* =================================================
                PROGRESS TRACK
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0.96,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                delay: 0.4,
                duration: 0.5,
              }}
              className="relative mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]"
            >
              {/* Actual progress */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-signal-500 via-cyan-300 to-signal-400 shadow-[0_0_18px_rgba(45,212,191,0.42)]"
                animate={{
                  width: `${pct}%`,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
              />

              {/* Progress highlight */}
              {!isReady && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                  animate={{
                    x: ["-120%", "920%"],
                  }}
                  transition={{
                    duration: 1.45,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>

            {/* =================================================
                BOOT STATUS
            ================================================== */}

            <motion.div
              layout
              className="mt-7 flex min-h-8 items-center justify-center gap-2 font-mono text-xs sm:text-sm"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={bootStatus}
                  initial={{
                    opacity: 0,
                    y: 8,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={
                    isReady
                      ? "text-signal-300"
                      : "text-mist-500"
                  }
                >
                  {isReady ? "✓ " : "> "}
                  {bootStatus}
                </motion.span>
              </AnimatePresence>

              {/* Terminal cursor */}
              {!isReady && (
                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  className="inline-block h-4 w-[7px] bg-signal-400/70"
                />
              )}
            </motion.div>

            {/* =================================================
                FINAL BRAND FOOTER
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: pct > 70 ? 1 : 0,
                y: pct > 70 ? 0 : 6,
              }}
              transition={{
                duration: 0.45,
              }}
              className="mt-10 font-mono text-[9px] uppercase tracking-[0.25em] text-mist-700 sm:text-[10px]"
            >
              Enterprise AI • Analytics • Intelligent Systems
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}