import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

export type SectionMarkId =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "blog"
  | "contact";

type Props = {
  title: string;
  section: SectionMarkId;
};

function IconAbout() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 16.5v-6M12 7.75h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSkills() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        d="M14.7 6.3a2 2 0 0 1 0 2.8l-7 7a2 2 0 1 1-2.8-2.8l7-7a2 2 0 0 1 2.8 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="m4 20 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExperience() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        d="M8 8V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="4" y="8" width="16" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconProjects() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        d="M9 7 6 12l3 5M15 7l3 5-3 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        d="M8 4h7l5 5v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 4v4h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg className={styles.markIcon} viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 8l9 6 9-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const marks: Record<SectionMarkId, ReactNode> = {
  about: <IconAbout />,
  skills: <IconSkills />,
  experience: <IconExperience />,
  projects: <IconProjects />,
  blog: <IconBlog />,
  contact: <IconContact />,
};

/** Circle + pulsing mark + section title (same pattern as About) */
export function SectionHeader({ title, section }: Props) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.markColumn}>
        <div className={styles.circle} aria-hidden>
          {marks[section]}
        </div>
      </div>
      <h2 className={styles.heading}>{title}</h2>
    </div>
  );
}
