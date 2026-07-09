"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/portfolio/MagneticButton";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { AppIcon } from "@/components/portfolio/AppIcon";
import { cn } from "@/lib/utils";

const CommandCenterScene = dynamic(
  () => import("@/components/portfolio/CommandCenterScene").then((mod) => mod.CommandCenterScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.12),transparent_45%)]" />,
  },
);

const nav = [
  { id: "about", label: "About", icon: "user" },
  { id: "projects", label: "Projects", icon: "sparkles" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "skills", label: "Skills", icon: "code" },
  { id: "education", label: "Education", icon: "graduation" },
];

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div {...reveal} className="mx-auto mb-12 max-w-7xl">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">{eyebrow}</p>
      <h2 className="text-4xl font-light tracking-[-0.02em] text-white md:text-6xl">{title}</h2>
      {copy ? <p className="mt-5 max-w-3xl text-base leading-8 text-white/58 md:text-lg">{copy}</p> : null}
    </motion.div>
  );
}

function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...reveal}
      className={cn(
        "border border-white/[0.09] bg-[#0a0a0b]/85 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioApp() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%" },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <SmoothScroll />
      <LoadingScreen />
      <CustomCursor />
      <div className="particle-field" aria-hidden="true" />
      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-[2rem] border border-white/[0.08] bg-black/70 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
        <a href="#" className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg font-black tracking-[-0.12em] text-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" aria-label="Home">
          PA
        </a>
        <div className="hidden items-center gap-3 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-5 py-3 text-sm font-semibold text-white/68 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black transition hover:scale-[1.03] hover:bg-white/90 md:px-7"
        >
          Let's Build
        </a>
      </nav>

      <section className="relative min-h-screen overflow-hidden px-5 pb-24 pt-32 md:px-10">
        <CommandCenterScene />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.08),rgba(5,5,5,0.18)_45%,#050505_96%)]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur">
              <AppIcon name="sparkles" className="h-4 w-4" />
              Final-year CS (AI) student
            </div>
            <h1 className="text-6xl font-light leading-[0.95] tracking-[-0.07em] text-white md:text-8xl lg:text-[8.5rem]">
              {portfolio.person.name}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-white/64 md:text-2xl">
              {portfolio.person.role}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button asChild>
                  <a href="#projects">
                    Explore work <AppIcon name="arrow" className="h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="ghost">
                  <a href="/resume-prerak-arya.pdf" download>
                    Download resume <AppIcon name="download" className="h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="metal">
                  <a href={`mailto:${portfolio.person.email}`}>
                    Contact me <AppIcon name="mail" className="h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.35, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="hero-console rounded-[2rem] border border-white/[0.08] bg-black/55 p-6 font-mono text-sm text-white/65 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <p className="mb-4 text-white/35">~/portfolio/prerak-arya</p>
              <p><span className="text-white">&gt;</span> load_summary()</p>
              <p className="mt-3 text-white/45">{portfolio.summary}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {portfolio.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <b className="block text-2xl text-white">{metric.value}</b>
                    <span className="text-xs text-white/45">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">About</p>
          <h2 className="mb-16 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">Who I am</h2>
          <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
            <GlassPanel className="group min-h-[460px] overflow-hidden rounded-[1.8rem] p-0">
              <div className="relative h-full min-h-[460px]">
                <Image
                  src="/profile-prerak-arya.png"
                  alt="Portrait of Prerak Arya"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  priority
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.38),transparent_45%)]" />
              </div>
            </GlassPanel>
            <div className="grid gap-7">
              <GlassPanel className="rounded-[1.8rem] p-8 md:p-10">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">Intro</p>
                <p className="text-2xl leading-[1.65] text-white/72">{portfolio.summary}</p>
              </GlassPanel>
              <div className="grid gap-7 md:grid-cols-2">
                <GlassPanel className="rounded-[1.8rem] p-8">
                  <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">Focus</p>
                  <p className="text-xl leading-9 text-white/68">
                    Full-stack products, AI-powered workflows, frontend performance, accessible interfaces, and practical engineering.
                  </p>
                </GlassPanel>
                <GlassPanel className="rounded-[1.8rem] p-8">
                  <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">Impact</p>
                  <p className="text-xl leading-9 text-white/68">
                    ERP modules, 15+ REST API integrations, 20K+ users supported, and 30% page-load improvement.
                  </p>
                </GlassPanel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-5 py-24 md:px-10">
        <div className="sticky-reveal mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="sticky-copy lg:sticky lg:top-28 lg:self-start">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">Experience</p>
            <h2 className="text-4xl font-light tracking-[-0.02em] text-white md:text-6xl">
              Production work with measurable impact.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">
              Roles, systems, and frontend work shaped around real campus workflows, production APIs, and measurable performance gains.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {portfolio.metrics.slice(0, 4).map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                  <b className="block text-2xl text-white">{metric.value}</b>
                  <span className="mt-1 block text-xs leading-5 text-white/45">{metric.label}</span>
                </div>
              ))}
            </div>
          </aside>
          <div className="sticky-stack space-y-7">
            {portfolio.experience.map((job, index) => {
              return (
                <motion.article
                  key={`${job.company}-${job.role}`}
                  initial={{ opacity: 0, y: 70, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.72, ease: "easeOut" }}
                  className="sticky-card rounded-[2rem] border border-white/[0.09] bg-[#0a0a0b]/90 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8"
                >
                  <div className="mb-8 flex items-start justify-between gap-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.045]">
                      <AppIcon name={job.icon} className="h-5 w-5 text-white/74" />
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-xs text-white/45">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">{job.role}</h3>
                  <p className="mt-3 text-white/58">{job.company} - {job.location}</p>
                  <p className="mt-2 text-sm text-white/38">{job.period}</p>
                  <ul className="mt-8 space-y-4 text-white/68">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 leading-7">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-24 md:px-10">
        <SectionHeading
          eyebrow="Projects"
          title="Interactive products with real utility."
          copy="Each project below comes directly from the resume and keeps the original project links intact."
        />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {portfolio.projects.map((project, index) => {
            return (
              <GlassPanel key={project.title} className="project-card rounded-[2rem]">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/10">
                    <AppIcon name={project.icon} className="h-6 w-6 text-cyan-100" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                    {project.period}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">Project 0{index + 1}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan-200/15 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-50">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-7 space-y-3 text-sm text-slate-300">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3 leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="metal" size="sm">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <AppIcon name="git" className="h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live demo <AppIcon name="arrow" className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section id="education" className="px-5 py-24 md:px-10">
        <SectionHeading eyebrow="Education" title="Academic foundation in Computer Science and AI." />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {portfolio.education.map((item) => {
            return (
              <GlassPanel key={item.degree} className="rounded-[2rem]">
                <AppIcon name={item.icon} className="mb-6 h-7 w-7 text-cyan-200" />
                <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                <p className="mt-4 text-slate-300">{item.school}</p>
                <p className="mt-4 text-sm text-slate-400">{item.period}</p>
                <p className="mt-2 text-sm text-cyan-100">Grade: {item.grade}</p>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section id="skills" className="px-5 py-24 md:px-10">
        <div className="sticky-reveal mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="sticky-copy lg:sticky lg:top-28 lg:self-start">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/38">Skills</p>
            <h2 className="text-4xl font-light tracking-[-0.02em] text-white md:text-6xl">
              Tools, languages, and core CS fundamentals.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">
              A practical stack across full-stack development, AI systems, frontend craft, computer science fundamentals, and collaboration.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["OOPS", "Operating System", "React", "TypeScript", "AI"].map((item) => (
                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1.5 text-xs text-white/60">
                  {item}
                </span>
              ))}
            </div>
          </aside>
          <div className="sticky-stack grid gap-5 md:grid-cols-2">
            {portfolio.skills.map((skill, index) => {
              return (
                <motion.article
                  key={skill.group}
                  initial={{ opacity: 0, y: 58, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.42 }}
                  transition={{ duration: 0.68, ease: "easeOut" }}
                  className="sticky-skill-card rounded-[1.8rem] border border-white/[0.09] bg-[#0a0a0b]/88 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <AppIcon name={skill.icon} className="h-5 w-5 text-white/72" />
                      <h3 className="font-semibold text-white">{skill.group}</h3>
                    </div>
                    <span className="text-xs text-white/30">0{index + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.055] px-3 py-1.5 text-xs text-white/72">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10">
        <SectionHeading eyebrow="Achievements" title="Proof of practice and contribution." />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {portfolio.achievements.map((achievement) => {
            return (
              <GlassPanel key={achievement.title} className="rounded-[2rem]">
                <AppIcon name={achievement.icon} className="mb-6 h-7 w-7 text-cyan-200" />
                <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{achievement.detail}</p>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section id="contact" className="px-5 pb-32 pt-24 md:px-10">
        <GlassPanel className="mx-auto max-w-5xl rounded-[2rem] text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">Contact</p>
          <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">Let us build something sharp.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Reach out for full-stack products, AI-powered document systems, frontend architecture, or internship opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={`mailto:${portfolio.person.email}`}>
                <AppIcon name="mail" className="h-4 w-4" /> {portfolio.person.email}
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={`tel:${portfolio.person.phone}`}>{portfolio.person.phone}</a>
            </Button>
            <Button asChild variant="metal">
              <a href="/resume-prerak-arya.pdf" download>
                Download resume <AppIcon name="download" className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {portfolio.person.links.map((link) => {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-200/40 hover:text-cyan-100"
                  aria-label={link.label}
                >
                  <AppIcon name={link.icon} className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
