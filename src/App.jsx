import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Link as LinkIcon,
  ExternalLink,
  Code2,
  ChevronRight,
  Trophy,
  Star,
  Sun,
  Moon,
  Laptop,
  Sparkles,
    Briefcase,
  Calendar,
  MapPin
} from "lucide-react";
import "./App.css";
import { experiences, highlightProjects, navItems } from "./constant";
import { Section } from "./components/section";

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

  const Badge = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 backdrop-blur px-3 py-1 text-sm leading-6 shadow-sm">
      {children}
    </span>
  );

  const Chip = ({ children }) => (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );

  // Reusable button with subtle lift
  const Button = ({
    as: Component = "a",
    className = "",
    children,
    ...props
  }) => (
    <Component
      className={`group relative inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );

  // Card with soft glass look
  const Card = ({ children, className = "" }) => (
    <div
      className={`rounded-2xl border border-slate-200 bg-white/90 backdrop-blur text-slate-900 shadow ${className}`}
    >
      {children}
    </div>
  );

  const CardBody = ({ children, className = "" }) => (
    <div className={`p-5 md:p-6 ${className}`}>{children}</div>
  );

  const skills = useMemo(
    () => [
      "JavaScript (ES202x)",
      "TypeScript",
      "React.js",
      "React Native",
      "Redux & Zustand",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Context API",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "Redux",
      "Thunk/Saga",
      "REST & GraphQL",
      "Webpack/Vite",
      "Jest/RTL",
      "CI/CD",
      "Git & GitHub",
      "Bootstrap",
      "Figma",
      "Agile & Scrum",
      // "MUI",
      "Chakra UI",
      "Storybook",
      // "AWS Basics",
    ],
    []
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      {/* Decorative animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl"
        />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <div className="size-9 md:size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div className="leading-tight">
              <div className="font-bold text-lg md:text-xl">
                Vivek Kumar Sinha
              </div>
              <div className="text-xs text-slate-600 hidden sm:block">
                Frontend Engineer · React / RN
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-100"
              >
                {n.label}
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
                className={`size-5 transition ${
                  open ? "rotate-90" : "rotate-0"
                }`}
              />
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200">
            <div className="mx-auto max-w-6xl px-4 py-2 grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* soft radial tint behind hero text — use rgba to avoid parser quirks */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Badge>
                <Sparkles className="mr-1 size-4" /> Open to opportunities
              </Badge>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Building delightful web & mobile UIs
              </h1>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                I’m a frontend engineer (5+ years) specializing in React,
                Next.js, and React Native. I love crafting clean, accessible
                interfaces that scale.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="size-4" /> GitHub
                </Button>
                <Button href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" /> LinkedIn
                </Button>
                <Button href={LEETCODE_URL} target="_blank" rel="noreferrer">
                  <Trophy className="size-4" /> LeetCode
                </Button>
                {/* Primary CTA */}
                <Button
                  href="#contact"
                  className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white border-0"
                >
                  <Mail className="size-4" /> Contact Me
                </Button>
              </div>
              {/* <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>TypeScript</Chip>
                <Chip>React Native</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>Node.js</Chip>
              </div> */}
            </div>
            {/* Profile card with glass look */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="size-20 md:size-24 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
                  <div>
                    <h3 className="text-xl font-bold">Vivek Kumar Sinha</h3>
                    <p className="text-slate-600">
                      Frontend Engineer · React / Next.js / RN
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <Chip>India (IST)</Chip>
                      <Chip>Open Source</Chip>
                      <Chip>Performance-minded</Chip>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="font-semibold">5+ years</div>
                    <div className="text-slate-600">Experience</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="font-semibold">
                      React · React-Native · TS
                    </div>
                    <div className="text-slate-600">Core stack</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" subtitle="A quick intro">
        <Card>
          <CardBody>
            <p className="text-base leading-relaxed">
              Senior Frontend Engineer with 5+ years of experience building
              high-performance, scalable, and user-focused web applications
              using React.js, JavaScript, and TypeScript. Strong expertise in
              browser rendering, perfor- mance optimization, reusable UI
              systems, and end-to-end feature ownership. Proven track record
              collaborating with Product, UX, and Backend to deliver seamless
              experiences at scale with clean code, CI/CD, testing, and
              operational excellence.
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section
        id="experience"
        title="Experience"
        subtitle="Work & contributions"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, idx) => (
            <Card key={idx}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Briefcase className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{exp.role}</h3>
                      <span className="text-slate-500">•</span>
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      {exp.period && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-4" />
                          {exp.period}
                        </span>
                      )}
                      {exp.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-4" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {/* {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                      <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )} */}
                    {/* {exp.links && exp.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {exp.links.map((l, i) => (
                          <Button
                            key={i}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2"
                          >
                            <ExternalLink className="size-4" /> {l.label}
                          </Button>
                        ))}
                      </div>
                    )} */}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Tools I use daily">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur p-3 text-sm font-medium shadow-sm"
            >
              {s}
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Case studies from recent work"
      >
        {projectsError && (
          <div className="mb-4 text-sm text-red-500">{projectsError}</div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <Card key={(p.title ?? "proj") + idx}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    {p.desc && (
                      <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
                    )}
                    {Array.isArray(p.stack) && p.stack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      {p.link && (
                        <Button
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2"
                        >
                          <ExternalLink className="size-4" /> LinkedIn
                        </Button>
                      )}
                      {p.repo && (
                        <Button
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2"
                        >
                          <Github className="size-4" /> Code
                        </Button>
                      )}
                      {p.demo && (
                        <Button
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2"
                        >
                          <ExternalLink className="size-4" /> Live
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* LeetCode */}
      <Section id="leetcode" title="LeetCode" subtitle="DSA practice & streaks">
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600">
                  Visit my LeetCode profile for problems solved, badges, and
                  recent contests.
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

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Let’s collaborate">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <p className="text-sm text-slate-600">Send me an email</p>
                  <div className="mt-3">
                    <Button href="mailto:hello.viveksinha97@gmail.com">
                      Write an email
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <Linkedin className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <p className="text-sm text-slate-600">
                    Let’s connect and chat about roles.
                  </p>
                  <div className="mt-3">
                    <Button
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <Github className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <p className="text-sm text-slate-600">
                    Browse my code and contributions.
                  </p>
                  <div className="mt-3">
                    <Button
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="size-4" />
            <a
              className="hover:underline"
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
              className="hover:opacity-80"
            >
              <Github className="size-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="mailto:hello.viveksinha97@gmail.com"
              className="hover:opacity-80"
            >
              <Mail className="size-5" />
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Vivek Kumar Sinha. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
