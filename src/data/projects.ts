export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  icon?: string;
  tech: string[];
  githubUrl: string;
  /** Architecture, build, security, learnings — used on detail page */
  architecture: string;
  built: string;
  security: string;
  learned: string;
};

export const projects: Project[] = [
  {
    slug: "ai-driven-network-intrusion-detection",
    title: "AI-Driven Network Intrusion Detection",
    icon: "🛡️",
    shortDescription:
      "Senior thesis. Built an enterprise network in GNS3, simulated DDoS and MITM attacks, then trained a Random Forest classifier achieving 100% accuracy in distinguishing malicious from normal traffic.",
    tech: ["Python", "GNS3", "Wireshark", "hping3", "Random Forest", "arpspoof"],
    githubUrl: "https://github.com/yourusername/ai-network-intrusion-detection",
    architecture:
      "Lab architecture included segmented virtual hosts and routing in GNS3, mirrored packet capture workflow in Wireshark, and a feature-engineering pipeline that transformed flow-level indicators into model-ready training data.",
    built:
      "Implemented scenario-driven traffic generation for benign and attack sessions, built preprocessing and labeling routines, and trained/evaluated a Random Forest model for intrusion classification.",
    security:
      "Validated attack-path realism with DDoS and MITM simulations, controlled noisy samples to reduce false positives, and documented assumptions/limitations for reproducible security testing.",
    learned:
      "How to bridge practical network security testing with ML model quality, and how representative traffic generation directly impacts classifier reliability.",
  },
  {
    slug: "intelligent-document-querying-system",
    title: "Intelligent Document Querying System",
    icon: "🤖",
    shortDescription:
      "Built a RAG-based Q&A system on Amazon Bedrock with S3 storage and Aurora Serverless PostgreSQL. Infrastructure provisioned via Terraform with GenAI security best practices applied throughout.",
    tech: ["AWS Bedrock", "Python", "S3", "Aurora PostgreSQL", "Terraform", "RAG"],
    githubUrl: "https://github.com/yourusername/intelligent-document-querying-system",
    architecture:
      "Documents are ingested to S3, indexed for retrieval, and queried through a Bedrock-powered RAG pipeline with Aurora Serverless PostgreSQL holding metadata/state and Terraform defining reproducible infrastructure.",
    built:
      "Implemented ingestion, retrieval orchestration, answer generation, and IaC modules for storage, database, and policy wiring to support iterative development and deployment.",
    security:
      "Applied least-privilege IAM for services, controlled data access paths across S3 and DB resources, and added guardrails around prompt/query handling for safer LLM usage.",
    learned:
      "How to design retrieval quality and cloud architecture together so generated answers remain accurate, auditable, and secure at scale.",
  },
  {
    slug: "smart-budget-buddy-bedrock-agent",
    title: "Smart Budget Buddy - AWS Bedrock Agent",
    icon: "💰",
    shortDescription:
      "Designed a student-focused AI financial assistant using AWS Bedrock Agent Builder. Defined agent persona, applied Bedrock Guardrails to prevent bias, and iteratively tested with real-world scenarios.",
    tech: ["AWS Bedrock", "Prompt Engineering", "Guardrails", "Responsible AI"],
    githubUrl: "https://github.com/yourusername/smart-budget-buddy-bedrock-agent",
    architecture:
      "Agent-first architecture on Bedrock Agent Builder with intent-focused prompt templates, constrained response behavior, and a policy layer to enforce safer financial guidance boundaries.",
    built:
      "Created assistant persona/rules, structured conversational flows for common student budgeting tasks, and validated outcomes with iterative real-world prompt scenarios.",
    security:
      "Used Bedrock Guardrails and response constraints to reduce unsafe outputs, limit bias-prone suggestions, and keep guidance within practical non-advisory boundaries.",
    learned:
      "Responsible AI behavior requires both technical controls and repeated scenario testing; prompt design alone is not sufficient.",
  },
  {
    slug: "aws-vpc-infrastructure",
    title: "AWS Cloud Infrastructure",
    icon: "☁️",
    shortDescription:
      "Isolated VPC with public/private subnets, EC2 bastion pattern, and IAM tuned for least privilege.",
    tech: ["AWS VPC", "EC2", "IAM", "Security Groups", "Terraform"],
    githubUrl: "https://github.com/yourusername/aws-vpc-lab",
    architecture:
      "Multi-AZ VPC with Internet Gateway, NAT for private egress, segmented subnets, and IAM roles scoped to instance profiles instead of long-lived keys.",
    built:
      "Terraform modules for network baseline, baseline security groups, and tagged resources for cost visibility.",
    security:
      "Restricted SSH ingress, no direct DB exposure, SSM Session Manager preferred over open port 22, and guardrails preventing `0.0.0.0/0` on management ports.",
    learned:
      "Subnet design trade-offs and how small IAM policy mistakes become large blast-radius issues.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
