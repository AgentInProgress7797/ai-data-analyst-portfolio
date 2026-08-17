"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Workflow,
  ArrowRight,
} from "lucide-react";

const systems = [
  {
    number: "01",
    title: "Enterprise AI Assistants",
    description:
      "Internal AI systems that connect users with LLMs, tools, documents and controlled enterprise resources.",
    icon: Bot,
    flow: ["USER", "ASSISTANT", "AGENT", "LLM", "TOOLS"],
    capabilities: [
      "LLM Integration",
      "Enterprise Access",
      "Model Routing",
    ],
  },

  {
    number: "02",
    title: "Agentic Workflows",
    description:
      "Agent-driven workflows that combine reasoning, tools and orchestration to execute multi-step business processes.",
    icon: BrainCircuit,
    flow: ["REQUEST", "AGENT", "REASON", "TOOL", "ACTION"],
    capabilities: [
      "AI Agents",
      "Tool Calling",
      "Orchestration",
    ],
  },

  {
    number: "03",
    title: "Data & BI Systems",
    description:
      "Analytics and reporting systems that transform operational data into structured insights and decision support.",
    icon: BarChart3,
    flow: ["DATA", "PROCESS", "ANALYZE", "VISUALIZE", "DECIDE"],
    capabilities: [
      "Analytics",
      "Power BI",
      "Decision Support",
    ],
  },

  {
    number: "04",
    title: "AI Automation & Integrations",
    description:
      "Practical automation connecting AI models, APIs, tools and enterprise applications to business workflows.",
    icon: Workflow,
    flow: ["TRIGGER", "AI", "API", "WORKFLOW", "ACTION"],
    capabilities: [
      "APIs",
      "Automation",
      "System Integration",
    ],
  },
];

function SystemFlow({
  flow,
  delay,
}: {
  flow: string[];
  delay: number;
}) {
  return (
    <div className="relative mt-7">
      <div className="flex items-center justify-between gap-1">
        {flow.map((item, index) => (
          <div
            key={item}
            className="relative flex min-w-0 flex-1 items-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="
                  relative flex h-7 w-7 items-center justify-center
                  rounded-full border border-white/10
                  bg-ink-950
                "
              >
                <div className="h-1.5 w-1.5 rounded-full bg-signal-400/50" />

                <motion.div
                  className="
                    absolute inset-0 rounded-full
                    border border-signal-400/40
                  "
                  animate={{
                    opacity: [0.15, 0.7, 0.15],
                    scale: [0.85, 1.08, 0.85],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: delay + index * 0.18,
                  }}
                />
              </div>

              <span
                className="
                  mt-2 hidden font-mono text-[8px]
                  uppercase tracking-[0.12em]
                  text-white/30 sm:block
                "
              >
                {item}
              </span>
            </div>

            {index < flow.length - 1 && (
              <div
                className="
                  relative mx-1 h-px flex-1
                  overflow-hidden bg-white/[0.08]
                "
              >
                <motion.div
                  className="
                    absolute inset-y-0 w-8
                    bg-gradient-to-r
                    from-transparent
                    via-signal-400
                    to-transparent
                  "
                  animate={{
                    x: ["-150%", "450%"],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay + index * 0.12,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Systems() {
  return (
    <section
      id="systems"
      className="
        relative overflow-hidden
        px-5 py-24
        sm:px-8
        lg:px-10 lg:py-32
      "
    >
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[500px] w-[70%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-signal-400/[0.025]
          blur-[130px]
        "
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
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
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-end
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <BrainCircuit
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
                What I Build
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
              AI systems for
              <span className="text-signal-400">
                {" "}
                real business work.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-2xl text-sm
              leading-7 text-white/45
              sm:text-base
            "
          >
            I work at the intersection of AI, data,
            agents and automation — building practical
            systems that connect models, tools, information
            and business workflows.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {systems.map((system, index) => {
            const Icon = system.icon;

            return (
              <motion.article
                key={system.title}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  group relative overflow-hidden
                  rounded-[26px]
                  border border-white/[0.075]
                  bg-[#07101a]/70
                  p-5
                  backdrop-blur-xl
                  transition-colors duration-300
                  hover:border-signal-400/20
                  sm:p-7
                "
              >
                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-48 w-48 rounded-full
                    bg-signal-400/[0.025]
                    blur-[65px]
                    transition duration-500
                    group-hover:bg-signal-400/[0.065]
                  "
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-2xl
                        border border-signal-400/15
                        bg-signal-400/[0.05]
                      "
                    >
                      <Icon
                        size={19}
                        className="text-signal-400"
                      />
                    </div>

                    <span
                      className="
                        font-mono text-xs
                        tracking-[0.18em]
                        text-white/18
                      "
                    >
                      {system.number}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-6 font-display
                      text-xl font-semibold
                      tracking-[-0.02em]
                      text-white
                      sm:text-2xl
                    "
                  >
                    {system.title}
                  </h3>

                  <p
                    className="
                      mt-3 max-w-xl
                      text-sm leading-7
                      text-white/45
                    "
                  >
                    {system.description}
                  </p>

                  <SystemFlow
                    flow={system.flow}
                    delay={index * 0.3}
                  />

                  <div className="mt-7 flex flex-wrap gap-2">
                    {system.capabilities.map(
                      (capability) => (
                        <span
                          key={capability}
                          className="
                            rounded-full
                            border border-white/[0.07]
                            bg-white/[0.02]
                            px-3 py-1.5
                            font-mono text-[9px]
                            uppercase
                            tracking-[0.1em]
                            text-white/35
                          "
                        >
                          {capability}
                        </span>
                      ),
                    )}
                  </div>

                  <div
                    className="
                      mt-7 flex items-center
                      gap-2 border-t
                      border-white/[0.06]
                      pt-5
                    "
                  >
                    <span
                      className="
                        text-[9px] font-semibold
                        uppercase tracking-[0.17em]
                        text-white/30
                        transition-colors
                        group-hover:text-signal-400/70
                      "
                    >
                      System Capability
                    </span>

                    <ArrowRight
                      size={12}
                      className="
                        text-white/20
                        transition-all
                        group-hover:translate-x-1
                        group-hover:text-signal-400/60
                      "
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom positioning line */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="
            mt-8 flex flex-wrap
            items-center justify-center
            gap-x-3 gap-y-2
            text-center
          "
        >
          {[
            "AI",
            "DATA",
            "AGENTS",
            "AUTOMATION",
            "BUSINESS IMPACT",
          ].map((item, index, array) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <span
                className="
                  font-mono text-[9px]
                  tracking-[0.16em]
                  text-white/25
                "
              >
                {item}
              </span>

              {index < array.length - 1 && (
                <span className="text-signal-400/25">
                  /
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}