export type Track = "engineering" | "teaching";

export const profile = {
  name: "Taha-Yassen Shalaby",
  shortName: "Taha Shalaby",
  arabicName: "طه شلبي",
  monogram: "TS",
  roles: ["Full-Stack AI Engineer", "Mathematics & Computing Educator"],
  email: "tahashalaby93@gmail.com",
  github: "https://github.com/TahaSha",
  githubHandle: "TahaSha",
  linkedin: "https://www.linkedin.com/in/tahashalaby",
  linkedinHandle: "tahashalaby",
  location: "Cairo, Egypt",
  city: "Cairo",
  countryCode: "EG",
  nationality: "United States",
  citizenship: "U.S. Citizen",
  availability: "Open to remote and relocation",
  tagline:
    "I ship production AI systems and teach the next generation how they work.",
  footerTagline: "AI engineer and Cambridge mathematics teacher.",
  about: [
    "Most engineers can build. Most teachers can explain. I have spent the last decade doing both at once, and each career keeps making the other one better.",
    "On the engineering side, I co-founded an AI startup that shipped 12+ production ML systems for Fortune 500 clients, led validator infrastructure for a blockchain oracle network, and now build agentic LLM applications for cybersecurity: on-prem tool-calling agents that let SOC analysts query security logs in plain English.",
    "In the classroom, I have spent over seven years as a Cambridge Mathematics and Computing teacher across international schools in Cairo, Egypt, from Year 1 Computing through Checkpoint Mathematics. The two careers sharpen each other: my clients get systems explained in plain language, and my students get lessons grounded in a live industry.",
  ],
  cvs: [
    {
      label: "AI Engineer CV",
      file: "/cv/Taha_Shalaby_AI_Engineer_CV.pdf",
      track: "engineering" as Track,
    },
    {
      label: "Teaching CV",
      file: "/cv/Taha_Shalaby_Teaching_CV.pdf",
      track: "teaching" as Track,
    },
  ],
};

export const stats = [
  { value: "6+", label: "years shipping production AI" },
  { value: "7+", label: "years teaching Cambridge curriculum" },
  { value: "12+", label: "ML systems for Fortune 500 clients" },
  { value: "2M+", label: "predictions served per month" },
];

export interface Role {
  track: Track;
  title: string;
  org: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack?: string[];
}

export const engineeringRoles: Role[] = [
  {
    track: "engineering",
    title: "AI Engineer / Consultant",
    org: "Snappers, AI Cybersecurity",
    location: "Cairo, remote for US client",
    start: "May 2025",
    end: "Present",
    current: true,
    summary:
      "Building agentic LLM applications for security operations: an AI-powered SOC analyst dashboard with a tool-calling agent grounded in live log data.",
    highlights: [
      "Built a tool-calling LLM agent (on-prem Qwen via Ollama) that lets Tier-1 SOC analysts replace hand-written SIEM queries with plain-English requests, cutting query construction from minutes to a single step.",
      "Hardened the agent against OWASP LLM Top 10 risks: validated generated queries, read-only least-privilege execution, full prompt and response audit logging.",
      "Built an automated report engine for PCI compliance and incident reports with modular, customizable templates.",
      "Deployed fully on-prem with open-source models to meet strict data residency requirements.",
    ],
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "LangChain",
      "Ollama / Qwen",
      "Docker Compose",
    ],
  },
  {
    track: "engineering",
    title: "Tech Lead",
    org: "Singularity Finance",
    location: "Cairo",
    start: "Feb 2023",
    end: "Apr 2025",
    summary:
      "Led a small dev team building and operating price-feed algorithms for the Flare FTSO oracle network.",
    highlights: [
      "Landed submissions within the reward band on roughly 90% of price windows on the Songbird canary network.",
      "Architected and operated infrastructure on GCP Managed Instance Groups, sustaining about 99% uptime across a 3-node validator fleet.",
      "Implemented Node.js/TypeScript backend services integrated with FastAPI Python endpoints for ML algorithms in an Ethereum-based ecosystem.",
      "Managed confidential VMs, automated snapshot and backup processes, and ERC token node infrastructure.",
    ],
    stack: ["Node.js", "TypeScript", "FastAPI", "GCP MIG", "Ethereum"],
  },
  {
    track: "engineering",
    title: "Co-Founder & CTO",
    org: "laccuna, AI / Data Science Startup",
    location: "Toronto",
    start: "Dec 2019",
    end: "Dec 2022",
    summary:
      "Co-founded and set technical direction for an AI startup shipping production ML for SMEs and Fortune 500 clients.",
    highlights: [
      "Delivered 12+ production ML projects powering 2M+ predictions per month across manufacturing, media, finance, and telecommunications.",
      "Led a consulting engagement with UCI graduate engineers for a multi-million-dollar California manufacturing company.",
      "Built production systems spanning NLP, time-series forecasting, classification, deep learning, and distributed computing.",
      "Owned backend architecture, API development, GCP deployment, and the client delivery pipeline end to end.",
    ],
    stack: ["PyTorch", "Transformers", "FastAPI", "GCP", "Ray", "Kubernetes"],
  },
];

