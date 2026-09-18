export const highlightProjects = [
  // {
  //   title: "Enterprise AI Copilot — Multi-Layer RAG",
  //   desc: "Production-grade AI copilot built with versioned architecture: v1 Agentic RAG spine (LangGraph, ChromaDB, Tavily, FastAPI), v2 GraphRAG retrieval (Neo4j Cypher), v3 Multilingual retrieval (BGE-M3, Qdrant), v4 Containerized deployment with LangSmith tracing & Next.js frontend.",
  //   stack: ["Next.js", "LangGraph", "FastAPI", "Neo4j", "ChromaDB", "Qdrant", "Python", "Docker"],
  //   repo: "https://github.com/sinha97",
  //   demo: ""
  // },
  // {
  //   title: "RAG-Powered Personal Knowledge Base",
  //   desc: "Mobile-first capture system (voice transcription, photo OCR, URL clipping) paired with a Next.js web application for high-speed semantic search and RAG-based chat with source citations.",
  //   stack: ["React Native", "Next.js", "Vector DB", "Semantic Search", "TypeScript"],
  //   repo: "https://github.com/sinha97",
  //   demo: ""
  // },
  {
    title: "ChatGPT Clone",
    desc: "A fully functional ChatGPT-like interface with authentication, AI streaming responses, and persistent chat history storage.",
    stack: ["Next.js", "OpenAI", "Firebase", "Tailwind CSS"],
    repo: "https://github.com/sinha97/chatgpt-clone",
    demo: "https://mychatgpt-gules.vercel.app/"
  },
  {
    title: "DevConnector",
    desc: "A full-stack social platform for developers featuring authentication, profile portfolios, GitHub repository integration, and interactive developer feeds.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Redux"],
    repo: "https://github.com/sinha97/DevConnector",
    demo: ""
  },
  {
    title: "Twitter Clone",
    desc: "A full-featured Twitter-like web application with real-time updates, authentication, posting, and social interactions.",
    stack: ["Node.js", "Express", "MongoDB", "Socket.io", "Pug"],
    repo: "https://github.com/sinha97/twitter-clone",
    demo: ""
  },
  {
    title: "Shopping Cart & Checkout",
    desc: "A complete e-commerce shopping cart system with APIs, authentication, state management, and secure Stripe payment processing.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Stripe"],
    repo: "https://github.com/sinha97/myShoppingCart",
    demo: ""
  }
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

