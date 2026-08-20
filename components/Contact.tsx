"use client";

import {
  Check,
  Clock3,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import {
  type FormEvent,
  useState,
} from "react";

import { personal } from "@/data/profile";
import PremiumCard from "@/components/PremiumCard";
import Reveal from "@/components/Reveal";

/* =========================================================
   OPPORTUNITY AREAS
========================================================= */

const opportunityAreas = [
  "Applied AI",
  "Enterprise AI",
  "Agentic AI",
  "Data & BI",
  "AI Automation",
];

/* =========================================================
   CONTACT COMPONENT
========================================================= */

export default function Contact() {
  const [emailCopied, setEmailCopied] =
    useState(false);

  /* =======================================================
     COPY EMAIL
  ======================================================== */

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        personal.email,
      );

      setEmailCopied(true);

      window.setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch {
      window.location.href =
        `mailto:${personal.email}`;
    }
  }

  /* =======================================================
     CONTACT FORM
  ======================================================== */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    const name = String(
      formData.get("name") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const message = String(
      formData.get("message") ?? "",
    ).trim();

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${
        name || "a visitor"
      }`,
    );

    const body = encodeURIComponent(
      [
        `Hello ${personal.name},`,
        "",
        message,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Sent through your portfolio website.",
      ].join("\n"),
    );

    window.location.href =
      `mailto:${personal.email}` +
      `?subject=${subject}` +
      `&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="section relative z-10"
    >
      {/* =====================================================
          SECTION INTRODUCTION
      ====================================================== */}

      <Reveal>
        <p className="eyebrow">
          Contact
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2
          className="
            mt-3 max-w-4xl
            text-3xl font-semibold
            leading-tight text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Have a role, project or problem
          worth discussing?
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p
          className="
            mt-5 max-w-3xl
            text-base leading-7
            text-mist-400
            sm:text-lg
          "
        >
          I&apos;m open to opportunities
          across AI, data and automation. If
          you&apos;re hiring, building
          something in this space or think my
          experience could be relevant to your
          team, feel free to reach out.
        </p>
      </Reveal>

      {/* =====================================================
          CONTACT GRID
      ====================================================== */}

      <div
        className="
          mt-14 grid
          items-stretch gap-8
          lg:grid-cols-[0.85fr_1.15fr]
        "
      >
        {/* ===================================================
            LEFT COLUMN
        ==================================================== */}

        <div className="grid gap-5">
          {/* =================================================
              CURRENT FOCUS
          ================================================== */}

          <Reveal
            delay={0.12}
            className="h-full"
          >
            <PremiumCard
              className="
                group h-full
                rounded-3xl
                border border-signal-400/15
                p-6 sm:p-7
              "
            >
              {/* Ambient glow */}

              <div
                className="
                  pointer-events-none absolute
                  -right-20 -top-20
                  h-52 w-52
                  rounded-full
                  bg-signal-400/[0.09]
                  opacity-70
                  blur-3xl
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-signal-400/20
                      bg-signal-400/[0.06]
                      text-signal-300
                    "
                  >
                    <Sparkles
                      size={19}
                      aria-hidden="true"
                    />
                  </span>

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
                    <span
                      className="
                        h-1.5 w-1.5
                        animate-pulse
                        rounded-full
                        bg-signal-400
                        shadow-[0_0_8px_rgba(94,234,212,0.85)]
                      "
                      aria-hidden="true"
                    />

                    Open to opportunities
                  </span>
                </div>

                <p
                  className="
                    mt-6
                    font-mono text-[10px]
                    uppercase tracking-[0.22em]
                    text-mist-500
                  "
                >
                  Current Focus
                </p>

                <h3
                  className="
                    mt-2
                    font-display
                    text-2xl font-semibold
                    leading-tight text-white
                  "
                >
                  Interested in AI, data and
                  automation roles.
                </h3>

                <p
                  className="
                    mt-4
                    text-sm leading-7
                    text-mist-300
                  "
                >
                  I&apos;m particularly interested
                  in roles where I can work
                  hands-on with AI systems,
                  analytics, automation and
                  enterprise workflows.
                </p>

                {/* Opportunity tags */}

                <div className="mt-6 flex flex-wrap gap-2">
                  {opportunityAreas.map(
                    (area) => (
                      <span
                        key={area}
                        className="
                          rounded-full
                          border border-white/[0.07]
                          bg-white/[0.025]
                          px-3 py-1.5
                          font-mono text-[10px]
                          text-mist-300
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:border-signal-400/30
                          hover:bg-signal-400/[0.06]
                          hover:text-signal-300
                        "
                      >
                        {area}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </PremiumCard>
          </Reveal>

          {/* =================================================
              DIRECT CONTACT
          ================================================== */}

          <Reveal delay={0.16}>
            <PremiumCard
              className="
                rounded-3xl
                border border-white/[0.07]
                p-6 sm:p-7
              "
            >
              <p
                className="
                  font-mono text-[10px]
                  uppercase tracking-[0.22em]
                  text-mist-500
                "
              >
                Direct Contact
              </p>

              <h3
                className="
                  mt-2
                  font-display
                  text-xl font-semibold
                  text-white
                "
              >
                Reach me directly.
              </h3>

              <div className="mt-6 grid gap-3">
                {/* ===========================================
                    EMAIL
                ============================================ */}

                <div
                  className="
                    group flex items-center gap-4
                    rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.018]
                    p-4
                    transition-all duration-300
                    hover:border-signal-400/20
                    hover:bg-signal-400/[0.025]
                  "
                >
                  <span
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-signal-400/15
                      bg-signal-400/[0.05]
                      text-signal-300
                    "
                  >
                    <Mail
                      size={18}
                      aria-hidden="true"
                    />
                  </span>

                  <a
                    href={`mailto:${personal.email}`}
                    className="min-w-0 flex-1"
                  >
                    <span
                      className="
                        block
                        font-mono text-[10px]
                        uppercase tracking-[0.16em]
                        text-mist-500
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        mt-1 block truncate
                        text-sm text-mist-200
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      {personal.email}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    data-cursor="interactive"
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      border border-white/[0.07]
                      text-mist-500
                      transition-all duration-300
                      hover:border-signal-400/30
                      hover:text-signal-300
                    "
                  >
                    {emailCopied ? (
                      <Check
                        size={15}
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy
                        size={15}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                {/* ===========================================
                    LINKEDIN
                ============================================ */}

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="
                    group flex items-center gap-4
                    rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.018]
                    p-4
                    transition-all duration-300
                    hover:border-signal-400/20
                    hover:bg-signal-400/[0.025]
                  "
                >
                  <span
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-signal-400/15
                      bg-signal-400/[0.05]
                      text-signal-300
                    "
                  >
                    <Linkedin
                      size={18}
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    <span
                      className="
                        block
                        font-mono text-[10px]
                        uppercase tracking-[0.16em]
                        text-mist-500
                      "
                    >
                      LinkedIn
                    </span>

                    <span
                      className="
                        mt-1 block
                        text-sm text-mist-200
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      View my professional profile
                    </span>
                  </span>
                </a>

                {/* ===========================================
                    GITHUB
                ============================================ */}

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="
                    group flex items-center gap-4
                    rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.018]
                    p-4
                    transition-all duration-300
                    hover:border-signal-400/20
                    hover:bg-signal-400/[0.025]
                  "
                >
                  <span
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-signal-400/15
                      bg-signal-400/[0.05]
                      text-signal-300
                      transition-all duration-300
                      group-hover:border-signal-400/30
                      group-hover:bg-signal-400/[0.08]
                    "
                  >
                    <Github
                      size={18}
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    <span
                      className="
                        block
                        font-mono text-[10px]
                        uppercase tracking-[0.16em]
                        text-mist-500
                      "
                    >
                      GitHub
                    </span>

                    <span
                      className="
                        mt-1 block
                        text-sm text-mist-200
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      Explore my code and projects
                    </span>
                  </span>
                </a>

                {/* ===========================================
                    LOCATION
                ============================================ */}

                <div
                  className="
                    flex items-center gap-4
                    rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.018]
                    p-4
                  "
                >
                  <span
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-white/[0.08]
                      bg-white/[0.025]
                      text-mist-300
                    "
                  >
                    <MapPin
                      size={18}
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    <span
                      className="
                        block
                        font-mono text-[10px]
                        uppercase tracking-[0.16em]
                        text-mist-500
                      "
                    >
                      Location
                    </span>

                    <span className="mt-1 block text-sm text-mist-200">
                      {personal.location}
                    </span>
                  </span>
                </div>
              </div>

              {/* ===============================================
                  RESPONSE TIME
              ================================================ */}

              <div
                className="
                  mt-5 flex items-start gap-3
                  rounded-2xl
                  border border-signal-400/10
                  bg-signal-400/[0.025]
                  p-4
                "
              >
                <Clock3
                  size={17}
                  className="
                    mt-0.5 shrink-0
                    text-signal-300
                  "
                  aria-hidden="true"
                />

                <p
                  className="
                    text-sm leading-6
                    text-mist-400
                  "
                >
                  I usually respond to
                  professional enquiries within
                  one to two business days.
                </p>
              </div>
            </PremiumCard>
          </Reveal>
        </div>

        {/* ===================================================
            RIGHT COLUMN — CONTACT FORM
        ==================================================== */}

        <Reveal
          delay={0.2}
          className="h-full"
        >
          <PremiumCard
            className="
              group h-full
              rounded-3xl
              border border-white/[0.08]
              p-6 sm:p-8
            "
          >
            {/* Ambient glow */}

            <div
              className="
                pointer-events-none absolute
                -bottom-24 -right-24
                h-72 w-72
                rounded-full
                bg-signal-400/[0.07]
                opacity-70
                blur-3xl
                transition-opacity duration-500
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <div className="relative">
              {/* Form heading */}

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="
                      font-mono text-[10px]
                      uppercase tracking-[0.22em]
                      text-mist-500
                    "
                  >
                    Start a Conversation
                  </p>

                  <h3
                    className="
                      mt-2 max-w-xl
                      font-display
                      text-2xl font-semibold
                      leading-tight text-white
                    "
                  >
                    Send me a message.
                  </h3>

                  <p
                    className="
                      mt-3 max-w-xl
                      text-sm leading-7
                      text-mist-400
                    "
                  >
                    Share a role, project or
                    problem you&apos;d like to
                    discuss. The form will prepare
                    the message in your email app
                    so you can review it before
                    sending.
                  </p>
                </div>

                <span
                  className="
                    hidden h-11 w-11
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    border border-signal-400/15
                    bg-signal-400/[0.05]
                    text-signal-300
                    sm:flex
                  "
                >
                  <Send
                    size={18}
                    aria-hidden="true"
                  />
                </span>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Your name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                  />

                  <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="
                      font-mono text-[11px]
                      uppercase tracking-[0.18em]
                      text-mist-500
                    "
                  >
                    Your message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={7}
                    placeholder="Tell me about the role, project or problem..."
                    className="
                      mt-2 w-full
                      resize-y
                      rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.018]
                      px-4 py-3.5
                      text-sm leading-7
                      text-white
                      outline-none
                      transition-all duration-300
                      placeholder:text-mist-700
                      focus:border-signal-400/40
                      focus:bg-signal-400/[0.025]
                      focus:shadow-[0_0_24px_rgba(45,212,191,0.08)]
                    "
                  />
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  data-cursor="interactive"
                  className="
                    group/button
                    inline-flex w-full
                    items-center justify-center
                    gap-3
                    rounded-2xl
                    bg-signal-500
                    px-6 py-4
                    font-mono text-sm
                    font-semibold text-ink-950
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_0_30px_rgba(45,212,191,0.35)]
                  "
                >
                  Prepare email

                  <Send
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                    aria-hidden="true"
                  />
                </button>

                <p
                  className="
                    text-center
                    font-mono text-[10px]
                    uppercase tracking-[0.14em]
                    text-mist-600
                  "
                >
                  No data is stored by this website
                </p>
              </form>
            </div>
          </PremiumCard>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

type FormFieldProps = {
  label: string;
  name: string;
  type: "text" | "email";
  placeholder: string;
  autoComplete: string;
};

function FormField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
}: FormFieldProps) {
  const inputId =
    `contact-${name}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="
          font-mono text-[11px]
          uppercase tracking-[0.18em]
          text-mist-500
        "
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="
          mt-2 w-full
          rounded-2xl
          border border-white/[0.08]
          bg-white/[0.018]
          px-4 py-3.5
          text-sm text-white
          outline-none
          transition-all duration-300
          placeholder:text-mist-700
          focus:border-signal-400/40
          focus:bg-signal-400/[0.025]
          focus:shadow-[0_0_24px_rgba(45,212,191,0.08)]
        "
      />
    </div>
  );
}