export const teachingRoles: Role[] = [
  {
    track: "teaching",
    title: "Mathematics & Computing Teacher",
    org: "Wycombe Abbey Cairo East",
    location: "Cairo",
    start: "Sept 2025",
    end: "Present",
    current: true,
    summary:
      "Delivering Cambridge Mathematics to Years 7 and 8 Checkpoint students and Computing across Years 1 to 8.",
    highlights: [
      "Prepare Checkpoint students for comprehensive end-of-stage assessments with differentiated, inquiry-based lesson design.",
      "Teach digital literacy, computational thinking, and programming across Primary and Lower Secondary.",
      "Bring active industry AI experience into Computing lessons for authentic, contemporary relevance.",
    ],
  },
  {
    track: "teaching",
    title: "Homeroom Teacher, Milepost 3",
    org: "Kompass Education",
    location: "Cairo",
    start: "Jul 2024",
    end: "Aug 2025",
    summary:
      "Delivered English, Mathematics, Science, and Health through the IPC framework to students aged 9 to 12.",
    highlights: [
      "Completed IPC Level 1 Certification in inquiry-based and thematic curriculum design.",
      "Built strong cross-curricular integration across all four subjects.",
    ],
  },
  {
    track: "teaching",
    title: "Mathematics Educator",
    org: "New Capital English School",
    location: "Cairo",
    start: "Sept 2023",
    end: "Jun 2024",
    summary:
      "Taught Cambridge Mathematics for Years 6 to 8 and completed Checkpoint examinations for Years 6 and 8.",
    highlights: [
      "Built a custom automated reporting system and gradebook calculator, improving assessment efficiency school-wide.",
    ],
  },
  {
    track: "teaching",
    title: "Mathematics Educator",
    org: "New Capital English School",
    location: "Cairo",
    start: "Sept 2018",
    end: "Sept 2020",
    summary:
      "Developed Cambridge-aligned Mathematics curriculum for lower secondary Checkpoint and pre-IGCSE.",
    highlights: [
      "Designed automated reporting and gradebook tools that significantly improved the school's data management.",
    ],
  },
  {
    track: "teaching",
    title: "ICT Educator",
    org: "Futures British School",
    location: "Cairo",
    start: "Sept 2017",
    end: "Sept 2018",
    summary:
      "Delivered the ICT curriculum for lower secondary and pre-IGCSE, aligned with Cambridge standards.",
    highlights: [
      "Founded and led a robotics club introducing students to coding, electronics, and STEM thinking.",
    ],
  },
];

export interface Project {
  name: string;
  org: string;
  year: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    name: "AI-Powered SOC Dashboard with Agent Chat",
    org: "Snappers",
    year: "2025",
    problem:
      "Tier-1 SOC analysts were hand-writing SIEM queries to investigate incidents, and strict data residency requirements ruled out cloud LLMs entirely.",
    approach:
      "A full-stack dashboard with a tool-calling agent running Qwen on-prem via Ollama, grounding answers in live log data, validating every generated query against read-only, least-privilege access, and automating PCI and incident reporting.",
    outcome:
      "Query construction dropped from minutes of manual syntax to a single plain-English request, fully on-prem.",
    stack: ["React", "FastAPI", "PostgreSQL", "Ollama / Qwen", "Docker"],
  },
  {
    name: "BERT Article Relevance Classifier",
    org: "laccuna",
    year: "2021",
    problem:
      "A US media company screened article relevance with around 100 manual analysts.",
    approach:
      "Fine-tuned a BERT transformer classifier with PyTorch and HuggingFace.",
    outcome: "82% F1-score, analyst headcount cut from 100 to 15.",
    stack: ["PyTorch", "HuggingFace", "BERT"],
  },
  {
    name: "Distributed Time-Series Forecasting",
    org: "laccuna",
    year: "2022",
    problem:
      "Client-specific label forecasting had outgrown single-machine training.",
    approach:
      "A Ray-parallelized pipeline across a GCP compute cluster with interactive Plotly dashboards.",
    outcome:
      "Portfolio-wide forecasts delivered at cluster scale for a US media company.",
    stack: ["Ray", "PyTorch", "statsmodels", "GCP", "Plotly"],
  },
  {
    name: "Customer Churn Prediction",
    org: "laccuna",
    year: "2022",
    problem:
      "A telecom client was losing customers with no early warning signal.",
    approach:
      "A tuned gradient boosting model deployed on GCP and wired into retention workflows.",
    outcome: "15% reduction in customer churn.",
    stack: ["XGBoost", "scikit-learn", "GCP"],
  },
  {
    name: "ML Workflow Engine on Kubernetes",
    org: "laccuna",
    year: "2022",
    problem:
      "Every client deployment meant rebuilding orchestration from scratch.",
    approach:
      "An MLOps microservices workflow engine on GKE with auto-scaling, ingress, secrets management, and configurable Dockerfiles.",
    outcome:
      "The production backbone for the full client portfolio, serving 2M+ predictions per month.",
    stack: ["FastAPI", "Celery", "RabbitMQ", "Nginx", "GKE"],
  },
];

