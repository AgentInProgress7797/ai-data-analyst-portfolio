"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { experience } from "@/data/profile";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/PremiumCard";

const roleFocus: Record<string, string[]> = {
  "Reliance Infrastructure": [
    "Enterprise AI",
    "Generative AI",
    "Intelligent Automation",
    "Business Analytics",
  ],

  "Tata Capital": [
    "Business Intelligence",
    "Dashboarding",
    "MIS Reporting",
    "Data Validation",
  ],

  Teleperformance: [
    "Operational Analytics",
    "Team Leadership",
    "Portfolio Analysis",
    "Process Improvement",
  ],
};

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  /*
   * Measures how far the timeline container has moved
   * through the viewport.
   */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 70%"],
  });

  /*
   * Adds smooth spring movement to the progress line.
   */
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  /*
   * Moves the small light pulse down the timeline
   * as the progress value changes.
   */
  const pulsePosition = useTransform(
    timelineProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="experience"
      className="section relative z-10"
    >
      {/* Section heading */}
      <Reveal>
        <p className="eyebrow">Professional Experience</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Seven years of growth across analytics, automation and enterprise AI.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-3xl text-base leading-7 text-mist-400 sm:text-lg">
          My career has progressed from operational reporting and business
          intelligence to enterprise AI and intelligent automation. Each role
          has strengthened my ability to understand business problems, work
          with complex data and build solutions that support better decisions.
        </p>
      </Reveal>

      {/* Scroll-controlled experience timeline */}
      <div
        ref={timelineRef}
        className="relative mt-16"
      >
        {/* Timeline lines */}
        <div
          className="pointer-events-none absolute bottom-4 left-[11px] top-4 hidden sm:block"
          aria-hidden="true"
        >
          {/* Inactive background line */}
          <div className="absolute inset-0 w-px bg-gradient-to-b from-white/10 via-white/[0.08] to-transparent" />

          {/* Animated growing line */}
          <motion.div
            className="absolute inset-x-0 top-0 h-full w-px origin-top bg-gradient-to-b from-signal-300 via-signal-400 to-signal-400/20 shadow-[0_0_12px_rgba(94,234,212,0.45)]"
            style={{
              scaleY: timelineProgress,
            }}
          />

          {/* Moving energy pulse */}
          <motion.div
            className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-signal-300 shadow-[0_0_8px_rgba(94,234,212,1),0_0_18px_rgba(94,234,212,0.7)]"
            style={{
              top: pulsePosition,
            }}
          />
        </div>

        {/* Timeline cards */}
        <div className="space-y-8">
          {experience.map((job, index) => {
            const isCurrent = index === 0;
            const focusAreas = roleFocus[job.company] ?? [];

            return (
              <motion.div
                key={`${job.company}-${job.role}`}
                initial={{
                  opacity: 0,
                  y: 45,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index * 0.08, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article className="group relative sm:pl-12">
                  {/* Timeline milestone */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.6,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15,
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                    }}
                    className={`
                      absolute left-0 top-8 z-10 hidden h-[23px] w-[23px]
                      items-center justify-center rounded-full border sm:flex
                      ${
                        isCurrent
                          ? "border-signal-400/70 bg-[#07110f] shadow-[0_0_20px_rgba(94,234,212,0.4)]"
                          : "border-white/15 bg-[#080a0e]"
                      }
                    `}
                    aria-hidden="true"
                  >
                    {/* Current-role outer pulse */}
                    {isCurrent && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-signal-400/40"
                        animate={{
                          opacity: [0.7, 0],
                          scale: [1, 1.9],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}

                    {/* Inner milestone dot */}
                    <motion.span
                      className={`
                        relative h-1.5 w-1.5 rounded-full
                        ${
                          isCurrent
                            ? "bg-signal-300 shadow-[0_0_10px_rgba(94,234,212,1)]"
                            : "bg-mist-600"
                        }
                      `}
                      animate={
                        isCurrent
                          ? {
                              scale: [1, 1.35, 1],
                              opacity: [0.8, 1, 0.8],
                            }
                          : undefined
                      }
                      transition={
                        isCurrent
                          ? {
                              duration: 1.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                          : undefined
                      }
                    />
                  </motion.div>

                  {/* Connector from timeline to card */}
                  <motion.div
                    initial={{
                      scaleX: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.6,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-[23px] top-[43px] hidden h-px w-[25px] origin-left bg-gradient-to-r from-signal-400/60 to-signal-400/10 sm:block"
                    aria-hidden="true"
                  />

                  {/* Experience card */}
                  <PremiumCard
                    ariaLabel={`${job.role} at ${job.company}`}
                    enableTilt
                    tiltAmount={1.5}
                    className={`
                      relative overflow-hidden rounded-2xl border p-6 sm:p-8
                      ${
                        isCurrent
                          ? "border-signal-400/20"
                          : "border-white/[0.07]"
                      }
                    `}
                  >
                    {/* AI-style scan animation */}
                    <motion.div
                      initial={{
                        x: "-120%",
                      }}
                      whileInView={{
                        x: "220%",
                      }}
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        duration: 1.35,
                        delay: 0.2 + index * 0.08,
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none absolute inset-y-0 z-10 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-signal-300/[0.06] to-transparent blur-sm"
                      aria-hidden="true"
                    />

                    {/* Current-role background glow */}
                    {isCurrent && (
                      <motion.div
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-signal-400/[0.08] blur-3xl"
                        animate={{
                          opacity: [0.45, 0.85, 0.45],
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Decorative number */}
                    <span
                      className="pointer-events-none absolute right-6 top-5 font-mono text-5xl font-semibold text-white/[0.025] transition-colors duration-500 group-hover:text-signal-400/[0.06]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      {/* Header */}
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-2xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-400/75">
                              Career Chapter{" "}
                              {String(index + 1).padStart(2, "0")}
                            </p>

                            {isCurrent && (
                              <span className="inline-flex items-center gap-2 rounded-full border border-signal-400/20 bg-signal-400/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-300">
                                <motion.span
                                  className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_7px_rgba(94,234,212,0.85)]"
                                  animate={{
                                    opacity: [0.45, 1, 0.45],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  aria-hidden="true"
                                />

                                Current Role
                              </span>
                            )}
                          </div>

                          <h3 className="mt-4 max-w-xl font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                            {job.role}
                          </h3>

                          <p className="mt-2 text-sm font-medium text-signal-400">
                            {job.company}
                          </p>

                          <p className="mt-1 text-sm text-mist-500">
                            {job.location}
                          </p>
                        </div>

                        <motion.span
                          initial={{
                            opacity: 0,
                            y: -8,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.45,
                            delay: 0.25,
                          }}
                          className="w-fit rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 font-mono text-[11px] text-mist-400"
                        >
                          {job.period}
                        </motion.span>
                      </div>

                      {/* Focus areas */}
                      {focusAreas.length > 0 && (
                        <div className="mt-7">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                            Focus Areas
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {focusAreas.map((focus, focusIndex) => (
                              <motion.span
                                key={focus}
                                initial={{
                                  opacity: 0,
                                  y: 10,
                                }}
                                whileInView={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                viewport={{
                                  once: true,
                                }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.2 + focusIndex * 0.06,
                                }}
                                className="rounded-full border border-signal-400/10 bg-signal-400/[0.035] px-3 py-1.5 font-mono text-[10px] text-signal-300/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-400/30 hover:bg-signal-400/[0.07] hover:text-signal-200"
                              >
                                {focus}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="my-7 h-px bg-gradient-to-r from-signal-400/20 via-white/[0.06] to-transparent" />

                      {/* Contribution heading */}
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_8px_rgba(94,234,212,0.65)]"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          aria-hidden="true"
                        />

                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                          Key Contributions
                        </p>
                      </div>

                      {/* Experience points */}
                      <ul className="mt-5 grid gap-4">
                        {job.points.map((point, pointIndex) => (
                          <motion.li
                            key={`${job.company}-${pointIndex}`}
                            initial={{
                              opacity: 0,
                              x: -12,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.3,
                            }}
                            transition={{
                              duration: 0.45,
                              delay: 0.12 + pointIndex * 0.06,
                            }}
                            className="group/item flex gap-4 rounded-xl border border-transparent p-1 text-sm leading-[1.8] text-mist-300 transition-all duration-300 hover:border-white/[0.04] hover:bg-white/[0.015] sm:text-[15px]"
                          >
                            <span className="mt-[10px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-400/20 bg-signal-400/[0.04]">
                              <span className="h-1 w-1 rounded-full bg-signal-400/75 transition-transform duration-300 group-hover/item:scale-150" />
                            </span>

                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </PremiumCard>
                </article>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline completion node */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 160,
            damping: 18,
          }}
          className="relative mt-10 hidden items-center gap-5 sm:flex"
        >
          <div className="relative flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border border-signal-400/50 bg-[#07110f] shadow-[0_0_20px_rgba(94,234,212,0.32)]">
            <motion.span
              className="absolute inset-0 rounded-full border border-signal-400/30"
              animate={{
                scale: [1, 1.8],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            <span className="relative h-1.5 w-1.5 rounded-full bg-signal-300 shadow-[0_0_9px_rgba(94,234,212,1)]" />
          </div>

          <div className="h-px w-6 bg-gradient-to-r from-signal-400/60 to-transparent" />

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal-400/70">
              Current Direction
            </p>

            <p className="mt-1 text-sm text-mist-400">
              Building practical enterprise AI, analytics and intelligent
              automation solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}