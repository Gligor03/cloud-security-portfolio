export type SkillTheme = "blue" | "purple" | "green" | "orange";

export type CategoryMark = "code" | "shield" | "cloud" | "tools";

export interface SkillRow {
  iconId: string;
  name: string;
  detail: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  theme: SkillTheme;
  mark: CategoryMark;
  rows: SkillRow[];
  /** Spans full grid width (e.g. Engineering Approach under the three columns). */
  fullWidth?: boolean;
  /** Horizontal strip with vertical dividers (desktop). */
  layout?: "vertical" | "horizontal";
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming & Scripting",
    theme: "blue",
    mark: "code",
    layout: "vertical",
    rows: [
      {
        iconId: "python",
        name: "Python",
        detail:
          "Security scripting, ML model training, AI agent development, AWS integrations.",
      },
      {
        iconId: "sql",
        name: "SQL",
        detail: "Data querying & manipulation, schema design for AI storage.",
      },
      {
        iconId: "bash",
        name: "Bash / Shell",
        detail: "Automation and system administration.",
      },
      {
        iconId: "web",
        name: "HTML / CSS / JavaScript",
        detail: "Basic full-stack and web interfaces.",
      },
    ],
  },
  {
    id: "networking",
    title: "Networking & Cybersecurity",
    theme: "purple",
    mark: "shield",
    layout: "vertical",
    rows: [
      {
        iconId: "traffic",
        name: "Network Traffic Analysis",
        detail: "Baseline vs. attack traffic analysis.",
      },
      {
        iconId: "attack",
        name: "DDoS & MITM Attack Simulation",
        detail: "hping3, ARP spoofing.",
      },
      {
        iconId: "pcap",
        name: "Packet Capture & Analysis",
        detail: "Wireshark, tcpdump.",
      },
      {
        iconId: "idps",
        name: "Intrusion Detection & Prevention",
        detail: "Concepts (IDS/IPS).",
      },
      {
        iconId: "controls",
        name: "Security Controls",
        detail: "ACLs, rate limiting, Dynamic ARP Inspection.",
      },
      {
        iconId: "threatml",
        name: "Threat Detection Logic",
        detail: "& feature engineering for ML.",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & AI",
    theme: "green",
    mark: "cloud",
    layout: "vertical",
    rows: [
      {
        iconId: "aws",
        name: "AWS Services",
        detail:
          "EC2, S3, VPC, IAM, CloudWatch, Aurora Serverless (PostgreSQL), Bedrock.",
      },
      {
        iconId: "genai",
        name: "Generative AI",
        detail: "AWS Bedrock Agents, RAG pipelines, prompt engineering.",
      },
      {
        iconId: "iac",
        name: "Infrastructure as Code",
        detail: "Terraform, AWS CDK (Python).",
      },
      {
        iconId: "guardrails",
        name: "Secure AI Pipeline Design & Guardrails",
        detail: "Safety patterns, evaluation, and deployment guardrails.",
      },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Approach",
    theme: "orange",
    mark: "tools",
    fullWidth: true,
    layout: "horizontal",
    rows: [
      {
        iconId: "guardrails",
        name: "Security-First Thinking",
        detail:
          "Designing systems with access control, least privilege, and threat mitigation from the start.",
      },
      {
        iconId: "iac",
        name: "System Design Mindset",
        detail:
          "Understanding trade-offs, scalability limits, and real-world constraints in cloud architectures.",
      },
      {
        iconId: "methodology",
        name: "Iterative Development",
        detail:
          "Building in small cycles with testing, feedback, and continuous improvement.",
      },
      {
        iconId: "controls",
        name: "Practical Problem Solving",
        detail:
          "Focusing on real-world issues (misconfigurations, vulnerabilities, deployment risks) rather than theoretical solutions.",
      },
      {
        iconId: "documentation",
        name: "Clear Documentation",
        detail:
          "Producing structured reports, diagrams, and explanations for both technical and non-technical stakeholders.",
      },
    ],
  },
];
