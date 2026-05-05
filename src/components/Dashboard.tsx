import { projects } from "@/data/projects";
import styles from "./Dashboard.module.css";

/** Compact status card — highlights current focus and shipped work */
export function Dashboard() {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.row}>
        <div>
          <p className={styles.label}>Current focus</p>
          <p className={styles.value}>Cloud Security</p>
        </div>
        <div className={styles.divider} aria-hidden />
        <div>
          <p className={styles.label}>Projects documented</p>
          <p className={styles.value}>{projects.length}</p>
        </div>
      </div>
      <p className={styles.footer}>
        Automate · Analyze · Protect — shipping calm infrastructure.
      </p>
    </div>
  );
}
