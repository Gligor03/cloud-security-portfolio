import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import styles from "./project.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="section">
      <div className={`container ${styles.wrap}`}>
        <Link href="/#projects" className={styles.back}>
          ← Projects
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lead}>{project.shortDescription}</p>
        <div className="chipRow" style={{ marginBottom: "2rem" }}>
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <section className={styles.block}>
          <h2 className={styles.h2}>Architecture</h2>
          <p className={styles.p}>{project.architecture}</p>
        </section>
        <section className={styles.block}>
          <h2 className={styles.h2}>What I built</h2>
          <p className={styles.p}>{project.built}</p>
        </section>
        <section className={styles.block}>
          <h2 className={styles.h2}>Security considerations</h2>
          <p className={styles.p}>{project.security}</p>
        </section>
        <section className={styles.block}>
          <h2 className={styles.h2}>What I learned</h2>
          <p className={styles.p}>{project.learned}</p>
        </section>

        <div className={styles.actions}>
          <a
            className="btn btnPrimary"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub repository
          </a>
        </div>
      </div>
    </article>
  );
}
