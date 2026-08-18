import { personal } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 border-t border-white/[0.05] py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
        <p className="font-mono text-xs text-mist-500">
          © {new Date().getFullYear()} {personal.name} · Built with
          Next.js, Tailwind CSS & React Three Fiber
        </p>

        <div className="flex gap-6 font-mono text-xs text-mist-500">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal-400"
          >
            LinkedIn
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="transition-colors hover:text-signal-400"
          >
            Email
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            className="transition-colors hover:text-signal-400"
          >
            GitHub
          </a>

          <a
            href="#top"
            className="transition-colors hover:text-signal-400"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}