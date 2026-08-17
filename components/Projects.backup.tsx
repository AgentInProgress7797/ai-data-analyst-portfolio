"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Check,
  ExternalLink,
  Github,
  Workflow,
} from "lucide-react";

import { projects, type Project } from "@/data/profile";
import PremiumCard from "@/components/PremiumCard";
import Reveal from "@/components/Reveal";

/* =========================================================
   PROJECT FILTER CATEGORIES
========================================================= */

const categories = [
  "All",
  "AI",
  "Analytics",
  "Automation",
] as const;

type CategoryFilter = (typeof categories)[number];

/* =========================================================
   CATEGORY CONFIGURATION
========================================================= */

const categoryMeta: Record<
  Project["category"],
  {
    label: string;
    icon: typeof Bot;
  }
> = {
  AI: {
    label: "Enterprise AI",
    icon: Bot,
  },

  Analytics: {
    label: "Data Analytics",
    icon: ChartNoAxesCombined,
  },

  Automation: {
    label: "Automation",
    icon: Workflow,
  },
};

/* =========================================================
   PROJECTS SECTION
========================================================= */

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeCategory
        );

  return (
    <section
      id="projects"
      className="section relative z-10"
    >
      {/* =====================================================
          SECTION INTRODUCTION
      ====================================================== */}

      <Reveal>
        <p className="eyebrow">
          Selected Case Studies
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Building practical solutions across AI,
          analytics and automation.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-3xl text-base leading-7 text-mist-400 sm:text-lg">
          A selection of projects that show how I
          approach business requirements, design
          workflows, implement solutions and communicate
          their value to stakeholders.
        </p>
      </Reveal>

      {/* =====================================================
          CATEGORY FILTERS
      ====================================================== */}

      <Reveal delay={0.14}>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive =
              activeCategory === category;

            return (
              <motion.button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                aria-pressed={isActive}
                data-cursor="interactive"
                whileHover={{
                  y: -2,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0, 0, 1],
                }}
                className={`
                  rounded-full px-4 py-2
                  font-mono text-xs uppercase tracking-wide
                  transition-colors duration-300
                  ${
                    isActive
                      ? "border border-signal-400/40 bg-signal-500 text-ink-950 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
                      : "border border-white/10 bg-white/[0.01] text-mist-500 hover:border-signal-500/30 hover:bg-signal-400/[0.035] hover:text-signal-400"
                  }
                `}
              >
                {category}
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      {/* =====================================================
          PROJECT CASE STUDIES
      ====================================================== */}

      <motion.div
        layout
        className="mt-12 space-y-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(
            (project, index) => (
              <ProjectCaseStudy
                key={project.title}
                project={project}
                index={index}
              />
            )
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* =========================================================
   PROJECT CASE STUDY TYPES
========================================================= */

type ProjectCaseStudyProps = {
  project: Project;
  index: number;
};

/* =========================================================
   PROJECT CASE STUDY
========================================================= */

function ProjectCaseStudy({
  project,
  index,
}: ProjectCaseStudyProps) {
  const meta = categoryMeta[project.category];
  const CategoryIcon = meta.icon;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.985,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: 14,
        scale: 0.985,
        filter: "blur(5px)",
      }}
      transition={{
        duration: 0.42,
        ease: [0.25, 0, 0, 1],
      }}
      className="relative"
    >
      <PremiumCard
        ariaLabel={`${project.title} project case study`}
        enableTilt
        tiltAmount={2.4}
        className="
          group rounded-3xl
          p-6 sm:p-8 lg:p-10
        "
      >
        {/* ===================================================
            BACKGROUND DECORATION
        ==================================================== */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none absolute -right-24 -top-24
            h-64 w-64 rounded-full
            bg-signal-400/[0.07] blur-3xl
          "
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle lower atmospheric glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-32 left-1/4
            h-72 w-72 rounded-full
            bg-cyan-400/[0.025] blur-[100px]
          "
        />

        {/* Decorative project number */}
        <motion.span
          aria-hidden="true"
          initial={{
            opacity: 0.025,
            y: 0,
          }}
          whileHover={{
            opacity: 0.08,
            y: -5,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            pointer-events-none absolute right-6 top-4
            font-mono text-[5rem] font-semibold leading-none
            text-white
            sm:right-9 sm:text-[7rem]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* ===================================================
            MAIN CARD CONTENT
        ==================================================== */}

        <div className="relative">
          {/* =================================================
              PROJECT HEADER
          ================================================== */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                {/* Category badge */}
                <motion.span
                  whileHover={{
                    y: -2,
                    scale: 1.025,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-signal-400/15
                    bg-signal-400/[0.05]
                    px-3 py-1.5
                    font-mono text-[10px] uppercase
                    tracking-[0.17em] text-signal-300
                    shadow-[0_0_20px_rgba(45,212,191,0.035)]
                  "
                >
                  <CategoryIcon
                    size={13}
                    aria-hidden="true"
                  />

                  {meta.label}
                </motion.span>

                {/* Project status */}
                {project.status && (
                  <motion.span
                    whileHover={{
                      y: -2,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      border border-white/[0.07]
                      bg-white/[0.025]
                      px-3 py-1.5
                      font-mono text-[10px] uppercase
                      tracking-[0.15em] text-mist-400
                    "
                  >
                    <span
                      className={`
                        h-1.5 w-1.5 rounded-full
                        ${
                          project.status ===
                          "In Development"
                            ? "animate-pulse bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.65)]"
                            : project.status === "Live"
                              ? "animate-pulse bg-signal-400 shadow-[0_0_8px_rgba(45,212,191,0.75)]"
                              : "bg-signal-400 shadow-[0_0_8px_rgba(45,212,191,0.55)]"
                        }
                      `}
                      aria-hidden="true"
                    />

                    {project.status}
                  </motion.span>
                )}
              </div>

              {/* Project title */}
              <h3 className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-signal-100 sm:text-3xl">
                {project.title}
              </h3>

              {/* Project subtitle */}
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-signal-400/70">
                {project.subtitle}
              </p>

              {/* Project description */}
              <p className="mt-5 max-w-3xl text-base leading-7 text-mist-300">
                {project.description}
              </p>
            </div>

            {/* ===============================================
                OPTIONAL PROJECT LINKS
            ================================================ */}

            {(project.link || project.repo) && (
              <div className="flex shrink-0 flex-wrap gap-2">
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    data-cursor-label="OPEN"
                    whileHover={{
                      y: -3,
                      scale: 1.025,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      border border-white/[0.08]
                      bg-white/[0.025]
                      px-4 py-2
                      font-mono text-xs text-mist-300
                      transition-colors duration-300
                      hover:border-signal-400/30
                      hover:bg-signal-400/[0.045]
                      hover:text-signal-300
                      hover:shadow-[0_0_22px_rgba(45,212,191,0.08)]
                    "
                  >
                    <ExternalLink
                      size={14}
                      aria-hidden="true"
                    />

                    <span>Live Project</span>
                  </motion.a>
                )}

                {project.repo && (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    data-cursor-label="CODE"
                    whileHover={{
                      y: -3,
                      scale: 1.025,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      inline-flex items-center gap-2 rounded-full
                      border border-white/[0.08]
                      bg-white/[0.025]
                      px-4 py-2
                      font-mono text-xs text-mist-300
                      transition-colors duration-300
                      hover:border-signal-400/30
                      hover:bg-signal-400/[0.045]
                      hover:text-signal-300
                      hover:shadow-[0_0_22px_rgba(45,212,191,0.08)]
                    "
                  >
                    <Github
                      size={14}
                      aria-hidden="true"
                    />

                    <span>Repository</span>
                  </motion.a>
                )}
              </div>
            )}
          </div>

          {/* =================================================
              BUSINESS CHALLENGE AND OUTCOME
          ================================================== */}

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {/* Business challenge */}
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.008,
              }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0, 0, 1],
              }}
              className="
                relative overflow-hidden rounded-2xl
                border border-white/[0.06]
                bg-white/[0.018]
                p-5 sm:p-6
                transition-colors duration-300
                hover:border-white/[0.11]
                hover:bg-white/[0.025]
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute -right-16 -top-16
                  h-32 w-32 rounded-full
                  bg-white/[0.025] blur-3xl
                "
              />

              <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                Business Challenge
              </p>

              <p className="relative mt-4 text-sm leading-7 text-mist-300">
                {project.challenge}
              </p>
            </motion.div>

            {/* Business outcome */}
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.008,
              }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0, 0, 1],
              }}
              className="
                relative overflow-hidden rounded-2xl
                border border-signal-400/10
                bg-signal-400/[0.025]
                p-5 sm:p-6
                transition-all duration-300
                hover:border-signal-400/20
                hover:bg-signal-400/[0.04]
                hover:shadow-[0_0_28px_rgba(45,212,191,0.045)]
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute -right-16 -top-16
                  h-36 w-36 rounded-full
                  bg-signal-400/[0.06] blur-3xl
                "
              />

              <div className="relative flex items-center gap-2">
                <motion.span
                  whileHover={{
                    x: 3,
                    y: -3,
                  }}
                >
                  <ArrowUpRight
                    size={16}
                    className="text-signal-300"
                    aria-hidden="true"
                  />
                </motion.span>

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                  Business Outcome
                </p>
              </div>

              <p className="relative mt-4 text-sm leading-7 text-mist-300">
                {project.outcome}
              </p>
            </motion.div>
          </div>

          {/* =================================================
              CONTRIBUTIONS
          ================================================== */}

          <motion.div
            whileHover={{
              borderColor:
                "rgba(255,255,255,0.1)",
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              mt-5 rounded-2xl
              border border-white/[0.06]
              bg-white/[0.018]
              p-5 sm:p-6
            "
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              My Contribution
            </p>

            <ul className="mt-5 grid gap-3 lg:grid-cols-2">
              {project.contributions.map(
                (
                  contribution,
                  contributionIndex
                ) => (
                  <motion.li
                    key={`${project.title}-${contributionIndex}`}
                    whileHover={{
                      x: 4,
                      backgroundColor:
                        "rgba(255,255,255,0.018)",
                      borderColor:
                        "rgba(255,255,255,0.05)",
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    className="
                      flex gap-3 rounded-xl
                      border border-transparent p-2
                      text-sm leading-6 text-mist-300
                    "
                  >
                    <motion.span
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      className="
                        mt-0.5 flex h-5 w-5 shrink-0
                        items-center justify-center rounded-full
                        border border-signal-400/15
                        bg-signal-400/[0.04]
                        text-signal-300
                      "
                    >
                      <Check
                        size={11}
                        aria-hidden="true"
                      />
                    </motion.span>

                    <span>{contribution}</span>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* =================================================
              TECHNOLOGY TAGS
          ================================================== */}

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              Technology &amp; Capabilities
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{
                    y: -3,
                    scale: 1.035,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    rounded-full border border-white/[0.07]
                    bg-white/[0.025]
                    px-3 py-1.5
                    font-mono text-[10px] text-mist-300
                    transition-colors duration-300
                    hover:border-signal-400/30
                    hover:bg-signal-400/[0.05]
                    hover:text-signal-300
                    hover:shadow-[0_0_16px_rgba(45,212,191,0.06)]
                  "
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>
    </motion.article>
  );
}