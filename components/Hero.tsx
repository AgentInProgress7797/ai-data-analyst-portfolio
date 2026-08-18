"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import dynamic from "next/dynamic";

import {
  motion,
  type Variants,
} from "framer-motion";

import {
  ArrowDown,
  Download,
  Linkedin,
  Mail,
} from "lucide-react";

import AnimatedStats from "@/components/AnimatedStats";
import SkillTicker from "@/components/SkillTicker";

import { personal } from "@/data/profile";

/* =========================================================
   THREE.JS SCENE
========================================================= */

const OrbScene = dynamic(
  () => import("@/components/OrbScene"),
  {
    ssr: false,

    loading: () => (
      <div
        className="h-full w-full"
        aria-hidden="true"
      />
    ),
  }
);

/* =========================================================
   ENTRANCE ANIMATIONS
========================================================= */

const stagger: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.25, 0, 0, 1],
    },
  },
};

/* =========================================================
   HERO COMPONENT
========================================================= */

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden pt-20"
    >
      {/* =====================================================
          BACKGROUND LAYERS
      ====================================================== */}

      <div
        className="hero-grain pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div
        className="hero-grid pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div
        className="hero-aurora pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="hero-aurora-core" />

        <div className="hero-aurora-wing hero-aurora-wing--left" />

        <div className="hero-aurora-wing hero-aurora-wing--right" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="section relative z-10 flex flex-1 flex-col justify-center py-7 sm:py-8 lg:py-10">
        <div className="grid items-center gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          {/* =================================================
              MOBILE / TABLET AVATAR
          ================================================== */}

          <MobileAvatar />

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Eyebrow */}

            <motion.p
              variants={item}
              className="eyebrow mb-4 inline-flex max-w-2xl items-start gap-2"
            >
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400 shadow-[0_0_6px_2px_rgba(94,234,212,0.6)]"
                aria-hidden="true"
              />

              <span>
                {personal.heroEyebrow}
              </span>
            </motion.p>

            {/* Heading — rendered immediately for LCP performance */}

<h1
  className="max-w-[700px] text-[clamp(2.55rem,10vw,4.2rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-white sm:text-[clamp(3rem,7vw,4.2rem)]"
>
  <span className="block">
    {personal.heroTitle}
  </span>

  <span className="gradient-text mt-1 block">
    {personal.heroHighlight}
  </span>
</h1>

            {/* Introduction */}

            <motion.p
              variants={item}
              className="mt-5 max-w-[620px] text-[15px] leading-[1.75] text-mist-300 sm:text-[17px]"
            >
              <span className="font-semibold text-white">
                I&apos;m {personal.name}.
              </span>{" "}
              {personal.heroDescription}
            </motion.p>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
            >
              {/* Resume */}

              <a
                href={personal.resumeUrl}
                download
                data-cursor="download"
                data-cursor-label="GET"
                className="inline-flex items-center gap-2 rounded-full bg-signal-500 px-5 py-2.5 font-mono text-sm font-medium text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(45,212,191,0.4)]"
              >
                <Download
                  size={15}
                  aria-hidden="true"
                />

                <span>Resume</span>
              </a>

              {/* Contact */}

              <a
                href="#contact"
                data-cursor="contact"
                data-cursor-label="CONNECT"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.015] px-5 py-2.5 font-mono text-sm text-mist-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-400/40 hover:bg-signal-400/[0.04] hover:text-signal-300"
              >
                <Mail
                  size={15}
                  aria-hidden="true"
                />

                <span>
                  Let&apos;s Connect
                </span>
              </a>

              {/* LinkedIn */}

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                data-cursor-label="OPEN"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.015] px-5 py-2.5 font-mono text-sm text-mist-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-400/40 hover:bg-signal-400/[0.04] hover:text-signal-300"
              >
                <Linkedin
                  size={15}
                  aria-hidden="true"
                />

                <span>
                  LinkedIn Profile
                </span>
              </a>
            </motion.div>

            {/* Statistics */}

            <motion.div
              variants={item}
              className="mt-9 sm:mt-10"
            >
              <AnimatedStats />
            </motion.div>
          </motion.div>

          {/* =================================================
              DESKTOP AVATAR AREA
          ================================================== */}

          <DesktopAvatar />
        </div>
      </div>

      {/* =====================================================
          SKILL TICKER
      ====================================================== */}

      <div className="relative z-10 mt-2 border-t border-white/[0.05] pb-6 pt-6">
        <SkillTicker />
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 text-mist-700 transition-colors duration-300 hover:text-signal-400 sm:bottom-5 sm:block lg:bottom-8"
      >
        <ArrowDown
          size={20}
          aria-hidden="true"
        />
      </motion.a>
    </section>
  );
}

