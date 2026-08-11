# Ashish Pawar — Portfolio

Premium dark-theme portfolio built with Next.js 14, TypeScript, Tailwind CSS,
and Framer Motion. Zero paid services required.

This guide assumes zero prior experience. Follow it top to bottom.

---

## 1. What you need installed (macOS)

- **VS Code** — you already have it.
- **Git** — you already have it. Check: `git --version`
- **Node.js** — you already have it. Check: `node -v` (need 18.17+; if older, get
  latest LTS from https://nodejs.org).

## 2. Open the project

1. Unzip the folder you downloaded.
2. Open VS Code → File → Open Folder → select the unzipped `portfolio` folder.
3. Open VS Code's terminal: Menu → Terminal → New Terminal.

## 3. Install dependencies

In the terminal, run:

```bash
npm install
```

This downloads all libraries listed in `package.json` (Next.js, React,
Tailwind, Framer Motion, icons). Takes 1–2 minutes.

## 4. Run it locally

```bash
npm run dev
```

Open your browser at **http://localhost:3000**. You now have your live
portfolio, editable in real time — save any file and the browser refreshes
automatically.

Stop the server anytime with `Ctrl + C` in the terminal.

## 5. Folder structure (what lives where)

```
portfolio/
├── app/                  → pages & global setup (App Router)
│   ├── layout.tsx        → wraps every page, sets fonts + SEO metadata
│   ├── page.tsx          → the homepage, assembles all sections in order
│   ├── globals.css       → global styles, Tailwind imports
│   └── sitemap.ts        → auto-generates sitemap.xml for SEO
├── components/           → one file per visual section
│   ├── Navbar.tsx, Hero.tsx, About.tsx, Skills.tsx,
│   │   Experience.tsx, Projects.tsx, Certifications.tsx,
│   │   Achievements.tsx, Contact.tsx, Footer.tsx
│   ├── ParticleField.tsx → animated background
│   ├── AnimatedStats.tsx → count-up numbers in Hero
│   └── Reveal.tsx        → reusable scroll-reveal animation wrapper
├── data/
│   └── profile.ts        → ⭐ ALL your content lives here. Edit this file only.
├── public/                → static files: resume.pdf, avatar image, favicon
├── tailwind.config.ts     → colors, fonts, animation tokens
└── package.json           → dependency list + npm scripts
```

## 6. How to update your content (the important part)

**Open `data/profile.ts`.** Every piece of text on the site — your name,
summary, jobs, skills, certifications, contact info — is a plain JavaScript
object in this one file. Change a value, save, and it updates everywhere that
value is used. You never need to touch the component files for text edits.

Fields marked `// EDIT ME` were not present in your uploaded PDF and need
your input:

- **`projects`** — your PDF had no named projects. Replace the 3 placeholder
  entries with real project titles, a 1–2 sentence description, tags, and
  optional live/repo links.
- **`achievements`** — add any awards or standout results.
- **`resumeUrl`** / **`avatarUrl`** — see step 7.
- **`github`**, **`twitter`**, **`seo.url`** — add once you have them.

## 7. Add your resume PDF and photo

1. Drop your resume file into `public/` and rename it exactly `resume.pdf`.
2. (Optional) Drop a photo into `public/` (e.g. `avatar.jpg`) and set
   `avatarUrl: "/avatar.jpg"` in `data/profile.ts`.
3. Delete `public/RESUME_GOES_HERE.txt` once your real resume is in place.

## 8. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
```

Then on github.com: New repository → copy the URL it gives you → back in
terminal:

```bash
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```

## 9. Deploy on Vercel (free)

1. Go to https://vercel.com → sign up with your GitHub account.
2. Click **Add New → Project**, select your portfolio repo.
3. Leave all settings default (Vercel auto-detects Next.js) → **Deploy**.
4. In ~1 minute you get a live URL like `your-name.vercel.app`.
5. Copy that URL into `data/profile.ts` → `seo.url`, and into
   `public/robots.txt`'s sitemap line, then commit + push — Vercel
   redeploys automatically on every push to `main`.

## 10. Future maintenance

- **Any text change** → edit `data/profile.ts`, save, `git add . && git commit -m "update content" && git push`. Vercel redeploys automatically.
- **New project/job/cert** → add a new object to the matching array in
  `data/profile.ts`; the layout updates itself, no design work needed.
- **Colors/fonts** → edit `tailwind.config.ts` (the `colors` and `fontFamily`
  blocks).
- **Contact form** → currently opens the visitor's email client (no backend,
  no cost). To collect submissions silently in-page instead, sign up for a
  free tier at https://formspree.io or https://resend.com and swap the
  `handleSubmit` function in `components/Contact.tsx` for a `fetch()` call —
  both have copy-paste docs for Next.js.

## 11. Performance & SEO notes

- Fonts, images, and animations are already optimized for Lighthouse 95+
  performance: no heavy 3D engine, particle background is a lightweight 2D
  canvas, animations respect `prefers-reduced-motion`.
- `app/layout.tsx` sets full Open Graph / Twitter card metadata and
  `app/sitemap.ts` + `public/robots.txt` cover SEO crawling — just make sure
  step 9.5 (setting `seo.url`) is done after you deploy.
- Run a Lighthouse audit anytime: Chrome DevTools → Lighthouse tab → Analyze.

---

Questions or stuck on a step? Re-open this file — every step above is
copy-pasteable exactly as written.
