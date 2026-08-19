export type ProjectMetric = {
  value: string;
  label: string;
};

export type ArchitectureNode = {
  title: string;
  subtitle: string;
  details: string[];
};

export type ProjectStory = {
  challenge: string;
  approach: string;
  result: string;
};

export type EngineeringDecision = {
  title: string;
  decision: string;
  reason: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  status: "Operational" | "In Development" | "Completed";
  year: string;
  description: string;
  metrics: ProjectMetric[];
  architecture: ArchitectureNode[];
  technologies: string[];
  impact: string[];
  responsibilities: string[];
  story: ProjectStory;
  engineeringDecisions: EngineeringDecision[];
  sourceUrl?: string;
  liveUrl?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "magic-ai",
    name: "Magic AI",
    shortName: "Magic AI",
    category: "Enterprise AI Platform",
    status: "Operational",
    year: "2025–Present",

    description:
      "Magic AI is an internal AI assistant used by employees for document drafting, business queries and day-to-day work. I work on user access, department workspaces, model configuration and fallbacks, internal integrations, onboarding and platform support.",

    metrics: [
      {
        value: "40+",
        label: "Active users",
      },
      {
        value: "6+",
        label: "Departments",
      },
      {
        value: "24×7",
        label: "Availability",
      },
      {
        value: "Claude",
        label: "Primary model",
      },
    ],

    architecture: [
      {
        title: "Employees",
        subtitle: "Internal business users",
        details: [
          "Used across HR, Finance, Legal, IT and other business teams.",
          "Employees access Magic AI through the internal company network.",
          "Each department works within its own controlled workspace.",
        ],
      },
      {
        title: "Magic AI Interface",
        subtitle: "Secure internal access",
        details: [
          "Provides a simple chat interface for day-to-day work.",
          "Supports document drafting, business queries and internal knowledge access.",
          "Designed for both technical and non-technical users.",
        ],
      },
      {
        title: "OpenClaw Gateway",
        subtitle: "Sessions, tools and routing",
        details: [
          "Manages user sessions, agent requests and model routing.",
          "Connects users with the configured AI models and available tools.",
          "Applies workspace permissions and controls available capabilities.",
        ],
      },
      {
        title: "AI Model Layer",
        subtitle: "Primary model and fallbacks",
        details: [
          "Uses Claude as the primary enterprise model.",
          "Supports fallback models when the primary model is unavailable.",
          "Model selection can be adjusted according to workload, availability and task requirements.",
        ],
      },
      {
        title: "Department Workspaces",
        subtitle: "Controlled document access",
        details: [
          "Separates departmental documents and user content.",
          "Applies workspace-level access controls for files and resources.",
          "Helps prevent users from accessing unrelated departmental information.",
        ],
      },
    ],

    technologies: [
      "OpenClaw",
      "Claude",
      "Docker",
      "Next.js",
      "WordPress",
      "WebSocket",
      "LDAP",
      "OpenRouter",
      "Mac mini",
      "VPN",
    ],

    impact: [
      "Supported 40+ users across multiple departments on the internal AI platform.",
      "Set up department-specific workspaces and access controls for internal documents.",
      "Supported document drafting, business queries and day-to-day AI-assisted work.",
      "Created onboarding material and user communication for non-technical teams.",
    ],

    responsibilities: [
      "Platform administration and user onboarding",
      "Model configuration, routing and fallback planning",
      "Department workspace and permission management",
      "Authentication and access coordination",
      "Troubleshooting sessions, connectivity and file-access issues",
      "Usage support and internal communication",
    ],

    story: {
      challenge:
        "Business teams needed an internal AI assistant that could help with everyday work while keeping company information within a controlled environment.",

      approach:
        "I worked on department-wise access, workspace permissions, model routing and fallback configuration, authentication, onboarding and platform support. A large part of the work also involved troubleshooting connectivity, file-access and session issues across users and departments.",

      result:
        "Magic AI is now used across multiple departments for document drafting, business queries and routine productivity tasks, with access managed through departmental workspaces and internal controls.",
    },

    engineeringDecisions: [
      {
        title: "Model resilience",
        decision: "Primary + fallback model strategy",
        reason:
          "Reduce dependency on a single AI model configuration and support continuity when the primary model is unavailable.",
      },
      {
        title: "Access isolation",
        decision: "Department-based workspaces",
        reason:
          "Separate departmental documents and user content while applying workspace-level access controls.",
      },
      {
        title: "Enterprise operation",
        decision: "Controlled internal access",
        reason:
          "Keep the assistant aligned with internal access requirements while supporting employees across multiple business teams.",
      },
    ],
  },

  {
    id: "hrms-ai",
    name: "AI-Assisted HRMS",
    shortName: "HRMS AI",
    category: "Recruitment Technology",
    status: "In Development",
    year: "2026",

    description:
      "An AI-assisted recruitment application currently in development for JD analysis, candidate discovery and profile matching. The workflow is designed around recruiter review, structured matching criteria and internal deployment.",

    metrics: [
      {
        value: "AI",
        label: "JD analysis",
      },
      {
        value: "Search",
        label: "Profile discovery",
      },
      {
        value: "Rank",
        label: "Candidate matching",
      },
      {
        value: "Local",
        label: "Data storage plan",
      },
    ],

    architecture: [
      {
        title: "Recruiter",
        subtitle: "Creates or uploads a job requirement",
        details: [
          "Starts the hiring workflow by entering or uploading a job description.",
          "Provides the experience, skills and hiring criteria required for the role.",
          "Reviews candidate recommendations before taking any hiring action.",
        ],
      },
      {
        title: "JD Analysis",
        subtitle: "Extracts skills and hiring criteria",
        details: [
          "Identifies required skills, experience and role expectations.",
          "Extracts keywords, qualifications and important hiring criteria.",
          "Converts the job description into structured search requirements.",
        ],
      },
      {
        title: "Search Layer",
        subtitle: "Discovers relevant public profiles",
        details: [
          "Searches approved sources for publicly available candidate information.",
          "Collects relevant profile details for comparison.",
          "Filters unrelated results before sending profiles for matching.",
        ],
      },
      {
        title: "AI Matching",
        subtitle: "Compares profiles with the requirement",
        details: [
          "Compares candidate experience and skills with the job requirement.",
          "Ranks profiles using defined matching criteria.",
          "Provides structured recommendations for recruiter review.",
        ],
      },
      {
        title: "Recruitment Dashboard",
        subtitle: "Reviews and manages shortlisted candidates",
        details: [
          "Displays candidate profiles and matching information.",
          "Allows recruiters to review, compare and shortlist candidates.",
          "Keeps the final hiring decision with the recruitment team.",
        ],
      },
    ],

    technologies: [
      "Next.js",
      "TypeScript",
      "OpenRouter",
      "Search API",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Tailwind CSS",
    ],

    impact: [
      "Designed to reduce the time spent manually searching and comparing candidate profiles.",
      "Aims to apply the same matching criteria consistently across shortlisted profiles.",
      "Keeps recruiters responsible for shortlisting and final hiring decisions.",
      "Designed around an internal deployment model for recruitment workflows and supporting data.",
    ],

    responsibilities: [
      "Recruitment workflow and product design",
      "Candidate-source and search API research",
      "JD parsing and AI matching logic",
      "Data model and deployment planning",
      "Recruiter dashboard and UI design",
    ],

    story: {
      challenge:
        "Recruiters spend time manually reviewing job descriptions, searching for candidate profiles and comparing applicants against hiring requirements.",

      approach:
        "I designed a workflow that turns a job description into structured hiring criteria, searches approved sources for relevant public profiles and uses AI-assisted matching to compare candidates. Recruiters remain responsible for reviewing the recommendations and deciding who should move forward.",

      result:
        "The current prototype defines a clearer recruitment workflow for JD analysis, profile discovery and candidate comparison. The application is still under development and is being designed for internal deployment.",
    },

    engineeringDecisions: [
      {
        title: "Human in the loop",
        decision: "AI recommends; recruiters decide",
        reason:
          "Keep final shortlisting and hiring decisions with recruiters rather than automatically acting on AI-generated recommendations.",
      },
      {
        title: "Structured matching",
        decision: "JD → criteria → profile comparison",
        reason:
          "Convert job requirements into structured criteria before comparing candidate information and generating recommendations.",
      },
      {
        title: "Deployment direction",
        decision: "Internal deployment model",
        reason:
          "Design the application so candidate workflows and supporting data can operate within an internal environment.",
      },
    ],
  },

  {
    id: "portfolio",
    name: "AI Data Analyst Portfolio",
    shortName: "Portfolio",
    category: "Personal Product",
    status: "Completed",
    year: "2026",

    description:
      "A custom portfolio built to present my work across AI, analytics and enterprise automation. Instead of using a standard template, I developed it as an interactive application with a command palette, career timeline, custom cursor, 3D elements and reusable dashboard components.",

    metrics: [
      {
        value: "Next.js",
        label: "Framework",
      },
      {
        value: "3D",
        label: "Interactive visuals",
      },
      {
        value: "97",
        label: "Lighthouse performance",
      },
      {
        value: "100",
        label: "Accessibility",
      },
    ],

    architecture: [
      {
        title: "Visitor",
        subtitle: "Explores professional work",
        details: [
          "Browses projects, experience and career highlights.",
          "Interacts with dashboards, timelines and animated components.",
          "Uses the command palette for quick navigation.",
        ],
      },
      {
        title: "Next.js Application",
        subtitle: "App Router and reusable components",
        details: [
          "Uses reusable React components across the portfolio.",
          "Organises pages, metadata and application-level structure.",
          "Supports a maintainable frontend codebase as sections evolve.",
        ],
      },
      {
        title: "Interaction Layer",
        subtitle: "Framer Motion and command palette",
        details: [
          "Handles transitions, reveal effects and interactive elements.",
          "Provides keyboard and mouse-based navigation.",
          "Creates an application-like experience rather than a static webpage.",
        ],
      },
      {
        title: "Visual Layer",
        subtitle: "Three.js, particles and glass UI",
        details: [
          "Renders the interactive 3D orb and supporting visual effects.",
          "Uses glass-style cards, gradients and controlled lighting.",
          "Adds motion while keeping the professional content readable.",
        ],
      },
      {
        title: "Portfolio Content",
        subtitle: "Career, projects, skills and contact",
        details: [
          "Presents professional experience and technical capabilities.",
          "Explains project architecture, responsibilities and impact.",
          "Provides direct access to contact details, LinkedIn and the resume.",
        ],
      },
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "Lucide React",
    ],

    impact: [
      "Presents AI, analytics and automation work through structured project case studies.",
      "Demonstrates frontend development, interaction design and technical communication.",
      "Provides a consistent professional identity across projects, career history and technical capabilities.",
      "Reached 97 Lighthouse performance with 100 accessibility, best-practices and SEO scores during production testing.",
    ],

    responsibilities: [
      "UI and interaction design",
      "Frontend development",
      "Responsive layout implementation",
      "Content structure and project storytelling",
      "Performance, accessibility and visual refinement",
    ],

    story: {
      challenge:
        "A standard portfolio template would not clearly represent the combination of enterprise AI, analytics, automation and frontend work in my profile.",

      approach:
        "I designed and developed the portfolio as a custom Next.js application with reusable components, interactive navigation, animated timelines, project case studies and a consistent visual system. I also worked through performance, accessibility and SEO testing before treating the production version as complete.",

      result:
        "The finished portfolio presents my work as connected projects and systems rather than a simple list of skills. It also demonstrates frontend development, interaction design and technical communication, while maintaining strong production Lighthouse scores.",
    },

    engineeringDecisions: [
      {
        title: "Custom system",
        decision: "Purpose-built UI instead of a template",
        reason:
          "Create a portfolio experience capable of representing AI, analytics, automation and technical project stories within one consistent product.",
      },
      {
        title: "Component architecture",
        decision: "Reusable React components",
        reason:
          "Keep the application maintainable while allowing sections, interactions and project content to evolve independently.",
      },
      {
        title: "Responsive interaction",
        decision: "Adaptive desktop + mobile experience",
        reason:
          "Preserve content readability and interaction quality across different screen sizes while retaining the portfolio's visual identity.",
      },
    ],
  },
];