export interface TimelineEntry {
  track: Track | "education";
  year: string;
  title: string;
  org: string;
  note?: string;
  ongoing?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    track: "education",
    year: "2014",
    title: "B.Sc. Mechatronics Engineering",
    org: "AAST, Cairo",
    note: "Graduation project: autonomous attendance robot using facial recognition. Graduated 2019.",
  },
  {
    track: "teaching",
    year: "2017",
    title: "ICT Educator",
    org: "Futures British School",
    note: "First classroom. Founded a robotics club.",
  },
  {
    track: "teaching",
    year: "2018",
    title: "Mathematics Educator",
    org: "New Capital English School",
    note: "Cambridge Checkpoint and pre-IGCSE. Built automated gradebook tools.",
  },
  {
    track: "engineering",
    year: "2019",
    title: "Co-Founder & CTO",
    org: "laccuna, Toronto",
    note: "12+ production ML systems for Fortune 500 clients.",
  },
  {
    track: "engineering",
    year: "2023",
    title: "Tech Lead",
    org: "Singularity Finance",
    note: "Flare FTSO oracle price feeds, 3-node validator fleet on GCP.",
  },
  {
    track: "teaching",
    year: "2023",
    title: "Mathematics Educator",
    org: "New Capital English School",
    note: "Completed Checkpoint examinations for Years 6 and 8.",
  },
  {
    track: "teaching",
    year: "2024",
    title: "Homeroom Teacher",
    org: "Kompass Education",
    note: "IPC Level 1 certified. English, Maths, Science, Health.",
  },
  {
    track: "engineering",
    year: "2025",
    title: "AI Engineer / Consultant",
    org: "Snappers, AI Cybersecurity",
    note: "Agentic LLM applications for SOC automation.",
    ongoing: true,
  },
  {
    track: "teaching",
    year: "2025",
    title: "Mathematics & Computing Teacher",
    org: "Wycombe Abbey Cairo East",
    note: "Cambridge Maths, Years 7 and 8. Computing, Years 1 to 8.",
    ongoing: true,
  },
];

export interface SkillGroup {
  track: Track;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    track: "engineering",
    label: "AI / ML",
    items: [
      "PyTorch",
      "HuggingFace Transformers",
      "LLM agents & tool calling",
      "RAG",
      "LangChain",
      "Ollama",
      "LLM security (OWASP LLM Top 10)",
      "scikit-learn",
      "XGBoost",
      "NLP",
    ],
  },
  {
    track: "engineering",
    label: "Full-Stack",
    items: [
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "SQL",
    ],
  },
  {
    track: "engineering",
    label: "Cloud / DevOps",
    items: [
      "GCP (GKE, Cloud Run, MIG)",
      "AWS",
      "Docker",
      "Kubernetes",
      "MLOps",
      "CI/CD",
      "Linux",
    ],
  },
  {
    track: "engineering",
    label: "AI Tooling",
    items: [
      "Claude Code",
      "Cursor",
      "MCP (Model Context Protocol)",
      "AI-assisted development",
    ],
  },
  {
    track: "teaching",
    label: "Curriculum",
    items: [
      "Cambridge Checkpoint",
      "Cambridge IGCSE",
      "IPC Framework",
      "Pre-IGCSE Mathematics & Computing",
    ],
  },
  {
    track: "teaching",
    label: "Pedagogy",
    items: [
      "Inquiry-based learning",
      "Differentiated instruction",
      "Formative & summative assessment",
      "Cross-curricular design",
    ],
  },
  {
    track: "teaching",
    label: "EdTech",
    items: [
      "GeoGebra",
      "Desmos",
      "Wolfram Alpha",
      "Google Classroom",
      "Scratch",
      "Python in the classroom",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. Mechatronics Engineering",
    school: "Arab Academy for Science & Technology (AAST), Cairo",
    years: "2014 to 2019",
    note: "Graduation project: autonomous attendance robot using facial recognition",
  },
  {
    degree: "Computer Science coursework",
    school: "New Jersey Institute of Technology (NJIT), USA",
    years: "2011 to 2012",
  },
];

export const certifications = [
  "IPC Level 1: Implementing the International Primary Curriculum",
  "Cambridge International: 7+ years delivering Checkpoint & IGCSE Mathematics and Computing",
];

// Topic-level entity signals for the Person JSON-LD, curated separately from
// the tool-level skillGroups items.
export const knowsAbout = [
  "Artificial intelligence",
  "Machine learning",
  "Large language models",
  "LLM agents and tool calling",
  "Retrieval-augmented generation",
  "Full-stack web development",
  "MLOps",
  "Mathematics education",
  "Computer science education",
  "Cambridge International curriculum",
];
