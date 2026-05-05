import { SectionHeader } from "@/components/SectionHeader";
import { SkillCategoryPanel } from "@/components/SkillCategoryPanel";
import { skillCategories } from "@/data/skills";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader title="Skills" section="skills" />
        <p className="sectionSubtitle">
          Four pillars: how I build, how I defend networks, how I ship cloud and AI
          systems, and how I work day to day.
        </p>
        <div className={styles.categoryGrid}>
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className={[
                styles.panelShell,
                category.fullWidth ? styles.spanFull : "",
                category.id === "cloud" ? styles.cloudWideTablet : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <SkillCategoryPanel category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
