import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft } from "./utils/animations";
import {
  Github,
  Linkedin,
  Mail,
  Link as LinkIcon,
  ExternalLink,
  Code2,
  ChevronRight,
  Trophy,
  Sparkles,
  Briefcase,
  Calendar,
  MapPin,
  Download,
  GraduationCap,
  FileText,
  Layers,
  Cpu,
} from "lucide-react";
import "./App.css";
import { experiences, highlightProjects, navItems, skillCategories, education } from "./constant";
import { Section } from "./components/section";
import { Badge, Chip, Button, Card, CardBody } from "./components/ui";
import Scene from "./components/canvas/Scene";
import CustomCursor from "./components/CustomCursor";

function useProjects(jsonUrl) {
  const [projects, setProjects] = useState(highlightProjects);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jsonUrl) return;
    let ignore = false;
    (async () => {
      try {
        setError("");
        const res = await fetch(jsonUrl);
        if (!res.ok) throw new Error("Failed to fetch LinkedIn projects JSON");
        const list = await res.json();
        if (!ignore && Array.isArray(list) && list.length) setProjects(list);
      } catch (e) {
        if (!ignore) setError(e.message || "Could not load LinkedIn projects");
      }
    })();
    return () => {
      ignore = true;
    };
  }, [jsonUrl]);

  return { projects, error };
}

