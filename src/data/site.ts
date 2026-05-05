/**
 * Central site copy and social links.
 * Update `author` and URLs before deploying.
 */
export const site = {
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Gligor Ligovski",
  /** Small label above the hero name (uppercased in UI). */
  heroKicker: "Junior Cloud & Security Engineer",
  /** Lines cycled in the hero typing strip (type in, delete, then next). */
  heroTypingPhrases: [
    "Machine Learning & AI",
    "Prompt Engineering & GenAI",
    "Networking & Cybersecurity",
    "Cloud Infrastructure on AWS",
  ],
  role: "Cloud, Security & AI",
  tagline:
    "Building secure, observable systems on the cloud — from VPC design to application testing.",
  intro:
    "I focus on practical cloud security: least-privilege IAM, hardened networking, and secure delivery pipelines. I enjoy turning complex infrastructure into clear diagrams and repeatable automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Gligor03",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/gligor03",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "octocat",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "gligorligovskiofficial@gmail.com",
} as const;
