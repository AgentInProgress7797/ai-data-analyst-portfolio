"use client";

import { motion } from "framer-motion";

import { personal } from "@/data/profile";
import PremiumCard from "@/components/PremiumCard";
import Reveal from "@/components/Reveal";

const currentFocus = [
  "Enterprise AI",
  "Generative AI",
  "Agentic AI",
  "Workflow Automation",
  "Business Intelligence",
  "AI Security",
];

const corePrinciples = [
  "Business-first thinking",
  "Reliable data",
  "Practical automation",
  "Secure AI implementation",
  "Clear stakeholder communication",
  "Continuous improvement",
];

export default function About() {
  return (
    <section
      id="about"
      className="section relative z-10"
    >
      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <Reveal>
        <p className="eyebrow">My Approach</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Turning business challenges into practical AI and data solutions.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-3xl text-base leading-7 text-mist-400 sm:text-lg">
          My work sits between business, data and technology. I focus on
          understanding what actually needs to improve, then using the right
          combination of analytics, AI and automation to make the solution
          useful in day-to-day work.
        </p>
      </Reveal>

      {/* =====================================================
          ABOUT CONTENT GRID
      ====================================================== */}

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ===================================================
            HOW I WORK
        ==================================================== */}

        <Reveal
          delay={0.12}
          className="h-full"
        >
          <PremiumCard
            ariaLabel="How I approach business and technology problems"
            enableTilt
            tiltAmount={1.4}
            className="h-full rounded-3xl p-7 sm:p-8 lg:p-9"
          >
            {/* Decorative top-left glow */}

            <motion.div
              aria-hidden="true"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none absolute
                -left-20 -top-20
                h-52 w-52 rounded-full
                bg-signal-400/[0.08]
                blur-3xl
              "
            />

            {/* Secondary lower glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -bottom-28 right-1/4
                h-64 w-64 rounded-full
                bg-cyan-400/[0.025]
                blur-[100px]
              "
            />

            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal-400/75">
                How I Work
              </p>

              <h3 className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-signal-100">
                I start with the problem, not the technology.
              </h3>

              <div className="mt-6 space-y-5 text-base leading-[1.85] text-mist-300">
                <p>
                  My background is in data, reporting and business operations,
                  which shaped how I approach technology today. I usually start
                  by understanding where information is unclear, where work is
                  repetitive or where an existing process is creating friction.
                </p>

                <p>
                  Over time, that work has expanded into enterprise AI and
                  automation. I now work across AI models, internal
                  applications, analytics and business workflows, with a focus
                  on making these technologies useful in real working
                  environments.
                </p>

                <p>
                  I enjoy the point where business and technology meet:
                  understanding how people actually work, deciding what should
                  be improved, building or configuring the solution and then
                  checking whether it works reliably in practice.
                </p>
              </div>

              {/* =================================================
                  WORKING PRINCIPLE
              ================================================== */}

              <motion.div
                whileHover={{
                  x: 4,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  relative mt-8 overflow-hidden
                  rounded-r-2xl
                  border-l-2 border-signal-400/60
                  bg-signal-400/[0.018]
                  py-4 pl-5 pr-4
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -left-12 top-1/2
                    h-24 w-24
                    -translate-y-1/2
                    rounded-full
                    bg-signal-400/[0.08]
                    blur-3xl
                  "
                />

                <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-signal-400/70">
                  Working Principle
                </p>

                <p className="relative mt-3 text-base leading-7 text-mist-200">
                  Understand the problem
                  <span className="mx-2 text-signal-400/45">→</span>
                  simplify the workflow
                  <span className="mx-2 text-signal-400/45">→</span>
                  choose the right technology
                  <span className="mx-2 text-signal-400/45">→</span>
                  validate the result.
                </p>
              </motion.div>
            </div>
          </PremiumCard>
        </Reveal>

        {/* ===================================================
            SUPPORTING CARDS
        ==================================================== */}

        <div className="grid gap-5">
          {/* =================================================
              CURRENT FOCUS
          ================================================== */}

          <Reveal delay={0.16}>
            <PremiumCard
              ariaLabel="Current areas of professional focus"
              enableTilt
              tiltAmount={2}
              className="rounded-3xl p-6"
            >
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none absolute
                  -right-12 -top-12
                  h-36 w-36 rounded-full
                  bg-signal-400/[0.08]
                  blur-3xl
                "
              />

              <div className="relative">
                <p className="eyebrow">Current Focus</p>

                <h3 className="mt-3 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-signal-100">
                  Areas where I&apos;m building deeper experience.
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {currentFocus.map((focus) => (
                    <motion.span
                      key={focus}
                      whileHover={{
                        y: -3,
                        scale: 1.035,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                        rounded-full
                        border border-white/[0.07]
                        bg-white/[0.025]
                        px-3 py-1.5
                        font-mono text-[11px]
                        text-mist-300
                        transition-colors duration-300
                        hover:border-signal-400/35
                        hover:bg-signal-400/[0.06]
                        hover:text-signal-300
                        hover:shadow-[0_0_18px_rgba(45,212,191,0.07)]
                      "
                    >
                      {focus}
                    </motion.span>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </Reveal>

          {/* =================================================
              CORE PRINCIPLES
          ================================================== */}

          <Reveal delay={0.2}>
            <PremiumCard
              ariaLabel="Core professional principles"
              enableTilt
              tiltAmount={1.8}
              className="rounded-3xl p-6"
            >
              <div className="relative">
                <p className="eyebrow">Core Principles</p>

                <h3 className="mt-3 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-signal-100">
                  How I approach technology and business problems.
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {corePrinciples.map((principle) => (
                    <motion.div
                      key={principle}
                      whileHover={{
                        x: 4,
                        y: -2,
                        backgroundColor:
                          "rgba(45, 212, 191, 0.035)",
                        borderColor:
                          "rgba(45, 212, 191, 0.16)",
                      }}
                      transition={{
                        duration: 0.22,
                      }}
                      className="
                        flex items-start gap-3
                        rounded-xl
                        border border-white/[0.05]
                        bg-white/[0.02]
                        p-3.5
                      "
                    >
                      <motion.span
                        whileHover={{
                          scale: 1.35,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
                          mt-1.5 h-1.5 w-1.5
                          shrink-0 rounded-full
                          bg-signal-400
                          shadow-[0_0_8px_rgba(94,234,212,0.65)]
                        "
                        aria-hidden="true"
                      />

                      <span className="text-sm leading-6 text-mist-300">
                        {principle}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </Reveal>

          {/* =================================================
              CURRENT ROLE
          ================================================== */}

          <Reveal delay={0.24}>
            <PremiumCard
              ariaLabel={`Current role as ${personal.title}`}
              enableTilt
              tiltAmount={2}
              className="rounded-3xl p-6"
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute
                  -bottom-16 -right-16
                  h-40 w-40 rounded-full
                  bg-signal-400/[0.055]
                  blur-3xl
                "
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="eyebrow">Current Role</p>

                    <h3 className="mt-3 font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-signal-100">
                      {personal.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-mist-300">
                      {personal.company}
                    </p>
                  </div>

                  <motion.span
                    whileHover={{
                      y: -2,
                      scale: 1.035,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-signal-400/15
                      bg-signal-400/[0.05]
                      px-3 py-1
                      font-mono text-[10px]
                      uppercase tracking-[0.18em]
                      text-signal-300
                      shadow-[0_0_18px_rgba(45,212,191,0.04)]
                    "
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        aria-hidden="true"
                        className="
                          absolute inline-flex h-full w-full
                          animate-ping rounded-full
                          bg-signal-400 opacity-60
                        "
                      />

                      <span
                        aria-hidden="true"
                        className="
                          relative inline-flex h-1.5 w-1.5
                          rounded-full bg-signal-400
                          shadow-[0_0_7px_rgba(94,234,212,0.75)]
                        "
                      />
                    </span>

                    Active
                  </motion.span>
                </div>

                <p className="mt-5 text-sm leading-6 text-mist-400">
                  Working across enterprise AI, analytics, automation and
                  internal technology initiatives.
                </p>
              </div>
            </PremiumCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}