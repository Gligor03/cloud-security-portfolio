import { site } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {site.author}. Built with Next.js — deploy anywhere static-friendly.
        </p>
        <p className={styles.meta}>{site.role}</p>
      </div>
    </footer>
  );
}
