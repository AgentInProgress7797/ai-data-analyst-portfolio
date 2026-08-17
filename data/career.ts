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
    id: "operational-analytics",

    year: "2019",

    period: "Foundation",

    category: "Operational Analytics",

    title: "Building the Data Foundation",

    organisation: "Teleperformance",

    summary:
      "My early work was closely tied to day-to-day operations. I worked with collection performance, repayment data, reporting and team-level metrics, which gave me a practical understanding of how data is actually used by business teams.",

    impact: [
      "Built recurring MIS reports and performance views for operational teams.",

      "Worked with repayment, delinquency and call-centre data to understand performance gaps.",

      "Used reporting and root cause analysis to support process and team improvements.",

      "Developed a strong understanding of how operational data connects with business decisions.",
    ],

    technologies: [
      "Excel",
      "MIS Reporting",
      "Data Analysis",
      "KPI Tracking",
      "Root Cause Analysis",
    ],

    metrics: [
      {
        value: "Ops",
        label: "Business Context",
      },

      {
        value: "KPI",
        label: "Performance Focus",
      },

      {
        value: "Data",
        label: "Decision Support",
      },
    ],
  },

  {
    id: "business-intelligence",

    year: "2023",

    period: "BI & Reporting",

    category: "Business Intelligence",

    title: "Moving into Enterprise Reporting & BI",

    organisation: "Tata Capital",

    summary:
      "I moved deeper into structured analytics and enterprise reporting, working with data from CRM, Salesforce and SAP environments and turning it into dashboards, MIS reports and management-ready information.",

    impact: [
      "Built KPI dashboards and recurring management reports for business reviews.",

      "Worked with SQL, Python, Power BI, Tableau and Advanced Excel for reporting and analysis.",

      "Validated and consolidated information from multiple enterprise systems before publishing reports.",

      "Supported CSAT, NPS and ad-hoc analysis alongside recurring reporting requirements.",
    ],

    technologies: [
      "SQL",
      "Python",
      "Power BI",
      "Tableau",
      "Advanced Excel",
      "Salesforce",
      "SAP ERP",
    ],

    metrics: [
      {
        value: "BI",
        label: "Reporting Systems",
      },

      {
        value: "SQL",
        label: "Data Analysis",
      },

      {
        value: "KPI",
        label: "Management Visibility",
      },
    ],
  },

  {
    id: "enterprise-ai",

    year: "2026",

    period: "Enterprise AI",

    category: "Generative AI",

    title: "Applying AI Inside Enterprise Workflows",

    organisation: "Reliance Infrastructure",

    summary:
      "My current work extends beyond reporting into enterprise AI. I work on internal AI systems, model configuration, user access, departmental workspaces, integrations and the operational issues that come with running AI for real users.",

    impact: [
      "Supported an internal AI assistant used across multiple business departments.",

      "Worked with Generative AI models, model routing, fallback behaviour and session configuration.",

      "Managed departmental workspaces, user access and permissions for internal AI use cases.",

      "Worked through practical production issues involving authentication, connectivity, configuration and AI provider availability.",
    ],

    technologies: [
      "OpenClaw",
      "Anthropic Claude",
      "OpenRouter",
      "LLMs",
      "Docker",
      "WebSocket",
      "Authentication",
      "Model Routing",
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
        value: "24×7",
        label: "AI Availability",
      },
    ],
  },

  {
    id: "agentic-automation",

    year: "Now",

    period: "Current Direction",

    category: "Agentic AI & Automation",

    title: "From AI Assistance to Intelligent Workflows",

    organisation: "Applied AI & Automation",

    summary:
      "My current direction is toward AI agents, tool-enabled workflows and practical automation. The focus is not simply on adding AI to a process, but on understanding where an agent, model, API or automated workflow can genuinely remove friction from business work.",

    impact: [
      "Working on AI-assisted recruitment and candidate-matching workflows.",

      "Exploring agent-based approaches for internal support and department-specific business processes.",

      "Combining AI models, APIs, tools and business logic into practical workflows.",

      "Continuing to build on my analytics background while moving deeper into applied and agentic AI.",
    ],

    technologies: [
      "Agentic AI",
      "AI Agents",
      "LLMs",
      "APIs",
      "Tool Calling",
      "Workflow Automation",
      "Next.js",
      "Docker",
    ],

    metrics: [
      {
        value: "AI",
        label: "Agent Workflows",
      },

      {
        value: "API",
        label: "Integration",
      },

      {
        value: "Next",
        label: "Current Focus",
      },
    ],
  },
];