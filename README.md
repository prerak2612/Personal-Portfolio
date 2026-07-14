# Prerak Arya - 3D Developer Portfolio->https://personal-portfolio-peach-one-50.vercel.app/

Premium interactive portfolio built from the attached resume content. The site uses a futuristic black visual system, a terminal-style intro animation, a CSS 3D-inspired command-center hero, smooth scrolling, scroll-triggered motion, glass panels, magnetic buttons, and an easy-to-update data file.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Three.js with React Three Fiber and Drei
- Framer Motion
- GSAP ScrollTrigger
- Lenis
- Shadcn-style UI primitives

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Source

All portfolio content lives in:

```text
data/portfolio-data.ts
```

Update that file to change the name, summary, experience, projects, education, skills, achievements, and contact links.

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  portfolio/
    CommandCenterScene.tsx
    CustomCursor.tsx
    LoadingScreen.tsx
    MagneticButton.tsx
    PortfolioApp.tsx
    SmoothScroll.tsx
  ui/
    button.tsx
data/
  portfolio-data.ts
lib/
  utils.ts
```

## Production Notes

- The 3D scene is client-only and dynamically loaded to keep the app shell fast.
- Motion respects `prefers-reduced-motion`.
- Project cards use verified resume links for GitHub and live demos.
- Resume-missing data is represented with TODO placeholders rather than invented details.
- The resume download button serves `public/resume-prerak-arya.pdf`.
- The About portrait uses `public/profile-prerak-arya.png`.
