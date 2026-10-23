// =========================================================================
// SINGLE SOURCE OF TRUTH FOR YOUR PORTFOLIO
// Edit this file whenever you want to update portfolio content.
// =========================================================================

export const personal = {
  name: "Ashish Pawar",
  title: "Senior Executive – AI Data Analyst",
  company: "Reliance Infrastructure",

  tagline:
    "Enterprise AI, Data Analytics and Intelligent Automation",

  heroEyebrow:
    "Enterprise AI • Data Analytics • Intelligent Automation",

  heroTitle: "Building practical AI solutions",

  heroHighlight:
    "for complex enterprise challenges.",

  heroDescription:
    "I work across enterprise AI, data analytics and internal application development. Over the past 7+ years, my work has moved from reporting and business analysis into building and supporting AI assistants, chatbots and production applications used by business teams.",

  location: "Mumbai, Maharashtra, India",
  email: "ashishpawar7797@gmail.com",
  phone: "+91-9702761929",
  address: "Navi Mumbai, Maharashtra, India",

  linkedin:
    "https://www.linkedin.com/in/ashish-pawar-71222a16b/",

  github: "https://github.com/AgentInProgress7797",
  twitter: "",

  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpeg",

  yearsExperience: 7,

  summary:
    "AI Data Analyst with 7+ years of experience in reporting, business intelligence and enterprise technology. I now work on internal AI platforms, chatbot integrations and Python-based business applications, alongside my background in SQL, dashboards and operational reporting. My focus is on getting systems into use and keeping them dependable after launch.",

  longSummary: [
    "My career began in operational analytics, where I worked with performance data, collections reporting and team-level insights. That experience helped me understand how data is used in day-to-day business decisions, not only how it is processed.",

    "I later moved into enterprise reporting and dashboard development, using SQL, Python, Power BI, Tableau, Advanced Excel, Salesforce and SAP data. More recently, I have worked on enterprise AI assistants, chatbot extensions and an employee attendance portal with biometric data integration.",

    "I like work that starts with a real operational problem and ends with something people can use. That usually means discussing requirements with business teams, building or integrating the solution, testing it carefully and supporting it in production.",
  ],
};

// =========================================================================
// PORTFOLIO STATISTICS
// =========================================================================

export const stats = [
  {
    label: "Years of Experience",
    value: 7,
    suffix: "+",
  },
  {
    label: "Career Domains",
    value: 3,
    suffix: "",
  },
  {
    label: "Professional Certifications",
    value: 4,
    suffix: "",
  },
  {
    label: "Enterprise Technologies",
    value: 12,
    suffix: "+",
  },
];

// =========================================================================
// SKILLS
// =========================================================================

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillCategory[] = [
  {
    category: "AI & LLM Systems",
    skills: [
      "Generative AI",
      "Large Language Models",
      "OpenAI",
      "Anthropic Claude",
      "OpenClaw",
      "OpenRouter",
      "Prompt Engineering",
      "LLM Integration",
      "Model Fallback Configuration",
    ],
  },

  {
    category: "AI Agents & Automation",
    skills: [
      "Agentic AI",
      "AI Agents",
      "Multi-Agent Workflows",
      "Tool Calling",
      "Tool Integration",
      "Workflow Automation",
      "Chatbot Extensions",
      "Session Management",
      "Agent Access Controls",
    ],
  },

  {
    category: "Data Analytics & Business Intelligence",
    skills: [
      "SQL",
      "Python",
      "Power BI",
      "Tableau",
      "Advanced Excel",
      "ETL",
      "Data Validation",
      "KPI Dashboarding",
      "MIS Reporting",
      "Management Reporting",
      "SQL Server",
    ],
  },

  {
    category: "Enterprise Systems & Integration",
    skills: [
      "Salesforce SFDC",
      "SAP ERP",
      "CRM Analytics",
      "API Integration",
      "WebSocket",
      "Internal Applications",
      "Enterprise AI Assistants",
      "Business Workflows",
      "Biometric Attendance Integration",
      "Read-Only Database Integration",
    ],
  },

  {
    category: "AI Infrastructure & Operations",
    skills: [
      "Enterprise Deployment",
      "Local AI Models",
      "Cloud AI Models",
      "Multi-Model Configuration",
      "Model Routing",
      "Automatic Fallback",
      "Token Optimization",
      "Session Configuration",
      "Production Troubleshooting",
      "PM2",
      "Windows Services",
    ],
  },

  {
    category: "Application Development",
    skills: [
      "Python",
      "Flask",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "SQLite",
      "Git & GitHub",
    ],
  },

  {
    category: "AI Security & Access",
    skills: [
      "AI Security & Governance",
      "Authentication",
      "Access Control",
      "Role-Based Access",
      "Workspace Permissions",
      "Secure File Access",
      "Session Controls",
    ],
  },
];

