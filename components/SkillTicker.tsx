"use client";

const TOOLS = [
  "OpenAI",
  "Anthropic Claude",
  "Power BI",
  "Tableau",
  "SQL",
  "Python",
  "Salesforce SFDC",
  "SAP ERP",
  "Agentic AI",
  "ETL",
  "MIS Reporting",
  "Advanced Excel",
  "CRM Analytics",
  "NPS Analysis",
  "Data Warehousing",
  "KPI Dashboards",
  "Generative AI",
  "AI Security",
];

export default function SkillTicker() {
  const doubledTools = [...TOOLS, ...TOOLS];

  return (
    <div className="ticker-mask overflow-hidden py-2">
      <div className="ticker-track">
        {doubledTools.map((tool, index) => (
          <div
            key={`${tool}-${index}`}
            className="ticker-item group"
          >
            <span
              className="ticker-dot"
              aria-hidden="true"
            />

            <span className="ticker-label">
              {tool}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}