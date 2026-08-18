"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PremiumCard from "@/components/PremiumCard";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  GitBranch,
  Lightbulb,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import TechnologyConstellation from "@/components/TechnologyConstellation";

import {
  portfolioProjects,
  type PortfolioProject,
} from "@/data/projects";

/* =========================================================
   STATUS STYLES
========================================================= */

const statusStyles: Record<
  PortfolioProject["status"],
  string
> = {
  Operational:
    "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",

  "In Development":
    "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",

  Completed:
    "border-signal-400/25 bg-signal-400/[0.08] text-signal-300",
};

/* =========================================================
   PROJECT SELECTOR
========================================================= */

type ProjectSelectorProps = {
  activeProject: PortfolioProject;
  onSelect: (projectId: string) => void;
};

function ProjectSelector({
  activeProject,
  onSelect,
}: ProjectSelectorProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {portfolioProjects.map((project, index) => {
        const isActive =
          project.id === activeProject.id;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project.id)}
            data-cursor="interactive"
            aria-pressed={isActive}
            className={[
              "group relative min-w-0 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 sm:px-5",
              isActive
                ? "border-signal-400/35 bg-signal-400/[0.07] shadow-[0_12px_38px_rgba(0,0,0,0.2),0_0_30px_rgba(45,212,191,0.07)]"
                : "border-white/[0.07] bg-white/[0.012] hover:border-white/[0.13] hover:bg-white/[0.025]",
            ].join(" ")}
          >
            {isActive && (
              <>
                <motion.div
                  layoutId="active-project-tab"
                  className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-signal-300 shadow-[0_0_14px_rgba(94,234,212,0.75)]"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                  }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-signal-400/[0.08] blur-3xl"
                />
              </>
            )}

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "font-mono text-[9px] uppercase tracking-[0.18em]",
                      isActive
                        ? "text-signal-300"
                        : "text-mist-500",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em]",
                      statusStyles[project.status],
                    ].join(" ")}
                  >
                    <CircleDot
                      size={8}
                      aria-hidden="true"
                    />

                    {project.status}
                  </span>
                </div>

                <h3
                  className={[
                    "mt-3 truncate text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-mist-400 group-hover:text-white",
                  ].join(" ")}
                >
                  {project.shortName}
                </h3>

                <p className="mt-1 truncate text-[11px] text-mist-500">
                  {project.category}
                </p>
              </div>

              <ChevronRight
                size={16}
                aria-hidden="true"
                className={[
                  "mt-1 shrink-0 transition-all duration-300",
                  isActive
                    ? "translate-x-0 text-signal-300"
                    : "-translate-x-1 text-mist-800 group-hover:translate-x-0 group-hover:text-mist-500",
                ].join(" ")}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   PROJECT HEADER
========================================================= */

function ProjectHeader({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.07] pb-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal-400/[0.04] blur-[90px]"
      />

      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]",
                statusStyles[project.status],
              ].join(" ")}
            >
              <CircleDot
                size={11}
                aria-hidden="true"
              />

              {project.status}
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist-500">
              {project.year}
            </span>
          </div>

          <motion.h3
            layout
            className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-[42px]"
          >
            {project.name}
          </motion.h3>

          <p className="mt-2 text-sm font-medium text-signal-300">
            {project.category}
          </p>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-mist-500 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        {(project.liveUrl ||
          project.sourceUrl) && (
          <div className="flex shrink-0 flex-wrap gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center gap-2 rounded-xl border border-signal-400/25 bg-signal-400/[0.08] px-4 py-2.5 text-xs text-signal-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-300/50 hover:bg-signal-400/[0.13]"
              >
                View project

                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                />
              </a>
            )}

            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-2.5 text-xs text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] hover:text-white"
              >
                Source code

                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/* =========================================================
   PROJECT NAVIGATION
========================================================= */

type ProjectNavigationProps = {
  activeIndex: number;
  totalProjects: number;
  onPrevious: () => void;
  onNext: () => void;
};

