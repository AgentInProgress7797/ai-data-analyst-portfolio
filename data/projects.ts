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
      "Magic AI is an internal assistant used by employees for document drafting, business queries and day-to-day productivity. My work includes user access, departmental workspaces, model configuration, internal integrations, onboarding and ongoing platform support.",

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
          "Manages user sessions and request routing.",
          "Connects users with the configured AI models.",
          "Controls available tools and workspace permissions.",
        ],
      },
      {
        title: "AI Model Layer",
        subtitle: "Claude and configured fallbacks",
        details: [
          "Uses Claude as the primary enterprise model.",
          "Supports model fallback when the primary model is unavailable.",
          "Different models can be configured according to workload and task requirements.",
        ],
      },
      {
        title: "Department Workspaces",
        subtitle: "Controlled document access",
        details: [
          "Separates departmental documents and user content.",
          "Applies access controls based on workspace permissions.",
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
      "Helped employees use generative AI in their regular work.",
      "Created department-specific access and workspace controls.",
      "Supported document drafting, business queries and internal productivity.",
      "Prepared onboarding material and simple communication for non-technical users.",
    ],

    responsibilities: [
      "Platform administration and user onboarding",
      "Model configuration and fallback planning",
      "Department workspace management",
      "Authentication and access coordination",
      "Usage support and internal communication",
    ],

    story: {
      challenge:
        "Business teams needed an internal AI assistant that could help with everyday work while keeping company information within a controlled environment.",

      approach:
        "I focused on user access, department workspaces, model configuration, authentication, onboarding and ongoing platform support. I also worked with internal teams to resolve connectivity, permissions and usability issues.",

      result:
        "Magic AI is now used across multiple departments for document drafting, business queries and routine productivity tasks, with access managed through departmental workspaces and internal controls.",
    },
  },

  {
    id: "hrms-ai",
    name: "AI-Assisted HRMS",
    shortName: "HRMS AI",
    category: "Recruitment Technology",
    status: "In Development",
    year: "2026",

    description:
      "An HR-focused application concept for managing job requirements, finding relevant candidate profiles and supporting recruiters with AI-assisted matching. The current focus is on designing a practical workflow that can operate within an internal environment.",

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
      "Designed to reduce manual candidate-profile searching.",
      "Aims to provide consistent matching against job requirements.",
      "Keeps recruiters in control of shortlisting decisions.",
      "Supports an internal deployment model instead of relying entirely on cloud infrastructure.",
    ],

    responsibilities: [
      "Workflow and product planning",
      "Candidate-search research",
      "AI matching design",
      "Database and deployment planning",
      "Enterprise UI direction",
    ],

    story: {
      challenge:
        "Recruiters spend time manually reviewing job descriptions, searching for candidate profiles and comparing applicants against hiring requirements.",

      approach:
        "I designed a workflow that combines job-description analysis, public-profile discovery and AI-assisted matching. The recruiter remains responsible for reviewing recommendations and making final shortlisting decisions.",

      result:
        "The current prototype defines a clearer recruitment workflow and provides a practical foundation for candidate discovery, comparison and internal deployment. The project is still under development.",
    },
  },

  {
    id: "portfolio",
    name: "AI Data Analyst Portfolio",
    shortName: "Portfolio",
    category: "Personal Product",
    status: "Completed",
    year: "2026",

    description:
      "A custom portfolio designed to present my work in AI, analytics and enterprise automation. Rather than using a standard template, I built it as an interactive system with a command palette, career timeline, custom cursor, 3D elements and reusable dashboard components.",

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
        value: "100%",
        label: "Responsive",
      },
      {
        value: "Custom",
        label: "Design system",
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
          "Supports a maintainable and scalable frontend codebase.",
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
      "Presents technical work through practical project stories.",
      "Demonstrates frontend development and UI thinking.",
      "Creates a consistent identity around enterprise AI and analytics.",
      "Provides a responsive experience across desktop and mobile devices.",
    ],

    responsibilities: [
      "UI and interaction design",
      "Frontend development",
      "Responsive layout implementation",
      "Content structure and project storytelling",
      "Performance and visual refinement",
    ],

    story: {
      challenge:
        "A standard portfolio template would not clearly represent the combination of enterprise AI, analytics, automation and frontend work in my profile.",

      approach:
        "I designed and developed the portfolio as a custom application using reusable components, interactive navigation, animated timelines, project dashboards and a consistent visual system.",

      result:
        "The finished portfolio presents my work as connected projects and systems rather than a simple list of skills. It also demonstrates my frontend development, interaction design and technical communication abilities.",
    },
  },
];