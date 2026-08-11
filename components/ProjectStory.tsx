"use client";

import { motion } from "framer-motion";
import type { PortfolioProject } from "@/data/projects";

const sections = [
  {
    key: "challenge",
    title: "Challenge",
    color: "bg-rose-400",
  },
  {
    key: "approach",
    title: "Approach",
    color: "bg-amber-400",
  },
  {
    key: "result",
    title: "Result",
    color: "bg-emerald-400",
  },
] as const;

export default function ProjectStory({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-300">
        Project Story
      </p>

      <h4 className="mt-2 text-lg font-medium text-white">
        From problem to outcome
      </h4>

      <div className="mt-6 space-y-5">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="rounded-2xl border border-white/[0.06] bg-black/[0.08] p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${section.color}`}
              />

              <h5 className="text-white font-medium">
                {section.title}
              </h5>
            </div>

            <p className="mt-3 text-sm leading-7 text-mist-500">
              {project.story[section.key]}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}