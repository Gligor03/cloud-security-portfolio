export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

/** Professional experience — reads as employment/consulting, distinct from project cards */
export const experience: ExperienceItem[] = [
  {
    id: "startup-security",
    title: "Security Engineer (Freelance / Startup Collaboration)",
    company: "Early-stage SaaS Czech startup",
    location: "Remote",
    period: "2026 — Present",
    summary:
      "Conducted application security audit and basic penetration testing on a live marketplace platform.",
    highlights: [
      "Identified vulnerabilities including access control issues (IDOR), input validation risks, and insecure API handling.",
      "Tested real attack scenarios (e.g., SQL injection attempts, unauthorized data access) and documented findings with proof-of-concept.",
      "Proposed and implemented security improvements including input validation, authentication checks, and API protection.",
      "Contributed to improving overall platform security architecture and reducing risk of unauthorized access.",
    ],
  },
  {
    id: "freelance-web",
    title: "Web Developer / Cloud & Security Contributor (Freelance)",
    company: "US-based Company",
    location: "Remote",
    period: "2026 — Present",
    summary:
      "Developed and deployed a production website using Netlify and Supabase.",
    highlights: [
      "Built and configured backend services, database integration, and hosting environment.",
      "Implemented authentication and basic security measures to protect user data and API endpoints.",
      "Improved performance and reliability of the deployed application.",
      "Gained hands-on experience working with a real client and production environment.",
    ],
  },
];