// =========================================================================
// PROFESSIONAL EXPERIENCE
// =========================================================================

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Reliance Infrastructure",
    role: "Senior Executive – AI Data Analyst",
    period: "February 2026 – Present",
    location: "Mumbai, Maharashtra, India",

    points: [
      "Work on internal AI platforms and employee-facing applications, including Magic AI, the Rel Robo chatbot and an attendance self-service portal now used in production.",

      "Configure OpenClaw agents, model routing, fallback behaviour, sessions and tool permissions for different business functions; also maintain custom controls in the internal AI interface.",

      "Work on chatbot extensions and keyword-based service discovery, including configuration changes, testing and production issue resolution.",

      "Develop and support a Python/Flask attendance portal with manager approval workflows, biometric punch-data integration, SQL Server connectivity and attendance reconciliation rules.",

      "Coordinate with business and IT teams on requirements, UAT, controlled production changes, access issues, email delivery and ongoing application support.",
    ],
  },

  {
    company: "Tata Capital",
    role: "Data Analyst – Data Reporting & Dashboarding",
    period: "May 2023 – December 2025",
    location: "Thane, Maharashtra, India",

    points: [
      "Worked with CRM, Salesforce and SAP data to support recurring reporting, business analysis and management reviews.",

      "Built KPI dashboards, MIS reports and monthly presentations using SQL, Python, Power BI, Tableau and Advanced Excel.",

      "Validated and consolidated data from multiple systems before publishing reports to business stakeholders.",

      "Supported CSAT, NPS and ad-hoc analysis for operational and management requirements.",

      "Helped reduce repetitive reporting effort by improving report structures and automating parts of the data-preparation process.",
    ],
  },

  {
    company: "Teleperformance",
    role: "Team Leader – Data Analytics & Business Intelligence",
    period: "January 2019 – September 2022",
    location: "Thane, Maharashtra, India",

    points: [
      "Created MIS reports and KPI dashboards for collection performance, portfolio monitoring and team reviews.",

      "Analysed repayment, delinquency and call-centre data to support banking collection strategies.",

      "Built data-cleaning and consolidation workflows for regular operational reporting.",

      "Used root cause analysis to identify performance gaps and support process improvements.",

      "Led a team responsible for reporting, performance tracking and operational insights.",
    ],
  },
];

// =========================================================================
// EDUCATION
// =========================================================================

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "University of Mumbai",
    degree: "Bachelor of Science in Information Technology – BSc IT",
    period: "June 2016 – May 2019",
  },
];

// =========================================================================
// PROJECTS / CASE STUDIES
// =========================================================================

