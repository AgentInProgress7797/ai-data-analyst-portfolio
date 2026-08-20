"use client";

import type {
  ComponentType,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  BriefcaseBusiness,
  Check,
  Contact,
  FolderKanban,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Route,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";

import PremiumCard from "@/components/PremiumCard";
import { personal } from "@/data/profile";

/* =========================================================
   TYPES
========================================================= */

type CommandIcon = ComponentType<{
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

type CommandCategory =
  | "Navigate"
  | "Connect";

type Command = {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  icon: CommandIcon;
  category: CommandCategory;
  action: () => void | Promise<void>;
};

/* =========================================================
   HELPERS
========================================================= */

function scrollToSection(sectionId: string) {
  const section =
    document.getElementById(sectionId);

  if (!section) {
    console.warn(
      `Command Palette: section with id="${sectionId}" was not found.`,
    );

    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* =========================================================
   COMMAND PALETTE
========================================================= */

export default function CommandPalette() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [statusMessage, setStatusMessage] =
    useState("");

  /* Show launcher only after loader finishes */

  const [portfolioReady, setPortfolioReady] =
    useState(false);

  const [
    isFooterVisible,
    setIsFooterVisible,
  ] = useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* =======================================================
     CLOSE / OPEN
  ======================================================== */

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen(true);
  }, []);

  /* =======================================================
     STATUS MESSAGE
  ======================================================== */

  const showStatus = useCallback(
    (message: string) => {
      setStatusMessage(message);

      window.setTimeout(() => {
        setStatusMessage("");
      }, 2200);
    },
    [],
  );

  /* =======================================================
     COMMANDS
  ======================================================== */

  const commands = useMemo<Command[]>(
    () => [
      /* ===================================================
         NAVIGATE
      ==================================================== */

      {
        id: "home",
        label: "Go to Home",
        description:
          "Jump to the beginning of the portfolio",
        keywords: [
          "home",
          "top",
          "start",
          "overview",
        ],
        icon: Home,
        category: "Navigate",
        action: () =>
          scrollToSection("top"),
      },

      {
        id: "profile",
        label: "View Profile",
        description:
          "Learn more about my background and professional journey",
        keywords: [
          "profile",
          "about",
          "bio",
          "who",
          "background",
        ],
        icon: User,
        category: "Navigate",
        action: () =>
          scrollToSection("about"),
      },

      {
        id: "expertise",
        label: "View Expertise",
        description:
          "Explore my AI, data and enterprise technology capabilities",
        keywords: [
          "expertise",
          "skills",
          "technology",
          "stack",
          "tools",
          "ai",
          "data",
        ],
        icon: Sparkles,
        category: "Navigate",
        action: () =>
          scrollToSection("skills"),
      },

      {
        id: "experience",
        label: "View Experience",
        description:
          "Explore my professional experience and roles",
        keywords: [
          "experience",
          "career",
          "work",
          "employment",
          "jobs",
        ],
        icon: BriefcaseBusiness,
        category: "Navigate",
        action: () =>
          scrollToSection("experience"),
      },

      {
        id: "career",
        label: "View Career Intelligence",
        description:
          "Explore my progression across analytics, automation and enterprise AI",
        keywords: [
          "career",
          "timeline",
          "journey",
          "growth",
          "progression",
          "enterprise ai",
        ],
        icon: Route,
        category: "Navigate",
        action: () =>
          scrollToSection("career"),
      },

      {
        id: "projects",
        label: "View Case Studies",
        description:
          "Explore selected AI, analytics and automation projects",
        keywords: [
          "projects",
          "case studies",
          "work",
          "portfolio",
          "magic ai",
          "hrms",
        ],
        icon: FolderKanban,
        category: "Navigate",
        action: () =>
          scrollToSection("projects"),
      },

      {
        id: "learning",
        label: "View Learning",
        description:
          "Explore certifications, education and current learning",
        keywords: [
          "learning",
          "certifications",
          "certificates",
          "education",
          "courses",
        ],
        icon: GraduationCap,
        category: "Navigate",
        action: () =>
          scrollToSection(
            "certifications",
          ),
      },

      {
        id: "contact",
        label: "Go to Contact",
        description:
          "Open the contact and opportunities section",
        keywords: [
          "contact",
          "email",
          "connect",
          "message",
          "opportunity",
          "hire",
        ],
        icon: Contact,
        category: "Navigate",
        action: () =>
          scrollToSection("contact"),
      },

      /* ===================================================
         CONNECT
      ==================================================== */

      {
        id: "linkedin",
        label: "Open LinkedIn",
        description:
          "Visit my LinkedIn profile",
        keywords: [
          "linkedin",
          "social",
          "profile",
          "connect",
          "professional",
        ],
        icon: Linkedin,
        category: "Connect",
        action: () => {
          window.open(
            personal.linkedin,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },

      {
        id: "github",
        label: "Open GitHub",
        description:
          "Explore my repositories and project code",
        keywords: [
          "github",
          "code",
          "repository",
          "repositories",
          "projects",
          "source",
        ],
        icon: Github,
        category: "Connect",
        action: () => {
          window.open(
            personal.github,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },

      {
        id: "email",
        label: "Copy Email",
        description:
          "Copy my email address to your clipboard",
        keywords: [
          "email",
          "mail",
          "copy",
          "contact",
          "message",
        ],
        icon: Mail,
        category: "Connect",
        action: async () => {
          try {
            await navigator.clipboard.writeText(
              personal.email,
            );

            showStatus("Email copied");
          } catch {
            window.location.href =
              `mailto:${personal.email}`;
          }
        },
      },
    ],
    [showStatus],
  );

  /* =======================================================
     FILTER COMMANDS
  ======================================================== */

  const filteredCommands =
    useMemo(() => {
      const normalisedQuery =
        query.trim().toLowerCase();

      if (!normalisedQuery) {
        return commands;
      }

      return commands.filter(
        (command) => {
          const searchableText = [
            command.label,
            command.description,
            command.category,
            ...command.keywords,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(
            normalisedQuery,
          );
        },
      );
    }, [commands, query]);

  /* =======================================================
     EXECUTE COMMAND
  ======================================================== */

  const executeCommand =
    useCallback(
      (command: Command | undefined) => {
        if (!command) {
          return;
        }

        closePalette();

        window.setTimeout(() => {
          void command.action();
        }, 120);
      },
      [closePalette],
    );

  /* =======================================================
     GLOBAL KEYBOARD SHORTCUT
  ======================================================== */

  useEffect(() => {
    const handleGlobalShortcut = (
      event: KeyboardEvent,
    ) => {
      const isCommandShortcut =
        (event.metaKey ||
          event.ctrlKey) &&
        event.key.toLowerCase() ===
          "k";

      if (isCommandShortcut) {
        event.preventDefault();

        setIsOpen(
          (currentValue) => {
            const nextValue =
              !currentValue;

            if (!nextValue) {
              setQuery("");
              setActiveIndex(0);
            }

            return nextValue;
          },
        );
      }

      if (event.key === "Escape") {
        closePalette();
      }
    };

    window.addEventListener(
      "keydown",
      handleGlobalShortcut,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleGlobalShortcut,
      );
    };
  }, [closePalette]);

  /* =======================================================
     FOCUS + BODY SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const focusTimer =
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

    return () => {
      window.clearTimeout(
        focusTimer,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  /* =======================================================
     PORTFOLIO READY
  ======================================================== */

  useEffect(() => {
    const handlePortfolioReady =
      () => {
        window.setTimeout(() => {
          setPortfolioReady(true);
        }, 300);
      };

    window.addEventListener(
      "portfolio-ready",
      handlePortfolioReady,
    );

    return () => {
      window.removeEventListener(
        "portfolio-ready",
        handlePortfolioReady,
      );
    };
  }, []);

  /* =======================================================
     FOOTER VISIBILITY
  ======================================================== */

  useEffect(() => {
    const footer =
      document.getElementById(
        "site-footer",
      );

    if (!footer) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(
            entry.isIntersecting,
          );
        },
        {
          threshold: 0,
          rootMargin:
            "0px 0px 120px 0px",
        },
      );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     RESET ACTIVE INDEX AFTER SEARCH
  ======================================================== */

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  /* =======================================================
     ACTIVE INDEX SAFETY
  ======================================================== */

  useEffect(() => {
    if (
      filteredCommands.length === 0
    ) {
      setActiveIndex(0);
      return;
    }

    if (
      activeIndex >=
      filteredCommands.length
    ) {
      setActiveIndex(
        filteredCommands.length - 1,
      );
    }
  }, [
    activeIndex,
    filteredCommands.length,
  ]);

  /* =======================================================
     INPUT KEYBOARD NAVIGATION
  ======================================================== */

  const handleInputKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (
        filteredCommands.length === 0
      ) {
        return;
      }

      setActiveIndex(
        (currentIndex) =>
          currentIndex >=
          filteredCommands.length - 1
            ? 0
            : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (
        filteredCommands.length === 0
      ) {
        return;
      }

      setActiveIndex(
        (currentIndex) =>
          currentIndex <= 0
            ? filteredCommands.length - 1
            : currentIndex - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      executeCommand(
        filteredCommands[
          activeIndex
        ],
      );
    }
  };

  /* =======================================================
     CATEGORY LABEL HELPER
  ======================================================== */

  function shouldShowCategory(
    index: number,
  ) {
    if (query.trim()) {
      return false;
    }

    if (index === 0) {
      return true;
    }

    return (
      filteredCommands[index]
        .category !==
      filteredCommands[index - 1]
        .category
    );
  }

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* ===================================================
          FLOATING LAUNCHER
      ==================================================== */}

      <AnimatePresence>
        {portfolioReady &&
          !isFooterVisible && (
            <motion.button
              type="button"
              onClick={openPalette}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.35,
                ease: [
                  0.25,
                  0,
                  0,
                  1,
                ],
              }}
              aria-label="Open portfolio command palette"
              data-cursor="interactive"
              className="
                fixed bottom-5 right-5
                z-[9000]
                hidden items-center
                gap-2 rounded-full
                border border-signal-400/25
                bg-[#07110f]/90
                px-4 py-2.5
                font-mono text-xs
                text-mist-200
                shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_22px_rgba(45,212,191,0.1)]
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-signal-400/55
                hover:text-signal-300
                md:flex
              "
            >
              <Search
                size={14}
                aria-hidden="true"
              />

              <span>
                Quick navigation
              </span>

              <span
                className="
                  rounded-md
                  border border-white/10
                  bg-white/[0.04]
                  px-1.5 py-0.5
                  text-[10px]
                  font-semibold
                  text-mist-300
                "
              >
                ⌘ K
              </span>
            </motion.button>
          )}
      </AnimatePresence>

      {/* ===================================================
          STATUS TOAST
      ==================================================== */}

      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              fixed bottom-20
              right-5 z-[99999]
              flex items-center gap-2
              rounded-xl
              border border-signal-400/25
              bg-[#07110f]/95
              px-4 py-3
              font-mono text-xs
              text-signal-200
              shadow-[0_15px_50px_rgba(0,0,0,0.5)]
              backdrop-blur-xl
            "
          >
            <Check
              size={15}
              aria-hidden="true"
            />

            {statusMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          COMMAND PALETTE
      ==================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio command palette"
            className="
              fixed inset-0
              z-[99999]
              flex items-start
              justify-center
              px-4
              pt-[10vh]
              sm:pt-[14vh]
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {/* Backdrop */}

            <motion.button
              type="button"
              aria-label="Close command palette"
              onClick={closePalette}
              data-cursor="interactive"
              className="
                absolute inset-0
                bg-[#020706]/78
                backdrop-blur-md
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            />

            {/* Palette */}

            <motion.div
              className="
                relative z-10
                w-full max-w-[680px]
              "
              initial={{
                opacity: 0,
                scale: 0.96,
                y: -14,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: -10,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
                mass: 0.55,
              }}
            >
              <PremiumCard
                enableTilt={false}
                ariaLabel="Portfolio command centre"
                className="
                  rounded-[24px]
                  border border-signal-400/20
                  bg-[#06100f]/95
                  shadow-[0_35px_110px_rgba(0,0,0,0.78),0_0_55px_rgba(45,212,191,0.09)]
                  backdrop-blur-2xl
                "
              >
                <div className="overflow-hidden rounded-[24px]">
                  {/* Top cyan line */}

                  <div
                    aria-hidden="true"
                    className="
                      h-px w-full
                      bg-gradient-to-r
                      from-transparent
                      via-signal-300/80
                      to-transparent
                    "
                  />

                  {/* Search header */}

                  <div
                    className="
                      flex items-center
                      gap-3
                      border-b
                      border-white/[0.09]
                      px-4 py-4
                      sm:px-6 sm:py-5
                    "
                  >
                    <Search
                      size={20}
                      className="
                        shrink-0
                        text-signal-300
                      "
                      aria-hidden="true"
                    />

                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(event) =>
                        setQuery(
                          event.target
                            .value,
                        )
                      }
                      onKeyDown={
                        handleInputKeyDown
                      }
                      placeholder="Search portfolio commands..."
                      aria-label="Search portfolio commands"
                      autoComplete="off"
                      className="
                        min-w-0 flex-1
                        bg-transparent
                        text-sm
                        font-medium
                        text-white
                        outline-none
                        placeholder:text-mist-500
                        sm:text-base
                      "
                    />

                    <button
                      type="button"
                      onClick={closePalette}
                      aria-label="Close command palette"
                      data-cursor="interactive"
                      className="
                        rounded-xl
                        border border-white/[0.1]
                        bg-white/[0.025]
                        p-2
                        text-mist-400
                        transition-all duration-200
                        hover:border-signal-400/35
                        hover:bg-signal-400/[0.07]
                        hover:text-signal-200
                      "
                    >
                      <X
                        size={16}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Commands */}

                  <div
                    className="
                      max-h-[430px]
                      overflow-y-auto
                      px-2 py-2
                      sm:px-3
                    "
                  >
                    {filteredCommands.length >
                    0 ? (
                      filteredCommands.map(
                        (
                          command,
                          index,
                        ) => {
                          const Icon =
                            command.icon;

                          const isActive =
                            index ===
                            activeIndex;

                          return (
                            <div
                              key={
                                command.id
                              }
                            >
                              {shouldShowCategory(
                                index,
                              ) && (
                                <div
                                  className="
                                    px-3
                                    pb-2
                                    pt-4
                                    font-mono
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-mist-600
                                    sm:px-4
                                  "
                                >
                                  {
                                    command.category
                                  }
                                </div>
                              )}

                              <button
                                type="button"
                                data-cursor="interactive"
                                onMouseEnter={() =>
                                  setActiveIndex(
                                    index,
                                  )
                                }
                                onFocus={() =>
                                  setActiveIndex(
                                    index,
                                  )
                                }
                                onClick={() =>
                                  executeCommand(
                                    command,
                                  )
                                }
                                className={[
                                  "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200 sm:px-4",
                                  isActive
                                    ? "bg-signal-400/[0.11] text-white shadow-[inset_0_0_0_1px_rgba(45,212,191,0.16),0_10px_30px_rgba(0,0,0,0.12)]"
                                    : "text-mist-300 hover:bg-white/[0.035]",
                                ].join(
                                  " ",
                                )}
                              >
                                <span
                                  className={[
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200",
                                    isActive
                                      ? "border-signal-400/45 bg-signal-400/[0.1] text-signal-200 shadow-[0_0_18px_rgba(45,212,191,0.1)]"
                                      : "border-white/[0.08] bg-white/[0.02] text-mist-500 group-hover:border-white/[0.14] group-hover:text-mist-300",
                                  ].join(
                                    " ",
                                  )}
                                >
                                  <Icon
                                    size={18}
                                    aria-hidden="true"
                                  />
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span
                                    className={[
                                      "block text-sm font-semibold transition-colors sm:text-[15px]",
                                      isActive
                                        ? "text-white"
                                        : "text-mist-300",
                                    ].join(
                                      " ",
                                    )}
                                  >
                                    {
                                      command.label
                                    }
                                  </span>

                                  <span
                                    className={[
                                      "mt-1 block truncate text-xs transition-colors sm:text-[13px]",
                                      isActive
                                        ? "text-mist-200"
                                        : "text-mist-500",
                                    ].join(
                                      " ",
                                    )}
                                  >
                                    {
                                      command.description
                                    }
                                  </span>
                                </span>

                                {isActive && (
                                  <span
                                    className="
                                      hidden
                                      rounded-lg
                                      border border-signal-400/20
                                      bg-signal-400/[0.06]
                                      px-2.5 py-1.5
                                      font-mono
                                      text-[10px]
                                      font-bold
                                      tracking-wide
                                      text-mist-200
                                      sm:inline-flex
                                    "
                                  >
                                    ENTER
                                  </span>
                                )}
                              </button>
                            </div>
                          );
                        },
                      )
                    ) : (
                      <div
                        className="
                          flex min-h-[210px]
                          flex-col
                          items-center
                          justify-center
                          px-6
                          text-center
                        "
                      >
                        <div
                          className="
                            mb-4
                            flex h-12 w-12
                            items-center
                            justify-center
                            rounded-2xl
                            border border-white/[0.08]
                            bg-white/[0.025]
                          "
                        >
                          <Search
                            size={22}
                            className="text-mist-500"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="text-sm font-semibold text-mist-200">
                          No commands found
                        </p>

                        <p className="mt-1.5 text-xs text-mist-500">
                          Try searching for
                          projects, experience,
                          GitHub, LinkedIn or
                          contact.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}

                  <div
                    className="
                      flex flex-wrap
                      items-center
                      justify-between
                      gap-3
                      border-t
                      border-white/[0.1]
                      bg-black/[0.08]
                      px-4 py-3
                      font-mono
                      text-[11px]
                      font-bold
                      tracking-wide
                      text-mist-200
                      sm:px-6
                      sm:text-xs
                    "
                  >
                    <span className="text-signal-300/90">
                      PORTFOLIO COMMAND
                      CENTER
                    </span>

                    <div
                      className="
                        flex flex-wrap
                        items-center
                        gap-x-5
                        gap-y-2
                        text-mist-200
                      "
                    >
                      <span>
                        <strong className="text-white">
                          ↑ ↓
                        </strong>{" "}
                        Navigate
                      </span>

                      <span>
                        <strong className="text-white">
                          ↵
                        </strong>{" "}
                        Select
                      </span>

                      <span>
                        <strong className="text-white">
                          Esc
                        </strong>{" "}
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}