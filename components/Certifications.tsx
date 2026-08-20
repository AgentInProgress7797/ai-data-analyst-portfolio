import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import {
  certifications,
  education,
} from "@/data/profile";

import PremiumCard from "@/components/PremiumCard";
import Reveal from "@/components/Reveal";

const currentLearning = [
  "Model Context Protocol",
  "Agent Memory",
  "RAG Architecture",
  "AI Evaluation",
  "Local LLM Optimization",
  "Enterprise AI Governance",
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section relative z-10"
    >
      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <Reveal>
        <p className="eyebrow">
          Learning &amp; Professional Development
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Building deeper expertise across AI, analytics and secure enterprise
          systems.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-3xl text-base leading-7 text-mist-400 sm:text-lg">
          I keep learning alongside the systems I work on. My current focus is
          understanding AI agents, model behaviour, security and the
          infrastructure needed to run AI reliably in an enterprise
          environment.
        </p>
      </Reveal>

      {/* =====================================================
          TOP SECTION
      ====================================================== */}

      <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* =================================================
            PROFESSIONAL CERTIFICATIONS
        ================================================== */}

        <div>
          <Reveal delay={0.12}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal-400/15 bg-signal-400/[0.05] text-signal-300">
                <BadgeCheck
                  size={19}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                  Completed Learning
                </p>

                <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                  Professional Certifications
                </h3>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
            {certifications.map((certification, index) => (
              <Reveal
                key={`${certification.name}-${index}`}
                delay={0.05 * index}
                className="h-full"
              >
                <PremiumCard
                  ariaLabel={`${certification.name} certification`}
                  enableTilt
                  tiltAmount={1.6}
                  className="group flex h-full min-h-[150px] rounded-2xl border border-white/[0.07] p-5"
                >
                  {/* Hover glow */}

                  <div
                    className="
                      pointer-events-none absolute
                      -right-12 -top-12
                      h-32 w-32 rounded-full
                      bg-signal-400/[0.08]
                      opacity-0 blur-3xl
                      transition-all duration-500
                      group-hover:scale-110
                      group-hover:opacity-100
                    "
                    aria-hidden="true"
                  />

                  {/* Lower ambient glow */}

                  <div
                    className="
                      pointer-events-none absolute
                      -bottom-16 -left-16
                      h-32 w-32 rounded-full
                      bg-cyan-400/[0.035]
                      blur-3xl
                    "
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal-400/20 bg-signal-400/[0.06] text-signal-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-signal-400/35 group-hover:bg-signal-400/[0.09]">
                      <BadgeCheck
                        size={18}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-6 text-white transition-colors duration-300 group-hover:text-signal-100 sm:text-base">
                        {certification.name}
                      </p>

                      {certification.issuer && (
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500">
                          {certification.issuer}
                        </p>
                      )}

                      <div className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-signal-400/65">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_7px_rgba(94,234,212,0.7)]"
                          aria-hidden="true"
                        />

                        Completed
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* =================================================
            CURRENT LEARNING
        ================================================== */}

        <Reveal
          delay={0.18}
          className="h-full"
        >
          <PremiumCard
            ariaLabel="Current learning topics"
            enableTilt
            tiltAmount={1.7}
            className="group h-full min-h-[320px] rounded-2xl border border-white/[0.07] p-6 sm:p-7"
          >
            <div
              className="
                pointer-events-none absolute
                -right-16 -top-16
                h-44 w-44 rounded-full
                bg-signal-400/[0.08]
                opacity-60 blur-3xl
                transition-all duration-500
                group-hover:scale-110
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <div
              className="
                pointer-events-none absolute
                -bottom-20 -left-20
                h-44 w-44 rounded-full
                bg-cyan-400/[0.035]
                blur-3xl
              "
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-signal-400/15 bg-signal-400/[0.05] text-signal-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-signal-400/30">
                  <Sparkles
                    size={18}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                    Current Focus
                  </p>

                  <h3 className="mt-1 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-signal-100">
                    Topics I am exploring now
                  </h3>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {currentLearning.map((topic) => (
                  <span
                    key={topic}
                    className="
                      rounded-full
                      border border-white/[0.08]
                      bg-white/[0.025]
                      px-3.5 py-2
                      font-mono text-[10px]
                      text-mist-300
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-signal-400/30
                      hover:bg-signal-400/[0.06]
                      hover:text-signal-300
                      hover:shadow-[0_0_16px_rgba(94,234,212,0.08)]
                    "
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-8 h-px bg-gradient-to-r from-signal-400/20 via-white/[0.06] to-transparent" />

              <p className="mt-6 text-sm leading-7 text-mist-400">
                These are areas I am currently testing and learning alongside
                my work with enterprise AI, agents and internal automation.
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-white/[0.05] pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-600">
                  Learning Status
                </span>

                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-400/75">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-60" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_7px_rgba(94,234,212,0.75)]" />
                  </span>

                  Active
                </span>
              </div>
            </div>
          </PremiumCard>
        </Reveal>
      </div>

      {/* =====================================================
          BOTTOM ALIGNED CARDS
      ====================================================== */}

      <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
        {/* =================================================
            EDUCATION
        ================================================== */}

        <Reveal
          delay={0.22}
          className="h-full"
        >
          <PremiumCard
            ariaLabel="Education and academic background"
            enableTilt
            tiltAmount={1.5}
            className="group h-full rounded-2xl border border-white/[0.07] p-6 sm:p-7"
          >
            <div
              className="
                pointer-events-none absolute
                -left-16 -top-16
                h-40 w-40 rounded-full
                bg-amber-300/[0.04]
                blur-3xl
                transition-opacity duration-500
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/[0.04] text-amber-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-amber-300/25">
                  <GraduationCap
                    size={19}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                    Academic Foundation
                  </p>

                  <h3 className="mt-1 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-amber-100">
                    Education
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {education.map((item) => (
                  <div
                    key={`${item.school}-${item.degree}`}
                    className="
                      rounded-xl
                      border border-white/[0.06]
                      bg-white/[0.02]
                      p-5
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-amber-300/15
                      hover:bg-amber-300/[0.025]
                    "
                  >
                    <p className="font-medium text-white sm:text-lg">
                      {item.school}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-mist-300 sm:text-base">
                      {item.degree}
                    </p>

                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.17em] text-mist-500">
                      {item.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </Reveal>

        {/* =================================================
            LEARNING PHILOSOPHY
        ================================================== */}

        <Reveal
          delay={0.26}
          className="h-full"
        >
          <PremiumCard
            ariaLabel="Learning philosophy"
            enableTilt
            tiltAmount={1.5}
            className="group h-full rounded-2xl border border-white/[0.07] p-6 sm:p-7"
          >
            <div
              className="
                pointer-events-none absolute
                -bottom-16 -right-16
                h-40 w-40 rounded-full
                bg-signal-400/[0.06]
                opacity-60 blur-3xl
                transition-all duration-500
                group-hover:scale-110
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-mist-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-signal-400/20 group-hover:text-signal-200">
                  <BookOpen
                    size={18}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                    Learning Philosophy
                  </p>

                  <h3 className="mt-1 font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-signal-100">
                    Learn, apply and refine.
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-mist-300 sm:text-base">
                I prefer learning through implementation. New concepts become
                valuable when they can be tested against real workflows,
                understood by users and improved through practical feedback.
              </p>

              <blockquote className="mt-6 rounded-r-xl border-l-2 border-signal-400/50 bg-signal-400/[0.018] py-3 pl-5 pr-4 transition-all duration-300 group-hover:border-signal-400/75 group-hover:bg-signal-400/[0.03]">
                <p className="text-sm italic leading-7 text-mist-200">
                  “Learning becomes meaningful when knowledge turns into
                  something useful.”
                </p>
              </blockquote>
            </div>
          </PremiumCard>
        </Reveal>
      </div>
    </section>
  );
}