function ProjectNavigation({
  activeIndex,
  totalProjects,
  onPrevious,
  onNext,
}: ProjectNavigationProps) {
  return (
    <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/[0.12] p-2.5">
      <button
        type="button"
        onClick={onPrevious}
        data-cursor="interactive"
        aria-label="View previous project"
        className="group inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-mist-400 transition-all duration-300 hover:border-signal-400/30 hover:bg-signal-400/[0.05] hover:text-signal-300"
      >
        <ArrowLeft
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />

        <span className="hidden sm:inline">
          Previous
        </span>
      </button>

      <div className="flex items-center gap-3">
        <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-white/[0.1] sm:block" />

        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist-600">
          {String(activeIndex + 1).padStart(
            2,
            "0",
          )}
          {" / "}
          {String(totalProjects).padStart(
            2,
            "0",
          )}
        </span>

        <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-white/[0.1] sm:block" />
      </div>

      <button
        type="button"
        onClick={onNext}
        data-cursor="interactive"
        aria-label="View next project"
        className="group ml-auto inline-flex w-fit items-center gap-2 rounded-xl border border-signal-400/25 bg-signal-400/[0.07] px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-300 transition-all duration-300 hover:border-signal-300/50 hover:bg-signal-400/[0.12]"
      >
        <span className="hidden sm:inline">
          Next
        </span>

        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}

/* =========================================================
   METRICS
========================================================= */

function MetricsGrid({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {project.metrics.map(
        (metric, index) => (
          <motion.div
            key={`${project.id}-${metric.label}`}
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.38,
              delay: index * 0.055,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.035] via-white/[0.014] to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-signal-400/25 sm:p-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-signal-400/[0.035] blur-2xl transition-all duration-500 group-hover:bg-signal-400/[0.09]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            <p className="relative text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
              {metric.value}
            </p>

            <p className="relative mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-mist-700">
              {metric.label}
            </p>
          </motion.div>
        ),
      )}
    </div>
  );
}

/* =========================================================
   PROJECT STORY
========================================================= */

function ProjectStoryPanel({
  project,
}: {
  project: PortfolioProject;
}) {
  const storyItems = [
    {
      number: "01",
      label: "Challenge",
      title: "Business problem",
      content: project.story.challenge,
      icon: Target,
    },
    {
      number: "02",
      label: "Approach",
      title: "How I approached it",
      content: project.story.approach,
      icon: Route,
    },
    {
      number: "03",
      label: "Result",
      title: "Current outcome",
      content: project.story.result,
      icon: Trophy,
    },
  ];

  return (
    <PremiumCard
      enableTilt={false}
      ariaLabel={`${project.name} challenge approach and result`}
      className="group rounded-3xl border border-white/[0.08] bg-[#040908]/82"
    >
      <section className="relative overflow-hidden rounded-[inherit] p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-44 w-96 -translate-x-1/2 rounded-full bg-signal-400/[0.035] blur-[80px]"
        />

        <div className="relative">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-signal-300">
                <GitBranch
                  size={16}
                  aria-hidden="true"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  Project journey
                </p>
              </div>

              <h4 className="mt-2 text-lg font-medium text-white">
                Challenge → Approach → Result
              </h4>
            </div>

            <p className="max-w-md text-xs leading-5 text-mist-700">
              A concise view of the problem,
              implementation direction and
              practical outcome.
            </p>
          </div>

          <div className="relative mt-6 grid gap-3 lg:grid-cols-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[16%] right-[16%] top-6 hidden h-px bg-gradient-to-r from-signal-400/5 via-signal-400/25 to-signal-400/5 lg:block"
            />

            {storyItems.map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={`${project.id}-${item.label}`}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay:
                        index * 0.08,
                    }}
                    className="group/story relative overflow-hidden rounded-2xl border border-white/[0.065] bg-black/[0.12] p-4 transition-all duration-300 hover:border-signal-400/20 hover:bg-signal-400/[0.02] sm:p-5"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-signal-400/[0.025] blur-3xl transition-all duration-500 group-hover/story:bg-signal-400/[0.06]"
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.06] text-signal-300">
                          <Icon
                            size={16}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="font-mono text-[9px] tracking-[0.18em] text-signal-400/55">
                          {item.number}
                        </span>
                      </div>

                      <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.17em] text-signal-300">
                        {item.label}
                      </p>

                      <h5 className="mt-2 text-sm font-medium text-white">
                        {item.title}
                      </h5>

                      <p className="mt-3 text-xs leading-6 text-mist-500 sm:text-[13px]">
                        {item.content}
                      </p>
                    </div>
                  </motion.article>
                );
              },
            )}
          </div>
        </div>
      </section>
    </PremiumCard>
  );
}

