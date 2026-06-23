# Portfolio Landing Page 5 - React, Vite, TailwindCSS, GSAP, Three.js, JavaScript Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-green)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.7-blueviolet)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13.0-green)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.176.0-black)](https://threejs.org/)

A modern, single-page portfolio landing page built with React, Vite, and Tailwind CSS. This project showcases a full-screen experience with smooth scrolling, 3D visuals (Three.js), scroll-triggered animations (GSAP), and a responsive layout—ideal for learning front-end architecture, animation patterns, and component reuse.

- **Live Demo:** [https://portfolio-ui-5.vercel.app/](https://portfolio-ui-5.vercel.app/)

![Screenshot 2026-03-07 at 11 37 26](https://github.com/user-attachments/assets/ec53e01e-338f-4c3f-81a1-cbd0db880be6)
![Screenshot 2026-03-07 at 11 37 43](https://github.com/user-attachments/assets/c8801ed2-4341-40e6-bb4b-eeaf63f08fd4)
![Screenshot 2026-03-07 at 11 38 02](https://github.com/user-attachments/assets/d62029e1-8ba3-4ac3-b149-d4d520a1b38f)
![Screenshot 2026-03-07 at 11 38 44](https://github.com/user-attachments/assets/a9ff62ef-e99d-4627-b446-35255a092819)
![Screenshot 2026-03-07 at 11 38 58](https://github.com/user-attachments/assets/9fd71141-7538-4b7f-8d5a-07e46bc41e74)
![Screenshot 2026-03-07 at 11 39 18](https://github.com/user-attachments/assets/96cef7ab-0e0d-448f-81ea-849b93e3b6fc)
![Screenshot 2026-03-07 at 11 39 39](https://github.com/user-attachments/assets/116e33a7-d8af-4f31-bfd9-2a66dd963f59)

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Walkthrough](#project-walkthrough)
- [Features & Functionalities](#features--functionalities)
- [Components & Reuse Guide](#components--reuse-guide)
- [Sections Overview](#sections-overview)
- [Data & Constants](#data--constants)
- [Routes & API](#routes--api)
- [Build & Scripts](#build--scripts)
- [Keywords & SEO](#keywords--seo)
- [Conclusion](#conclusion)
- [License](#license)

---

## Introduction

This repository is a **front-end only** portfolio template. It demonstrates a full-screen, section-based layout with:

- **Hero** section with a 3D planet (Three.js) and animated headline
- **Services** and **About** sections with scroll-driven animations
- **Works** (projects) with hover preview and marquee-style contact CTA
- **Contact** with social links and repeated marquee text

There is **no backend or API**—all content is driven by local constants and static assets. You can plug in your own copy, links, and images and deploy to any static host (e.g. Vercel, Netlify).

---

## Project Structure

```bash
portfolio-ui-5/
├── public/                 # Static assets (copied as-is to build output)
│   ├── favicon.svg
│   ├── fonts/amiamie/      # Amiamie font (otf, ttf)
│   ├── assets/             # Project images, backgrounds
│   ├── images/             # Section images (e.g. about)
│   └── models/             # 3D model (Planet.glb)
├── src/
│   ├── main.jsx            # App entry, mounts React root
│   ├── App.jsx             # Root layout, Lenis, loading state, section order
│   ├── index.css           # Tailwind + @font-face + theme + custom utilities
│   ├── constants/
│   │   └── index.js        # servicesData, projects, socials
│   ├── components/
│   │   ├── AnimatedHeaderSection.jsx  # Section title + subtitle + body text
│   │   ├── AnimatedTextLines.jsx      # Line-by-line reveal animation
│   │   ├── Marquee.jsx                # Infinite horizontal marquee
│   │   └── Planet.jsx                # 3D planet (GLB) with GSAP intro
│   └── sections/
│       ├── Navbar.jsx      # Full-screen overlay nav + burger
│       ├── Hero.jsx        # Hero + 3D canvas + AnimatedHeaderSection
│       ├── ServiceSummary.jsx
│       ├── Services.jsx
│       ├── About.jsx
│       ├── Works.jsx
│       ├── ContactSummary.jsx
│       └── Contact.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Tech Stack & Dependencies

| Category       | Technology                                         |
| -------------- | -------------------------------------------------- |
| **Framework**  | React 19                                           |
| **Build**      | Vite 6                                             |
| **Styling**    | Tailwind CSS 4 (@tailwindcss/vite)                 |
| **Animation**  | GSAP 3 (ScrollTrigger, Observer), @gsap/react      |
| **3D**         | Three.js, @react-three/fiber, @react-three/drei    |
| **Scroll**     | Lenis (smooth scroll), react-scroll (anchor links) |
| **Icons**      | @iconify/react                                     |
| **Responsive** | react-responsive                                   |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn**

### Install & Run

```bash
# Clone the repository (or use your fork)
git clone <your-repo-url>
cd portfolio-ui-5

# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Lint

```bash
npm run lint        # Check only
npm run lint:fix    # Auto-fix where possible
```

---

## Environment Variables

This project **does not use any environment variables** in the current codebase. All content and URLs are defined in:

- `src/constants/index.js` (services, projects, socials)
- Inline text in section components (e.g. Hero, About, Contact)
- `index.html` (meta tags, canonical URL)

If you add features later (e.g. contact form, analytics, feature flags), you can use Vite’s env system:

1. **Create a `.env` file** in the project root (do not commit secrets):

   ```env
   VITE_CONTACT_API_URL=https://your-api.com/contact
   VITE_GA_ID=G-XXXXXXXXXX
   ```

2. **Use in code** — only variables prefixed with `VITE_` are exposed:

   ```js
   const apiUrl = import.meta.env.VITE_CONTACT_API_URL;
   const gaId = import.meta.env.VITE_GA_ID;
   ```

3. **Optional: `.env.example`** — commit a template without real values:

   ```env
   VITE_CONTACT_API_URL=
   VITE_GA_ID=
   ```

4. Add `.env` and `.env.local` to `.gitignore` (they are already ignored in this repo).

---

## Project Walkthrough

1. **Entry:** `index.html` loads `src/main.jsx`, which renders `<App />` inside React’s `createRoot`.
2. **App.jsx:** Wraps the app in **Lenis** for smooth scrolling. Uses **@react-three/drei**’s `useProgress()` to wait for 3D assets to load, then shows a loading bar until `progress === 100`, then fades in the main content.
3. **Sections order:** Navbar → Hero → ServiceSummary → Services → About → Works → ContactSummary → Contact.
4. **Navigation:** The overlay **Navbar** uses **react-scroll** `Link` components with `to="home"`, `to="services"`, etc., matching section `id`s (`#home`, `#services`, `#about`, `#work`, `#contact`).
5. **Data:** Sections read from `src/constants/index.js` (e.g. `servicesData`, `projects`, `socials`). No API calls.
6. **Animations:** GSAP (with ScrollTrigger and Observer) drives scroll-based and hover animations; the **Marquee** component uses a custom GSAP horizontal loop.

---

## Features & Functionalities

- **Smooth scroll:** Lenis for momentum-style scrolling.
- **3D Hero:** Three.js canvas with a GLB planet, lighting, and Float; loading state tied to asset progress.
- **Full-screen overlay nav:** Slide-in menu with GSAP timeline; burger icon toggles open/close; scroll direction can hide/show burger.
- **Scroll-triggered animations:** ServiceSummary (parallax-style title movement), Services/About/Works/Contact (section headers and content reveal via GSAP ScrollTrigger).
- **Sticky service cards:** On desktop, service blocks use sticky positioning and spacing for a stacked effect.
- **Works hover preview:** Desktop: hover a project row to reveal a floating image preview and clip-path overlay; mobile: static project image.
- **Marquee strips:** Infinite horizontal marquees (ContactSummary, Contact) with optional reverse and custom icons (GSAP Observer can speed up on scroll).
- **Responsive layout:** Tailwind breakpoints and `react-responsive` (e.g. Hero planet scale, Works preview only on desktop).
- **Custom font:** Amiamie loaded via `@font-face` in `index.css` from `public/fonts/amiamie/`.

---

## Components & Reuse Guide

### AnimatedHeaderSection

Reusable section header: subtitle, big title (split by spaces), and a short body text block with divider.

**Props:** `subTitle`, `title`, `text`, `textColor` (e.g. `"text-black"` / `"text-white"`), `withScrollTrigger` (boolean, enables scroll-triggered timeline).

**Example (use in another project):**

```jsx
import AnimatedHeaderSection from "./components/AnimatedHeaderSection";

<AnimatedHeaderSection
  subTitle="Your subtitle"
  title="Section Title"
  text="Short description or tagline here."
  textColor="text-white"
  withScrollTrigger={true}
/>;
```

---

### AnimatedTextLines

Splits `text` by newlines and animates each line (staggered from bottom with GSAP). Requires `ScrollTrigger` registered.

**Props:** `text` (string with `\n`), `className`.

**Example:**

```jsx
import { AnimatedTextLines } from "./components/AnimatedTextLines";

<AnimatedTextLines
  text="Line one\nLine two\nLine three"
  className="text-lg text-gray-700"
/>;
```

---

### Marquee

Infinite horizontal scrolling strip. Each item is repeated with an optional Iconify icon. Supports `reverse` and custom `className` / `icon` / `iconClassName`.

**Props:** `items` (array of strings), `className`, `icon`, `iconClassName`, `reverse` (boolean).

**Example:**

```jsx
import Marquee from "./components/Marquee";

<Marquee
  items={["Tag 1", "Tag 2", "Tag 3"]}
  className="text-black bg-gray-100"
  icon="mdi:star-four-points"
  reverse={false}
/>;
```

---

### Planet (3D)

Renders a GLB planet with spheres and ring. Uses `useGLTF("/models/Planet.glb")` and GSAP for entrance animation. For reuse, place your GLB in `public/models/` and update the path, or pass a different path via a prop.

**Example:**

```jsx
import { Canvas } from "@react-three/fiber";
import { Planet } from "./components/Planet";

<Canvas camera={{ position: [0, 0, -10], fov: 17.5 }}>
  <ambientLight intensity={0.5} />
  <Planet scale={1} />
</Canvas>;
```

---

## Sections Overview

| Section            | Purpose                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Navbar**         | Fixed burger; full-screen overlay with section links and contact/social; GSAP slide + icon animation.  |
| **Hero**           | Full-viewport hero with 3D planet and AnimatedHeaderSection (e.g. “John Doe”, tagline).                |
| **ServiceSummary** | Parallax-style scrolling titles (“Architecture”, “Development”, “Deployment”, etc.).                   |
| **Services**       | Dark block with sticky service cards; data from `servicesData`.                                        |
| **About**          | Dark block with image (clip-path reveal) and AnimatedTextLines for bio.                                |
| **Works**          | Project list; desktop: hover shows floating preview image; mobile: inline image. Data from `projects`. |
| **ContactSummary** | Pinned marquee + “Let’s build…” CTA + second marquee.                                                  |
| **Contact**        | Contact header + email, phone, socials from `socials` + bottom marquee.                                |

---

## Data & Constants

All in `src/constants/index.js`:

- **servicesData:** Array of `{ title, description, items: [{ title, description }] }` for the Services section.
- **projects:** Array of `{ id, name, description, href, image, bgImage, frameworks: [{ id, name }] }` for Works. `image` / `bgImage` are paths under `public/` (e.g. `/assets/projects/...`, `/assets/backgrounds/...`).
- **socials:** Array of `{ name, href }` for Navbar and Contact (e.g. Instagram, YouTube, LinkedIn, GitHub).

To customize: edit this file and ensure images exist in `public/assets/` (or adjust paths).

---

## Routes & API

- **Routes:** Single-page app. No client-side router; sections are reached via anchor links (`#home`, `#services`, `#about`, `#work`, `#contact`) handled by **react-scroll**.
- **API / Backend:** None. No `.env`-based API URLs or server; all content is static. To add a contact form or analytics, introduce env vars and call your own backend or third-party services from the front end.

---

## Build & Scripts

| Script     | Command            | Description                  |
| ---------- | ------------------ | ---------------------------- |
| `dev`      | `npm run dev`      | Start Vite dev server (HMR). |
| `build`    | `npm run build`    | Production build to `dist/`. |
| `preview`  | `npm run preview`  | Serve `dist/` locally.       |
| `lint`     | `npm run lint`     | Run ESLint.                  |
| `lint:fix` | `npm run lint:fix` | ESLint with auto-fix.        |

**Vite config:** Uses `@tailwindcss/vite` and `@vitejs/plugin-react`. Build uses `manualChunks` (vendor-react, vendor-three, vendor-gsap) and `chunkSizeWarningLimit: 1200` for the large Three.js bundle.

---

## Keywords & SEO

Relevant terms for discovery and learning:

- Portfolio, landing page, single-page, React, Vite, Tailwind CSS
- GSAP, ScrollTrigger, Lenis, smooth scroll
- Three.js, React Three Fiber, 3D, GLB
- Responsive, marquee, sticky sections, clip-path animation
- Front-end only, static site, Vercel

Meta tags (title, description, author, keywords, canonical, Open Graph, Twitter) are set in `index.html` for sharing and SEO.

---

## Conclusion

This project is a **front-end portfolio template** with no backend or API. You get:

- A clear structure (components vs sections vs constants)
- Reusable building blocks (AnimatedHeaderSection, AnimatedTextLines, Marquee, Planet)
- Modern tooling (Vite, Tailwind 4, React 19) and animation (GSAP, Three.js)

Customize `src/constants/index.js`, copy in sections/components where needed, add a `.env` when you introduce APIs or analytics, and deploy the `dist/` folder to any static host.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
