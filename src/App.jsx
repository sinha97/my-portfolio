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
} from "lucide-react";
import "./App.css";
import { highlightProjects, navItems } from "./constant";
import { Section } from "./components/section";

function App() {
  const GITHUB_USERNAME = "sinha97";
  const LINKEDIN_URL = "https://www.linkedin.com/in/vivek-kumar-sinha97/";
  const LEETCODE_URL = "https://leetcode.com/u/vk9633698/";

  const Badge = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur px-3 py-1 text-sm leading-6">
      {children}
    </span>
  );

  const Chip = ({ children }) => (
    <span className="rounded-full bg-slate-100/80 dark:bg-slate-800/60 px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );

  const Button = ({ as: Tag = "a", className = "", children, ...props }) => (
    <Tag
      className={`group relative inline-flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  );

  const Card = ({ children, className = "" }) => (
    <div
      className={`rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur text-slate-900 dark:text-slate-100 shadow ${className}`}
    >
      {children}
    </div>
  );

  const CardBody = ({ children, className = "" }) => (
    <div className={`p-5 md:p-6 ${className}`}>{children}</div>
  );

  function useTheme() {
    const getSystemPref = () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [theme, setTheme] = useState(() => {
      if (typeof window === "undefined") return "system";
      const saved = localStorage.getItem("theme");
      return saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    });

    // Apply or remove the 'dark' class on <html> based on theme state
    const apply = (t) => {
      const root = document.documentElement;
      const isDark = t === "dark" || (t === "system" && getSystemPref());
      root.classList.toggle("dark", !!isDark);
    };

    useEffect(() => {
      if (typeof document === "undefined") return;
      apply(theme);
      localStorage.setItem("theme", theme);
    }, [theme]);

    // React to OS theme changes only when in 'system' mode
    useEffect(() => {
      if (typeof window === "undefined") return;
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        if (theme === "system") apply("system");
      };
      // Add cross-browser listener
      mq.addEventListener
        ? mq.addEventListener("change", onChange)
        : mq.addListener(onChange);
      return () => {
        mq.removeEventListener
          ? mq.removeEventListener("change", onChange)
          : mq.removeListener(onChange);
      };
    }, [theme]);

    // Derived boolean for convenience
    const isDark = theme === "dark" || (theme === "system" && getSystemPref());

    return { theme, setTheme, isDark };
  }

  function ThemeToggle({ theme, setTheme }) {
    const optionBase =
      "flex-1 inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition";
    const active =
      "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow";
    const inactive =
      "bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/10";

    return (
      <div className="inline-flex rounded-2xl p-1 border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur">
        <button
          className={`${optionBase} ${theme === "light" ? active : inactive}`}
          onClick={() => setTheme("light")}
          aria-label="Light theme"
          type="button"
        >
          <Sun className="size-4" />{" "}
          <span className="hidden sm:inline">Light</span>
        </button>
        <button
          className={`${optionBase} ${theme === "system" ? active : inactive}`}
          onClick={() => setTheme("system")}
          aria-label="System theme"
          type="button"
        >
          <Laptop className="size-4" />{" "}
          <span className="hidden sm:inline">System</span>
        </button>
        <button
          className={`${optionBase} ${theme === "dark" ? active : inactive}`}
          onClick={() => setTheme("dark")}
          aria-label="Dark theme"
          type="button"
        >
          <Moon className="size-4" />{" "}
          <span className="hidden sm:inline">Dark</span>
        </button>
      </div>
    );
  }

  const { theme, setTheme, isDark } = useTheme();

  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState("");

  useEffect(() => {
    async function loadRepos() {
      try {
        setLoadingRepos(true);
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data = await res.json();
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 8);
        setRepos(filtered);
      } catch (e) {
        setRepoError(e.message || "Could not load repositories");
      } finally {
        setLoadingRepos(false);
      }
    }
    loadRepos();
  }, []);

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
      "MongoDB",
      "PostgreSQL",
      "REST & GraphQL",
      "Webpack/Vite",
      "Jest/RTL",
      "CI/CD",
      "Git & GitHub",
    ],
    []
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-200 antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">
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
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <div className="size-9 md:size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div className="leading-tight">
              <div className="font-bold text-lg md:text-xl">
                Vivek Kumar Sinha
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
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
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {n.label}
              </a>
            ))}
            {/* 3-way Theme toggle */}
            <Button
              as="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span className="hidden sm:inline">
                {isDark ? "Light" : "Dark"}
              </span>
            </Button>
          </nav>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              as="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span className="hidden sm:inline">
                {isDark ? "Light" : "Dark"}
              </span>
            </Button>
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
          <div className="md:hidden border-t border-slate-200/60 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-2 grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800/60"
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,theme(colors.indigo.500/.15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Badge>
                <Sparkles className="mr-1 size-4" /> Open to opportunities
              </Badge>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Building delightful web & mobile UIs
              </h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                I’m a frontend engineer (4+ years) specializing in React,
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
                <Button
                  href="#contact"
                  className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white border-0"
                >
                  <Mail className="size-4" /> Contact Me
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>TypeScript</Chip>
                <Chip>React Native</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>Node.js</Chip>
              </div>
            </div>
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
                    <p className="text-slate-600 dark:text-slate-300">
                      Frontend Engineer · React / Next.js / RN
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {/* <Chip>India (IST)</Chip> */}
                      <Chip>Open Source</Chip>
                      <Chip>Performance-minded</Chip>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-slate-200/60 dark:border-white/10 p-3">
                    <div className="font-semibold">5+ years</div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Experience
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 dark:border-white/10 p-3">
                    <div className="font-semibold">React · RN · TS · Redux</div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Core stack
                    </div>
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
              I’m a core frontend developer with experience shipping consumer
              apps at scale — from car rental platforms to ecommerce experiences
              and creator apps. I focus on performance, accessibility, and DX,
              and I enjoy building design systems that teams love using.
            </p>
          </CardBody>
        </Card>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Tools I use daily">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur p-3 text-sm font-medium shadow-sm"
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
        <div className="grid gap-6 md:grid-cols-2">
          {highlightProjects.map((p) => (
            <Card key={p.title}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-100/80 dark:bg-slate-800/60 p-2">
                    <Code2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {p.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* GitHub Activity */}
      {/* <Section
        id="github"
        title="GitHub"
        subtitle="Latest repositories (auto-fetched)"
      >
        {loadingRepos ? (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Loading repositories…
          </div>
        ) : repoError ? (
          <div className="text-sm text-red-500">{repoError}</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((r) => (
              <Card key={r.id}>
                <CardBody>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a
                        className="text-base font-semibold hover:underline"
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {r.name}
                      </a>
                      {r.description && (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {r.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                        {r.language && <Chip>{r.language}</Chip>}
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-4" />
                          {r.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Code2 className="size-4" />
                          {r.forks_count}
                        </span>
                        <a
                          className="inline-flex items-center gap-1 hover:underline"
                          href={`${r.html_url}/issues`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Issues <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                    <a
                      className="rounded-xl border px-3 py-2 text-xs hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View <ExternalLink className="ml-1 inline size-3" />
                    </a>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-6">
          <Button
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="size-4" /> See all repositories
          </Button>
        </div>
      </Section> */}

      {/* LeetCode */}
      <Section id="leetcode" title="LeetCode" subtitle="DSA practice & streaks">
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
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
                <div className="rounded-xl bg-slate-100/80 dark:bg-slate-800/60 p-2">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Send me an email — I’m quick to respond.
                  </p>
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
                <div className="rounded-xl bg-slate-100/80 dark:bg-slate-800/60 p-2">
                  <Linkedin className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
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
                <div className="rounded-xl bg-slate-100/80 dark:bg-slate-800/60 p-2">
                  <Github className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
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
      <footer className="border-t border-slate-200/60 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600 dark:text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
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
