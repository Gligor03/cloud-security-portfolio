import Link from "next/link";
import { getAllPostsMeta } from "@/lib/markdown";
import styles from "./blog.module.css";

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="section">
      <div className="container">
        <h1 className="sectionTitle">Blog</h1>
        <p className="sectionSubtitle">
          Notes on building safely in the cloud — authored as markdown in{" "}
          <code className={styles.code}>src/content/blog</code>.
        </p>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={`card ${styles.item}`}>
              <p className={styles.date}>{post.date}</p>
              <h2 className={styles.title}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className={styles.desc}>{post.description}</p>
              <Link href={`/blog/${post.slug}`} className={styles.read}>
                Continue reading
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
