import { SectionHeader } from "@/components/SectionHeader";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader title="About" section="about" />

        <div className={styles.summaryCard}>
          <p className={styles.summary}>
            I&apos;m a recent IT graduate from Empire State University (via the
            University of New York in Prague), with a strong focus on
            networking, cybersecurity, cloud infrastructure, and AI/ML systems.
            I was recognized on the Dean&apos;s List and served as Student Council
            President, representing and addressing the needs of over 1,000+
            students.
          </p>
          <p className={styles.summary}>
            My main focus is bridging cybersecurity, cloud, and AI to solve
            real-world technical challenges. I&apos;m particularly interested in
            building and securing cloud environments while integrating AI-driven
            solutions for smarter, more resilient systems. I take a hands-on
            approach to learning and ownership of every problem I work on.
          </p>
          <p className={styles.summary}>
            Currently looking for opportunities to help businesses design,
            secure, and optimize their IT infrastructure through practical
            solutions in networking, cybersecurity, cloud, and AI. Fluent in
            English (C1), native in Macedonian, conversational in
            Serbo-Croatian, with basic knowledge of Spanish and Czech.
          </p>
        </div>

        <div className={styles.twoCol}>
          <div className={`card ${styles.panel}`}>
            <h3 className={styles.panelTitle}>Educational Background</h3>
            <p className={styles.panelText}>
              <strong>Bachelor of Science in Information Technology</strong>
            </p>
            <ul className={styles.list}>
              <li>Empire State University | Dean&apos;s List | GPA: 3.93</li>
              <li>September 2022 - February 2026</li>
              <li>
                Course work completed at University of New York in Prague (UNYP)
                before internal transfer
              </li>
            </ul>
            <p className={styles.panelText}>
              <strong>High School Diploma</strong>
            </p>
            <ul className={styles.list}>
              <li>&quot;Rade Jovcevski - Korcagin&quot; Gymnasium</li>
              <li>September 2018 - June 2022</li>
            </ul>
          </div>
          <div className={`card ${styles.panel}`}>
            <h3 className={styles.panelTitle}>Certifications</h3>
            <ul className={styles.list}>
              <li>Future AWS AI Engineer (2025)</li>
              <li>Generative AI with AWS (2025)</li>
              <li>Machine Learning Foundations (2025)</li>
              <li>Data Analytics for Business Decision Making (2022)</li>
              <li>
                CompTIA Security+ — <em>planned</em>
              </li>
              <li>
                AWS Certified Solutions Architect - Associate —{" "}
                <em>planned</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
