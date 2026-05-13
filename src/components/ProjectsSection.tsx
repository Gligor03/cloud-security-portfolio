import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader title="Projects" section="projects" />
        <p className="sectionSubtitle">
          Real projects spanning AI security, Bedrock systems, and cloud
          infrastructure.
        </p>
        <div className={styles.grid}>
          {projects.map((p) => (
            <article key={p.slug} className={`card ${styles.card}`}>
              <div className={styles.iconBadge} aria-hidden>
                {p.icon ?? "📦"}
              </div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.shortDescription}</p>
              <div className="chipRow" style={{ marginBottom: "1rem" }}>
                {p.tech.map((t) => (
                  <span key={t} className="chip chipGreen">
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.actions}>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btnGhost"
                  style={{ fontSize: "0.88rem", padding: "0.5rem 1rem" }}
                >
                  GitHub Repo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