export type Project = {
  title: string;
  subtitle: string;
  description: string;

  challenge: string;
  solution?: string;

  contributions: string[];
  outcome: string;

  architecture?: {
    label: string;
    description: string;
  }[];

  capabilities?: string[];

  highlights?: {
    label: string;
    value: string;
  }[];

  learnings?: string[];

  confidential?: boolean;

  tags: string[];

  category: "AI" | "Analytics" | "Automation";

  status?: "Live" | "Completed" | "In Development";

  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
  title: "Magic AI",

  subtitle:
    "Enterprise Generative AI & Agentic Assistant",

  description:
    "An internal enterprise AI platform designed to give employees controlled access to Generative AI, AI agents and intelligent workflows through department-specific sessions, authentication, model routing and enterprise integrations.",

  challenge:
    "Business teams needed a practical and controlled way to use Generative AI across different functions while maintaining department-specific experiences, internal access controls, reliable connectivity, session management and flexibility across multiple AI models.",

  solution:
    "Designed and evolved a multi-user enterprise AI environment built around OpenClaw, where department-specific agents and sessions can connect users with AI models, internal resources and business workflows. The platform supports authentication, model routing, fallback behaviour, session controls and integration with internal applications.",

  architecture: [
    {
      label: "Employee Access",
      description:
        "Authenticated employee access through the internal AI interface.",
    },
    {
      label: "Enterprise AI Gateway",
      description:
        "OpenClaw coordinates sessions, agents, model access and AI workflows.",
    },
    {
      label: "Department Agents",
      description:
        "Dedicated AI experiences for functions such as HR, Finance, Legal, Taxation and IT.",
    },
    {
      label: "Model Routing",
      description:
        "Requests are routed across configured AI providers with fallback behaviour for resilience.",
    },
    {
      label: "Tools & Enterprise Workflows",
      description:
        "Agents interact with approved files, tools, applications and workflow resources according to configured access controls.",
    },
    {
      label: "AI Response",
      description:
        "Users receive contextual AI assistance through a consistent internal experience.",
    },
  ],

  capabilities: [
    "Enterprise AI Assistants",
    "Agentic AI",
    "Multi-Agent Workflows",
    "LLM Integration",
    "Model Routing",
    "Automatic Fallback",
    "Authentication",
    "Session Management",
    "Tool Integration",
    "Enterprise Deployment",
  ],

  contributions: [
    "Supported the architecture and implementation of department-based AI sessions for HR, Finance, Legal, Taxation, IT and other internal business functions.",

    "Configured OpenClaw agents and integrated multiple AI models and providers for enterprise use cases.",

    "Worked on authentication, WebSocket connectivity, model routing and automatic fallback behaviour to improve service reliability.",

    "Implemented and refined agent access controls, session configuration and workspace permissions for different users and business functions.",

    "Worked on token-usage optimisation, session management and AI model configuration to improve operational efficiency.",

    "Supported integration of the AI assistant with internal applications and a WordPress-based employee portal.",

    "Troubleshot production issues involving model connectivity, authentication, origins, permissions, gateway configuration and provider availability.",
  ],

  outcome:
    "Established an extensible foundation for applying Generative AI and agent-based workflows across internal business functions through a controlled, configurable and employee-focused AI environment.",

  highlights: [
    {
      label: "Architecture",
      value: "Multi-Agent",
    },
    {
      label: "Environment",
      value: "Enterprise",
    },
    {
      label: "Model Strategy",
      value: "Multi-Model",
    },
    {
      label: "Deployment",
      value: "Internal",
    },
  ],

  learnings: [
    "Enterprise AI requires more than connecting an LLM; authentication, permissions, model reliability, session behaviour and infrastructure become equally important.",

    "Model fallback and routing are important for maintaining availability when individual AI providers experience limits or service issues.",

    "Agent access should be designed around the minimum resources required for each business function rather than providing unrestricted workspace access.",

    "AI systems need continuous monitoring and configuration refinement after deployment as usage patterns and operational requirements evolve.",
  ],

  confidential: true,

  tags: [
    "OpenClaw",
    "Anthropic Claude",
    "OpenRouter",
    "LLMs",
    "AI Agents",
    "Agentic AI",
    "Model Routing",
    "WebSocket",
    "Enterprise AI",
    "Workflow Automation",
  ],

  category: "AI",

  status: "Live",
},
  {
    title: "Employee Attendance Self-Service Portal",
    subtitle: "Attendance Management & Biometric Integration",
    description:
      "An internal attendance application for non-payroll employees, covering attendance records, manager approvals, leave workflows and biometric data synchronisation.",
    challenge:
      "Attendance records and requests needed to be managed consistently while bringing biometric punches from an external eSSL system into the portal without changing the source database.",
    contributions: [
      "Developed and supported Python/Flask attendance workflows for employees and managers.",
      "Integrated biometric attendance data through a read-only SQL Server connection.",
      "Worked on rotational and overnight shift reconciliation, leave precedence and exception review rules.",
      "Implemented and tested bulk regularisation approval workflows and employee email formatting changes.",
      "Validated staged changes before production deployment and supported service troubleshooting.",
    ],
    outcome:
      "Deployed an internal attendance portal used for attendance tracking and approval workflows, with biometric data integration and production support.",
    confidential: true,
    tags: ["Python", "Flask", "SQL Server", "SQLite", "eSSL", "Attendance Automation"],
    category: "Automation",
    status: "Live",
  },
  {
    title: "Rel Robo – Enterprise Chatbot",
    subtitle: "Internal Chatbot & Service Extensions",
    description:
      "An internal chatbot with configured extensions for service-related queries and employee assistance.",
    challenge:
      "Employees needed a simpler way to reach supported services through a chatbot, with reliable keyword matching and controlled extension behaviour.",
    contributions: [
      "Worked on chatbot extension configuration and service-specific keyword triggers.",
      "Reviewed plugin behaviour and supported UAT and production testing scenarios.",
      "Checked changes against existing extension settings to avoid disrupting working functionality.",
      "Supported rollout and follow-up troubleshooting for the live chatbot.",
    ],
    outcome:
      "Supported a production chatbot with service extensions and keyword-based access to supported workflows.",
    confidential: true,
    tags: ["Chatbots", "Plugin Integration", "Keyword Routing", "UAT", "Enterprise AI"],
    category: "AI",
    status: "Live",
  },
  {
    title: "Enterprise KPI & MIS Reporting",
    subtitle: "Business Intelligence and Management Reporting",

    description:
      "A reporting and dashboard ecosystem created to consolidate operational data and provide stakeholders with reliable performance insights.",

    challenge:
      "Business information was distributed across CRM, Salesforce, SAP ERP and manually maintained files, making recurring reporting and validation time-consuming.",

    contributions: [
      "Extracted, validated and consolidated data from CRM, Salesforce and SAP ERP sources.",

      "Built recurring MIS reports and KPI dashboards using SQL, Python, Power BI, Tableau and Advanced Excel.",

      "Prepared monthly management reports and stakeholder presentations.",

      "Supported CSAT, NPS and ad-hoc business analysis requirements.",

      "Improved reporting consistency by standardising data-preparation and validation processes.",
    ],

    outcome:
      "Improved the visibility, consistency and usability of operational data for recurring business reviews and management decision-making.",

    tags: [
      "Power BI",
      "Tableau",
      "SQL",
      "Python",
      "Salesforce",
      "SAP ERP",
    ],

    category: "Analytics",
    status: "Completed",
  },
  {
    title: "Digital Data Intelligence Workflow",
    subtitle: "Unstructured Data Extraction and Analysis",

    description:
      "A structured workflow for organising and analysing information collected from communication platforms, email systems and digital data sources.",

    challenge:
      "Relevant information existed across different communication channels and file formats, making manual review difficult and time-consuming.",

    contributions: [
      "Supported extraction and organisation of information from multiple digital sources.",

      "Converted unstructured records into structured, review-ready datasets.",

      "Analysed communication records, timelines and relevant information patterns.",

      "Prepared clear intelligence summaries and stakeholder-ready reports.",

      "Applied data-validation and classification practices to improve the reliability of extracted information.",
    ],

    outcome:
      "Made large volumes of unstructured digital information easier to review, analyse and communicate to stakeholders.",

    tags: [
      "Data Extraction",
      "Python",
      "ETL",
      "Data Validation",
      "Intelligence Reporting",
    ],

    category: "Automation",
    status: "Completed",
  },
];

