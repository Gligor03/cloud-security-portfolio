import type { SkillCategory } from "@/data/skills";
import { CategoryHexMark, SkillRowIllustration } from "@/components/skillIcons";
import styles from "./SkillCategoryPanel.module.css";

const themeClass: Record<SkillCategory["theme"], string> = {
  blue: styles.blue,
  purple: styles.purple,
  green: styles.green,
  orange: styles.orange,
};

export function SkillCategoryPanel({ category }: { category: SkillCategory }) {
  const horizontal = category.layout === "horizontal";

  return (
    <div
      className={`${styles.panel} ${themeClass[category.theme]} ${
        horizontal ? styles.horizontal : ""
      }`}
    >
      <div className={styles.header}>
        <span className={styles.hexWrap}>
          <CategoryHexMark mark={category.mark} />
        </span>
        <h3 className={styles.title}>{category.title}</h3>
      </div>
      <ul className={styles.list}>
        {category.rows.map((row) => (
          <li key={row.name} className={styles.row}>
            <span className={styles.illu} aria-hidden>
              <SkillRowIllustration iconId={row.iconId} />
            </span>
            <div className={styles.body}>
              <p className={styles.rowTitle}>{row.name}</p>
              <p className={styles.rowDetail}>{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
