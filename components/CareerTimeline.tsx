"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Network,
  Route,
  Sparkles,
} from "lucide-react";

import {
  careerMilestones,
  type CareerMilestone,
} from "@/data/career";

/* =========================================================
   SECTION TRANSITION
========================================================= */

const sectionTransition = {
  duration: 0.7,

  ease: [0.25, 0, 0, 1] as const,
};

/* =========================================================
   TIMELINE METRIC
========================================================= */

function TimelineMetric({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.12 + index * 0.07,
        duration: 0.45,
        ease: [0.25, 0, 0, 1],
      }}
      className="
        rounded-2xl
        border border-white/[0.07]
        bg-white/[0.025]
        px-4 py-4
      "
    >
      <p className="font-display text-xl font-semibold text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-600">
        {label}
      </p>
    </motion.div>
  );
}

/* =========================================================
   ACTIVE MILESTONE PANEL
========================================================= */

function TimelinePanel({
  milestone,
  currentPosition,
  totalMilestones,
  onPrevious,
  onNext,
}: {
  milestone: CareerMilestone;
  currentPosition: number;
  totalMilestones: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={milestone.id}
        initial={{
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -12,
          filter: "blur(6px)",
        }}
        transition={{
          duration: 0.42,
          ease: [0.25, 0, 0, 1],
        }}
        className="
          relative overflow-hidden
          rounded-[28px]
          border border-signal-400/[0.14]
          bg-[#06100f]/75
          shadow-[0_28px_90px_rgba(0,0,0,0.34),0_0_55px_rgba(45,212,191,0.04)]
          backdrop-blur-2xl
        "
      >
        {/* Background glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-28 -top-28
            h-72 w-72
            rounded-full
            bg-signal-400/[0.055]
            blur-[90px]
          "
        />

        {/* Top signal line */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-0 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-signal-300/70
            to-transparent
          "
        />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              flex flex-col gap-5
              border-b border-white/[0.07]
              pb-6
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-signal-400/20
                    bg-signal-400/[0.06]
                    px-3 py-1.5
                    font-mono text-[10px]
                    uppercase tracking-[0.16em]
                    text-signal-300
                  "
                >
                  <Sparkles
                    size={12}
                    aria-hidden="true"
                  />

                  {milestone.category}
                </span>

                <span
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-white/[0.08]
                    bg-white/[0.025]
                    px-3 py-1.5
                    font-mono text-[10px]
                    uppercase tracking-[0.14em]
                    text-mist-500
                  "
                >
                  <CalendarDays
                    size={12}
                    aria-hidden="true"
                  />

                  {milestone.period}
                </span>
              </div>

              <h3
                className="
                  mt-5 max-w-2xl
                  font-display
                  text-2xl font-semibold
                  tracking-tight text-white
                  sm:text-3xl
                "
              >
                {milestone.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-mist-400">
                <BriefcaseBusiness
                  size={15}
                  className="text-signal-400"
                  aria-hidden="true"
                />

                {milestone.organisation}
              </p>
            </div>

            {/* Navigation */}

            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
              <span className="font-mono text-4xl font-semibold tracking-[-0.08em] text-white/10 sm:text-5xl">
                {milestone.year}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrevious}
                  aria-label="View previous career milestone"
                  data-cursor="interactive"
                  className="
                    group flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    border border-white/[0.09]
                    bg-white/[0.025]
                    text-mist-500
                    transition-all duration-300
                    hover:-translate-x-0.5
                    hover:border-signal-400/35
                    hover:bg-signal-400/[0.07]
                    hover:text-signal-300
                  "
                >
                  <ChevronLeft
                    size={19}
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-x-0.5
                    "
                  />
                </button>

                <span className="min-w-[54px] text-center font-mono text-[10px] tracking-[0.14em] text-mist-600">
                  {currentPosition} / {totalMilestones}
                </span>

                <button
                  type="button"
                  onClick={onNext}
                  aria-label="View next career milestone"
                  data-cursor="interactive"
                  className="
                    group flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    border border-signal-400/20
                    bg-signal-400/[0.07]
                    text-signal-300
                    shadow-[0_0_20px_rgba(45,212,191,0.06)]
                    transition-all duration-300
                    hover:translate-x-0.5
                    hover:border-signal-300/50
                    hover:bg-signal-400/[0.12]
                    hover:shadow-[0_0_28px_rgba(45,212,191,0.14)]
                  "
                >
                  <ChevronRight
                    size={19}
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              MILESTONE CONTENT
          ================================================== */}

          <div className="grid gap-7 pt-7 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left */}

            <div>
              <p className="max-w-3xl text-sm leading-7 text-mist-300 sm:text-[15px]">
                {milestone.summary}
              </p>

              <div className="mt-7">
                <div className="flex items-center gap-2">
                  <Route
                    size={14}
                    className="text-signal-400"
                    aria-hidden="true"
                  />

                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-600">
                    Key development
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {milestone.impact.map(
                    (item, index) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.08 +
                            index * 0.06,
                          duration: 0.4,
                        }}
                        className="
                          flex gap-3
                          text-sm leading-6
                          text-mist-400
                        "
                      >
                        <span
                          className="
                            mt-[9px]
                            h-1.5 w-1.5
                            shrink-0
                            rounded-full
                            bg-signal-400
                            shadow-[0_0_12px_rgba(45,212,191,0.65)]
                          "
                        />

                        <span>{item}</span>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right */}

            <div>
              <div className="grid grid-cols-3 gap-3">
                {milestone.metrics.map(
                  (metric, index) => (
                    <TimelineMetric
                      key={`${metric.value}-${metric.label}`}
                      value={metric.value}
                      label={metric.label}
                      index={index}
                    />
                  ),
                )}
              </div>

              <div
                className="
                  mt-6 rounded-2xl
                  border border-white/[0.07]
                  bg-black/[0.12]
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Network
                    size={15}
                    className="text-signal-400"
                    aria-hidden="true"
                  />

                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-600">
                    Tools &amp; systems
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {milestone.technologies.map(
                    (technology, index) => (
                      <motion.span
                        key={technology}
                        initial={{
                          opacity: 0,
                          scale: 0.92,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay:
                            0.12 +
                            index * 0.045,
                          duration: 0.32,
                        }}
                        className="
                          rounded-full
                          border border-white/[0.08]
                          bg-white/[0.025]
                          px-3 py-1.5
                          font-mono text-[10px]
                          text-mist-400
                          transition-colors duration-200
                          hover:border-signal-400/30
                          hover:text-signal-300
                        "
                      >
                        {technology}
                      </motion.span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

/* =========================================================
   MAIN CAREER TIMELINE
========================================================= */

export default function CareerTimeline() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      amount: 0.15,
    },
  );

  /*
   * Start with the newest milestone because
   * it is the most relevant career position
   * for someone reviewing the portfolio today.
   */

  const [activeId, setActiveId] =
    useState(
      careerMilestones[
        careerMilestones.length - 1
      ].id,
    );

  const activeMilestone = useMemo(
    () =>
      careerMilestones.find(
        (milestone) =>
          milestone.id === activeId,
      ) ?? careerMilestones[0],
    [activeId],
  );

  const activeIndex =
    careerMilestones.findIndex(
      (milestone) =>
        milestone.id === activeId,
    );

  const progress =
    careerMilestones.length > 1
      ? (activeIndex /
          (careerMilestones.length -
            1)) *
        100
      : 0;

  function goToPreviousMilestone() {
    const previousIndex =
      activeIndex <= 0
        ? careerMilestones.length -
          1
        : activeIndex - 1;

    setActiveId(
      careerMilestones[
        previousIndex
      ].id,
    );
  }

  function goToNextMilestone() {
    const nextIndex =
      activeIndex >=
      careerMilestones.length - 1
        ? 0
        : activeIndex + 1;

    setActiveId(
      careerMilestones[nextIndex].id,
    );
  }

  return (
    <section
      id="career"
      ref={sectionRef}
      className="
        relative z-10
        overflow-hidden
        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[700px] w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-signal-400/[0.025]
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-0 opacity-[0.2]
          [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        {/* ===================================================
            SECTION INTRODUCTION
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={sectionTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-signal-400/20
              bg-signal-400/[0.05]
              px-4 py-2
              font-mono text-[10px]
              uppercase tracking-[0.22em]
              text-signal-300
            "
          >
            <Route
              size={14}
              aria-hidden="true"
            />

            Career Evolution
          </div>

          <h2
            className="
              mt-6
              font-display
              text-3xl font-semibold
              tracking-tight text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            From operational data to{" "}
            <span
              className="
                bg-gradient-to-r
                from-signal-300
                via-cyan-200
                to-signal-400
                bg-clip-text
                text-transparent
              "
            >
              enterprise AI.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist-500 sm:text-base">
            A look at how my work has
            moved from operational
            analytics and reporting into
            business intelligence,
            enterprise AI and intelligent
            automation.
          </p>
        </motion.div>

        {/* ===================================================
            TIMELINE
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            ...sectionTransition,
            delay: 0.15,
          }}
          className="mt-14 lg:mt-16"
        >
          {/* ===============================================
              DESKTOP TIMELINE
          ================================================ */}

          <div className="hidden md:block">
            <div className="relative px-6">
              <div className="absolute left-6 right-6 top-6 h-px bg-white/[0.08]" />

              <motion.div
                className="
                  absolute left-6 top-6
                  h-px
                  bg-gradient-to-r
                  from-signal-500
                  via-cyan-300
                  to-signal-400
                  shadow-[0_0_15px_rgba(45,212,191,0.5)]
                "
                animate={{
                  width: `calc((100% - 3rem) * ${
                    progress / 100
                  })`,
                }}
                transition={{
                  duration: 0.55,
                  ease: [
                    0.25,
                    0,
                    0,
                    1,
                  ],
                }}
              />

              <div
                className="relative grid"
                style={{
                  gridTemplateColumns: `repeat(${careerMilestones.length}, minmax(0, 1fr))`,
                }}
              >
                {careerMilestones.map(
                  (
                    milestone,
                    index,
                  ) => {
                    const isActive =
                      milestone.id ===
                      activeId;

                    const isCompleted =
                      index <=
                      activeIndex;

                    return (
                      <button
                        key={milestone.id}
                        type="button"
                        onClick={() =>
                          setActiveId(
                            milestone.id,
                          )
                        }
                        data-cursor="interactive"
                        aria-pressed={
                          isActive
                        }
                        className="
                          group
                          flex flex-col
                          items-center
                          text-center
                        "
                      >
                        <motion.span
                          animate={{
                            scale: isActive
                              ? 1.15
                              : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness:
                              300,
                            damping: 22,
                          }}
                          className={[
                            "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-ink-950 transition-all duration-300",

                            isActive
                              ? "border-signal-300 text-signal-200 shadow-[0_0_0_7px_rgba(45,212,191,0.06),0_0_28px_rgba(45,212,191,0.34)]"
                              : isCompleted
                                ? "border-signal-400/55 text-signal-400"
                                : "border-white/[0.12] text-mist-700 group-hover:border-signal-400/35 group-hover:text-signal-400",
                          ].join(
                            " ",
                          )}
                        >
                          <span
                            className={[
                              "h-2.5 w-2.5 rounded-full transition-all duration-300",

                              isActive
                                ? "bg-signal-300 shadow-[0_0_16px_rgba(94,234,212,0.9)]"
                                : isCompleted
                                  ? "bg-signal-500"
                                  : "bg-white/15",
                            ].join(
                              " ",
                            )}
                          />

                          {isActive && (
                            <motion.span
                              aria-hidden="true"
                              className="
                                absolute
                                inset-0
                                rounded-full
                                border
                                border-signal-300/40
                              "
                              animate={{
                                scale: [
                                  1,
                                  1.7,
                                ],
                                opacity: [
                                  0.7,
                                  0,
                                ],
                              }}
                              transition={{
                                duration:
                                  1.8,
                                repeat:
                                  Infinity,
                                ease: "easeOut",
                              }}
                            />
                          )}
                        </motion.span>

                        <span
                          className={[
                            "mt-4 font-mono text-xs font-semibold transition-colors",

                            isActive
                              ? "text-signal-300"
                              : "text-mist-500 group-hover:text-mist-300",
                          ].join(
                            " ",
                          )}
                        >
                          {milestone.year}
                        </span>

                        <span
                          className={[
                            "mt-1 max-w-[160px] text-xs transition-colors",

                            isActive
                              ? "text-white"
                              : "text-mist-600",
                          ].join(
                            " ",
                          )}
                        >
                          {
                            milestone.category
                          }
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* ===============================================
              MOBILE TIMELINE
          ================================================ */}

          <div
            className="
              flex gap-2
              overflow-x-auto
              pb-4
              md:hidden
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {careerMilestones.map(
              (milestone) => {
                const isActive =
                  milestone.id ===
                  activeId;

                return (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() =>
                      setActiveId(
                        milestone.id,
                      )
                    }
                    data-cursor="interactive"
                    className={[
                      "min-w-[145px] rounded-2xl border px-4 py-4 text-left transition-all duration-300",

                      isActive
                        ? "border-signal-400/40 bg-signal-400/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-sm font-semibold",

                        isActive
                          ? "text-signal-300"
                          : "text-mist-500",
                      ].join(
                        " ",
                      )}
                    >
                      {milestone.year}
                    </span>

                    <span className="mt-2 block text-xs leading-5 text-mist-400">
                      {
                        milestone.category
                      }
                    </span>
                  </button>
                );
              },
            )}
          </div>

          {/* ===============================================
              ACTIVE MILESTONE
          ================================================ */}

          <div className="mt-10 lg:mt-12">
            <TimelinePanel
              milestone={
                activeMilestone
              }
              currentPosition={
                activeIndex + 1
              }
              totalMilestones={
                careerMilestones.length
              }
              onPrevious={
                goToPreviousMilestone
              }
              onNext={
                goToNextMilestone
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}