"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  LockKeyhole,
  Network,
  Sparkles,
  Target,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  portfolioProjects,
  type PortfolioProject,
} from "@/data/projects";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ProjectStatus = PortfolioProject["status"];

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function statusLabel(status: ProjectStatus) {
  switch (status) {
    case "Operational":
      return "Operational";
    case "In Development":
      return "In Development";
    case "Completed":
      return "Completed";
    default:
      return status;
  }
}

function statusDot(status: ProjectStatus) {
  if (status === "Operational") {
    return "bg-emerald-400";
  }

  if (status === "In Development") {
    return "bg-amber-400";
  }

  return "bg-signal-400";
}

/* -------------------------------------------------------------------------- */
/*                               SECTION LABEL                                */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.2em] text-signal-400">
        {number}
      </span>

      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
        {children}
      </span>

      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              PROJECT METRICS                               */
/* -------------------------------------------------------------------------- */

function ProjectMetrics({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {project.metrics.map((metric) => (
        <div
          key={`${project.id}-${metric.label}`}
          className="
            relative overflow-hidden rounded-2xl
            border border-white/[0.07]
            bg-white/[0.025]
            px-4 py-4
          "
        >
          <div
            className="
              pointer-events-none absolute inset-x-0 top-0
              h-px bg-gradient-to-r
              from-transparent via-signal-400/35 to-transparent
            "
          />

          <p
            className="
              font-display text-xl font-semibold
              tracking-tight text-white
              sm:text-2xl
            "
          >
            {metric.value}
          </p>

          <p
            className="
              mt-1 text-[10px] uppercase
              tracking-[0.16em] text-white/35
            "
          >
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          ARCHITECTURE FLOW                                 */
/* -------------------------------------------------------------------------- */

function ArchitectureFlow({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="relative">
      {/* Desktop horizontal signal line */}
      <div
        className="
          pointer-events-none absolute
          left-[8%] right-[8%] top-[43px]
          hidden h-px overflow-hidden
          bg-white/[0.08]
          lg:block
        "
      >
        <motion.div
          className="
            absolute inset-y-0 w-24
            bg-gradient-to-r
            from-transparent via-signal-400 to-transparent
          "
          animate={{
            x: ["-100%", "900%"],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className="
          grid gap-3
          lg:grid-cols-5
        "
      >
        {project.architecture.map((node, index) => (
          <motion.div
            key={`${project.id}-${node.title}`}
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.07,
            }}
            className="relative"
          >
            <div
              className="
                group relative h-full overflow-hidden
                rounded-2xl border border-white/[0.08]
                bg-[#08111d]/80 p-4
                transition duration-300
                hover:-translate-y-1
                hover:border-signal-400/25
                hover:bg-[#0a1624]/90
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-xl border border-signal-400/20
                    bg-signal-400/[0.06]
                  "
                >
                  <span className="font-mono text-xs text-signal-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <motion.div
                  className="
                    h-2 w-2 rounded-full
                    bg-signal-400
                    shadow-[0_0_12px_rgba(45,212,191,0.9)]
                  "
                  animate={{
                    opacity: [0.25, 1, 0.25],
                    scale: [0.8, 1.25, 0.8],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: index * 0.25,
                  }}
                />
              </div>

              <h4 className="text-sm font-semibold text-white">
                {node.title}
              </h4>

              <p className="mt-1 text-xs leading-relaxed text-signal-400/70">
                {node.subtitle}
              </p>

              <ul className="mt-4 space-y-2">
                {node.details.map((detail) => (
                  <li
                    key={detail}
                    className="
                      flex gap-2 text-[11px]
                      leading-relaxed text-white/42
                    "
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/25" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile connector */}
            {index < project.architecture.length - 1 && (
              <div className="flex h-7 justify-center lg:hidden">
                <div className="relative h-full w-px bg-white/10">
                  <motion.div
                    className="
                      absolute left-1/2 top-0
                      h-2 w-2 -translate-x-1/2
                      rounded-full bg-signal-400
                      shadow-[0_0_12px_rgba(45,212,191,0.85)]
                    "
                    animate={{
                      y: [0, 20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.18,
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            STORY COLUMN                                    */
/* -------------------------------------------------------------------------- */

function StoryItem({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl border border-white/[0.07]
        bg-white/[0.025] p-5
      "
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-signal-400">{icon}</span>

        <p
          className="
            text-[10px] font-semibold uppercase
            tracking-[0.18em] text-white/40
          "
        >
          {label}
        </p>
      </div>

      <p className="text-sm leading-7 text-white/62">
        {children}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            CASE STUDY MODAL                                */
/* -------------------------------------------------------------------------- */

function CaseStudyModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="
        fixed inset-0 z-[100]
        flex items-end justify-center
        bg-black/70 backdrop-blur-md
        sm:items-center sm:p-5
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
        initial={{
          opacity: 0,
          y: 45,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 30,
          scale: 0.99,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative max-h-[94vh] w-full
          max-w-7xl overflow-y-auto
          rounded-t-[28px]
          border border-white/[0.08]
          bg-[#050b13]
          shadow-2xl
          sm:rounded-[28px]
        "
      >
        {/* Top ambient glow */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-0 h-[280px] w-[70%]
            -translate-x-1/2
            rounded-full
            bg-signal-400/[0.05]
            blur-[100px]
          "
        />

        {/* Header */}
        <div
          className="
            sticky top-0 z-20
            border-b border-white/[0.07]
            bg-[#050b13]/90
            px-5 py-4
            backdrop-blur-xl
            sm:px-7
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  truncate font-mono text-[10px]
                  uppercase tracking-[0.18em]
                  text-signal-400/70
                "
              >
                Case Study / {project.shortName}
              </p>

              <p className="mt-1 truncate text-sm font-medium text-white/75">
                {project.category}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full border border-white/10
                bg-white/[0.035]
                text-white/60
                transition
                hover:border-white/20
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          {/* Hero */}
          <div
            className="
              grid gap-8
              lg:grid-cols-[1.15fr_0.85fr]
              lg:items-end
            "
          >
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div
                  className="
                    inline-flex items-center gap-2
                    rounded-full border border-white/10
                    bg-white/[0.035]
                    px-3 py-1.5
                  "
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusDot(
                      project.status,
                    )}`}
                  />

                  <span
                    className="
                      text-[10px] font-semibold
                      uppercase tracking-[0.14em]
                      text-white/55
                    "
                  >
                    {statusLabel(project.status)}
                  </span>
                </div>

                <span className="font-mono text-xs text-white/30">
                  {project.year}
                </span>

                {project.id === "magic-ai" && (
                  <div
                    className="
                      inline-flex items-center gap-1.5
                      rounded-full border border-white/[0.08]
                      px-3 py-1.5
                      text-[10px] uppercase
                      tracking-[0.14em] text-white/35
                    "
                  >
                    <LockKeyhole size={11} />
                    Internal system
                  </div>
                )}
              </div>

              <h2
                className="
                  max-w-4xl font-display
                  text-4xl font-semibold
                  tracking-[-0.04em] text-white
                  sm:text-5xl lg:text-6xl
                "
              >
                {project.name}
              </h2>

              <p
                className="
                  mt-3 text-sm font-medium
                  uppercase tracking-[0.16em]
                  text-signal-400/75
                "
              >
                {project.category}
              </p>

              <p
                className="
                  mt-6 max-w-3xl
                  text-base leading-8
                  text-white/55
                "
              >
                {project.description}
              </p>
            </div>

            <ProjectMetrics project={project} />
          </div>

          {/* Story */}
          <section className="mt-14">
            <SectionLabel number="01">Project Story</SectionLabel>

            <div className="grid gap-3 lg:grid-cols-3">
              <StoryItem
                label="Challenge"
                icon={<Target size={15} />}
              >
                {project.story.challenge}
              </StoryItem>

              <StoryItem
                label="Approach"
                icon={<Layers3 size={15} />}
              >
                {project.story.approach}
              </StoryItem>

              <StoryItem
                label="Result"
                icon={<Zap size={15} />}
              >
                {project.story.result}
              </StoryItem>
            </div>
          </section>

          {/* Architecture */}
          <section className="mt-14">
            <SectionLabel number="02">
              System Architecture
            </SectionLabel>

            <ArchitectureFlow project={project} />
          </section>

          {/* Role / Impact */}
          <section className="mt-14">
            <SectionLabel number="03">
              Contribution & Impact
            </SectionLabel>

            <div className="grid gap-4 lg:grid-cols-2">
              <div
                className="
                  rounded-2xl border border-white/[0.07]
                  bg-white/[0.025] p-5 sm:p-6
                "
              >
                <div className="mb-5 flex items-center gap-2">
                  <UserRound
                    size={16}
                    className="text-signal-400"
                  />

                  <h3
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.16em] text-white/55
                    "
                  >
                    My Role
                  </h3>
                </div>

                <div className="space-y-3">
                  {project.responsibilities.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3"
                    >
                      <div
                        className="
                          mt-0.5 flex h-5 w-5
                          shrink-0 items-center justify-center
                          rounded-full
                          border border-signal-400/20
                          bg-signal-400/[0.06]
                        "
                      >
                        <Check
                          size={11}
                          className="text-signal-400"
                        />
                      </div>

                      <p className="text-sm leading-6 text-white/55">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="
                  rounded-2xl border border-white/[0.07]
                  bg-white/[0.025] p-5 sm:p-6
                "
              >
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles
                    size={16}
                    className="text-signal-400"
                  />

                  <h3
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.16em] text-white/55
                    "
                  >
                    Impact
                  </h3>
                </div>

                <div className="space-y-3">
                  {project.impact.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3"
                    >
                      <div
                        className="
                          mt-2 h-1.5 w-1.5
                          shrink-0 rounded-full
                          bg-signal-400
                          shadow-[0_0_8px_rgba(45,212,191,0.7)]
                        "
                      />

                      <p className="text-sm leading-6 text-white/55">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="mt-14">
            <SectionLabel number="04">
              Technology & Capabilities
            </SectionLabel>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="
                    rounded-full border border-white/[0.08]
                    bg-white/[0.025]
                    px-3.5 py-2
                    font-mono text-[10px]
                    uppercase tracking-[0.12em]
                    text-white/45
                    transition
                    hover:border-signal-400/25
                    hover:bg-signal-400/[0.05]
                    hover:text-signal-300
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          </section>

          {/* External links */}
          {(project.liveUrl || project.sourceUrl) && (
            <section className="mt-12 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex items-center gap-2
                    rounded-xl border border-signal-400/20
                    bg-signal-400/[0.07]
                    px-4 py-3 text-xs font-medium
                    text-signal-300 transition
                    hover:border-signal-400/35
                    hover:bg-signal-400/[0.1]
                  "
                >
                  <ExternalLink size={14} />
                  Live Project
                </a>
              )}

              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex items-center gap-2
                    rounded-xl border border-white/10
                    bg-white/[0.03]
                    px-4 py-3 text-xs font-medium
                    text-white/60 transition
                    hover:border-white/20
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  <Github size={14} />
                  Repository
                </a>
              )}
            </section>
          )}

          {project.id === "magic-ai" && (
            <div
              className="
                mt-12 flex items-start gap-3
                rounded-2xl border border-white/[0.06]
                bg-white/[0.02] p-4
              "
            >
              <LockKeyhole
                size={15}
                className="mt-0.5 shrink-0 text-white/30"
              />

              <p className="text-xs leading-6 text-white/35">
                This case study presents a high-level view of an internal
                enterprise system. Sensitive infrastructure, credentials,
                internal addresses and confidential implementation details
                are intentionally excluded.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PROJECT CARD                                 */
/* -------------------------------------------------------------------------- */

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 26,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
      }}
      className="
        group relative overflow-hidden
        rounded-[26px]
        border border-white/[0.075]
        bg-[#07101a]/75
        backdrop-blur-xl
        transition duration-500
        hover:-translate-y-1
        hover:border-signal-400/20
      "
    >
      {/* Ambient card glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-52 w-52 rounded-full
          bg-signal-400/[0.035]
          blur-[70px]
          transition duration-500
          group-hover:bg-signal-400/[0.06]
        "
      />

      <div className="relative p-5 sm:p-7">
        {/* Meta */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full border border-white/[0.08]
                bg-white/[0.025]
                px-3 py-1.5
              "
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusDot(
                  project.status,
                )}`}
              />

              <span
                className="
                  text-[9px] font-semibold uppercase
                  tracking-[0.15em] text-white/45
                "
              >
                {statusLabel(project.status)}
              </span>
            </div>

            <span className="font-mono text-[10px] text-white/25">
              {project.year}
            </span>
          </div>

          <span
            className="
              font-mono text-xs tracking-[0.18em]
              text-white/18
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Heading */}
        <div className="mt-7">
          <p
            className="
              text-[10px] font-semibold uppercase
              tracking-[0.2em]
              text-signal-400/65
            "
          >
            {project.category}
          </p>

          <h3
            className="
              mt-2 font-display text-2xl
              font-semibold tracking-[-0.03em]
              text-white sm:text-3xl
            "
          >
            {project.name}
          </h3>

          <p
            className="
              mt-4 max-w-2xl text-sm
              leading-7 text-white/48
            "
          >
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-7">
          <ProjectMetrics project={project} />
        </div>

        {/* Tech preview */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((technology) => (
            <span
              key={technology}
              className="
                rounded-full border border-white/[0.07]
                bg-white/[0.02]
                px-3 py-1.5
                font-mono text-[9px]
                uppercase tracking-[0.1em]
                text-white/35
              "
            >
              {technology}
            </span>
          ))}

          {project.technologies.length > 5 && (
            <span
              className="
                rounded-full border border-white/[0.05]
                px-3 py-1.5
                font-mono text-[9px]
                text-white/25
              "
            >
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onOpen}
          className="
            mt-8 flex w-full items-center
            justify-between rounded-2xl
            border border-white/[0.075]
            bg-white/[0.025]
            px-4 py-3.5
            text-left transition
            hover:border-signal-400/25
            hover:bg-signal-400/[0.045]
          "
        >
          <span
            className="
              text-[10px] font-semibold uppercase
              tracking-[0.18em]
              text-white/55
            "
          >
            View Case Study
          </span>

          <ArrowUpRight
            size={16}
            className="
              text-signal-400
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          portfolioProjects.map(
            (project) => project.category,
          ),
        ),
      ),
    ];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") {
      return portfolioProjects;
    }

    return portfolioProjects.filter(
      (project) =>
        project.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <>
      <section
        id="projects"
        className="
          relative overflow-hidden
          px-5 py-24
          sm:px-8
          lg:px-10 lg:py-32
        "
      >
        {/* Background treatment */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-20
            h-[420px] w-[70%]
            -translate-x-1/2
            rounded-full
            bg-signal-400/[0.025]
            blur-[120px]
          "
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.55,
            }}
            className="
              grid gap-6
              lg:grid-cols-[0.8fr_1.2fr]
              lg:items-end
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <Code2
                  size={16}
                  className="text-signal-400"
                />

                <p
                  className="
                    font-mono text-[10px]
                    uppercase tracking-[0.24em]
                    text-signal-400/70
                  "
                >
                  Selected Work
                </p>
              </div>

              <h2
                className="
                  mt-4 max-w-xl font-display
                  text-4xl font-semibold
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                "
              >
                Systems built around
                <span className="text-signal-400">
                  {" "}
                  AI, data & automation.
                </span>
              </h2>
            </div>

            <div className="lg:pb-1">
              <p
                className="
                  max-w-2xl text-sm leading-7
                  text-white/45
                  sm:text-base
                "
              >
                A selection of practical systems and products
                covering enterprise AI, recruitment technology
                and interactive application development.
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <div
            className="
              mt-10 flex gap-2 overflow-x-auto
              pb-2 [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {categories.map((category) => {
              const active =
                category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    shrink-0 rounded-full
                    border px-4 py-2
                    text-[10px] font-semibold
                    uppercase tracking-[0.14em]
                    transition
                    ${
                      active
                        ? "border-signal-400/30 bg-signal-400/[0.08] text-signal-300"
                        : "border-white/[0.07] bg-white/[0.02] text-white/35 hover:border-white/15 hover:text-white/60"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Project cards */}
          <div
            className="
              mt-8 grid gap-5
              lg:grid-cols-2
            "
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={() =>
                      setSelectedProject(project)
                    }
                  />
                ),
              )}
            </AnimatePresence>
          </div>

          {/* Bottom note */}
          <div
            className="
              mt-8 flex items-center
              justify-center gap-2
              text-center
            "
          >
            <Network
              size={13}
              className="text-white/20"
            />

            <p
              className="
                text-[10px] uppercase
                tracking-[0.14em]
                text-white/22
              "
            >
              Open a project to explore its architecture,
              contribution and impact
            </p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() =>
              setSelectedProject(null)
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}