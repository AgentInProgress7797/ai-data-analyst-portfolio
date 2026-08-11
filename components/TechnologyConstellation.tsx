"use client";

import {
  useId,
  useMemo,
  useState,
  type PointerEvent,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Layers3, Network } from "lucide-react";

import PremiumCard from "@/components/PremiumCard";
import type { PortfolioProject } from "@/data/projects";

/* =========================================================
   CONSTANTS
========================================================= */

const CORE_X = 50;
const CORE_Y = 47;

const ACTIVE_DISTANCE = 14;

/* =========================================================
   TYPES
========================================================= */

type ConstellationNode = {
  technology: string;
  x: number;
  y: number;
};

/* =========================================================
   NODE POSITIONING
========================================================= */

function createConstellationNodes(
  technologies: string[]
): ConstellationNode[] {
  const total = technologies.length;

  if (total === 0) {
    return [];
  }

  return technologies.map((technology, index) => {
    const angle =
      -Math.PI / 2 + (index / total) * Math.PI * 2;

    const radiusX = 36;
    const radiusY = 34;

    return {
      technology,
      x: CORE_X + Math.cos(angle) * radiusX,
      y: CORE_Y + Math.sin(angle) * radiusY,
    };
  });
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TechnologyConstellation({
  project,
}: {
  project: PortfolioProject;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const rawGradientId = useId();
  const gradientId = rawGradientId.replace(/:/g, "");

  const nodes = useMemo(
    () => createConstellationNodes(project.technologies),
    [project.technologies]
  );

  const activeTechnology =
    nodes[activeIndex]?.technology ??
    project.technologies[0] ??
    "Technology";

  /* =========================================================
     POINTER PROXIMITY
  ========================================================= */

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    let nearestIndex = -1;
    let nearestDistance = Infinity;

    nodes.forEach((node, index) => {
      const distance = Math.sqrt(
        Math.pow(node.x - x, 2) +
          Math.pow(node.y - y, 2)
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (
      nearestIndex >= 0 &&
      nearestDistance <= ACTIVE_DISTANCE &&
      nearestIndex !== activeIndex
    ) {
      setActiveIndex(nearestIndex);
    }
  }

  return (
    <PremiumCard
      enableTilt={false}
      ariaLabel="Technology network"
      className="group relative h-full rounded-[28px] border border-white/[0.08] bg-[#030807]/95 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
    >
      <section className="relative h-full overflow-hidden rounded-[inherit] p-5 sm:p-6 lg:p-7">
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(45,212,191,0.07),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_42%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[47%] h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/[0.025] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-signal-300/40 to-transparent"
        />

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative z-20 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.065] text-signal-300 shadow-[0_0_20px_rgba(45,212,191,0.05)]">
                <Network size={16} aria-hidden="true" />
              </span>

              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-signal-300">
                Technology network
              </p>
            </div>

            <h4 className="mt-4 text-lg font-medium tracking-[-0.025em] text-white sm:text-xl">
              Connected tools and platforms
            </h4>
          </div>

          <span className="w-fit rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-mist-500">
            {project.technologies.length} nodes
          </span>
        </div>

        {/* =====================================================
            DESKTOP NETWORK
        ====================================================== */}

        <div
          onPointerMove={handlePointerMove}
          className="relative z-30 mt-7 hidden h-[500px] w-full overflow-hidden rounded-[24px] border border-white/[0.05] bg-[#020605]/80 sm:block lg:h-[520px]"
        >
          {/* Grid */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] [background-size:42px_42px]"
          />

          {/* Ambient center glow */}

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.25, 0.5, 0.25],
              scale: [0.92, 1.06, 0.92],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-1/2 top-[47%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/[0.045] blur-[80px]"
          />

          {/* =================================================
              SVG CONNECTION NETWORK
          ================================================== */}

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          >
            <defs>
              <linearGradient
                id={`active-line-${gradientId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(45,212,191,0.15)"
                />

                <stop
                  offset="52%"
                  stopColor="rgba(153,246,228,0.95)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(34,211,238,0.32)"
                />
              </linearGradient>
            </defs>

            {nodes.map((node, index) => {
              const isActive = index === activeIndex;

              return (
                <g
                  key={`${project.id}-${node.technology}-connection`}
                >
                  {/* Main connection */}

                  <motion.line
                    x1={CORE_X}
                    y1={CORE_Y}
                    x2={node.x}
                    y2={node.y}
                    vectorEffect="non-scaling-stroke"
                    stroke={
                      isActive
                        ? `url(#active-line-${gradientId})`
                        : "rgba(94,234,212,0.065)"
                    }
                    strokeWidth={isActive ? 1.25 : 0.55}
                    strokeDasharray={
                      isActive ? "0" : "2 8"
                    }
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: isActive
                        ? [0.55, 1, 0.65]
                        : 0.32,
                    }}
                    transition={{
                      pathLength: {
                        duration: 0.7,
                        delay: index * 0.035,
                      },

                      opacity: isActive
                        ? {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : {
                            duration: 0.25,
                          },
                    }}
                  />

                  {/* Travelling signal */}

                  {isActive && (
                    <motion.circle
                      r="0.55"
                      fill="rgba(153,246,228,1)"
                      initial={{
                        cx: CORE_X,
                        cy: CORE_Y,
                        opacity: 0,
                      }}
                      animate={{
                        cx: [CORE_X, node.x],
                        cy: [CORE_Y, node.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.15,
                        repeat: Infinity,
                        repeatDelay: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* =================================================
              RADAR SWEEP
          ================================================== */}

          <motion.div
            aria-hidden="true"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute left-1/2 top-[47%] z-[2] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_318deg,rgba(45,212,191,0.035)_340deg,rgba(94,234,212,0.09)_358deg,transparent_360deg)]"
          />

          {/* =================================================
              CORE SYSTEM
          ================================================== */}

          <div
            className="pointer-events-none absolute z-20 h-[300px] w-[300px]"
            style={{
              left: `${CORE_X}%`,
              top: `${CORE_Y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Outer orbit */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 42,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[6px] rounded-full border border-dashed border-signal-400/[0.11]"
            >
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-signal-200/70 shadow-[0_0_13px_rgba(153,246,228,0.65)]" />
            </motion.div>

            {/* Secondary orbit */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 31,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[40px] rounded-full border border-white/[0.065]"
            >
              <span className="absolute bottom-[15px] right-[14px] h-1.5 w-1.5 rounded-full bg-white/30" />
            </motion.div>

            {/* Inner orbit */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[61px] rounded-full border border-signal-400/[0.08]"
            />

            {/* Core glow */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: [0.25, 0.55, 0.25],
                scale: [0.92, 1.08, 0.92],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-[65px] rounded-full bg-signal-400/[0.08] blur-3xl"
            />

            {/* =================================================
                CENTER CORE
            ================================================== */}

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.018, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-[154px] w-[154px] flex-col items-center justify-center rounded-full border border-signal-200/35 bg-[#03100d]/95 px-4 text-center shadow-[0_0_0_8px_rgba(45,212,191,0.025),0_0_60px_rgba(45,212,191,0.14),inset_0_0_38px_rgba(45,212,191,0.05)] backdrop-blur-2xl"
              >
                {/* Icon */}

                <motion.div
                  key={`icon-${activeTechnology}`}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: -14,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.32,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-signal-400/25 bg-signal-400/[0.1] text-signal-100 shadow-[0_0_22px_rgba(45,212,191,0.11)]"
                >
                  <Cpu size={17} aria-hidden="true" />
                </motion.div>

                {/* Active technology */}

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTechnology}
                    initial={{
                      opacity: 0,
                      y: 7,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -7,
                      filter: "blur(5px)",
                    }}
                    transition={{
                      duration: 0.26,
                    }}
                    className="mt-3 max-w-[125px] text-base font-medium leading-5 text-white"
                  >
                    {activeTechnology}
                  </motion.p>
                </AnimatePresence>

                <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.21em] text-signal-300/60">
                  Active node
                </p>

                {/* Core pulse */}

                <motion.span
                  aria-hidden="true"
                  animate={{
                    scale: [1, 1.46],
                    opacity: [0.3, 0],
                  }}
                  transition={{
                    duration: 2.7,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-0 rounded-full border border-signal-300/25"
                />
              </motion.div>
            </div>
          </div>

          {/* =================================================
              TECHNOLOGY NODES
          ================================================== */}

          {nodes.map((node, index) => {
            const isActive = index === activeIndex;

            return (
              /*
               * IMPORTANT:
               *
               * This normal DIV owns the actual position.
               * Framer Motion only animates the child button.
               *
               * This prevents scale animation from breaking
               * translate(-50%, -50%) alignment.
               */
              <div
                key={`${project.id}-${node.technology}`}
                className="pointer-events-auto absolute z-[100] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <motion.button
                  type="button"
                  data-cursor="interactive"
                  aria-pressed={isActive}
                  aria-label={`Select ${node.technology}`}
                  onPointerEnter={() => {
                    setActiveIndex(index);
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                  }}
                  onFocus={() => {
                    setActiveIndex(index);
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.07 : 1,
                  }}
                  whileHover={{
                    scale: 1.12,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                      delay: index * 0.04,
                    },

                    scale: {
                      type: "spring",
                      stiffness: 330,
                      damping: 20,
                    },
                  }}
                  className={[
                    "relative cursor-pointer whitespace-nowrap",
                    "rounded-xl border px-3.5 py-2.5",
                    "font-mono text-[9px]",
                    "backdrop-blur-xl",
                    "transition-[border-color,background-color,color,box-shadow] duration-300",

                    isActive
                      ? [
                          "border-signal-200/60",
                          "bg-signal-400/[0.12]",
                          "text-white",
                          "shadow-[0_0_0_1px_rgba(153,246,228,0.12),0_0_34px_rgba(45,212,191,0.22),0_14px_38px_rgba(0,0,0,0.38)]",
                        ].join(" ")
                      : [
                          "border-white/[0.1]",
                          "bg-[#07100e]/95",
                          "text-mist-400",
                          "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
                          "hover:border-signal-300/45",
                          "hover:bg-signal-400/[0.08]",
                          "hover:text-white",
                          "hover:shadow-[0_0_0_1px_rgba(94,234,212,0.10),0_0_32px_rgba(45,212,191,0.20),0_14px_35px_rgba(0,0,0,0.35)]",
                        ].join(" "),
                  ].join(" ")}
                >
                  {/* Technology label */}

                  <span className="relative z-20 flex items-center gap-2">
                    <motion.span
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.55, 1],
                              opacity: [0.7, 1, 0.7],
                            }
                          : {
                              scale: 1,
                              opacity: 0.4,
                            }
                      }
                      transition={
                        isActive
                          ? {
                              duration: 1.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                          : {
                              duration: 0.2,
                            }
                      }
                      className={[
                        "h-1.5 w-1.5 rounded-full",
                        isActive
                          ? "bg-signal-100 shadow-[0_0_12px_rgba(153,246,228,1)]"
                          : "bg-mist-500",
                      ].join(" ")}
                    />

                    {node.technology}
                  </span>

                

                  {/* Active halo */}

                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        initial={{
                          opacity: 0,
                          scale: 0.85,
                        }}
                        animate={{
                          opacity: [
                            0.08,
                            0.32,
                            0.12,
                            0.22,
                            0.08,
                          ],
                          scale: [
                            0.92,
                            1.18,
                            1.04,
                            1.12,
                            0.92,
                          ],
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-signal-400/[0.12] blur-xl"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            MOBILE TECHNOLOGY GRID
        ====================================================== */}

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:hidden">
          {project.technologies.map(
            (technology, index) => {
              const isActive =
                index === activeIndex;

              return (
                <motion.button
                  key={`${project.id}-${technology}`}
                  type="button"
                  data-cursor="interactive"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.035,
                  }}
                  className={[
                    "rounded-xl border px-3 py-3 text-left font-mono text-[10px] transition-all duration-300",

                    isActive
                      ? "border-signal-300/45 bg-signal-400/[0.1] text-white shadow-[0_0_18px_rgba(45,212,191,0.08)]"
                      : "border-white/[0.08] bg-white/[0.02] text-mist-500",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={[
                        "h-1.5 w-1.5 rounded-full",

                        isActive
                          ? "bg-signal-200 shadow-[0_0_8px_rgba(153,246,228,0.7)]"
                          : "bg-white/20",
                      ].join(" ")}
                    />

                    {technology}
                  </span>
                </motion.button>
              );
            }
          )}
        </div>

        {/* Mobile active status */}

        <div className="relative z-10 mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/[0.15] px-3 py-3 sm:hidden">
          <Layers3
            size={14}
            className="text-signal-300"
            aria-hidden="true"
          />

          <p className="font-mono text-[10px] text-mist-500">
            Active:{" "}
            <span className="text-signal-200">
              {activeTechnology}
            </span>
          </p>
        </div>
      </section>
    </PremiumCard>
  );
}