function App() {
  const GITHUB_USERNAME = "sinha97";
  const LINKEDIN_URL = "https://www.linkedin.com/in/vivek-kumar-sinha97/";
  const LEETCODE_URL = "https://leetcode.com/u/vk9633698/";
  const LINKEDIN_PROJECTS_JSON = "";

  const { projects, error: projectsError } = useProjects(
    LINKEDIN_PROJECTS_JSON
  );

  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono antialiased selection:bg-cyan-500/30 selection:text-cyan-100 relative">
      <div className="hud-overlay" />
      <div className="hud-scanline" />
      <CustomCursor theme="dark" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 origin-left z-[100]"
        style={{ scaleX }}
      />
      <Scene />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-cyan-500/20 font-mono transition-colors duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="size-9 md:size-10 rounded-sm border border-cyan-500/50 bg-cyan-950/50 flex items-center justify-center group-hover:bg-cyan-900/50 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <Code2 className="size-5 text-cyan-400" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg md:text-xl text-slate-100 tracking-wider">
                VIVEK KUMAR SINHA
              </div>
              <div className="text-xs text-emerald-400 hidden sm:block">
                {">"} SENIOR_FRONTEND_ENGINEER // ACCENTURE
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 text-cyan-200">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-sm border border-transparent px-3 py-2 text-sm font-medium hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all hover:shadow-[0_0_5px_rgba(6,182,212,0.2)]"
              >
                [{n.label.toUpperCase()}]
              </a>
            ))}
          </nav>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              as="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              <ChevronRight
                className={`size-5 transition ${open ? "rotate-90" : "rotate-0"
                  }`}
              />
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-cyan-500/20 bg-slate-950/90 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 py-2 grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="rounded-sm border border-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-200 hover:border-cyan-500/80 hover:bg-cyan-950/50"
                  onClick={() => setOpen(false)}
                >
                  [{n.label.toUpperCase()}]
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* soft radial tint behind hero text */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(6,182,212,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Badge>
                  <Sparkles className="mr-1 size-4 text-emerald-400" /> STATUS_OPEN_TO_OPPORTUNITIES
                </Badge>
              </motion.div>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-loose flex flex-wrap gap-x-[0.25em] gap-y-2 uppercase"
              >
                {"Building high-scale web apps & intelligent systems".split(" ").map((word, i) => {
                  const isHighlight = word === "high-scale" || word === "intelligent" || word === "systems";
                  return (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.9 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
                    }}
                    className={
                      isHighlight
                        ? "glitch-text text-cyan-400"
                        : "text-slate-100"
                    }
                    data-text={word}
                  >
                    {word}
                  </motion.span>
                  );
                })}
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed"
              >
                Senior Frontend Engineer (6+ years) at <span className="text-cyan-300 font-semibold">Accenture</span> specializing in enterprise React & Next.js architectures, Module Federation micro-frontends, WCAG 2.1 AA accessibility, and applied AI / RAG systems.
              </motion.p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Button
                  href="/Kumar_Vivek_Resume.pdf"
                  download="Kumar_Vivek_Resume.pdf"
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500"
                >
                  <Download className="size-4" /> DOWNLOAD_RESUME
                </Button>
                <Button
                  href="/Kumar_Vivek_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:bg-cyan-950/40"
                >
                  <FileText className="size-4" /> VIEW_RESUME
                </Button>
                <Button
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="size-4" /> GITHUB_UPLINK
                </Button>
                <Button href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" /> LINKEDIN_NODE
                </Button>
                <Button href={LEETCODE_URL} target="_blank" rel="noreferrer">
                  <Trophy className="size-4" /> LEETCODE
                </Button>
              </motion.div>
            </div>
            {/* Profile card with data grid look */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="p-6 md:p-8 border-cyan-500/30">
                <div className="flex items-start gap-4">
                  <div className="size-20 md:size-24 rounded-sm border-2 border-dashed border-cyan-500/50 bg-cyan-950/30 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]" />
                      <Code2 className="size-10 text-cyan-400 opacity-80" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold glitch-text text-cyan-300 uppercase tracking-wide" data-text="VIVEK_KUMAR_SINHA">VIVEK_KUMAR_SINHA</h3>
                    <p className="text-emerald-400 text-sm mt-1 uppercase">
                      {">"} SENIOR_FRONTEND_ENGINEER
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <Chip>Accenture</Chip>
                      <Chip>India (IST)</Chip>
                      <Chip>WCAG 2.1 AA</Chip>
                      <Chip>Applied AI / RAG</Chip>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-sm border border-cyan-500/20 bg-cyan-950/30 p-3">
                    <div className="font-semibold text-emerald-400 text-base">6+ years</div>
                    <div className="text-slate-400 text-xs mt-0.5">Professional Experience</div>
                  </div>
                  <div className="rounded-sm border border-cyan-500/20 bg-cyan-950/30 p-3">
                    <div className="font-semibold text-cyan-300 text-xs leading-snug">
                      React · Next.js · TS · Micro-Frontends · RAG
                    </div>
                    <div className="text-slate-400 text-xs mt-1">Core Tech Stack</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" subtitle="Engineering profile">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Card>
            <CardBody>
              <p className="text-base leading-relaxed text-slate-300">
                I am a <strong className="text-cyan-300">Senior Frontend Engineer</strong> with 6+ years of experience architecting and shipping enterprise-scale web applications, micro-frontends, and high-performance design systems. Currently at <strong className="text-emerald-400">Accenture</strong>, I contribute to Fortune 500 client applications, enforcing strict WCAG 2.1 AA accessibility standards, Module Federation, and end-to-end performance optimizations (Lighthouse 90+, Core Web Vitals).
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Beyond core frontend engineering, I have a deep passion for applied AI architectures — including <strong className="text-cyan-300">Agentic RAG</strong> (LangGraph), <strong className="text-cyan-300">GraphRAG</strong> (Neo4j Cypher), and vector databases (Qdrant, ChromaDB), pairing cutting-edge AI retrieval with production-ready user experiences.
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        title="Experience"
        subtitle="Career trajectory & technical impact"
      >
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {experiences.map((exp, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <Card className="h-full flex flex-col justify-between">
                <CardBody className="flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className="rounded-sm bg-cyan-950/50 border border-cyan-500/40 p-2 text-cyan-400 shrink-0">
                      <Briefcase className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-100">{exp.role}</h3>
                        <span className="text-cyan-500">•</span>
                        <span className="font-medium text-emerald-400">{exp.company}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        {exp.period && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="size-3.5 text-cyan-400" />
                            {exp.period}
                          </span>
                        )}
                        {exp.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3.5 text-cyan-400" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bullet highlights */}
                  {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                    <div className="mt-4 space-y-2 flex-1">
                      {exp.highlights.map((point, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <span className="text-cyan-400 mt-0.5 select-none font-bold">{">"}</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stack */}
                  {Array.isArray(exp.stack) && exp.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-cyan-500/20">
                      {exp.stack.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Technical toolkit & specializations">
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {skillCategories.map((group) => (
            <motion.div key={group.category} variants={fadeInUp}>
              <Card className="h-full">
                <CardBody>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-500/20">
                    <Cpu className="size-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold tracking-wider text-cyan-300 uppercase">
                      [{group.category}]
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-sm border border-cyan-500/20 bg-cyan-950/40 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Applied AI systems & featured fullstack builds"
      >
        {projectsError && (
          <div className="mb-4 text-sm text-red-500">{projectsError}</div>
        )}
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {projects.map((p, idx) => (
            <motion.div key={(p.title ?? "proj") + idx} variants={fadeInUp}>
              <Card className="h-full flex flex-col justify-between">
                <CardBody className="flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className="rounded-sm bg-cyan-950/50 border border-cyan-500/40 p-2 text-cyan-400 shrink-0">
                      <Code2 className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100">{p.title}</h3>
                      {p.desc && (
                        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cyan-500/10 flex-1 flex flex-col justify-end">
                    {Array.isArray(p.stack) && p.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.stack.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {p.link && (
                        <Button
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5"
                        >
                          <ExternalLink className="size-3.5" /> LinkedIn
                        </Button>
                      )}
                      {p.repo && (
                        <Button
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5"
                        >
                          <Github className="size-3.5" /> Code Uplink
                        </Button>
                      )}
                      {p.demo && (
                        <Button
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 border-emerald-500 text-emerald-400 hover:text-emerald-300"
                        >
                          <ExternalLink className="size-3.5" /> Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" subtitle="Academic background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Card>
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="rounded-sm bg-cyan-950/50 border border-cyan-500/40 p-3 text-cyan-400 shrink-0">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{education.degree}</h3>
                  <p className="text-emerald-400 text-sm mt-0.5">{education.institution} • {education.location}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="size-3.5 text-cyan-400" />
                    <span>{education.period}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Section>

      {/* LeetCode */}
      <Section id="leetcode" title="LeetCode" subtitle="Problem solving & algorithmic practice">
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">
                  Explore my LeetCode profile for problem solving records, streak consistency, and contest ratings.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={LEETCODE_URL} target="_blank" rel="noreferrer">
                  <Trophy className="size-4" /> Open LeetCode Profile
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-slate-950/80 mt-12">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="size-4 text-cyan-400" />
            <a
              className="hover:text-cyan-300 transition-colors"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              github.com/{GITHUB_USERNAME}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="mailto:hello.viveksinha97@gmail.com"
              className="hover:text-cyan-300 transition-colors"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Vivek Kumar Sinha. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
