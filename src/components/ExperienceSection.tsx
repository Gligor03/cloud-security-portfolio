import { SectionHeader } from "@/components/SectionHeader";
import { experience } from "@/data/experience";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader title="Experience" section="experience" />
        <p className="sectionSubtitle">
          Selected professional work — distinct from hobby repositories and
          coursework labs.
        </p>
        <div className={styles.list}>
          {experience.map((job) => (
            <article key={job.id} className={`card ${styles.item}`}>
              <header className={styles.header}>
                <div>
                  <h3 className={styles.title}>{job.title}</h3>
                  <p className={styles.company}>
                    ({job.company} · {job.location})
                  </p>
                </div>
                <p className={styles.period}>{job.period}</p>
              </header>
              <p className={styles.summary}>{job.summary}</p>
              <ul className={styles.highlights}>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
