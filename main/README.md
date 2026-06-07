# Navaneeth — Cinematic Portfolio

An Awwwards-caliber portfolio website. Not a portfolio. A digital journey.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite 5 | UI framework & build tool |
| Tailwind CSS 4 | Utility styling |
| GSAP + ScrollTrigger | Cinematic scroll animations |
| Three.js + R3F | Particle fields & starfield |
| Lenis | Butter-smooth scrolling |
| Framer Motion | Component transitions |

## Quick Start

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## Folder Structure

```
src/
  components/
    Hero/         → Cinematic portrait reveal + particles
    About/        → Scroll-driven timeline
    Works/        → Expandable project accordion
    Contact/      → Starfield + social links
    Loader/       → Counting intro screen
    Navbar/       → Fixed nav with scroll state
    Cursor/       → Custom magnetic cursor
    NoiseOverlay/ → Film grain texture
  three/
    Particles/    → Ambient floating particles (Three.js)
  hooks/
    useScrollAnimation.js  → GSAP ScrollTrigger helper
    useLenis.js            → Smooth scroll setup
  index.css       → Design tokens, global styles
  App.jsx         → Root + Lenis init
  main.jsx        → Entry point
public/
  portrait.jpg    → Your photo (replace with yours)
  favicon.svg
```

## Customization

### Your portrait
Replace `public/portrait.jpg` with your photo (recommended: high-contrast B&W, dark background).

### Projects
Edit the `projects` array in `src/components/Works/Works.jsx`.

### Timeline
Edit the `timeline` array in `src/components/About/About.jsx`.

### Contact links
Edit the `socials` array in `src/components/Contact/Contact.jsx`.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com/new
```

The project is zero-config Vercel compatible.

## Performance Notes

- Fonts loaded from Google Fonts CDN
- Three.js Canvas components are GPU-accelerated
- GSAP ScrollTrigger is cleaned up on unmount
- Lenis integrates with GSAP ticker for zero conflicts
