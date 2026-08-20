"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { nav, personal } from "@/data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = nav.map((item) =>
      item.href.replace("#", ""),
    );

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(
        (section): section is HTMLElement =>
          section !== null,
      );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio,
          );

        if (visibleEntries.length > 0) {
          setActiveSection(
            `#${visibleEntries[0].target.id}`,
          );
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  function handleNavigation() {
    setOpen(false);
  }

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        delay: 2,
        ease: "easeOut",
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050508]/80 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Brand */}

        <a
          href="#top"
          className="font-display text-lg font-semibold text-white"
          onClick={handleNavigation}
        >
          {personal.name.split(" ")[0]}
          <span className="text-signal-400">.</span>
        </a>

        {/* Desktop navigation */}

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((navItem) => {
            const active =
              activeSection === navItem.href;

            return (
              <li
                key={navItem.href}
                className="relative"
              >
                <a
                  href={navItem.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`
                    relative
                    block py-2
                    font-mono text-sm
                    transition-colors duration-300
                    ${
                      active
                        ? "text-signal-300"
                        : "text-mist-500 hover:text-signal-400"
                    }
                  `}
                >
                  {navItem.label}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      -bottom-0.5
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-signal-400
                      shadow-[0_0_8px_rgba(94,234,212,0.65)]
                      transition-all duration-300
                      ${
                        active
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}

        <a
          href="#contact"
          aria-current={
            activeSection === "#contact"
              ? "page"
              : undefined
          }
          className={`
            hidden rounded-full
            border px-5 py-2.5
            font-mono text-sm
            transition-all duration-300
            md:inline-flex
            ${
              activeSection === "#contact"
                ? "border-signal-400/60 bg-signal-500/10 text-signal-300 shadow-[0_0_20px_rgba(45,212,191,0.18)]"
                : "border-signal-500/30 text-signal-400 hover:border-signal-400/60 hover:bg-signal-500/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
            }
          `}
        >
          Let&apos;s talk →
        </a>

        {/* Mobile menu button */}

        <button
          type="button"
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() =>
            setOpen((current) => !current)
          }
          className="text-mist-100 transition-colors hover:text-signal-400 md:hidden"
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}

      {open && (
        <ul
          id="mobile-navigation"
          className="border-t border-white/[0.06] bg-[#050508]/95 px-6 pb-6 backdrop-blur-xl md:hidden"
        >
          {nav.map((navItem) => {
            const active =
              activeSection === navItem.href;

            return (
              <li key={navItem.href}>
                <a
                  href={navItem.href}
                  onClick={handleNavigation}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`
                    flex items-center
                    justify-between
                    py-3
                    font-mono text-sm
                    transition-colors
                    ${
                      active
                        ? "text-signal-300"
                        : "text-mist-300 hover:text-signal-400"
                    }
                  `}
                >
                  <span>
                    {navItem.label}
                  </span>

                  {active && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_8px_rgba(94,234,212,0.75)]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            );
          })}

          <li className="mt-3 border-t border-white/[0.06] pt-4">
            <a
              href="#contact"
              onClick={handleNavigation}
              className="
                inline-flex w-full
                items-center justify-center
                rounded-full
                border border-signal-500/30
                px-5 py-3
                font-mono text-sm
                text-signal-400
                transition-all duration-300
                hover:border-signal-400/60
                hover:bg-signal-500/10
              "
            >
              Let&apos;s talk →
            </a>
          </li>
        </ul>
      )}
    </motion.header>
  );
}