/* =========================================================
   ARCHITECTURE
========================================================= */

function ArchitectureFlow({
  project,
}: {
  project: PortfolioProject;
}) {
  const [activeNodeIndex, setActiveNodeIndex] =
    useState(0);

  const activeNode =
    project.architecture[
      activeNodeIndex
    ] ?? project.architecture[0];

  return (
    <PremiumCard
      enableTilt={false}
      ariaLabel={`${project.name} system architecture`}
      className="group h-full rounded-3xl border border-white/[0.08] bg-[#040908]/82"
    >
      <section className="relative h-full overflow-hidden rounded-[inherit] p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-signal-400/[0.035] blur-[90px]"
        />

        <div className="relative">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-signal-300">
                <Network
                  size={16}
                  aria-hidden="true"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  System flow
                </p>
              </div>

              <h4 className="mt-2 text-lg font-medium text-white">
                Architecture
              </h4>
            </div>

            <span className="rounded-full border border-white/[0.08] bg-black/[0.12] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mist-600">
              {project.architecture.length}{" "}
              layers
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col">
              {project.architecture.map(
                (node, index) => {
                  const isActive =
                    index ===
                    activeNodeIndex;

                  return (
                    <div
                      key={`${project.id}-${node.title}`}
                      className="flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveNodeIndex(
                            index,
                          )
                        }
                        data-cursor="interactive"
                        aria-pressed={
                          isActive
                        }
                        className={[
                          "group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300",
                          isActive
                            ? "border-signal-400/35 bg-signal-400/[0.075] shadow-[0_0_30px_rgba(45,212,191,0.07)]"
                            : "border-white/[0.07] bg-black/[0.1] hover:border-signal-400/20 hover:bg-signal-400/[0.025]",
                        ].join(" ")}
                      >
                        <div
                          aria-hidden="true"
                          className={[
                            "absolute inset-y-3 left-0 w-[2px] rounded-full bg-signal-300 transition-opacity duration-300",
                            isActive
                              ? "opacity-100"
                              : "opacity-0",
                          ].join(" ")}
                        />

                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-mono text-[9px] transition-all duration-300",
                              isActive
                                ? "border-signal-400/35 bg-signal-400/[0.1] text-signal-200"
                                : "border-white/[0.08] bg-white/[0.025] text-mist-600",
                            ].join(
                              " ",
                            )}
                          >
                            {String(
                              index +
                                1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className={[
                                "text-sm font-medium transition-colors",
                                isActive
                                  ? "text-white"
                                  : "text-mist-300",
                              ].join(
                                " ",
                              )}
                            >
                              {
                                node.title
                              }
                            </p>

                            <p className="mt-1 text-xs leading-5 text-mist-700">
                              {
                                node.subtitle
                              }
                            </p>
                          </div>

                          <ChevronRight
                            size={15}
                            aria-hidden="true"
                            className={[
                              "shrink-0 transition-all duration-300",
                              isActive
                                ? "translate-x-0 text-signal-300"
                                : "-translate-x-1 text-mist-800 group-hover:translate-x-0 group-hover:text-mist-500",
                            ].join(
                              " ",
                            )}
                          />
                        </div>
                      </button>

                      {index <
                        project
                          .architecture
                          .length -
                          1 && (
                        <div className="flex h-9 flex-col items-center justify-center">
                          <motion.div
                            initial={{
                              height: 0,
                            }}
                            animate={{
                              height: 15,
                            }}
                            transition={{
                              duration:
                                0.3,
                              delay:
                                index *
                                  0.07 +
                                0.12,
                            }}
                            className="w-px bg-gradient-to-b from-signal-400/55 to-signal-400/10"
                          />

                          <ArrowDown
                            size={11}
                            aria-hidden="true"
                            className="text-signal-400/50"
                          />
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.id}-${activeNode.title}`}
                initial={{
                  opacity: 0,
                  x: 12,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                  filter: "blur(5px)",
                }}
                transition={{
                  duration: 0.32,
                  ease: [
                    0.25,
                    0,
                    0,
                    1,
                  ],
                }}
                className="relative overflow-hidden rounded-2xl border border-signal-400/[0.16] bg-gradient-to-br from-signal-400/[0.055] via-white/[0.018] to-transparent p-5"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-signal-400/[0.08] blur-3xl"
                />

                <div className="relative">
                  <p className="font-mono text-[9px] uppercase tracking-[0.19em] text-signal-300">
                    Selected layer
                  </p>

                  <h5 className="mt-3 text-xl font-medium text-white">
                    {activeNode.title}
                  </h5>

                  <p className="mt-2 text-sm leading-6 text-mist-500">
                    {
                      activeNode.subtitle
                    }
                  </p>

                  <div className="mt-6 space-y-3">
                    {activeNode.details.map(
                      (
                        detail,
                        index,
                      ) => (
                        <motion.div
                          key={detail}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.055,
                            duration:
                              0.26,
                          }}
                          className="flex gap-3 rounded-xl border border-white/[0.06] bg-black/[0.12] px-3 py-3"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-300 shadow-[0_0_9px_rgba(94,234,212,0.7)]" />

                          <p className="text-xs leading-6 text-mist-400">
                            {detail}
                          </p>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PremiumCard>
  );
}

/* =========================================================
   ENGINEERING DECISIONS
========================================================= */

function EngineeringDecisions({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <PremiumCard
      enableTilt={false}
      ariaLabel={`${project.name} engineering decisions`}
      className="group rounded-3xl border border-white/[0.08] bg-[#040908]/82"
    >
      <section className="relative overflow-hidden rounded-[inherit] p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-signal-400/[0.035] blur-[85px]"
        />

        <div className="relative">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-signal-300">
                <Lightbulb
                  size={16}
                  aria-hidden="true"
                />

                <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  Engineering reasoning
                </p>
              </div>

              <h4 className="mt-2 text-lg font-medium text-white">
                Engineering decisions
              </h4>
            </div>

            <p className="max-w-md text-xs leading-5 text-mist-700">
              Key implementation choices
              shaped by the project&apos;s
              business and operational
              requirements.
            </p>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {project.engineeringDecisions.map(
              (item, index) => (
                <motion.article
                  key={`${project.id}-${item.title}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay:
                      index * 0.07,
                  }}
                  className="group/decision relative overflow-hidden rounded-2xl border border-white/[0.065] bg-gradient-to-br from-white/[0.025] via-black/[0.08] to-transparent p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-400/20 sm:p-5"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-signal-400/[0.025] blur-3xl transition-all duration-500 group-hover/decision:bg-signal-400/[0.065]"
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.06] font-mono text-[9px] text-signal-300">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-signal-300 shadow-[0_0_10px_rgba(94,234,212,0.7)]" />
                    </div>

                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-signal-300">
                      {item.title}
                    </p>

                    <h5 className="mt-2 text-sm font-medium leading-6 text-white">
                      {item.decision}
                    </h5>

                    <div className="my-4 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />

                    <p className="text-xs leading-6 text-mist-500">
                      {item.reason}
                    </p>
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>
    </PremiumCard>
  );
}

