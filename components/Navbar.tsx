"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";


import { nav, personal } from "@/data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <a
          href="#top"
          className="font-display text-lg font-semibold text-white"
          onClick={() => setOpen(false)}
        >
          {personal.name.split(" ")[0]}
          <span className="text-signal-400">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((navItem) => (
            <li key={navItem.href}>
              <a
                href={navItem.href}
                className="font-mono text-sm text-mist-500 transition-colors duration-300 hover:text-signal-400"
              >
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-signal-500/30 px-5 py-2.5 font-mono text-sm text-signal-400 transition-all duration-300 hover:border-signal-400/60 hover:bg-signal-500/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] md:inline-flex"
        >
          Let&apos;s talk →
        </a>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="text-mist-100 transition-colors hover:text-signal-400 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-white/[0.06] bg-[#050508]/95 px-6 pb-6 backdrop-blur-xl md:hidden">
          {nav.map((navItem) => (
            <li key={navItem.href}>
              <a
                href={navItem.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm text-mist-300 transition-colors hover:text-signal-400"
              >
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}