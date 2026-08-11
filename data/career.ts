export type CareerMetric = {
  value: string;
  label: string;
};

export type CareerMilestone = {
  id: string;
  year: string;
  period: string;
  category: string;
  title: string;
  organisation: string;
  summary: string;
  impact: string[];
  technologies: string[];
  metrics: CareerMetric[];
};

export const careerMilestones: CareerMilestone[] = [
  {
    id: "data-foundation",
    year: "2022",
    period: "Foundation",
    category: "Data Intelligence",
    title: "Analytics & Data Foundation",
    organisation: "Enterprise Analytics Journey",
    summary:
      "Started by working with business data, reports and dashboards, gradually building a practical understanding of how data supports everyday decisions.",
    impact: [
      "Learned how to break business questions into clear data and reporting requirements.",
      "Worked with structured data, reporting workflows and operational insights.",
      "Improved my skills in cleaning, organizing and presenting data clearly.",
    ],
    technologies: [
      "Python",
      "SQL",
      "Excel",
      "Power BI",
      "Data Analytics",
    ],
    metrics: [
      {
        value: "5+",
        label: "Core Technologies",
      },
      {
        value: "BI",
        label: "Reporting Focus",
      },
      {
        value: "Data",
        label: "Decision Support",
      },
    ],
  },
  {
    id: "enterprise-bi",
    year: "2023",
    period: "Enterprise Growth",
    category: "Business Intelligence",
    title: "Enterprise BI & Reporting",
    organisation: "Business Intelligence Systems",
    summary:
      "Moved into business reporting and dashboard development, with a stronger focus on making operational information easier to understand and use.",
    impact: [
      "Translated business requirements into practical dashboards and reports.",
      "Made operational and management information easier for teams to review.",
      "Supported teams through clearer reporting and performance visibility.",
    ],
    technologies: [
      "Power BI",
      "SQL",
      "Excel",
      "Dashboards",
      "Data Visualization",
    ],
    metrics: [
      {
        value: "360°",
        label: "Business Visibility",
      },
      {
        value: "BI",
        label: "Dashboard Systems",
      },
      {
        value: "KPI",
        label: "Performance Tracking",
      },
    ],
  },
  {
    id: "intelligent-automation",
    year: "2024",
    period: "Automation",
    category: "Intelligent Systems",
    title: "AI & Process Automation",
    organisation: "Enterprise Automation Initiatives",
    summary:
      "Started combining analytics with automation to reduce repetitive work and make internal processes more efficient.",
    impact: [
      "Tested AI-assisted workflows for practical internal use cases.",
      "Automated repetitive operational and reporting activities.",
      "Worked on connecting reporting, business processes and automation tools.",
    ],
    technologies: [
      "Python",
      "Automation",
      "APIs",
      "Machine Learning",
      "Workflow Design",
    ],
    metrics: [
      {
        value: "AI",
        label: "Workflow Enablement",
      },
      {
        value: "API",
        label: "System Integration",
      },
      {
        value: "Auto",
        label: "Process Improvement",
      },
    ],
  },
  {
    id: "magic-ai",
    year: "2025",
    period: "Enterprise AI",
    category: "Generative AI",
    title: "Magic AI Enterprise Platform",
    organisation: "Reliance Infrastructure Limited",
    summary:
      "Managed and improved Magic AI, an internal assistant used by multiple departments for document work, queries, drafting and day-to-day productivity.",
    impact: [
      "Helped employees across departments start using generative AI in their regular work.",
      "Managed user access, departmental workspaces, onboarding and usage support.",
      "Worked on model configuration, authentication, security controls and internal integrations.",
      "Prepared simple user guides and internal mailers for non-technical employees.",
    ],
    technologies: [
      "Claude",
      "OpenRouter",
      "OpenClaw",
      "Docker",
      "LDAP",
      "WordPress",
      "WebSocket",
    ],
    metrics: [
      {
        value: "40+",
        label: "Active Users",
      },
      {
        value: "6+",
        label: "Departments",
      },
      {
        value: "24/7",
        label: "AI Availability",
      },
    ],
  },
  {
    id: "agentic-ai",
    year: "2026",
    period: "Current Focus",
    category: "Agentic Intelligence",
    title: "AI Agents & Intelligent Automation",
    organisation: "AI Data Analytics & Intelligent Automation",
    summary:
      "Currently focusing on AI agents, secure integrations, automation and internal tools that can solve practical business problems.",
    impact: [
      "Exploring AI agents for HR, internal support and departmental workflows.",
      "Working on ideas for AI-assisted recruitment, candidate matching and HR workflows.",
      "Studying how AI platforms can connect securely with internal applications and data.",
      "Bringing analytics, automation and generative AI together in usable internal solutions.",
    ],
    technologies: [
      "Agentic AI",
      "LLMs",
      "Next.js",
      "Docker",
      "AI Agents",
      "RAG",
      "Enterprise AI",
    ],
    metrics: [
      {
        value: "LLM",
        label: "Intelligence Layer",
      },
      {
        value: "AI",
        label: "Agent Workflows",
      },
      {
        value: "Next",
        label: "Innovation Focus",
      },
    ],
  },
];