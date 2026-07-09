export const portfolio = {
  person: {
    name: "Prerak Arya",
    role: "Computer Science (AI) Student and Full-Stack Developer",
    location: "India",
    phone: "+919891075152",
    email: "prerak.a23csai@nst.rishihood.edu.in",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/prerak-arya-a60b89269/",
        icon: "network",
      },
      {
        label: "GitHub",
        href: "https://github.com/prerak2612",
        icon: "git",
      },
      {
        label: "LeetCode",
        href: "https://leetcode.com/Prerak_arya/",
        icon: "code",
      },
    ],
  },
  summary:
    "Final-year Computer Science (AI) student building production-ready full-stack web applications and AI-powered products. Experienced with React, Next.js, TypeScript, Node.js, Python, SQL, REST APIs, and Data Structures & Algorithms, including contributions to an ERP platform serving 20,000+ users.",
  metrics: [
    { label: "ERP users supported", value: "20K+" },
    { label: "REST APIs integrated", value: "15+" },
    { label: "Frontend speed gain", value: "30%" },
    { label: "DSA problems solved", value: "250+" },
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "Rishihood",
      location: "Remote",
      period: "November 2024 - June 2025",
      icon: "briefcase",
      highlights: [
        "Built and deployed production-ready ERP modules using Shadcn/UI, TanStack Table, and Recharts to streamline campus workflows.",
        "Integrated 15+ REST APIs with secure role-based access and optimized state management for 20K+ platform users.",
        "Reduced page load time by 30% through frontend performance work, improving responsiveness and user experience.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Null Class Edtech",
      location: "Remote",
      period: "June 2024 - August 2024",
      icon: "briefcase",
      highlights: [
        "Built responsive, reusable frontend components for scalable web applications.",
        "Improved UI/UX, accessibility, and cross-device compatibility by optimizing layouts and frontend architecture.",
        "Used AI-assisted development workflows to rapidly prototype and ship production-ready features from user requirements.",
      ],
    },
  ],
  projects: [
    {
      title: "luma-calendar",
      period: "March 2026",
      github: "https://github.com/prerak2612/luma-calendar",
      demo: "https://luma-calendar.netlify.app/",
      icon: "external",
      description:
        "Production-grade interactive wall calendar showcased to the TUF (Take U Forward) team.",
      highlights: [
        "Built CRUD notes with category tagging and localStorage persistence.",
        "Implemented keyboard shortcuts, theme switching, and accessible navigation.",
        "Designed a responsive mobile-first UI with Framer Motion animations and dynamic seasonal themes.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Framer Motion", "localStorage"],
    },
    {
      title: "DocAgent - AI-Powered Document Q&A System",
      period: "December 2025",
      github: "https://github.com/prerak2612/docagent-ai-rag-system/tree/main",
      demo: "https://docagent-ai-rag-system.vercel.app/",
      icon: "brain",
      description:
        "AI-powered document Q&A system with custom retrieval, prompt engineering, and evaluation metrics for accurate, source-backed responses.",
      highlights: [
        "Integrated Google Gemini API for chunking and prompt engineering.",
        "Implemented OCR fallback for scanned PDFs and images.",
        "Improved support for non-searchable documents with source-backed answer flows.",
      ],
      stack: ["AI", "RAG", "Google Gemini API", "OCR", "Prompt Engineering"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology (Computer Science and AI)",
      school: "Newton School of Technology, Rishihood University",
      period: "2023 - 2027",
      grade: "8.0/10.0",
      icon: "graduation",
    },
    {
      degree: "Intermediate (Class XII)",
      school: "The Dpsg International",
      period: "2022 - 2023",
      grade: "75.0%",
      icon: "book",
    },
    {
      degree: "Matriculation (Class X)",
      school: "The Dpsg International",
      period: "2019 - 2020",
      grade: "90.0%",
      icon: "book",
    },
  ],
  skills: [
    {
      group: "Computer Languages",
      icon: "binary",
      items: ["CSS", "HTML", "JavaScript", "Python", "Data Structures and Algorithms", "Node.js", "TypeScript"],
    },
    {
      group: "Core CS Subjects",
      icon: "book",
      items: ["OOPS", "Operating System", "Data Structures and Algorithms", "REST APIs", "SQL"],
    },
    {
      group: "AI / ML",
      icon: "brain",
      items: ["Deep Learning (DL)", "GenAI", "LLM", "OpenAI API"],
    },
    {
      group: "Frameworks & Libraries",
      icon: "code",
      items: ["Bootstrap", "React", "Tailwind"],
    },
    {
      group: "Soft Skills",
      icon: "award",
      items: ["Communication Skills", "Decision-making"],
    },
  ],
  achievements: [
    {
      title: "LeetCode Practice",
      detail: "Solved 250+ Data Structures & Algorithms problems on LeetCode.",
      icon: "trophy",
    },
    {
      title: "HackerRank Contribution",
      detail:
        "Raised PR #201 for HackerRank's InterviewStreet Resume Analyzer, improving resume evaluation templates.",
      icon: "git",
    },
    {
      title: "TradeClaw Open Source",
      detail: "Contributed open-source pull requests that enhanced real-world project features.",
      icon: "git",
    },
  ],
};

export type Portfolio = typeof portfolio;