// =========================================================================
// CERTIFICATIONS
// =========================================================================

export type Certification = {
  name: string;
  issuer?: string;
};

export const certifications: Certification[] = [
  {
    name: "AI Capabilities and Limitations",
  },
  {
    name: "AI Memory: Exploring and Building LLM Memory Systems",
  },
  {
    name:
      "Agentic AI Fundamentals: Architectures, Frameworks and Applications",
  },
  {
    name: "AI Security & Governance",
  },
];

// =========================================================================
// ACHIEVEMENTS
// Add verified achievements later.
// Keeping the array empty prevents placeholder content from appearing.
// =========================================================================

export type Achievement = {
  title: string;
  description: string;
};

export const achievements: Achievement[] = [];

// =========================================================================
// NAVIGATION
// =========================================================================

export const nav = [
  {
    label: "Profile",
    href: "#about",
  },
  {
    label: "Expertise",
    href: "#skills",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Case Studies",
    href: "#projects",
  },
  {
    label: "Learning",
    href: "#certifications",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

// =========================================================================
// SEO
// Update the URL after deploying the website.
// =========================================================================

export const seo = {
  title:
    "Ashish Pawar | Enterprise AI, Data Analytics & Automation",

  description:
    "Portfolio of Ashish Pawar, covering enterprise AI platforms, production chatbots, Python applications, biometric attendance integration, data analytics and business intelligence.",

  url: "https://ai-data-analyst-portfolio.vercel.app",
};