import { site } from "@/data/site";
import styles from "./ContactSection.module.css";

function IconEnvelope() {
  return (
    <svg className={styles.boxIcon} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        d="M4 7h16v10H4V7Zm0 0 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className={styles.boxIcon} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        d="M7 10v9M7 7h.01M11 19v-5.2c0-1.1.9-2 2-2s2 .9 2 2V19M17 19v-5.8c0-2.2-1.8-4-4-4-.7 0-1.4.2-2 .5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactSection() {
  /** Opens the default mail app with a new message addressed to this inbox. */
  const mailtoHref = `mailto:${site.email}`;
  const linkedInShort = "linkedin.com/in/gligor03";

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>{`// CONTACT`}</p>
        <h2 className={styles.title}>
          <span className={styles.titleMuted}>Let&apos;s </span>
          <span className={styles.titleAccent}>connect</span>
        </h2>
        <p className={styles.lede}>
          I&apos;m open to internships and junior roles in IT, networking, security,
          or cloud. Let&apos;s build something together.
        </p>

        <div className={styles.boxGrid}>
          <a
            href={mailtoHref}
            className={`${styles.box} ${styles.boxLink}`}
          >
            <IconEnvelope />
            <span className={styles.boxText}>{site.email}</span>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.box} ${styles.boxLink}`}
          >
            <IconLinkedIn />
            <span className={styles.boxText}>{linkedInShort}</span>
          </a>
        </div>

        <a href={mailtoHref} className={styles.cta}>
          SEND A MESSAGE →
        </a>
      </div>
    </section>
  );
}