/* =========================================================
   MOBILE AVATAR
========================================================= */

function MobileAvatar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.85,
        delay: 0.18,
        ease: [0.25, 0, 0, 1],
      }}
      className="relative flex w-full items-center justify-center lg:hidden"
    >
      <div className="relative flex h-[255px] w-[255px] items-center justify-center sm:h-[290px] sm:w-[290px]">
        {/* Ambient glow */}

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.12, 0.28, 0.12],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-5 rounded-full bg-signal-400/[0.12] blur-[55px]"
        />

        {/* Outer rotating dotted halo */}

        <motion.div
          aria-hidden="true"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-[15px] rounded-full border border-dashed border-signal-400/25"
        />

        {/* Secondary reverse halo */}

        <motion.div
          aria-hidden="true"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-[28px] rounded-full border border-white/[0.07]"
        />

        {/* Small moving orbit node */}

        <motion.div
          aria-hidden="true"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-[14px]"
        >
          <span className="absolute left-1/2 top-[-3px] h-2 w-2 -translate-x-1/2 rounded-full bg-signal-200 shadow-[0_0_12px_rgba(94,234,212,0.9)]" />
        </motion.div>

        {/* Pulse ring */}

        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1, 1.16],
            opacity: [0.16, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute inset-[37px] rounded-full border border-signal-400/20"
        />

        {/* Floating avatar */}

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20"
        >
          {/* Holographic border */}

          <motion.div
            aria-hidden="true"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -inset-[3px] rounded-full bg-[conic-gradient(from_180deg,transparent_0deg,rgba(94,234,212,0.12)_55deg,rgba(45,212,191,0.72)_110deg,transparent_170deg,rgba(103,232,249,0.18)_245deg,transparent_360deg)]"
          />

          {/* Avatar */}

          <div
            data-cursor="avatar"
            className="relative h-[178px] w-[178px] overflow-hidden rounded-full border border-signal-400/25 bg-[#061211] shadow-[0_0_24px_rgba(45,212,191,0.18),0_0_55px_rgba(45,212,191,0.07)] sm:h-[205px] sm:w-[205px]"
          >
            <Image
              src={personal.avatarUrl}
              alt={`${personal.name} profile photograph`}
              fill
              priority
              sizes="(max-width: 640px) 178px, 205px"
              className="object-cover object-[center_20%] saturate-[0.94] contrast-[1.03]"
            />

            {/* Subtle image tint */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-black/20"
            />

            {/* Edge vignette */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,transparent_58%,rgba(3,10,11,0.04)_80%,rgba(2,8,9,0.26)_100%)]"
            />

            {/* Inner ring */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[5px] rounded-full border border-signal-300/20"
            />
          </div>
        </motion.div>

        {/* =====================================================
            MOBILE CHIPS
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -3, 0],
          }}
          transition={{
            opacity: {
              delay: 0.8,
              duration: 0.5,
            },

            x: {
              delay: 0.8,
              duration: 0.5,
            },

            y: {
              delay: 1.3,
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="pointer-events-none absolute left-[-5px] top-[28%] z-30 whitespace-nowrap rounded-full border border-signal-400/15 bg-[#07110f]/90 px-3 py-1.5 font-mono text-[9px] text-signal-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:left-[-18px] sm:text-[10px]"
        >
          🧠 Agentic AI
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 10,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, 3, 0],
          }}
          transition={{
            opacity: {
              delay: 1,
              duration: 0.5,
            },

            x: {
              delay: 1,
              duration: 0.5,
            },

            y: {
              delay: 1.4,
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="pointer-events-none absolute bottom-[22%] right-[-12px] z-30 whitespace-nowrap rounded-full border border-signal-400/15 bg-[#07110f]/90 px-3 py-1.5 font-mono text-[9px] text-signal-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-[-24px] sm:text-[10px]"
        >
          📈 Data Analytics
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   DESKTOP AVATAR
========================================================= */

function DesktopAvatar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        delay: 0.4,
        ease: [0.25, 0, 0, 1],
      }}
      className="relative hidden h-[540px] w-full -translate-y-28 items-center justify-center overflow-visible lg:flex"
    >
      <div className="relative h-[540px] w-full max-w-[760px] overflow-visible">
        {/* Ambient glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-1/2 top-[42%] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/10 blur-[90px]"
          aria-hidden="true"
        />

        {/* Three.js orb and particles — aligned with avatar */}

<div className="pointer-events-none absolute inset-0 z-0 -translate-y-[8%] overflow-visible bg-transparent">
  <OrbScene />
</div>

        {/* Fixed avatar positioning wrapper */}

        <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2">
          {/* Gentle floating motion */}

          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Soft background glow */}

            <motion.div
              animate={{
                scale: [0.98, 1.05, 0.98],
                opacity: [0.1, 0.22, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -inset-10 rounded-full bg-signal-400/12 blur-3xl"
              aria-hidden="true"
            />

            {/* Dashed rotating halo */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute -inset-5 rounded-full border border-dashed border-signal-400/25"
              aria-hidden="true"
            />

            {/* Secondary subtle halo */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 34,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute -inset-9 rounded-full border border-signal-400/10"
              aria-hidden="true"
            />

            {/* Soft outward pulse */}

            <motion.div
              animate={{
                scale: [1, 1.1],
                opacity: [0.12, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute -inset-4 rounded-full border border-signal-400/12"
              aria-hidden="true"
            />

            {/* =================================================
                INTERACTIVE AVATAR
            ================================================== */}

            <motion.div
              data-cursor="avatar"
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="group relative cursor-pointer rounded-full p-[3px]"
            >
              {/* Hover glow behind avatar */}

              <motion.div
                variants={{
                  rest: {
                    opacity: 0.08,
                    scale: 0.96,
                  },

                  hover: {
                    opacity: 0.58,
                    scale: 1.14,
                  },
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute -inset-8 rounded-full bg-signal-400/25 blur-3xl"
                aria-hidden="true"
              />

              {/* Teal holographic border */}

              <motion.div
                variants={{
                  rest: {
                    opacity: 0.35,
                    rotate: 0,
                  },

                  hover: {
                    opacity: 1,
                    rotate: 28,
                  },
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,transparent_0deg,rgba(94,234,212,0.07)_45deg,rgba(45,212,191,0.82)_100deg,transparent_155deg,rgba(103,232,249,0.2)_235deg,transparent_360deg)]"
                aria-hidden="true"
              />

              {/* Main avatar frame */}

              <motion.div
                variants={{
                  rest: {
                    scale: 1,
                  },

                  hover: {
                    scale: 1.025,
                  },
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0, 0, 1],
                }}
                className="relative h-[310px] w-[310px] overflow-hidden rounded-full border border-signal-400/15 bg-[#061211] shadow-[0_0_18px_rgba(45,212,191,0.15),0_0_48px_rgba(45,212,191,0.06)]"
              >
                {/* Black-and-white by default */}

                <Image
                  src={personal.avatarUrl}
                  alt={`${personal.name} profile photograph`}
                  fill
                  priority
                  sizes="310px"
                  className="object-cover object-[center_20%] grayscale saturate-0 contrast-[1.08] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:saturate-100 group-hover:contrast-[1.02]"
                />

                {/* Neutral dark tint */}

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/20 opacity-100 transition-opacity duration-700 group-hover:opacity-40"
                  aria-hidden="true"
                />

                {/* Edge vignette */}

                <div
                  className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,transparent_60%,rgba(3,10,11,0.06)_82%,rgba(2,8,9,0.3)_100%)]"
                  aria-hidden="true"
                />

                {/* Light sweep */}

                <motion.div
                  variants={{
                    rest: {
                      opacity: 0,
                      x: "-90%",
                    },

                    hover: {
                      opacity: 0.16,
                      x: "190%",
                    },
                  }}
                  transition={{
                    duration: 0.85,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl"
                  aria-hidden="true"
                />

                {/* Neural scan line */}

<motion.div
  variants={{
    rest: {
      opacity: 0,
      top: "8%",
    },

    hover: {
      opacity: [0, 0.9, 0.9, 0],
      top: ["8%", "8%", "92%", "92%"],
    },
  }}
  transition={{
    duration: 1.15,
    ease: "easeInOut",
    times: [0, 0.08, 0.88, 1],
  }}
  className="pointer-events-none absolute left-[8%] z-20 h-px w-[84%] bg-signal-300 shadow-[0_0_6px_rgba(94,234,212,0.95),0_0_14px_rgba(45,212,191,0.7)]"
  aria-hidden="true"
/>

                {/* Inner teal ring */}

                <motion.div
                  variants={{
                    rest: {
                      opacity: 0.32,
                    },

                    hover: {
                      opacity: 0.95,
                    },
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="pointer-events-none absolute inset-[5px] rounded-full border border-signal-400/15"
                  aria-hidden="true"
                />

                {/* Inner teal glow */}

                <motion.div
                  variants={{
                    rest: {
                      opacity: 0,
                    },

                    hover: {
                      opacity: 1,
                    },
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_38px_rgba(45,212,191,0.22)]"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* =================================================
            FLOATING CAPABILITY CHIPS
        ================================================== */}

        <FloatingChip
          label="⚡ Intelligent Automation"
          position={{
            left: "calc(50% - 225px)",
            top: "8%",
          }}
          delay={0.6}
          travel={-4}
        />

        <FloatingChip
          label="🧠 Agentic AI"
          position={{
            left: "calc(50% + 185px)",
            top: "12%",
          }}
          delay={0.8}
          travel={-4}
        />

        <FloatingChip
          label="🐍 Python | 🗄 SQL"
          position={{
            right: "calc(50% + 180px)",
            top: "40%",
          }}
          delay={1}
          travel={-4}
        />

        <FloatingChip
          label="📈 Data Analytics"
          position={{
            left: "calc(50% + 180px)",
            top: "43%",
          }}
          delay={1.2}
          travel={-5}
        />

        <FloatingChip
          label="💬 Large Language Models"
          position={{
            right: "calc(50% + 35px)",
            top: "67%",
          }}
          delay={1.4}
          travel={-4}
        />

        <FloatingChip
          label="🤖 Generative AI"
          position={{
            left: "calc(50% + 65px)",
            top: "66%",
          }}
          delay={1.6}
          travel={-4}
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   FLOATING CHIP
========================================================= */

type FloatingChipProps = {
  label: string;
  position: CSSProperties;
  delay: number;
  travel: number;
};

function FloatingChip({
  label,
  position,
  delay,
  travel,
}: FloatingChipProps) {
  return (
    <motion.div
      style={position}
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: [0, travel, 0],
        scale: 1,
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.6,
        },

        scale: {
          delay,
          duration: 0.6,
        },

        y: {
          delay,
          duration: 4.8 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="pointer-events-none absolute z-30 whitespace-nowrap rounded-full border border-signal-400/15 bg-[#07110f]/85 px-3.5 py-1.5 font-mono text-[11px] text-signal-300 shadow-[0_8px_28px_rgba(0,0,0,0.4),0_0_18px_rgba(45,212,191,0.08)] backdrop-blur-xl"
    >
      {label}
    </motion.div>
  );
}