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
    slug: "aws-vpc-infrastructure",
    title: "Secure AWS Cloud Infrastructure",
    icon: "☁️",
    shortDescription:
      "Designed and deployed secure AWS infrastructure using Terraform, including VPC networking, IAM roles, hardened S3 storage, CloudTrail logging, and CloudWatch monitoring. Applied least-privilege access, network segmentation, and infrastructure automation to improve security, scalability, and cost control.",
    tech: [
      "AWS VPC",
      "EC2",
      "IAM",
      "S3",
      "Security Groups",
      "Terraform",
      "CloudTrail",
      "CloudWatch",
    ],
    githubUrl: "https://github.com/yourusername/aws-vpc-lab",
    architecture:
      "Terraform-defined VPC with public and private subnets, Internet Gateway and NAT patterns for controlled egress, an EC2 bastion for administrative access, IAM roles and instance profiles (no long-lived keys), hardened S3 with encryption and least-privilege policies, CloudTrail for API audit logging, and CloudWatch for metrics and operational visibility.",
    built:
      "Provisioned repeatable infrastructure modules, wired logging and monitoring (CloudTrail, CloudWatch), implemented deployment and teardown automation to support reproducible environments and cost control, and validated network segmentation and access paths end to end.",
    security:
      "Least-privilege IAM, network segmentation, encryption at rest and in transit where applicable, restricted management surface (bastion / Session Manager patterns), and centralized audit trails via CloudTrail to reduce blind spots and blast radius.",
    learned:
      "Security-by-design in the cloud is a combination of IAM discipline, observable infrastructure, and automation—small misconfigurations compound quickly without logging, monitoring, and repeatable IaC.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
