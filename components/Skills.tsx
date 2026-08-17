import { skillGroups } from "@/data/profile";
import PremiumCard from "@/components/PremiumCard";
import Reveal from "@/components/Reveal";

const categoryMeta: Record<
  string,
  {
    number: string;
    description: string;
  }
> = {
  "AI & LLM Systems": {
    number: "01",
    description:
      "Working with Generative AI and large language models for internal applications, business workflows and enterprise use cases.",
  },

  "AI Agents & Automation": {
    number: "02",
    description:
      "Building agent-based workflows where AI can use tools, follow defined processes and support multi-step business tasks.",
  },

  "Data Analytics & Business Intelligence": {
    number: "03",
    description:
      "Using data from business systems to build dashboards, reports and analysis that support day-to-day and management decisions.",
  },

  "Enterprise Systems & Integration": {
    number: "04",
    description:
      "Connecting AI and analytics solutions with internal applications, APIs, enterprise platforms and existing business processes.",
  },

  "AI Infrastructure & Operations": {
    number: "05",
    description:
      "Working with AI deployment, model routing, local and cloud models, session configuration and the operational side of running AI systems.",
  },

  "AI Security & Access": {
    number: "06",
    description:
      "Managing authentication, permissions, access controls and governance requirements for internal AI environments.",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section relative z-10">
      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <Reveal>
        <p className="eyebrow">Technical Expertise</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
          The technical areas behind the systems I work on.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-base leading-7 text-mist-400">
          My work covers AI, data, automation and enterprise systems. Depending
          on the problem, that can mean working with an LLM, building an agent
          workflow, analysing business data, connecting an internal system or
          handling the infrastructure and access needed to run it reliably.
        </p>
      </Reveal>

      {/* =====================================================
          SKILLS GRID
      ====================================================== */}

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const meta = categoryMeta[group.category];

          const capabilityNumber =
            meta?.number ?? String(index + 1).padStart(2, "0");

          return (
            <Reveal
              key={group.category}
              delay={0.06 * index}
              className="h-full"
            >
              <PremiumCard
                ariaLabel={`${group.category} skills`}
                enableTilt
                tiltAmount={1.8}
                className="group h-full rounded-2xl p-6"
              >
                {/* =================================================
                    TOP HOVER GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none absolute
                    -right-16 -top-16
                    h-40 w-40 rounded-full
                    bg-signal-400/10
                    opacity-0 blur-3xl
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:opacity-100
                  "
                  aria-hidden="true"
                />

                {/* =================================================
                    LOWER AMBIENT GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none absolute
                    -bottom-24 -left-20
                    h-44 w-44 rounded-full
                    bg-cyan-400/[0.04]
                    blur-3xl
                  "
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col">
                  {/* ===============================================
                      CARD HEADER
                  ================================================ */}

                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal-400/70">
                        Capability {capabilityNumber}
                      </p>

                      <h3 className="mt-3 max-w-sm font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-signal-300">
                        {group.category}
                      </h3>
                    </div>

                    <span
                      className="
                        font-mono text-3xl font-semibold
                        text-white/[0.04]
                        transition-all duration-500
                        group-hover:-translate-y-1
                        group-hover:text-signal-400/10
                      "
                      aria-hidden="true"
                    >
                      {capabilityNumber}
                    </span>
                  </div>

                  {/* ===============================================
                      DESCRIPTION
                  ================================================ */}

                  {meta?.description && (
                    <p className="mt-4 max-w-xl text-sm leading-6 text-mist-500">
                      {meta.description}
                    </p>
                  )}

                  {/* ===============================================
                      DIVIDER
                  ================================================ */}

                  <div className="my-5 h-px bg-gradient-to-r from-signal-400/20 via-white/[0.06] to-transparent" />

                  {/* ===============================================
                      SKILLS
                  ================================================ */}

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          rounded-full
                          border border-white/[0.07]
                          bg-white/[0.025]
                          px-3 py-1.5
                          font-mono text-[11px]
                          text-mist-300
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:border-signal-400/35
                          hover:bg-signal-400/[0.06]
                          hover:text-signal-300
                          hover:shadow-[0_0_16px_rgba(94,234,212,0.08)]
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* ===============================================
                      STATUS ROW
                  ================================================ */}

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-600">
                        Capability Stack
                      </span>

                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-400/70">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_7px_rgba(94,234,212,0.7)]"
                          aria-hidden="true"
                        />

                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}