/* =========================================================
   PROJECT SUMMARY
========================================================= */

function ProjectSummary({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <PremiumCard
      enableTilt={false}
      ariaLabel={`${project.name} project impact and contribution`}
      className="group h-full rounded-3xl border border-white/[0.08] bg-[#040908]/82"
    >
      <section className="relative h-full overflow-hidden rounded-[inherit]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-signal-400/[0.03] blur-[80px]"
        />

        <div className="relative border-b border-white/[0.07] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-signal-300">
            <Sparkles
              size={16}
              aria-hidden="true"
            />

            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Project summary
            </p>
          </div>

          <h4 className="mt-2 text-lg font-medium text-white">
            Impact and contribution
          </h4>
        </div>

        <div className="relative grid lg:grid-cols-2">
          <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.06] text-signal-300">
                <Check
                  size={14}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal-300">
                  Outcome
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Practical impact
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {project.impact.map(
                (item, index) => (
                  <motion.div
                    key={`${project.id}-${item}`}
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay:
                        index * 0.05,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-400/25 bg-signal-400/[0.07] text-signal-300">
                      <Check
                        size={9}
                        aria-hidden="true"
                      />
                    </span>

                    <p className="text-xs leading-6 text-mist-500 sm:text-sm">
                      {item}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.06] text-signal-300">
                <ShieldCheck
                  size={14}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal-300">
                  Contribution
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  My role
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {project.responsibilities.map(
                (
                  responsibility,
                  index,
                ) => (
                  <motion.div
                    key={`${project.id}-${responsibility}`}
                    initial={{
                      opacity: 0,
                      x: 8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay:
                        index * 0.05,
                    }}
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.055] bg-black/[0.09] px-3 py-3 transition-colors duration-300 hover:border-signal-400/15 hover:bg-signal-400/[0.025]"
                  >
                    <span className="font-mono text-[9px] text-signal-400/70">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <p className="text-xs leading-5 text-mist-500">
                      {
                        responsibility
                      }
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </PremiumCard>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function ProjectDashboard() {
  const [
    activeProjectId,
    setActiveProjectId,
  ] = useState(portfolioProjects[0].id);

  const activeProject = useMemo(
    () =>
      portfolioProjects.find(
        (project) =>
          project.id ===
          activeProjectId,
      ) ?? portfolioProjects[0],
    [activeProjectId],
  );

  const activeProjectIndex =
    portfolioProjects.findIndex(
      (project) =>
        project.id === activeProjectId,
    );

  function goToPreviousProject() {
    const previousIndex =
      activeProjectIndex <= 0
        ? portfolioProjects.length - 1
        : activeProjectIndex - 1;

    setActiveProjectId(
      portfolioProjects[previousIndex].id,
    );
  }

  function goToNextProject() {
    const nextIndex =
      activeProjectIndex >=
      portfolioProjects.length - 1
        ? 0
        : activeProjectIndex + 1;

    setActiveProjectId(
      portfolioProjects[nextIndex].id,
    );
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-signal-400/[0.025] blur-[130px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal-300">
              04 / Projects
            </span>

            <div className="h-px w-12 bg-signal-400/30" />
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Systems I&apos;ve Built{" "}
            <span className="text-signal-300">
              &amp; Operationalized
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-mist-600 sm:text-base">
            Selected AI, data and automation
            systems shaped around real business
            requirements—from architecture and
            integration to deployment, access
            control and practical outcomes.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.085] bg-[#040908]/80 shadow-[0_40px_130px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-signal-300/45 to-transparent"
          />

          <div className="relative border-b border-white/[0.07] bg-white/[0.008] p-3 sm:p-4">
            <ProjectSelector
              activeProject={activeProject}
              onSelect={setActiveProjectId}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{
                opacity: 0,
                y: 16,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -10,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.42,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="p-5 sm:p-7 lg:p-9"
            >
              <ProjectHeader
                project={activeProject}
              />

              <ProjectNavigation
                activeIndex={
                  activeProjectIndex
                }
                totalProjects={
                  portfolioProjects.length
                }
                onPrevious={
                  goToPreviousProject
                }
                onNext={goToNextProject}
              />

              <div className="mt-6">
                <MetricsGrid
                  project={activeProject}
                />
              </div>

              <div className="mt-5">
                <TechnologyConstellation
                  key={`technology-${activeProject.id}`}
                  project={activeProject}
                />
              </div>

              <div className="mt-5">
                <ProjectStoryPanel
                  key={`story-${activeProject.id}`}
                  project={activeProject}
                />
              </div>

              <div className="mt-5">
                <ArchitectureFlow
                  key={`architecture-${activeProject.id}`}
                  project={activeProject}
                />
              </div>

              <div className="mt-5">
                <EngineeringDecisions
                  key={`decisions-${activeProject.id}`}
                  project={activeProject}
                />
              </div>

              <div className="mt-5">
                <ProjectSummary
                  project={activeProject}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}