export const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Accenture",
    period: "03-2026 – Present",
    location: "Gurugram, India",
    stack: ["React.js", "Next.js", "TypeScript", "Module Federation", "WCAG 2.1 AA", "Scrum", "CI/CD"],
    highlights: [
      "Architected and contributed to enterprise-scale React and Next.js applications for a Fortune 500 client engagement, enforcing performance optimization and WCAG 2.1 AA accessibility standards.",
      "Implemented Module Federation-based micro-frontend architecture, enabling independent multi-team deployments and decoupling release dependencies.",
      "Established TypeScript coding standards, reusable design system patterns, and automated CI/CD pipeline test gates; mentored engineers on frontend best practices."
    ]
  },
  {
    role: "Senior Frontend Engineer",
    company: "Satin Creditcare Network Ltd",
    period: "08-2024 – 02-2026",
    location: "Gurugram, India",
    stack: ["React.js", "TypeScript", "Redux Toolkit", "TanStack Query", "React Native", "Recharts", "WCAG 2.1 AA", "Playwright"],
    highlights: [
      "Cut page-load time by 40x across core financial modules (Lighthouse 90+, Core Web Vitals) through bundle optimization, code-splitting, lazy loading, and targeted memoization.",
      "Reduced API over-fetching by 60% while maintaining responsive performance on 2G networks via Redux Toolkit & TanStack Query caching and optimistic updates for real-time KPI dashboards.",
      "Cut feature-release cycles by 25–30% and eliminated ~8,000 lines of duplicated code by creating a shared UI component library adopted across 4 product squads.",
      "Architected statutory gratuity-calculation module covering 12,000+ employee records, cutting HR processing time by 65%.",
      "Delivered WCAG 2.1 AA compliance across 15+ core modules and achieved 78% test coverage with Jest, React Testing Library, and Playwright."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Kai-T",
    period: "04-2023 – 07-2024",
    location: "Gurugram, India",
    stack: ["React.js", "TypeScript", "Module Federation", "GitLab CI/CD", "Webpack", "Lighthouse", "Jest"],
    highlights: [
      "Reduced release contention by 70% with Module Federation micro-frontends enabling 3 independent teams to deploy in parallel.",
      "Led 40,000+ line JavaScript-to-TypeScript migration, reducing runtime type errors by 80% and developer onboarding time from 2 weeks to 4 days.",
      "Lifted Lighthouse scores from mid-60s to 90+ across 3 product areas by profiling bottlenecks and eliminating render waterfalls.",
      "Automated GitLab CI/CD pipelines with test gates, compressing turnaround from 3+ days to under 2 hours."
    ]
  },
  {
    role: "Associate Software Developer",
    company: "OpenSense Labs",
    period: "07-2021 – 01-2023",
    location: "New Delhi, India",
    stack: ["React.js", "Vanilla JavaScript", "Monaco Editor", "React Beautiful DnD", "Recharts", "Chart.js"],
    highlights: [
      "Reduced campaign turnaround by 60% by engineering a zero-dependency Vanilla JS module with Monaco Editor for live content personalization.",
      "Delivered a drag-and-drop page builder for non-engineering content teams, eliminating 3-day turnaround bottlenecks.",
      "Built 6 configurable analytics dashboards with Recharts and Chart.js adopted by 3 business units."
    ]
  },
  {
    role: "Software Developer",
    company: "Arnowa Pvt Ltd",
    period: "09-2020 – 03-2021",
    location: "New Delhi, India",
    stack: ["React.js", "BizCharts", "ApexCharts", "Performance Profiling"],
    highlights: [
      "Eliminated weekly frame-drop incidents by resolving memory leaks and re-render loops across chart-heavy dashboard components.",
      "Decomposed an 8,000-line monolithic UI into 14 feature-scoped reusable components for parallel development."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Beeu Tech",
    period: "04-2020 – 08-2020",
    location: "Kolkata, India",
    stack: ["React.js", "CSS3", "Responsive Design", "A/B Testing"],
    highlights: [
      "Improved form-completion rates through A/B testing and iterative UX feedback loops on responsive fintech UI flows."
    ]
  }
];

export const skillCategories = [
  {
    category: "Frontend Core",
    items: ["React.js", "Next.js (App Router, SSR)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Material UI", "Responsive Design"]
  },
  {
    category: "Architecture & State",
    items: ["Redux Toolkit (RTK Query)", "TanStack Query", "Micro-Frontends", "Module Federation", "Context API", "Design Systems", "Code Splitting & Lazy Loading"]
  },
  {
    category: "Applied AI & LLMs",
    items: ["Agentic RAG", "GraphRAG", "LangGraph", "ChromaDB", "Neo4j (Cypher)", "Qdrant", "BGE-M3 Embeddings", "FastAPI", "LangSmith Tracing", "Python"]
  },
  {
    category: "Performance & A11y",
    items: ["Core Web Vitals", "Lighthouse (90+)", "WCAG 2.1 AA", "ARIA & Keyboard Nav", "Webpack", "Vite", "Memoization & Profiling"]
  },
  {
    category: "Testing & Quality",
    items: ["Jest", "React Testing Library (RTL)", "Playwright", "Unit / Integration / E2E", "Test-Driven Development (TDD)", "GitLab CI/CD"]
  },
  {
    category: "Mobile & Backend",
    items: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "PostgreSQL", "SQL", "Redis", "Docker Compose"]
  }
];

export const education = {
  degree: "Bachelor of Engineering — Information Technology",
  institution: "Panjab University",
  location: "Chandigarh, India",
  period: "2015 – 2019"
};